# AuditClaw Vision Document

**Project:** AuditClaw — A Walled OpenClaw Fork for Internal Auditors  
**Version:** 0.1 (Draft)  
**Last Updated:** 2026-02-03

---

## Executive Summary

AuditClaw is a stripped-down fork of OpenClaw designed specifically for internal auditors. It provides a local-first AI assistant for audit research and knowledge work, combined with a shared skill library curated by a trusted peer network of audit professionals.

**Core philosophy:** Simple, focused, trust-based.

We're not building a platform. We're building a personal tool that happens to share skills with colleagues—like a small team sharing Python packages via a private repo.

---

## Problem Statement

Internal auditors need AI assistance for:

- Analyzing uploaded documents (policies, process narratives, control matrices)
- Conducting risk assessments
- Drafting findings and reports
- Applying consistent methodologies across engagements

Current options are either:

1. **General-purpose AI tools** — Lack audit-specific knowledge and workflows
2. **Full OpenClaw** — Overly complex, designed for consumer automation (messaging, smart home, etc.), security concerns for enterprise data
3. **Enterprise audit software** — Expensive, rigid, slow to adopt AI capabilities

AuditClaw fills the gap: a focused, local-first AI assistant with audit-specific skills that can be shared among trusted professionals.

---

## Vision

> A personal AI research assistant for auditors, enhanced by skills shared within a trusted professional community.

**What we are:**

- A local tool that runs on your machine
- Configured for document analysis and audit workflows
- Enhanced by community-contributed skills
- Simple enough that any auditor can use it

**What we are not:**

- A platform or marketplace
- A SaaS product
- A replacement for professional judgment
- A tool that sends your data to unknown third parties

---

## Core Principles

### 1. Local-First

All data stays on your machine unless you explicitly choose otherwise. The AI assistant runs locally or connects to APIs you control. No telemetry, no data harvesting, no "improvement of services" uploads.

### 2. Audit-Focused

Strip away everything auditors don't need:

- ❌ Messaging platform integrations (WhatsApp, Telegram, Discord)
- ❌ Smart home controls
- ❌ Voice assistants and wake words
- ❌ Mobile companion apps
- ✅ Document analysis
- ✅ Research workflows
- ✅ Structured output generation
- ✅ Skill-based methodology application

### 3. Trust Through Relationships

The skill-sharing model assumes you know and trust the people you're sharing with. This is how auditors already work—professional networks, IIA chapters, peer relationships. We're not building trust infrastructure; we're leveraging trust that already exists.

### 4. Professional Standards Alignment

Skills should align with recognized frameworks:

- IIA International Standards for the Professional Practice of Internal Auditing
- COSO Internal Control and ERM Frameworks
- COBIT for IT governance
- NIST frameworks for cybersecurity
- Industry-specific standards (SOX, HIPAA, PCI-DSS, etc.)

### 5. Open Source

The tool and core skills are open source under Apache 2.0. Auditors can inspect, modify, and contribute. Transparency builds trust.

---

## Architecture Overview

### Primary Interface: Web UI

AuditClaw is accessed primarily through a **web interface** (Control UI), not messaging apps. OpenClaw includes a built-in web UI served by the Gateway at `http://localhost:18789/`. This is your main interface for:

- Chat interactions with the AI assistant
- Uploading and analyzing documents
- Managing skills and configuration
- Viewing session history

The messaging integrations (WhatsApp, Telegram, etc.) that OpenClaw is known for are **removed** in AuditClaw—the web interface is the only interaction method.

### Containerized Deployment (Required)

**AuditClaw runs inside a container** to isolate it from the host system. This is a security requirement, not an option.

Why containerization matters:

- **Limits blast radius** — If the AI executes something unexpected, damage is contained
- **Protects host files** — Container only sees explicitly mounted directories
- **Enables reproducibility** — Same environment everywhere
- **Aligns with enterprise security** — Many organizations require containerized deployments

