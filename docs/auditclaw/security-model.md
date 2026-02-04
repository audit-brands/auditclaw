# AuditClaw Security Model

Last updated: 2026-02-04

This document describes the security architecture of AuditClaw's containerized deployment.

---

## Overview

AuditClaw runs inside a Docker container with multiple layers of security isolation. The goal is to provide a secure environment for AI-assisted audit work while maintaining the flexibility needed for research and document analysis.

**Design Principles:**
- Defense in depth (multiple security layers)
- Principle of least privilege
- Explicit permission for sensitive access
- Internet access for AI research, restricted local access

---

## Security Layers

### 1. Filesystem Isolation

The container only has access to explicitly mounted directories:

| Mount Point | Host Path | Access | Purpose |
|-------------|-----------|--------|---------|
| `/workspace/input` | `~/audit-input` | Read-only | Documents to analyze |
| `/workspace/output` | `~/audit-output` | Read-write | Generated reports |
| `/workspace/skills` | `~/auditclaw-skills` | Read-only | Community skills |
| `/home/auditclaw/.auditclaw` | Config file + data volume | Mixed | Configuration and state |
| `/tmp` | Named volume | Read-write | Temporary files |

**Protected by default:**
- Home directory (`~`)
- SSH keys (`~/.ssh`)
- Cloud credentials (`~/.aws`, `~/.gcloud`, etc.)
- System files (`/etc`, `/var`)
- Other user data

### 2. Linux Capabilities

All Linux capabilities are dropped:

```yaml
cap_drop:
  - ALL
```

This prevents the container from:
- Mounting filesystems
- Loading kernel modules
- Changing system time
- Using raw sockets
- Other privileged operations

### 3. Privilege Escalation Prevention

```yaml
security_opt:
  - no-new-privileges:true
```

Prevents processes inside the container from gaining additional privileges through setuid binaries or other mechanisms.

### 4. Non-Root User

The application runs as a non-root user (UID 1000):

```yaml
user: "1000:1000"
```

Even if an attacker escapes the container, they would have limited privileges.

### 5. Read-Only Root Filesystem

```yaml
read_only: true
```

The container's root filesystem is read-only. Only explicitly mounted volumes can be written to. This prevents:
- Malware installation
- Configuration tampering
- Persistent backdoors

### 6. Network Isolation

**Incoming connections:**
- Only port 18789 is exposed
- Bound to `127.0.0.1` (localhost only)
- Not accessible from other machines on the network

```yaml
ports:
  - "127.0.0.1:18789:18789"
```

**Outgoing connections:**
- Internet access is allowed (required for AI provider APIs and web research)
- Local network access is currently allowed (see "Known Limitations" below)

---

## Authentication

### Gateway Token

The gateway requires token authentication. A default token (`local`) is set for localhost-only deployments:

```yaml
environment:
  - OPENCLAW_GATEWAY_TOKEN=${OPENCLAW_GATEWAY_TOKEN:-local}
```

For LAN access, generate a secure token:
```bash
openssl rand -hex 32
```

### Device Authentication

Device pairing is disabled for containerized deployments via configuration:

```json
{
  "gateway": {
    "controlUi": {
      "dangerouslyDisableDeviceAuth": true
    }
  }
}
```

This is acceptable because:
1. The gateway is only accessible from localhost
2. Token authentication is still required
3. The container is already isolated

---

## Known Limitations

### Local Network Access (Current)

**Status:** The container can currently make outbound connections to local network resources (other computers, NAS, printers, etc.).

**Why:** Docker bridge networking provides internet access via NAT, which also allows local network access. Restricting this requires host-level firewall rules.

**Risk:** If the AI is instructed to access local network resources, it could potentially:
- Scan local network
- Access unsecured services
- Exfiltrate data to local devices

**Mitigation (until fixed):**
- Review AI prompts and tool usage
- Monitor container network activity
- Use a separate network segment for sensitive devices

**Future fix:** See Roadmap for planned egress filtering.

---

## Security Checklist

Before deploying AuditClaw:

- [ ] Verify only necessary directories are in `~/audit-input`
- [ ] Ensure no sensitive files in mounted directories
- [ ] Set a strong `OPENCLAW_GATEWAY_TOKEN` if exposing beyond localhost
- [ ] Review AI provider API key permissions
- [ ] Consider network segmentation for sensitive local resources

---

## Threat Model

### In Scope (Protected Against)

| Threat | Mitigation |
|--------|------------|
| AI accessing sensitive host files | Filesystem isolation |
| AI modifying system configuration | Read-only filesystem, dropped capabilities |
| AI escalating privileges | no-new-privileges, non-root user |
| Remote attackers accessing gateway | localhost-only binding |
| Malware persistence | Read-only filesystem |

### Out of Scope (Not Protected Against)

| Threat | Notes |
|--------|-------|
| AI accessing local network | Future work (egress filtering) |
| Malicious AI provider responses | Trust your AI provider |
| Side-channel attacks | Not addressed |
| Supply chain attacks on base image | Use official images, verify checksums |

---

## Future Enhancements

See [ROADMAP.md](./ROADMAP.md) for planned security improvements:
- Egress filtering to block local network by default
- Explicit allowlist for local services (NAS, databases)
- Network policy enforcement

---

## References

- [Docker Security Best Practices](https://docs.docker.com/engine/security/)
- [CIS Docker Benchmark](https://www.cisecurity.org/benchmark/docker)
- [OWASP Container Security](https://owasp.org/www-project-container-security/)
