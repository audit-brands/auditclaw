# AuditClaw Development Roadmap

Last updated: 2026-02-03

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

### Dockerfile Fixes Applied (2026-02-04)

- Fixed user/group creation: Renamed existing `node` user to `auditclaw` instead of creating new (GID 1000 conflict)
- Added `unzip` to builder stage (required for Bun installer)
- Removed redundant UI dist copy (already included in `/app/dist`)
- Fixed gateway auth: Set default token for localhost-only access

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
- Container setup guide: `docs/auditclaw/container-setup.md`
- Session context: `docs/auditclaw/MEMORY.md`
