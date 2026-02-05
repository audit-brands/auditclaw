# Phase 1.b: Component Removal Plan

Last updated: 2026-02-05

## Overview

This document details the plan for removing unnecessary components from OpenClaw to create AuditClaw - a focused, audit-specific AI assistant.

**Goal:** Strip out messaging integrations, mobile apps, voice components, and multi-agent routing while preserving the core gateway, web UI, and agent functionality.

---

## Current Status: COMPLETE ✅

### Completed

- ✅ Step 1: Removed extension channels (19 extensions, 418 files)
- ✅ Step 2: Removed mobile apps (545 files)
- ✅ Step 3: Core messaging channels removal - COMPLETE
  - Removed original src/telegram, src/discord, src/slack, src/signal, src/imessage, src/whatsapp, src/web, src/line directories
  - Created stub implementations for 60+ modules with all required exports
  - All imports in plugins/runtime/index.ts are now stubbed
  - Docker build compiles successfully
  - Gateway starts cleanly without messaging channel errors
  - Container healthcheck passes

- ✅ Step 4: Voice/TTS Components - COMPLETE
  - Stubbed src/tts/tts.ts with disabled implementations
  - Kept src/media/ for document processing (PDFs, images)
  - All TTS functions return "off" or disabled state
- ⏭️ Step 5: Multi-Agent Routing - SKIPPED (Retained for Future Use)
  - **Decision**: Keep src/routing/ and src/pairing/ for audit persona support
  - **Rationale**: Multi-agent routing enables segregation of duties in audit workflows
  - **Future use cases**:
    - Primary Auditor persona - performs initial audit work
    - QA & Standards persona - reviews and evaluates primary auditor's work
    - Domain specialists (Financial, IT, Compliance, etc.)
    - Skills can be associated with specific personas
  - See: Phase 2+ roadmap for Audit Personas feature

- ✅ Step 6: Clean Up Dependencies - COMPLETE
  - Removed messaging dependencies from package.json:
    - `@grammyjs/runner`, `@grammyjs/transformer-throttler` (Telegram)
    - `grammy`, `@grammyjs/types` (Telegram)
    - `@slack/bolt`, `@slack/web-api` (Slack)
    - `@whiskeysockets/baileys` (WhatsApp)
    - `@line/bot-sdk` (LINE)
    - `discord-api-types` (Discord)
    - `node-edge-tts` (TTS)
  - Updated pnpm-lock.yaml
  - Gateway builds and runs successfully

- ✅ Step 7: Remove Documentation - COMPLETE
  - Removed docs/channels/ directory (22 files)
  - Removed docs/zh-CN/channels/ directory (22 files - Chinese translations)
  - Updated docs/docs.json to remove Channels tab from navigation

### Next Phase

Phase 1.b is complete. Proceed to **Phase 1.c: Rebranding and Configuration**.

---

## Scope Summary

| Category                | Files      | LOC       | Risk Level |
| ----------------------- | ---------- | --------- | ---------- |
| Extension Channels      | 374        | 66.8K     | Low        |
| Mobile Apps             | 443+       | 64K       | Low        |
| Core Messaging Channels | 256        | 47.8K     | Medium     |
| Voice/TTS               | ~40        | 9K        | Low        |
| Canvas/A2UI             | 4+         | 1K        | Low        |
| Integration Points      | ~50        | varies    | High       |
| **Total**               | **1,200+** | **140K+** |            |

---

## Removal Strategy

We'll use an **incremental approach** with verification after each step:

1. Remove self-contained components first (extensions, apps)
2. Then remove integrated components (core channels)
3. Clean up dependencies last
4. Verify web UI works after each major change

---

## Step 1: Remove Extension Channels

**Risk: Low** - These are plugins that can be removed without core code changes.

### Directories to Remove