```
┌─────────────────────────────────────────────────────────────────┐
│                        Your Machine (Host)                       │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    Docker Container                         │ │
│  │  ┌─────────────────────────────────────────────────────┐   │ │
│  │  │                    AuditClaw                         │   │ │
│  │  │  ┌───────────┐  ┌───────────┐  ┌───────────────┐   │   │ │
│  │  │  │  Gateway  │  │   Agent   │  │ Skills Engine │   │   │ │
│  │  │  │ (minimal) │  │ (Pi core) │  │               │   │   │ │
│  │  │  └─────┬─────┘  └─────┬─────┘  └───────┬───────┘   │   │ │
│  │  │        │              │                │           │   │ │
│  │  │        └──────────────┼────────────────┘           │   │ │
│  │  │                       ▼                            │   │ │
│  │  │  ┌─────────────────────────────────────────────┐   │   │ │
│  │  │  │              Web UI (Control UI)             │   │   │ │
│  │  │  │         http://localhost:18789               │   │   │ │
│  │  │  └─────────────────────────────────────────────┘   │   │ │
│  │  └─────────────────────────────────────────────────────┘   │ │
│  │                           │                                 │ │
│  │         Port 18789 exposed to localhost only               │ │
│  └────────────────────────────────────────────────────────────┘ │
│                              │                                   │
│            ┌─────────────────┴─────────────────┐                │
│            ▼                                   ▼                │
│  ┌──────────────────────┐          ┌──────────────────────┐    │
│  │   Mounted: Read-Only │          │  Mounted: Read-Write │    │
│  │   ~/audit-input/     │          │  ~/audit-output/     │    │
│  │   (docs to analyze)  │          │  (generated files)   │    │
│  └──────────────────────┘          └──────────────────────┘    │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                NOT Mounted (Protected)                    │  │
│  │   ~/.ssh, ~/.aws, ~/Documents, /etc, /var, ...           │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                               │
                               │ (git pull on host)
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│              Shared Skill Repository (GitHub)                    │
│  github.com/auditclaw/skills                                     │
│  ├── risk-assessment/                                            │
│  ├── finding-writer/                                             │
│  ├── sox-control-testing/                                        │
│  └── ... (community contributions)                               │
└─────────────────────────────────────────────────────────────────┘
```

### Container Security Model

```yaml
# docker-compose.yml security settings
services:
  auditclaw:
    image: auditclaw:latest
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    read_only: true
    user: "1000:1000" # Non-root
    ports:
      - "127.0.0.1:18789:18789" # Localhost only
    volumes:
      # Input: Read-only access to documents you want to analyze
      - ~/audit-input:/workspace/input:ro
      # Output: Write access for generated reports
      - ~/audit-output:/workspace/output:rw
      # Config: Persist settings between restarts
      - auditclaw-config:/home/auditclaw/.auditclaw:rw
      # Skills: Mount community skills (read-only)
      - ~/auditclaw-skills:/workspace/skills:ro
    environment:
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
    networks:
      - auditclaw-isolated

networks:
  auditclaw-isolated:
    driver: bridge
    internal: false # Needs outbound for API calls
```

### What the Container CAN Access

| Resource              | Access         | Purpose                                 |
| --------------------- | -------------- | --------------------------------------- |
| `~/audit-input/`      | Read-only      | Documents you want to analyze           |
| `~/audit-output/`     | Read-write     | Generated reports, findings, workpapers |
| `~/.auditclaw/`       | Read-write     | Configuration, session history          |
| `~/auditclaw-skills/` | Read-only      | Community skills                        |
| Model API (outbound)  | Network        | Anthropic/OpenAI API calls              |
| Port 18789            | Localhost only | Web UI access                           |

### What the Container CANNOT Access

| Resource                 | Why Protected                      |
| ------------------------ | ---------------------------------- |
| `~/.ssh/`                | SSH keys, server access            |
| `~/.aws/`                | Cloud credentials                  |
| `~/Documents/` (general) | Personal files outside audit scope |
| `~/.gnupg/`              | Encryption keys                    |
| Docker socket            | Prevents container escape          |
| Host network             | Isolated network namespace         |
| Other containers         | Network isolation                  |

---

## Components

### 1. AuditClaw Core (Fork of OpenClaw)

**What to keep:**

