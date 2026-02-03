# AuditClaw Configuration Guide

This guide provides detailed information about AuditClaw's configurable features, including trade-offs, security implications, and recommendations for different deployment scenarios.

---

## Table of Contents

1. [Memory / Persistence](#memory--persistence)
2. [Browser Automation](#browser-automation)
3. [Multi-User Mode](#multi-user-mode)
4. [Shell Execution](#shell-execution)
5. [Scheduled Tasks (Cron)](#scheduled-tasks-cron)
6. [Deployment Scenarios](#deployment-scenarios)

---

## Memory / Persistence

### What It Does

Memory persistence allows AuditClaw to retain context, preferences, and knowledge across sessions. When enabled, the assistant remembers:

- Previous conversations and their context
- Your organization's terminology and naming conventions
- Recurring processes and control structures
- Prior risk assessments and findings
- User preferences for output format and style

### Default Setting

**Enabled** — Memory is a core feature of AuditClaw.

### Use Cases

| Scenario | Benefit |
|----------|---------|
| Multi-year audit engagements | Reference prior year findings and track remediation |
| Recurring audits | Apply lessons learned from previous cycles |
| Complex processes | Build understanding incrementally across sessions |
| Personal preferences | Remember your preferred report formats and writing style |
| Organizational context | Learn company-specific terminology, systems, control naming |

### Security Implications

| Risk | Mitigation |
|------|------------|
| Sensitive data in memory | Memory stored in isolated Docker volume; delete volume to clear |
| Stale information | Configurable retention periods; manual clearing supported |
| Memory accessed by wrong user | Single-user mode by default; multi-user adds isolation |
| Memory survives container restart | Intentional behavior; use `docker compose down -v` to clear volumes |

### Configuration Options

```json
{
  "memory": {
    "enabled": true,
    "retention": "unlimited",
    "location": "/workspace/memory",
    "includeInContext": true,
    "maxContextTokens": 4000
  }
}
```

| Option | Values | Description |
|--------|--------|-------------|
| `enabled` | `true` / `false` | Enable or disable memory entirely |
| `retention` | `"unlimited"`, `"30d"`, `"90d"`, `"engagement"` | How long to retain memories |
| `location` | Path | Where memory is stored (inside container) |
| `includeInContext` | `true` / `false` | Whether to include relevant memories in prompts |
| `maxContextTokens` | Integer | Maximum tokens of memory to include per request |

### How to Clear Memory

```bash
# Clear all memory (nuclear option)
docker compose down -v

# Clear memory but keep config
docker compose exec auditclaw rm -rf /workspace/memory/*

# Start fresh session without clearing stored memory
# (memory exists but isn't loaded)
docker compose restart
```

### Recommendations by Scenario

| Scenario | Recommended Setting |
|----------|---------------------|
| Personal use | `enabled: true`, `retention: "unlimited"` |
| Shared workstation | `enabled: true`, `retention: "engagement"` |
| Sensitive environment | `enabled: true`, `retention: "30d"` |
| Maximum privacy | `enabled: false` |

---

## Browser Automation

### What It Does

Browser automation gives AuditClaw the ability to control a headless Chromium browser. This enables:

- Capturing screenshots of web applications as evidence
- Extracting data from web-based systems
- Automated testing of web application controls
- Navigating authenticated systems (with stored credentials)

### Default Setting

**Disabled** — Must be explicitly enabled.

### Arguments For Enabling

| Benefit | Example Use Case |
|---------|------------------|
| Evidence collection | Screenshot SOX control execution in web apps |
| Data extraction | Pull reports from systems without API access |
| Control testing | Verify access controls by attempting unauthorized actions |
| Documentation | Capture current state of web-based processes |

### Arguments Against Enabling

| Risk | Description |
|------|-------------|
| Expanded attack surface | Browser can access any URL; prompt injection could redirect |
| Credential exposure | Stored login credentials could be extracted |
| Complexity | Browser automation adds significant complexity |
| Resource usage | Headless browser consumes memory and CPU |
| Scope creep | May encourage using AuditClaw for tasks outside audit workflow |

### Security Implications

| Risk | Mitigation |
|------|------------|
| Malicious URL access | Whitelist allowed domains in configuration |
| Credential theft | Store credentials outside container; use session cookies only |
| Data exfiltration | Browser runs inside container; monitor outbound connections |
| XSS/injection in visited pages | Container isolation limits impact |

### Configuration Options

```json
{
  "features": {
    "browser": false
  },
  "browser": {
    "headless": true,
    "allowedDomains": [],
    "blockDomains": ["*.evil.com"],
    "timeout": 30000,
    "userDataDir": "/workspace/browser-data"
  }
}
```

| Option | Values | Description |
|--------|--------|-------------|
| `browser` (in features) | `true` / `false` | Enable or disable browser automation |
| `headless` | `true` / `false` | Run browser without visible window |
| `allowedDomains` | Array | If set, only these domains can be accessed |
| `blockDomains` | Array | Domains to block (supports wildcards) |
| `timeout` | Integer (ms) | Navigation timeout |

### Recommendations by Scenario

| Scenario | Recommended Setting |
|----------|---------------------|
| Document analysis only | `browser: false` |
| Web app evidence collection | `browser: true`, `allowedDomains: ["internal.company.com"]` |
| Full automation | `browser: true` with careful domain restrictions |

---

## Multi-User Mode

### What It Does

Multi-user mode enables team collaboration features:

- Multiple users accessing the same AuditClaw instance
- Shared workspaces for audit engagements
- User-specific sessions and preferences
- Role-based access controls
- Audit trail of user actions

### Default Setting

**Disabled** — AuditClaw runs in single-user mode.

### Current Status

**Planned for future release.** Single-user mode is the focus for v1.0.

### Arguments For Enabling (Future)

| Benefit | Description |
|---------|-------------|
| Team collaboration | Multiple auditors working on same engagement |
| Knowledge sharing | Team members benefit from shared context |
| Centralized deployment | One instance serves entire audit team |
| Consistent configuration | Skills and settings managed centrally |

### Arguments Against / Challenges

| Challenge | Description |
|-----------|-------------|
| Authentication complexity | Requires identity provider integration |
| Session isolation | Must prevent users from seeing each other's data |
| Authorization model | Who can access what engagements? |
| Infrastructure requirements | May need persistent server, not just local container |
| Credential management | Per-user API keys or shared organizational key? |

### Security Considerations for Multi-User Mode

When implemented, multi-user mode will require:

1. **Authentication**
   - Local user database, or
   - OIDC/SAML integration with corporate identity provider

2. **Session Isolation**
   - Separate memory spaces per user
   - Engagement-level access controls
   - No cross-user data leakage

3. **Audit Trail**
   - Log all user actions with user identity
   - Track who created/modified findings
   - Immutable audit log

4. **Role-Based Access**
   - Viewer: Read-only access to findings
   - Auditor: Create and modify own work
   - Manager: Review and approve findings
   - Admin: Manage users and configuration

### Configuration Options (Future)

```json
{
  "multiUser": {
    "enabled": false,
    "authProvider": "local",
    "sessionIsolation": true,
    "auditLogging": true,
    "roles": {
      "default": "auditor"
    }
  }
}
```

### Recommendations

| Scenario | Recommended Setting |
|----------|---------------------|
| Single auditor | `multiUser.enabled: false` |
| Small trusted team | Wait for multi-user mode; use separate instances for now |
| Enterprise deployment | Wait for multi-user mode with OIDC integration |

---

## Shell Execution

### What It Does

Shell execution allows skills to run shell commands inside the container. This enables:

- Running Python scripts for data analysis
- Executing file processing utilities
- Running custom extraction tools
- Automating repetitive command-line tasks

### Default Setting

**Disabled** — Must be explicitly enabled.

### Arguments For Enabling

| Benefit | Example Use Case |
|---------|------------------|
| Data analytics | Run Python scripts for Benford analysis, duplicate detection |
| File processing | Convert file formats, extract text from PDFs |
| Custom tools | Run organization-specific audit scripts |
| Automation | Batch process multiple documents |

### Arguments Against Enabling

| Risk | Description |
|------|-------------|
| Command injection | Malicious prompts could execute harmful commands |
| Container escape | Misconfigured containers could allow breakout |
| Resource exhaustion | Runaway scripts could consume CPU/memory |
| Unpredictable behavior | Shell commands have side effects |

### Security Implications

| Risk | Mitigation |
|------|------------|
| Arbitrary code execution | Container isolation limits blast radius |
| File system damage | Read-only container filesystem; only `/workspace/output` writable |
| Network abuse | Container network isolation; API egress only |
| Credential access | No host credentials mounted in container |

### Configuration Options

```json
{
  "features": {
    "shellExecution": false
  },
  "shell": {
    "allowedCommands": [],
    "blockedCommands": ["rm -rf", "curl", "wget"],
    "timeout": 60,
    "maxOutputSize": 1048576
  }
}
```

| Option | Values | Description |
|--------|--------|-------------|
| `shellExecution` | `true` / `false` | Enable or disable shell execution |
| `allowedCommands` | Array | If set, only these commands can run |
| `blockedCommands` | Array | Commands to block (pattern matching) |
| `timeout` | Integer (seconds) | Maximum execution time |
| `maxOutputSize` | Integer (bytes) | Maximum output captured |

### Recommendations by Scenario

| Scenario | Recommended Setting |
|----------|---------------------|
| Document analysis only | `shellExecution: false` |
| With trusted skills only | `shellExecution: true`, review all skills |
| With custom scripts | `shellExecution: true`, `allowedCommands` whitelist |
| Maximum security | `shellExecution: false` |

---

## Scheduled Tasks (Cron)

### What It Does

Scheduled tasks allow AuditClaw to run automated jobs on a schedule:

- Generate recurring reports
- Monitor for specific conditions
- Send reminders for upcoming deadlines
- Refresh data from external sources

### Default Setting

**Disabled** — Must be explicitly enabled.

### Arguments For Enabling

| Benefit | Example Use Case |
|---------|------------------|
| Recurring reports | Weekly status summary of open findings |
| Monitoring | Daily check for control exceptions |
| Reminders | Upcoming audit deadlines and milestones |
| Data refresh | Periodic sync with external data sources |

### Arguments Against Enabling

| Risk | Description |
|------|-------------|
| Unexpected costs | Scheduled tasks consume API tokens continuously |
| Resource usage | Container must stay running |
| Complexity | Debugging scheduled tasks is harder |
| Scope creep | Moves AuditClaw toward always-on server |

### Security Implications

| Risk | Mitigation |
|------|------------|
| Runaway costs | Set rate limits and budget alerts with API provider |
| Unattended execution | Review scheduled tasks; require explicit approval |
| Stale credentials | Ensure API keys remain valid |

### Configuration Options

```json
{
  "features": {
    "cron": false
  },
  "cron": {
    "enabled": false,
    "maxJobs": 10,
    "minInterval": 3600,
    "jobs": []
  }
}
```

| Option | Values | Description |
|--------|--------|-------------|
| `cron` (in features) | `true` / `false` | Enable or disable cron |
| `maxJobs` | Integer | Maximum concurrent scheduled jobs |
| `minInterval` | Integer (seconds) | Minimum time between job runs |
| `jobs` | Array | Defined scheduled jobs |

### Recommendations by Scenario

| Scenario | Recommended Setting |
|----------|---------------------|
| On-demand use only | `cron: false` |
| Recurring reports needed | `cron: true`, carefully defined jobs |
| Cost-conscious | `cron: false` or `minInterval: 86400` (daily max) |

---

## Deployment Scenarios

### Scenario 1: Personal Use (Single Auditor)

**Profile:** Individual auditor using AuditClaw on their own machine.

**Recommended Configuration:**
```json
{
  "memory": { "enabled": true, "retention": "unlimited" },
  "features": {
    "browser": false,
    "shellExecution": false,
    "cron": false
  },
  "multiUser": { "enabled": false }
}
```

**Rationale:** Maximum convenience with reasonable defaults. Memory enabled for continuity. Advanced features disabled to reduce complexity.

---

### Scenario 2: Small Team (Trusted Colleagues)

**Profile:** 3-5 auditors sharing skills but running separate instances.

**Recommended Configuration:**
```json
{
  "memory": { "enabled": true, "retention": "90d" },
  "features": {
    "browser": false,
    "shellExecution": true,
    "cron": false
  },
  "multiUser": { "enabled": false }
}
```

**Rationale:** Each auditor runs their own container. Skills shared via git. Shell execution enabled for custom scripts (team reviews all skills). 90-day retention balances utility and hygiene.

---

### Scenario 3: Enterprise Deployment (Security-First)

**Profile:** Large audit department with strict security requirements.

**Recommended Configuration:**
```json
{
  "memory": { "enabled": true, "retention": "engagement" },
  "features": {
    "browser": false,
    "shellExecution": false,
    "cron": false
  },
  "multiUser": { "enabled": false }
}
```

**Rationale:** Most restrictive settings. Memory cleared between engagements. No shell execution. Wait for multi-user mode with proper authentication before team deployment.

---

### Scenario 4: Air-Gapped Environment

**Profile:** Sensitive environment with no internet access.

**Recommended Configuration:**
```json
{
  "memory": { "enabled": true, "retention": "unlimited" },
  "features": {
    "browser": false,
    "shellExecution": true,
    "cron": false
  },
  "model": {
    "provider": "ollama",
    "model": "llama3:70b",
    "endpoint": "http://ollama-server:11434"
  }
}
```

**Rationale:** Local model via Ollama eliminates external API calls. Shell execution enabled for local processing. No browser or cron needed.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-02-01 | Initial configuration guide |
