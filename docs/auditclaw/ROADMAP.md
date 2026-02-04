# AuditClaw Development Roadmap

Last updated: 2026-02-04

## Current Status: Phase 1.a - Containerization ✅ COMPLETE

### Completed Tasks

- [x] Create `Dockerfile.auditclaw` with security hardening
- [x] Create `docker-compose.auditclaw.yml` with proper isolation
- [x] Configure volume mounts (input read-only, output read-write)
- [x] Create `.env.auditclaw.example` with multi-provider support
- [x] Create `scripts/setup-auditclaw.sh` setup script
- [x] Create `docs/auditclaw/container-setup.md` documentation
- [x] Update vision document Phase 1.a checklist
- [x] Build Docker image successfully
- [x] Verify web UI functions correctly in container
- [x] Test volume mount permissions (input read-only, output read-write)
- [x] Verify security constraints (read-only root filesystem)
- [x] Create `config/auditclaw.json` for containerized deployment settings
- [x] Document security model (`docs/auditclaw/security-model.md`)

### Dockerfile Fixes Applied (2026-02-04)

- Fixed user/group creation: Renamed existing `node` user to `auditclaw` instead of creating new (GID 1000 conflict)
- Added `unzip` to builder stage (required for Bun installer)
- Removed redundant UI dist copy (already included in `/app/dist`)
- Fixed gateway auth: Set default token for localhost-only access
- Added config file mount to disable device auth for containerized use

### Pending

- [ ] Test skill loading from mounted volume (requires skills to be present)

---

## Phase 1.b: Component Removal (Future)

- [ ] Remove messaging integrations (WhatsApp, Telegram, Slack, Discord, Signal, iMessage, etc.)
- [ ] Remove voice/wake word components
- [ ] Remove mobile companion app code
- [ ] Remove multi-agent routing (single agent only)
- [ ] Remove or disable Canvas/A2UI (evaluate usefulness first)
- [ ] Clean up orphaned dependencies and configuration

---

## Phase 1.c: Rebranding and Configuration (Future)

- [ ] Rename CLI and paths (`auditclaw` instead of `openclaw`)
- [ ] Update branding (name, descriptions, prompts)
- [ ] Create audit-focused default configuration
- [ ] Create audit-specific system prompt
- [ ] Simplify web UI for document-focused workflow
- [ ] Create basic user documentation
- [ ] Release v0.1.0

---

## Phase 1.d: Network Security Hardening (Future)

**Goal:** Restrict container network access to internet-only by default, with explicit allowlist for local network services.

### Current State

The container can currently make outbound connections to:
- ✅ Internet (required for AI APIs and web research)
- ⚠️ Local network (unintended - NAS, other computers, local services)

### Planned Implementation

#### Option A: Host Firewall Rules (Recommended)

Add iptables/nftables rules to block container egress to private IP ranges:

```bash
# Block container subnet from accessing private networks
iptables -I DOCKER-USER -s 172.18.0.0/16 -d 10.0.0.0/8 -j DROP
iptables -I DOCKER-USER -s 172.18.0.0/16 -d 172.16.0.0/12 -j DROP
iptables -I DOCKER-USER -s 172.18.0.0/16 -d 192.168.0.0/16 -j DROP
iptables -I DOCKER-USER -s 172.18.0.0/16 -d 169.254.0.0/16 -j DROP
```

Pros:
- Simple to implement
- No container changes needed
- Can be scripted in setup

Cons:
- Requires root access on host
- Must persist across reboots

#### Option B: Proxy Container

Route all container traffic through a filtering proxy (e.g., Squid, mitmproxy):

```yaml
services:
  proxy:
    image: squid
    # Configure to block private IP ranges

  auditclaw:
    network_mode: "service:proxy"
```

Pros:
- No host configuration needed
- More portable

Cons:
- Additional complexity
- Performance overhead
- SSL/TLS interception challenges

#### Option C: Docker Network Plugin

Use a network plugin like Calico or Weave with network policies.

Pros:
- Native Kubernetes-style policies
- Fine-grained control

Cons:
- Significant complexity
- Overkill for single-container deployment

### Explicit Local Service Access

For accessing specific local services (NAS, databases), implement an allowlist:

```yaml
# Future: docker-compose.auditclaw.yml
environment:
  # Explicitly allowed local services
  - AUDITCLAW_ALLOWED_LOCAL_HOSTS=nas.local:445,postgres.local:5432
```

Implementation would add iptables rules to allow specific host:port combinations.

### Tasks

- [ ] Choose implementation approach (A, B, or C)
- [ ] Implement egress filtering for private IP ranges
- [ ] Create setup script to configure host firewall (if Option A)
- [ ] Implement allowlist mechanism for explicit local service access
- [ ] Document network security configuration
- [ ] Test with common local services (SMB/NAS, PostgreSQL, etc.)
- [ ] Update security model documentation

---

## Phase 2: Core Skills (Future)

- [ ] `risk-assessment` (exists in vision/skills/)
- [ ] `finding-writer`
- [ ] `audit-program`
- [ ] `control-identification`
- [ ] `sample-selection`
- [ ] `workpaper-documentation`
- [ ] `executive-summary-writer`
- [ ] `sox-control-testing`

---

## Reference

- Vision document: `vision/AUDITCLAW_VISION.md`
- Security model: `docs/auditclaw/security-model.md`
- Container setup guide: `docs/auditclaw/container-setup.md`
- Session context: `docs/auditclaw/MEMORY.md`