- Gateway (minimal, local-only)
- Agent core (Pi)
- Skills engine
- Document handling
- Local file system access
- Web interface (Control UI)

**What to remove:**

- All messaging channel integrations (WhatsApp, Telegram, Slack, Discord, Signal, iMessage, etc.)
- Voice wake / talk mode
- Mobile companion apps
- Canvas / A2UI (unless useful for audit visualization)
- Cron jobs and webhooks (unless needed for monitoring)
- Browser automation (evaluate—may be useful for evidence collection)

**What to retain for future use:**

- Multi-agent routing — Enables Audit Personas feature (see Phase 2+)

**What to modify:**

- Default configuration optimized for audit workflows
- Simplified onboarding focused on document analysis
- Audit-specific system prompt and personality
- Renamed CLI and paths (`auditclaw` instead of `openclaw`)

### 2. Skills Library

Skills follow the AgentSkills specification with audit-specific extensions.

**Skill structure:**

```
skill-name/
├── SKILL.md           # Required: metadata + instructions
├── scripts/           # Optional: executable code
├── references/        # Optional: detailed guidance
├── assets/            # Optional: templates
├── CONTRIBUTING.md    # Optional: skill-specific contribution guide
└── LICENSE            # Required for open source skills
```

**Skill categories (123 identified):**

- Core Audit Process (16 skills)
- Risk Assessment (9 skills)
- SOX/Financial Audit (11 skills)
- IT Audit (17 skills)
- Operational Audit (14 skills)
- Compliance Audit (10 skills)
- Fraud/Investigation (7 skills)
- Data Analytics (8 skills)
- Communication/Reporting (6 skills)
- Audit Management (6 skills)
- Specialized Domains (9 skills)
- Document Analysis (5 skills)
- Frameworks/Standards (5 skills)

### 3. Skill Distribution

**Primary method:** Git repository

```bash
# Clone the shared skills repo
git clone https://github.com/auditclaw/skills ~/.auditclaw/community-skills

# Symlink or copy skills you want to use
ln -s ~/.auditclaw/community-skills/risk-assessment ~/.auditclaw/skills/

# Update periodically
cd ~/.auditclaw/community-skills && git pull
```

**Alternative methods:**

- Direct file copy for air-gapped environments
- Zip download from GitHub releases
- Private forks for organization-specific modifications

### 4. Trust Model

**Scoped trust** is the recommended default:

- Skills declare what capabilities they need in their manifest
- User approves capabilities on first use
- No runtime capability escalation

**Capability declarations:**

```yaml
# In SKILL.md frontmatter
requires:
  - file-read # Can read files user provides
  - file-write # Can create output files
  - web-search # Can search the web (if enabled)
  - shell-execute # Can run scripts (requires explicit approval)
```

**Trust decisions:**

- Skills from `auditclaw/skills` official repo: Pre-approved (community vetted)
- Skills from known colleagues: Approve on install
- Skills from unknown sources: Review before enabling

---

## User Experience

### Installation

```bash
# Prerequisites: Docker and Docker Compose installed

# 1. Clone the AuditClaw repository
git clone https://github.com/auditclaw/auditclaw.git
cd auditclaw

# 2. Create your working directories on the host
mkdir -p ~/audit-input ~/audit-output ~/auditclaw-skills

# 3. Clone community skills (optional)
git clone https://github.com/auditclaw/skills.git ~/auditclaw-skills

# 4. Configure environment
cp .env.example .env
# Edit .env to add your API key:
#   ANTHROPIC_API_KEY=sk-ant-...

# 5. Start AuditClaw
docker compose up -d

# 6. Open the web interface
open http://localhost:18789
```

### Daily Usage

```bash
# Start AuditClaw (if not running)
cd ~/auditclaw && docker compose up -d

# Open web interface
open http://localhost:18789

# --- Workflow ---
# 1. Copy documents to analyze into ~/audit-input/
# 2. Open web UI at localhost:18789
# 3. Chat: "Please analyze the process document in input/ap-process.pdf"
# 4. Review results in the web UI
# 5. Generated outputs appear in ~/audit-output/

# Stop when done (optional—can leave running)
docker compose down
```

