# AuditClaw Session Context

Last updated: 2026-02-04

This document captures context from the development session for Phase 1.a containerization. Use this to resume work after system reboot.

---

## What is AuditClaw?

AuditClaw is a stripped-down fork of OpenClaw designed specifically for internal auditors. It provides:
- A local-first AI assistant for audit research and knowledge work
- A shared skill library curated by trusted peer network of audit professionals
- Web UI as the primary interface (no messaging integrations)
- Containerized deployment for security isolation

**Core philosophy:** Simple, focused, trust-based.

---

## Files Created in This Session

### 1. `Dockerfile.auditclaw`
Multi-stage Docker build with security hardening:
- Base image: `node:22-bookworm-slim`
- Creates `auditclaw` user (UID 1000)
- Multi-stage build (builder + production)
- Health check via curl to port 18789
- Runs as non-root user
- CMD: `node dist/index.js gateway --allow-unconfigured --bind lan`

### 2. `docker-compose.auditclaw.yml`
Container orchestration with security settings:
```yaml
security_opt:
  - no-new-privileges:true
cap_drop:
  - ALL
read_only: true
user: "1000:1000"
ports:
  - "127.0.0.1:18789:18789"  # Localhost only
```

Volume mounts:
| Host Path | Container Path | Access |
|-----------|----------------|--------|
| `~/audit-input` | `/workspace/input` | read-only |
| `~/audit-output` | `/workspace/output` | read-write |
| `~/auditclaw-skills` | `/workspace/skills` | read-only |
| Named volume | `/home/auditclaw/.auditclaw` | read-write |
| Named volume | `/tmp` | read-write |

### 3. `.env.auditclaw.example`
Template environment file supporting multiple AI providers:
- `OPENROUTER_API_KEY` - Recommended for testing
- `ANTHROPIC_API_KEY`
- `OPENAI_API_KEY`
- `GEMINI_API_KEY`
- `GROQ_API_KEY`
- `AUDITCLAW_GATEWAY_TOKEN` - Optional, for LAN access

### 4. `scripts/setup-auditclaw.sh`
Setup script that:
- Creates `~/audit-input`, `~/audit-output`, `~/auditclaw-skills` directories
- Optionally clones community skills repo with `--with-skills` flag
- Displays next steps

### 5. `docs/auditclaw/container-setup.md`
Comprehensive user documentation covering:
- Prerequisites
- Quick start guide
- Volume mappings
- Security model
- Configuration options
- Daily usage workflow
- Troubleshooting

### 6. `docs/auditclaw/ROADMAP.md`
Development roadmap with task tracking.

---

## Key Technical Details

### No Source Code Changes Needed for Phase 1.a
The existing OpenClaw codebase supports all needed configuration:
- `OPENCLAW_STATE_DIR` env var for config directory (`src/config/paths.ts:53`)
- `skills.load.extraDirs` config for custom skills directories (`src/agents/skills/workspace.ts:126`)
- `--bind lan` and `--token` flags for gateway (`src/cli/gateway-cli/run.ts`)

### AI Provider Support
OpenClaw supports 30+ providers. User preference is **OpenRouter** for testing because:
- Single API key for many models
- No throttling/banning concerns (some users reported issues with direct Anthropic)
- Competitive pricing
- Can switch models easily

### Skills Loading
Skills mounted at `/workspace/skills` will be loaded via config:
```json
{
  "skills": {
    "load": {
      "extraDirs": ["/workspace/skills"]
    }
  }
}
```

### Gateway Bind Mode
- Container binds to `0.0.0.0` (lan) internally
- Docker only exposes to `127.0.0.1:18789` externally
- If `AUDITCLAW_GATEWAY_TOKEN` is set, can expose to network with auth

---

## Why System Reboot is Needed

The Docker build failed with:
```
failed to add the host (veth...) <=> sandbox (veth...) pair interfaces: operation not supported
```

Root cause:
- System uptime: 122 days
- Running kernel: `6.16.3-76061603-generic`
- Available kernels: `6.17.9-76061709-generic` (latest)
- The `veth` kernel module (required for Docker networking) is compiled for newer kernel
- Cannot load modules compiled for different kernel version
- **Solution: Reboot to load updated kernel**

---

## Verification Steps After Reboot

After reboot, run these commands to verify the setup:

### 1. Build and Start
```bash
cd ~/Development/github/auditclaw
./scripts/setup-auditclaw.sh
cp .env.auditclaw.example .env
# Edit .env to add OPENROUTER_API_KEY

docker compose -f docker-compose.auditclaw.yml build
docker compose -f docker-compose.auditclaw.yml up -d
docker compose -f docker-compose.auditclaw.yml logs -f
```

### 2. Health Check
```bash
docker inspect --format='{{.State.Health.Status}}' auditclaw
# Expected: healthy (may show "starting" for first 30s)
```

### 3. Web UI Access
```bash
curl -I http://localhost:18789/
# Expected: HTTP/1.1 200 OK
```

Then open in browser: http://localhost:18789

### 4. Volume Mount Tests
```bash
# Test read from input
echo "test" > ~/audit-input/test.txt
docker compose -f docker-compose.auditclaw.yml exec auditclaw cat /workspace/input/test.txt
rm ~/audit-input/test.txt

# Test write to output
docker compose -f docker-compose.auditclaw.yml exec auditclaw sh -c 'echo "output" > /workspace/output/test.txt'
cat ~/audit-output/test.txt
rm ~/audit-output/test.txt
```

### 5. Security Constraint Tests
```bash
# Should fail - read-only filesystem
docker compose -f docker-compose.auditclaw.yml exec auditclaw touch /app/test

# Should fail - input is read-only
docker compose -f docker-compose.auditclaw.yml exec auditclaw touch /workspace/input/test
```

---

## Vision Document Updates Made

Updated `vision/AUDITCLAW_VISION.md` Phase 1.a checklist:
- [x] Create Dockerfile with security hardening (`Dockerfile.auditclaw`)
- [x] Create docker-compose.yml with proper isolation (`docker-compose.auditclaw.yml`)
- [x] Configure volume mounts (input read-only, output read-write)
- [ ] Verify web UI functions correctly in container
- [ ] Test skill loading from mounted volume
- [x] Document container setup and usage (`docs/auditclaw/container-setup.md`)

---

## Reference Files

| File | Purpose |
|------|---------|
| `vision/AUDITCLAW_VISION.md` | Full project vision and architecture |
| `vision/auditclaw-skills-brainstorm.md` | 123 identified skills with prioritization |
| `vision/auditclaw-skill-spec.md` | Skill format specification |
| `vision/skills/risk-assessment/` | First complete skill implementation |
| `Dockerfile` | Original OpenClaw Dockerfile (reference) |
| `docker-compose.yml` | Original OpenClaw compose file (reference) |

---

## Commands Quick Reference

```bash
# Setup
./scripts/setup-auditclaw.sh
cp .env.auditclaw.example .env

# Build
docker compose -f docker-compose.auditclaw.yml build

# Start
docker compose -f docker-compose.auditclaw.yml up -d

# Logs
docker compose -f docker-compose.auditclaw.yml logs -f

# Stop
docker compose -f docker-compose.auditclaw.yml down

# Shell access
docker compose -f docker-compose.auditclaw.yml exec auditclaw /bin/bash

# Remove all data
docker compose -f docker-compose.auditclaw.yml down -v
```

---

## Session 2026-02-04: Containerization Complete

After system reboot, completed Phase 1.a with the following fixes:

### Dockerfile Fixes Required

1. **User/group creation conflict**: Base image `node:22-bookworm-slim` already has `node` user with UID/GID 1000
   - Fix: Use `groupmod -n auditclaw node && usermod -l auditclaw -d /home/auditclaw -m node`

2. **Missing unzip**: Bun installer requires `unzip` in builder stage
   - Fix: Add `unzip` to apt-get install in builder stage

3. **Wrong UI dist path**: Dockerfile tried to copy `/app/ui/dist` but UI builds to `/app/dist/control-ui`
   - Fix: Remove redundant copy (already included in `/app/dist` copy)

4. **Gateway auth token**: Gateway requires authentication even for localhost
   - Fix: Set `OPENCLAW_GATEWAY_TOKEN=local` as default in docker-compose

### Verification Results

| Test | Result |
|------|--------|
| Docker build | ✅ |
| Container health | ✅ healthy |
| Web UI (port 18789) | ✅ HTTP 200 |
| Input volume (read) | ✅ |
| Output volume (write) | ✅ |
| Read-only root filesystem | ✅ |
| Read-only input volume | ✅ |

---

## Next Session Goals

1. Test skill loading from mounted volume (requires sample skills)
2. Begin Phase 1.b planning (component removal)
