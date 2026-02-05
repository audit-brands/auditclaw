# Phase 1.c: Rebranding and Configuration Plan

Last updated: 2026-02-05

## Overview

This document details the plan for rebranding OpenClaw to AuditClaw and creating audit-focused default configurations.

**Goal:** Transform the generic AI assistant into a purpose-built internal audit assistant with appropriate branding, system prompts, and default configurations.

---

## Current Status: IN PROGRESS

### Completed

(None yet)

### In Progress

- Step 1: Planning and documentation

---

## Step 1: CLI and Path Renaming

**Risk: Medium** - Widespread changes across codebase

### 1.1 Package Identity

| File             | Change                                           |
| ---------------- | ------------------------------------------------ |
| `package.json`   | `"name": "openclaw"` → `"auditclaw"`             |
| `package.json`   | Update description for audit focus               |
| `package.json`   | `"bin": { "openclaw": ... }` → `"auditclaw"`     |
| `src/version.ts` | `__OPENCLAW_VERSION__` → `__AUDITCLAW_VERSION__` |

### 1.2 Configuration Paths

| File                         | Change                                                   |
| ---------------------------- | -------------------------------------------------------- |
| `src/config/paths.ts`        | `NEW_STATE_DIRNAME = ".openclaw"` → `".auditclaw"`       |
| `src/config/paths.ts`        | `CONFIG_FILENAME = "openclaw.json"` → `"auditclaw.json"` |
| `src/infra/openclaw-root.ts` | `CORE_PACKAGE_NAMES` update                              |

**Migration Strategy:**

- Check for existing `.openclaw` directory and migrate to `.auditclaw` on first run
- Or: Keep `.auditclaw` as primary, no migration (fresh start for new product)

### 1.3 Environment Variables

Rename prefix `OPENCLAW_` → `AUDITCLAW_`:

| Old Variable                 | New Variable                        |
| ---------------------------- | ----------------------------------- |
| `OPENCLAW_STATE_DIR`         | `AUDITCLAW_STATE_DIR`               |
| `OPENCLAW_GATEWAY_TOKEN`     | `AUDITCLAW_GATEWAY_TOKEN`           |
| `OPENCLAW_SKIP_CHANNELS`     | (Remove - channels already removed) |
| `OPENCLAW_NIX_MODE`          | `AUDITCLAW_NIX_MODE`                |
| `OPENCLAW_LIVE_TEST`         | `AUDITCLAW_LIVE_TEST`               |
| `OPENCLAW_PROFILE`           | `AUDITCLAW_PROFILE`                 |
| `OPENCLAW_A2UI_SKIP_MISSING` | `AUDITCLAW_A2UI_SKIP_MISSING`       |

**Files affected:** 230+ files (grep for `OPENCLAW_`)

### 1.4 Daemon/Service Names

| File                      | Old Value                    | New Value              |
| ------------------------- | ---------------------------- | ---------------------- |
| `src/daemon/constants.ts` | `ai.openclaw.gateway`        | `ai.auditclaw.gateway` |
| `src/daemon/constants.ts` | `openclaw-gateway` (systemd) | `auditclaw-gateway`    |
| `src/daemon/constants.ts` | `OpenClaw Gateway` (Windows) | `AuditClaw Gateway`    |

---

## Step 2: Branding Updates

**Risk: Low** - Mostly string replacements

### 2.1 CLI Banner

File: `src/cli/banner.ts`

```
Before: 🦞 OpenClaw
After:  📋 AuditClaw
```

Consider new ASCII art or simplified banner for audit context.

### 2.2 UI Branding

Files in `ui/src/`:

| Location                  | Change                  |
| ------------------------- | ----------------------- |
| `ui/index.html`           | Page title              |
| `ui/src/ui/storage.ts`    | localStorage key prefix |
| `ui/src/ui/navigation.ts` | Navigation labels       |
| `ui/src/ui/views/*.ts`    | View titles and labels  |

### 2.3 Assistant Identity

File: `src/gateway/assistant-identity.ts`