### Alternative: CLI Access

```bash
# Execute a one-off command
docker compose exec auditclaw auditclaw chat "List available skills"

# Interactive shell inside container (for debugging)
docker compose exec auditclaw /bin/bash
```

### Typical Workflows

**Risk Assessment:**

1. Upload process documentation
2. "Please conduct a risk assessment of this accounts payable process"
3. AuditClaw activates `risk-assessment` skill
4. Returns structured risk register with likelihood, impact, recommendations

**Finding Documentation:**

1. Describe the issue found during testing
2. "Help me write up this finding: we found 3 out of 25 invoices were approved by unauthorized personnel"
3. AuditClaw activates `finding-writer` skill
4. Returns structured finding with condition, criteria, cause, effect, recommendation

**Control Testing:**

1. Upload control documentation
2. "Design test procedures for this monthly reconciliation control"
3. AuditClaw activates `sox-control-testing` skill
4. Returns test program with sample sizes, procedures, expected evidence

---

## Configuration

### Docker Compose File

Location: `docker-compose.yml` in the AuditClaw repo

```yaml
version: "3.8"

services:
  auditclaw:
    build: .
    image: auditclaw:latest
    container_name: auditclaw
    restart: unless-stopped

    # Security hardening
    security_opt:
      - no-new-privileges:true
    cap_drop:
      - ALL
    read_only: true
    user: "1000:1000"

    # Network: localhost only, isolated
    ports:
      - "127.0.0.1:18789:18789"
    networks:
      - auditclaw-net

    # Volumes: explicit, minimal access
    volumes:
      - ${AUDIT_INPUT:-~/audit-input}:/workspace/input:ro
      - ${AUDIT_OUTPUT:-~/audit-output}:/workspace/output:rw
      - ${SKILLS_DIR:-~/auditclaw-skills}:/workspace/skills:ro
      - auditclaw-config:/home/auditclaw/.auditclaw:rw
      - auditclaw-tmp:/tmp:rw # Required for read_only

    # Environment
    environment:
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - OPENAI_API_KEY=${OPENAI_API_KEY:-}
      - AUDITCLAW_MODEL=${AUDITCLAW_MODEL:-claude-sonnet-4-20250514}

    # Health check
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:18789/health"]
      interval: 30s
      timeout: 10s
      retries: 3

volumes:
  auditclaw-config:
  auditclaw-tmp:

networks:
  auditclaw-net:
    driver: bridge
```

### Environment File

Location: `.env` in the AuditClaw repo (not committed to git)

```bash
# Required: At least one AI provider
ANTHROPIC_API_KEY=sk-ant-...

# Optional: Alternative providers
OPENAI_API_KEY=sk-...

# Optional: Model selection
AUDITCLAW_MODEL=claude-sonnet-4-20250514

# Optional: Custom paths (defaults shown)
AUDIT_INPUT=~/audit-input
AUDIT_OUTPUT=~/audit-output
SKILLS_DIR=~/auditclaw-skills
```

### Application Configuration

Location: Persisted in `auditclaw-config` Docker volume  
File: `config.json`

```json
{
  "agent": {
    "name": "AuditClaw",
    "systemPrompt": "You are AuditClaw, an AI assistant for internal auditors. You help with risk assessments, control testing, finding documentation, and audit report writing. You follow IIA Standards and align with COSO frameworks. Be precise, professional, and cite relevant standards when appropriate."
  },
  "skills": {
    "directories": ["/workspace/skills"],
    "trustLevel": "scoped"
  },
  "workspace": {
    "inputPath": "/workspace/input",
    "outputPath": "/workspace/output"
  },
  "interface": {
    "port": 18789,
    "bindAddress": "0.0.0.0"
  },
  "features": {
    "messaging": false,
    "voice": false,
    "mobile": false,
    "browser": false,
    "cron": false
  }
}
```

### Host Machine Setup

