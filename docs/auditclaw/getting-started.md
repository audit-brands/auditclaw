# Getting Started with AuditClaw

AuditClaw is an AI-powered internal audit assistant that helps with risk assessment, workpaper documentation, compliance research, and audit analysis.

## Prerequisites

- Docker and Docker Compose
- An API key from at least one AI provider:
  - **OpenRouter** (recommended for testing) - provides access to many models
  - **Anthropic** (Claude)
  - **OpenAI** (GPT-4)
  - **Google** (Gemini)

## Quick Start

### 1. Clone and Configure

```bash
# Clone the repository
git clone https://github.com/audit-brands/auditclaw.git
cd auditclaw

# Copy the example environment file
cp .env.auditclaw.example .env

# Edit .env with your API key
# At minimum, set one of:
#   OPENROUTER_API_KEY=your-key
#   ANTHROPIC_API_KEY=your-key
#   OPENAI_API_KEY=your-key
```

### 2. Create Input/Output Directories

```bash
# Create directories for audit documents
mkdir -p ~/audit-input   # Place documents to analyze here
mkdir -p ~/audit-output  # Generated workpapers appear here
```

### 3. Build and Run

```bash
# Build the container
docker compose -f docker-compose.auditclaw.yml build

# Start AuditClaw
docker compose -f docker-compose.auditclaw.yml up -d

# View logs (optional)
docker compose -f docker-compose.auditclaw.yml logs -f
```

### 4. Access the Dashboard

Open your browser to: **http://localhost:18789**

You should see the AuditClaw dashboard with:

- Chat interface for interacting with the audit assistant
- Session management for different engagements
- Skills for specialized audit tasks

## First Conversation

Try asking AuditClaw about audit topics:

- "What are the key controls for accounts payable?"
- "Help me draft a finding for inadequate segregation of duties"
- "Explain the COSO framework components"
- "What sampling methods are appropriate for substantive testing?"

## Loading Documents

Place documents in `~/audit-input`:

```bash
# Example: Copy a policy document
cp company-policy.pdf ~/audit-input/

# In the chat, ask AuditClaw to analyze it:
# "Please review the document at /workspace/input/company-policy.pdf"
```

Supported formats: PDF, Excel (.xlsx), Word (.docx), CSV, TXT, JSON

## Generating Workpapers

AuditClaw can help create audit documentation:

- "Create a workpaper for testing IT general controls"
- "Document my testing of the bank reconciliation process"
- "Draft an executive summary for the Q3 audit"

Generated workpapers are saved to `~/audit-output`.

## Next Steps

- [Configuration Guide](configuration.md) - Customize AuditClaw settings
- [System Prompt Guide](system-prompt.md) - Adjust assistant behavior
- [Security Model](security-model.md) - Understand the security architecture
- [Troubleshooting](troubleshooting.md) - Common issues and solutions

## Stopping AuditClaw

```bash
docker compose -f docker-compose.auditclaw.yml down
```

To remove all data (sessions, cron jobs, etc.):

```bash
docker compose -f docker-compose.auditclaw.yml down -v
```