| Field  | Current     | New                              |
| ------ | ----------- | -------------------------------- |
| `name` | "Assistant" | "AuditClaw" or "Audit Assistant" |

---

## Step 3: Audit-Focused Default Configuration

**Risk: Low** - New configuration values

### 3.1 Technical Specification

Create default configuration optimized for internal audit work.

**File:** `src/config/defaults.ts` (or equivalent)

```typescript
// AuditClaw default configuration
export const AUDITCLAW_DEFAULTS = {
  // Agent behavior
  agent: {
    model: "anthropic/claude-sonnet-4-20250514", // Cost-effective for routine work
    thinkingModel: "anthropic/claude-opus-4-5-20250514", // For complex analysis
    maxTokens: 8192,
    temperature: 0.3, // Lower temperature for consistency
  },

  // Workspace configuration
  workspace: {
    // Default directories for audit artifacts
    inputDir: "/workspace/input", // Client documents (read-only)
    outputDir: "/workspace/output", // Workpapers (read-write)
    skillsDir: "/workspace/skills", // Audit skills
  },

  // Document handling
  documents: {
    supportedFormats: ["pdf", "xlsx", "docx", "csv", "txt", "json"],
    maxFileSizeMB: 50,
    ocrEnabled: true,
  },

  // Session behavior
  session: {
    autoSave: true,
    autoSaveIntervalMs: 60000, // 1 minute
    contextWindowStrategy: "summarize", // Preserve context for long engagements
  },

  // Security defaults
  security: {
    allowWebSearch: true, // Research standards, regulations
    allowFileSystem: true, // Read/write workpapers
    allowNetworkLocal: false, // Block local network by default
    allowCodeExecution: false, // No arbitrary code execution
  },
};
```

### 3.2 User Perspective

**What auditors get out of the box:**

1. **Optimized for accuracy over speed** - Lower temperature for consistent, reproducible analysis
2. **Document-ready** - PDF, Excel, Word support enabled by default
3. **Workspace structure** - Clear separation of client documents (input) and workpapers (output)
4. **Auto-save** - Work preserved automatically during long sessions
5. **Security-conscious** - No local network access, no code execution by default

**Configuration file location:** `~/.auditclaw/auditclaw.json`

### 3.3 Workpaper Support

The web UI will support both:

1. **Chat mode** - Interactive conversation with the audit assistant
2. **Workpaper mode** - Structured document generation with:
   - Finding documentation
   - Control testing results
   - Risk assessments
   - Executive summaries

Technical implementation:

- Chat uses existing message stream
- Workpaper mode uses skill-based generation with templates
- Both modes share context and can reference each other

---

## Step 4: Audit-Specific System Prompt

**Risk: Low** - New prompt content

### 4.1 Technical Specification

**File:** `src/agents/audit-system-prompt.ts` (new file)

```typescript
export const AUDIT_SYSTEM_PROMPT = `You are AuditClaw, an AI assistant specialized in internal auditing.

## Your Role
You assist internal auditors with:
- Risk assessment and control identification
- Audit program development
- Workpaper documentation
- Finding documentation and report writing
- Compliance research (SOX, COSO, IIA Standards)
- Data analysis and sample selection

## Professional Standards
You follow:
- IIA International Standards for the Professional Practice of Internal Auditing
- COSO Internal Control Framework
- COBIT for IT governance
- Industry-specific regulations as applicable

## Communication Style
- Professional and objective
- Evidence-based conclusions
- Clear documentation of procedures and results
- Appropriate use of audit terminology

## Confidentiality
- All client information is confidential
- Never reference specific client names or data in examples
- Maintain professional skepticism

## Workpaper Documentation
When documenting audit work:
- State the objective
- Describe the procedure performed
- Document the evidence examined
- Record the results
- State the conclusion

## Key Principles
1. Independence and objectivity
2. Professional skepticism
3. Evidence-based conclusions
4. Clear documentation
5. Risk-based approach
`;
```

### 4.2 User Perspective

**How the system prompt shapes behavior:**