```bash
# Directory structure on host
~/
├── audit-input/           # Documents to analyze (read by container)
│   ├── engagement-001/
│   │   ├── process-narrative.pdf
│   │   └── control-matrix.xlsx
│   └── engagement-002/
│       └── ...
├── audit-output/          # Generated outputs (written by container)
│   ├── engagement-001/
│   │   ├── risk-register.md
│   │   └── findings-draft.md
│   └── ...
├── auditclaw-skills/      # Community skills repo (read by container)
│   ├── risk-assessment/
│   ├── finding-writer/
│   └── ...
└── auditclaw/             # AuditClaw repo (docker-compose.yml, .env)
    ├── docker-compose.yml
    ├── .env
    └── ...
```

---

## Development Roadmap

### Phase 1: Foundation (MVP)

**Goal:** Working containerized fork with audit-focused configuration

Phase 1 is divided into three sub-phases to enable incremental progress and testing.

#### Phase 1.a: Containerization

**Goal:** Get existing OpenClaw running in a hardened Docker container. This establishes a working baseline to test against as we remove components.

- [x] Create Dockerfile with security hardening (`Dockerfile.auditclaw`)
- [x] Create docker-compose.yml with proper isolation (`docker-compose.auditclaw.yml`)
- [x] Configure volume mounts (input read-only, output read-write)
- [x] Verify web UI functions correctly in container (2026-02-04)
- [ ] Test skill loading from mounted volume
- [x] Document container setup and usage (`docs/auditclaw/container-setup.md`)

**Deliverables:**

- `Dockerfile.auditclaw` and `docker-compose.auditclaw.yml`
- Working container running OpenClaw
- Basic setup documentation (`docs/auditclaw/container-setup.md`)

#### Phase 1.b: Component Removal

**Goal:** Strip out components not needed for audit workflows. Remove incrementally and verify web UI still works after each removal.

- [x] Remove messaging integrations (WhatsApp, Telegram, Slack, Discord, Signal, iMessage, etc.)
- [x] Remove voice/wake word components (stubbed TTS)
- [x] Remove mobile companion app code
- [x] **Retain** multi-agent routing (for Audit Personas feature in Phase 2+)
- [ ] Remove or disable Canvas/A2UI (evaluate usefulness first)
- [ ] Clean up orphaned dependencies and configuration

**Deliverables:**

- Stripped-down codebase with only web UI interaction
- Reduced dependency footprint (messaging libraries removed)
- Verified working web interface
- Multi-agent routing retained for future Audit Personas

#### Phase 1.c: Rebranding and Configuration

**Goal:** Rename to AuditClaw and configure for audit-focused workflows.

- [ ] Rename CLI and paths (`auditclaw` instead of `openclaw`)
- [ ] Update branding (name, descriptions, prompts)
- [ ] Create audit-focused default configuration
- [ ] Create audit-specific system prompt
- [ ] Simplify web UI for document-focused workflow
- [ ] Create basic user documentation
- [ ] Release v0.1.0

**Deliverables:**

- `auditclaw` CLI and renamed paths
- Working container image (`auditclaw:0.1.0`)
- Web interface accessible at `localhost:18789`
- Skill loading from `~/auditclaw-skills/`
- Documentation for setup and usage
- Example `.env` file

### Phase 2: Core Skills & Audit Personas

**Goal:** Essential skills for daily audit work + multi-persona architecture

#### Core Skills

- [ ] `risk-assessment` (✅ complete)
- [ ] `finding-writer`
- [ ] `audit-program`
- [ ] `control-identification`
- [ ] `sample-selection`
- [ ] `workpaper-documentation`
- [ ] `executive-summary-writer`
- [ ] `sox-control-testing`

#### Audit Personas Architecture

Enable different AI personas for segregation of duties in audit workflows:

**Planned Personas:**

- **Primary Auditor** — Performs initial audit work (risk assessment, testing, documentation)
- **QA & Standards Reviewer** — Evaluates primary auditor's work for quality and standards compliance
- **Domain Specialists** — Financial, IT, Compliance, Fraud specialists with domain-specific skills
- **Engagement Manager** — Oversees workflow, coordinates between personas

**Benefits:**