```
extensions/bluebubbles/     # 23 files, 11.2K LOC - iMessage relay
extensions/matrix/          # 67 files, 7.2K LOC - Decentralized chat
extensions/voice-call/      # 41 files, 8.9K LOC - Voice/call
extensions/msteams/         # 58 files, 9.2K LOC - Microsoft Teams
extensions/twitch/          # 31 files, 5.9K LOC - Twitch chat
extensions/nostr/           # 23 files, 6.4K LOC - Decentralized social
extensions/googlechat/      # 15 files, 2.8K LOC - Google Chat
extensions/mattermost/      # 17 files, 2.6K LOC - Open-source chat
extensions/nextcloud-talk/  # 15 files, 2.5K LOC - Nextcloud
extensions/zalo/            # 17 files, 2.4K LOC - Zalo messaging
extensions/zalouser/        # 15 files, 2.8K LOC - Zalo variant
extensions/line/            # 6 files, 1.6K LOC - LINE messaging
extensions/tlon/            # ~5 files, ~1K LOC - Tlon/Urbit
extensions/discord/         # 3 files, 0.5K LOC - Discord extension
extensions/slack/           # 3 files, 0.6K LOC - Slack extension
extensions/telegram/        # 3 files, 0.5K LOC - Telegram extension
extensions/whatsapp/        # 3 files, 0.5K LOC - WhatsApp extension
extensions/signal/          # 3 files, 0.3K LOC - Signal extension
extensions/imessage/        # 3 files, 0.3K LOC - iMessage extension
```

### Files to Modify

- `pnpm-workspace.yaml` - Remove extension workspace entries
- `.github/labeler.yml` - Remove extension labels (optional, low priority)

### Verification

```bash
# After removal:
docker compose -f docker-compose.auditclaw.yml down
docker compose -f docker-compose.auditclaw.yml build
docker compose -f docker-compose.auditclaw.yml up -d
curl -I http://localhost:18789/  # Should return 200
```

---

## Step 2: Remove Mobile Apps

**Risk: Low** - Self-contained app directories with no core dependencies.

### Directories to Remove

```
apps/ios/      # 73 files, 6K LOC - iOS companion
apps/android/  # 92 files, 10.9K LOC - Android companion
apps/macos/    # 204+ files, 47.2K LOC - macOS app
apps/shared/   # 74 files - Shared OpenClawKit
```

### Files to Modify

- `pnpm-workspace.yaml` - Remove apps workspace entries (if any)
- Root `package.json` - Remove any app-related scripts
- `.github/` - Remove app-related CI workflows (optional)

### Verification

Same as Step 1 - verify web UI still works.

---

## Step 3: Remove Core Messaging Channels

**Risk: Medium** - These are integrated into the gateway and require careful removal.

### Directories to Remove

```
src/telegram/   # 85 files, 19.1K LOC
src/discord/    # 64 files, 12.8K LOC
src/slack/      # 65 files, 9.4K LOC
src/signal/     # 24 files, 3.8K LOC
src/imessage/   # 16 files, 2.5K LOC
src/whatsapp/   # 2 files, 0.2K LOC (minimal - uses web)
src/web/        # WhatsApp web integration (if separate)
```

### Integration Points to Modify

These files reference channels and must be updated:

1. **Channel Registry** - `/src/channels/registry.ts`
   - Remove `CHAT_CHANNEL_ORDER` array entries
   - Remove channel metadata objects

2. **Channel Dock** - `/src/channels/dock.ts`
   - Remove channel initialization logic

3. **Channel Plugins** - `/src/channels/plugins/`
   - `catalog.ts` - Remove channel catalog
   - `index.ts` - Remove plugin registry entries

4. **Gateway Server** - `/src/gateway/server.ts`
   - Remove channel startup/shutdown logic

5. **Gateway CLI** - `/src/cli/gateway-cli/run.ts`
   - Remove channel loading

6. **Channels CLI** - `/src/cli/channels-cli.ts` and `/src/commands/channels.ts`
   - Remove or stub the `openclaw channels` command

7. **Web UI Controllers** - `/ui/src/ui/controllers/channels.ts`
   - Remove channel-related API calls

8. **Web UI Views** - `/ui/src/ui/views/channels*.ts`
   - Remove channel configuration views