1. **Audit expertise** - Understands IIA Standards, COSO, SOX, COBIT
2. **Professional tone** - Formal, objective, evidence-based
3. **Workpaper format** - Follows standard audit documentation structure
4. **Confidentiality aware** - Won't leak client information in examples
5. **Risk-focused** - Prioritizes by risk significance

**Customization options:**

- Users can append to the system prompt via config
- Engagement-specific context can be added per session
- Industry specializations available via skills

### 4.3 Integration Points

| Component         | Integration                                      |
| ----------------- | ------------------------------------------------ |
| Gateway startup   | Load audit system prompt as default              |
| Session init      | Prepend to conversation context                  |
| Skill execution   | Skills can append context-specific prompts       |
| Persona switching | Future: QA persona gets different prompt section |

---

## Step 5: Web UI Refinements

**Risk: Low** - UI labeling and minor layout changes

### 5.1 Retained Functionality

Keep both:

- **Chat interface** - Primary interaction mode
- **Workpaper generation** - Via skills and structured output

### 5.2 UI Updates

| Area             | Change                                                             |
| ---------------- | ------------------------------------------------------------------ |
| Title/Header     | "AuditClaw" branding                                               |
| Navigation       | Audit-focused labels                                               |
| Chat placeholder | "Ask about audit procedures, regulations, or analyze documents..." |
| Settings         | Audit-relevant options prominent                                   |

### 5.3 Future Considerations (Phase 2+)

- Workpaper template browser
- Finding tracker sidebar
- Engagement dashboard
- Evidence attachment panel

---

## Step 6: User Documentation

**Risk: None** - New content

### 6.1 Documentation Structure

```
docs/auditclaw/
├── getting-started.md      # Quick start guide
├── configuration.md        # Config options explained
├── system-prompt.md        # How to customize behavior
├── skills/                 # Skill usage guides
│   ├── index.md
│   └── risk-assessment.md
├── security-model.md       # (exists)
├── container-setup.md      # (exists)
└── troubleshooting.md      # Common issues
```

### 6.2 Getting Started Guide (Outline)

1. Installation (Docker)
2. First run and API key setup
3. Basic chat interaction
4. Loading documents
5. Using audit skills
6. Generating workpapers
7. Configuration options

---

## Step 7: Release v0.1.0

**Risk: Low** - Tagging and changelog

### 7.1 Pre-release Checklist

- [ ] All rebranding complete
- [ ] Docker build succeeds
- [ ] Web UI loads correctly
- [ ] Chat functionality works
- [ ] Skills load and execute
- [ ] Documentation complete
- [ ] CHANGELOG.md updated

### 7.2 Version Bump

| File           | Change                   |
| -------------- | ------------------------ |
| `package.json` | `"version": "0.1.0"`     |
| Docker image   | Tag as `auditclaw:0.1.0` |

### 7.3 Release Notes Template

```markdown
# AuditClaw v0.1.0

First release of AuditClaw - AI-powered internal audit assistant.

## Features

- Containerized deployment with security hardening
- Audit-specific system prompt and configuration
- Document processing (PDF, Excel, Word)
- Extensible skill system for audit procedures
- Web-based chat interface

## Getting Started

See docs/auditclaw/getting-started.md
```

---

## Execution Order

1. **Step 1.1-1.2**: Package and path renaming (core identity)
2. **Step 1.3**: Environment variables (bulk replacement)
3. **Step 1.4**: Daemon names (service identity)
4. **Step 2**: Branding updates (UI/CLI)
5. **Step 3**: Default configuration (new file)
6. **Step 4**: System prompt (new file)
7. **Step 5**: UI refinements (minor changes)
8. **Step 6**: Documentation (new content)
9. **Step 7**: Release preparation

---

## Verification

After each step:

```bash
# Build and test
docker compose -f docker-compose.auditclaw.yml build
docker compose -f docker-compose.auditclaw.yml up -d
curl -I http://localhost:18789/

# Check logs
docker compose -f docker-compose.auditclaw.yml logs
```

---

## References

- Phase 1.b completion: `docs/auditclaw/phase-1b-component-removal.md`
- Vision document: `vision/AUDITCLAW_VISION.md`
- Security model: `docs/auditclaw/security-model.md`