- **Segregation of Duties** — Different personas perform different audit phases
- **Quality Control** — QA persona reviews work before finalization
- **Skill Affinity** — Personas can have preferred skills (e.g., IT Auditor prefers COBIT skills)
- **Audit Trail** — Track which persona performed which work

**Technical Foundation:**

- Leverage existing `src/routing/` for persona routing
- Agent configurations define persona system prompts and skill preferences
- Session management tracks persona-to-work mapping

**Deliverables:**

- 8 production-quality skills
- Skill development guide
- Example skill template
- Audit Personas configuration guide
- Multi-persona workflow documentation

### Phase 3: Community Infrastructure

**Goal:** Enable skill sharing

- [ ] Public skills repository (`auditclaw/skills`)
- [ ] Contribution guidelines
- [ ] Skill validation tooling
- [ ] Community documentation
- [ ] Issue/PR templates

**Deliverables:**

- GitHub organization setup
- Contributing guide
- CI/CD for skill validation
- Community code of conduct

### Phase 4: Polish and Expand

**Goal:** Production-ready tool with comprehensive skills

- [ ] Additional skills based on community needs
- [ ] Improved error handling and UX
- [ ] Performance optimization
- [ ] Security hardening review
- [ ] Comprehensive documentation
- [ ] Video tutorials / onboarding

**Deliverables:**

- v1.0.0 release
- 20+ skills
- Full documentation site
- Community growth

---

## Technical Decisions

### Decision 1: Fork Source

**Decision:** Forked from OpenClaw main branch on 2026-02-03.

**Details:**

- Fork created from `openclaw/openclaw` main branch
- Base commit: `f52ca0a71` (2026-02-03)
- OpenClaw version at fork: v2026.2.2

**Rationale:**

- Main branch provided the most current feature set
- Stable enough for our starting point
- Can selectively pull improvements from upstream as needed

### Decision 2: Model Support

**Decision:** Support multiple providers, recommend Claude.

**Options:**

- Anthropic Claude (recommended for reasoning quality)
- OpenAI GPT-4
- Local models via Ollama (privacy-focused)

**Rationale:**

- Different users have different constraints (cost, privacy, enterprise agreements)
- Claude performs best on complex reasoning tasks
- Local models enable air-gapped deployments

### Decision 3: Trust Model

**Decision:** Scoped trust with capability declarations.

**Rationale:**

- Full trust is too permissive for professional use
- Sandboxed execution adds complexity we don't need
- Scoped trust catches mistakes without impeding workflow
- Aligns with principle of least privilege

### Decision 4: Skill Format

**Decision:** Follow AgentSkills specification with audit extensions.

**Rationale:**

- Industry standard, supported by multiple tools
- Ensures portability if users want skills elsewhere
- Well-documented specification
- Extensions are additive, not breaking

### Decision 5: Distribution

**Decision:** npm package + GitHub for skills.

**Rationale:**

- npm is familiar to developers, simple to install
- GitHub provides version control, issues, PRs for skills
- No infrastructure to maintain
- Works in enterprise environments

---

## Security Considerations

### Container Isolation (Primary Defense)

AuditClaw runs inside a hardened Docker container. This is the primary security boundary.

**Container hardening measures:**

- `no-new-privileges` — Prevents privilege escalation
- `cap_drop: ALL` — Removes all Linux capabilities
- `read_only: true` — Filesystem is read-only (except explicit mounts)
- `user: 1000:1000` — Runs as non-root user
- No Docker socket mount — Prevents container escape
- Isolated network — Cannot reach other containers or host services

**What this protects against:**

- Prompt injection leading to system commands
- Skills attempting to access unauthorized files
- Accidental data leakage to unintended locations
- AI "hallucinating" destructive commands

### Data Handling

- **Input documents** are mounted read-only—the AI cannot modify your source files
- **Output directory** is the only writable location—easy to audit what was generated
- **API calls** send only the content in the current conversation context
- **No persistent memory by default**—each session starts fresh (opt-in for continuity)
- **Session history** stays in the container volume—delete the volume to clear all history

### Network Security