9. **Onboarding** - `/src/commands/onboarding/`
   - Remove channel selection from setup flow

### Verification

```bash
# Full rebuild required:
docker compose -f docker-compose.auditclaw.yml down -v
docker compose -f docker-compose.auditclaw.yml build --no-cache
docker compose -f docker-compose.auditclaw.yml up -d
# Check logs for errors:
docker compose -f docker-compose.auditclaw.yml logs
# Verify web UI:
curl -I http://localhost:18789/
```

---

## Step 4: Remove Voice/TTS Components

**Risk: Low** - Isolated components.

### Directories to Remove

```
src/tts/           # Text-to-speech
src/media/         # Media processing (evaluate - may be needed for documents)
```

### Files to Modify

- Gateway server if TTS is initialized there
- Any agent code that references TTS

### Note

Keep `/src/media/` if it's used for document processing (PDFs, images). Need to evaluate.

---

## Step 5: Remove Multi-Agent Routing

**Risk: Medium** - Simplifies architecture to single-agent.

### Directories to Remove/Simplify

```
src/routing/    # Multi-agent routing logic
src/pairing/    # Multi-agent pairing protocol
```

### Files to Modify

- Gateway server - Remove routing initialization
- Session management - Simplify to single agent

---

## Step 6: Clean Up Dependencies

**Risk: Low** - After all code removal.

### Dependencies to Remove from package.json

```json
// Messaging libraries
"@whiskeysockets/baileys"    // WhatsApp
"grammy"                     // Telegram
"@grammyjs/*"               // Telegram plugins
"@slack/bolt"               // Slack
"@slack/web-api"            // Slack
"discord-api-types"         // Discord
"@line/bot-sdk"             // LINE
"signal-utils"              // Signal

// Voice
"node-edge-tts"             // TTS
```

### Verification

```bash
pnpm install
pnpm build
pnpm test  # Run remaining tests
```

---

## Step 7: Remove Documentation

**Risk: None** - Cleanup only.

### Directories to Remove

```
docs/channels/     # All channel documentation (21 files)
docs/platforms/    # Platform-specific docs (evaluate)
```

### Files to Update

- `docs/mint.json` or navigation config - Remove channel references
- README.md - Update to reflect AuditClaw focus

---

## Rollback Strategy

Each step should be a separate commit (or set of commits) to enable easy rollback:

```bash
# If something breaks:
git log --oneline -10  # Find the commit before the problem
git revert <commit>    # Revert specific changes
# Or:
git reset --hard <commit>  # Hard reset (loses uncommitted work)
```

---

## Success Criteria

After Phase 1.b completion:

- [x] Web UI loads at http://localhost:18789/
- [x] Gateway starts without channel-related errors
- [x] Chat functionality works (with API key configured)
- [x] Skills load from `/workspace/skills`
- [x] No messaging library dependencies in package.json
- [x] Docker image builds successfully
- [x] Container runs with only audit-related components

---

## Completion Summary

| Step                  | Status   | Notes                                       |
| --------------------- | -------- | ------------------------------------------- |
| Step 1: Extensions    | Complete | 19 extensions, 418 files removed            |
| Step 2: Mobile Apps   | Complete | 545 files removed                           |
| Step 3: Core Channels | Complete | 60+ stubs created for type compatibility    |
| Step 4: Voice/TTS     | Complete | Stubbed with disabled implementations       |
| Step 5: Multi-Agent   | Skipped  | Retained for Audit Personas (Phase 2+)      |
| Step 6: Dependencies  | Complete | 9 messaging packages removed                |
| Step 7: Documentation | Complete | 44 channel docs removed, navigation updated |

---

## Next Phase

Proceed to **Phase 1.c: Rebranding and Configuration** - Update branding from OpenClaw to AuditClaw

---

## References

- Phase 1.a completion: Containerization complete
- Vision document: `vision/AUDITCLAW_VISION.md`
- Security model: `docs/auditclaw/security-model.md`