```
┌─────────────────────────────────────────────┐
│              Host Machine                    │
│                                             │
│   Browser ◄────► localhost:18789            │
│                       │                     │
│              ┌────────┴────────┐            │
│              │   Container     │            │
│              │                 │            │
│              │  auditclaw ─────┼───► api.anthropic.com
│              │                 │            │
│              └─────────────────┘            │
│                                             │
│   ✗ No inbound from internet               │
│   ✗ No access to other containers          │
│   ✗ No access to host services             │
│   ✓ Outbound to AI API only                │
└─────────────────────────────────────────────┘
```

- **Web interface binds to localhost only** (`127.0.0.1:18789`)
- **No inbound connections from internet** required
- **Outbound only to AI provider APIs** (Anthropic, OpenAI)
- **Can run air-gapped** with local models via Ollama (requires additional setup)

### Skill Security

- Skills are treated as **untrusted code** until reviewed
- Official skills in `auditclaw/skills` are community-reviewed
- **Capability declarations** limit what skills can request
- **Shell execution disabled by default**—skills cannot run arbitrary commands
- Review any skill before adding to your `~/auditclaw-skills/` directory

### Credential Protection

| Credential      | Location          | Protection                                                |
| --------------- | ----------------- | --------------------------------------------------------- |
| API keys        | Host `.env` file  | Never copied into container filesystem; passed as env var |
| Session data    | Container volume  | Isolated from host; delete volume to clear                |
| Audit documents | `~/audit-input/`  | Read-only mount; container cannot modify                  |
| Output files    | `~/audit-output/` | Only writable location; easy to audit                     |

### Enterprise Deployment Considerations

- **Compatible with enterprise API agreements** — Bring your own Anthropic/OpenAI key
- **Runs behind corporate firewalls** — Only needs outbound HTTPS to API provider
- **Audit logging available** — Container logs capture all interactions
- **No data exfiltration risk** — Container cannot access host filesystem except explicit mounts
- **Reproducible environment** — Same container image everywhere
- **Easy to revoke** — Delete container and volumes to remove all traces

### What AuditClaw Does NOT Protect Against

- **Malicious skills you explicitly install** — Review skills before enabling
- **AI model limitations** — Results require professional judgment
- **Prompt injection in documents** — Malicious PDFs could influence AI behavior
- **API provider data handling** — Your prompts are sent to Anthropic/OpenAI per their terms
- **Compromised host machine** — Container isolation assumes trusted host

---

## Success Metrics

### Adoption

- GitHub stars on main repository
- npm downloads per month
- Number of contributors
- Number of community-contributed skills

### Quality

- Issue resolution time
- User-reported bugs per release
- Skill test coverage
- Documentation completeness

### Community

- Active contributors (PRs per month)
- Skill submissions
- Community discussions
- IIA chapter presentations / word of mouth

---

## Configurable Features

The following features are user-configurable based on individual needs and risk tolerance. Each has trade-offs documented in `docs/CONFIGURATION_GUIDE.md`.

### Memory / Persistence (Default: ON)

**AuditClaw persists memory across sessions as a core feature.** This enables:

- Continuity across audit engagements
- Learning your organization's terminology and preferences
- Building knowledge about recurring processes and controls
- Referencing prior risk assessments and findings

**Configuration:**

```json
{
  "memory": {
    "enabled": true,
    "retention": "unlimited", // or "30d", "90d", "engagement"
    "location": "/workspace/memory"
  }
}
```

**Hard shutdown:** Users can always stop the Docker container (`docker compose down`) for a complete shutdown. To clear all memory, remove the config volume: `docker volume rm auditclaw_auditclaw-config`.

### Browser Automation (Default: OFF)

Browser automation allows the agent to control a headless browser for evidence collection, screenshot capture, and web application testing.

**Trade-offs documented in** `docs/CONFIGURATION_GUIDE.md#browser-automation`

**Configuration:**

```json
{
  "features": {
    "browser": false // Set to true to enable
  }
}
```

### Multi-User Mode (Default: OFF — Future Feature)

Multi-user mode enables team collaboration features including shared workspaces, finding collaboration, and team-based access controls.

**Status:** Planned for future release. Requires additional security considerations:

- User authentication and authorization
- Session isolation between users
- Audit trail of who did what
- Role-based access to engagements
- Credential isolation per user

**Trade-offs documented in** `docs/CONFIGURATION_GUIDE.md#multi-user-mode`

**Configuration (future):**

```json
{
  "multiUser": {
    "enabled": false, // Future feature
    "authProvider": "local", // or "oidc", "saml"
    "sessionIsolation": true
  }
}
```

### Shell Execution (Default: OFF)

Allows skills to execute shell commands for advanced automation (data extraction scripts, file processing, etc.).

**Trade-offs documented in** `docs/CONFIGURATION_GUIDE.md#shell-execution`

**Configuration:**

```json
{
  "features": {
    "shellExecution": false // Set to true to enable (requires review)
  }
}
```

### Cron / Scheduled Tasks (Default: OFF)

Enables scheduled task execution for automated monitoring, recurring reports, or periodic checks.

**Trade-offs documented in** `docs/CONFIGURATION_GUIDE.md#scheduled-tasks`

**Configuration:**

```json
{
  "features": {
    "cron": false // Set to true to enable
  }
}
```

---

## Supporting Documentation

### docs/CONFIGURATION_GUIDE.md

A separate document providing detailed guidance on each configurable feature, including:

1. **What it does** — Detailed explanation of the feature
2. **Use cases** — When you might want to enable it
3. **Security implications** — What risks are introduced
4. **Recommended settings** — Guidance for different scenarios:
   - Personal use (single auditor)
   - Small team (trusted colleagues)
   - Enterprise deployment (security-first)
5. **How to enable/disable** — Step-by-step configuration
6. **Troubleshooting** — Common issues and solutions

This approach lets users make informed decisions based on their specific context rather than imposing one-size-fits-all defaults.

---

## Appendices

### Appendix A: Removed OpenClaw Components

| Component                   | Reason for Removal                   |
| --------------------------- | ------------------------------------ |
| WhatsApp integration        | Not needed for audit workflows       |
| Telegram integration        | Not needed for audit workflows       |
| Slack integration           | Not needed for audit workflows       |
| Discord integration         | Not needed for audit workflows       |
| Signal integration          | Not needed for audit workflows       |
| iMessage integration        | Not needed for audit workflows       |
| Google Chat integration     | Not needed for audit workflows       |
| Microsoft Teams integration | Not needed for audit workflows       |
| Matrix integration          | Not needed for audit workflows       |
| Voice wake                  | Not needed; privacy concerns         |
| Talk mode                   | Not needed for audit workflows       |
| iOS app                     | Out of scope                         |
| Android app                 | Out of scope                         |
| macOS menu bar app          | Evaluate; may keep                   |
| Canvas / A2UI               | Evaluate; may keep for visualization |

### Appendix A.1: Retained Components (Repurposed)

| Component                               | New Purpose                                              |
| --------------------------------------- | -------------------------------------------------------- |
| Multi-agent routing (`src/routing/`)    | Audit Personas — enables segregation of duties workflows |
| Pairing infrastructure (`src/pairing/`) | Supports persona configuration and routing               |
| Cron jobs                               | Keep minimal for reminders                               |
| Webhooks                                | Remove unless specific use case                          |

### Appendix B: Skills Priority List

See `auditclaw-skills-brainstorm.md` for complete list of 123 identified skills with prioritization.

### Appendix C: Related Documents

| Document                         | Description                                             |
| -------------------------------- | ------------------------------------------------------- |
| `docs/CONFIGURATION_GUIDE.md`    | Detailed guide to configurable features with trade-offs |
| `auditclaw-skill-spec.md`        | Skill format specification                              |
| `auditclaw-skills-brainstorm.md` | Complete skills catalog (123 skills)                    |
| `risk-assessment/`               | First complete skill implementation                     |

---

## Contributing to This Document

This is a living document. To suggest changes:

1. Open an issue describing the proposed change
2. Discuss with maintainers
3. Submit a pull request

---

## License

This document is licensed under Apache 2.0, consistent with the AuditClaw project.

---

_Document maintained by the AuditClaw community._
