# AuditClaw Container Setup Guide

This guide covers setting up and running AuditClaw in a Docker container for secure, isolated document analysis workflows.

## Prerequisites

- **Docker** (version 20.10 or later)
- **Docker Compose** (version 2.0 or later, included with Docker Desktop)
- **API Key** for at least one AI provider (Anthropic recommended)

### Verify Docker Installation

```bash
docker --version
docker compose version
```

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/auditclaw/auditclaw.git
cd auditclaw
```

### 2. Run the Setup Script

The setup script creates the required host directories:

```bash
./scripts/setup-auditclaw.sh
```

This creates:
- `~/audit-input` - Place documents here for analysis (read-only in container)
- `~/audit-output` - Generated outputs appear here (writable)
- `~/auditclaw-skills` - Community skills directory (read-only in container)

### 3. Configure Environment

Copy the example environment file and add your API key:

```bash
cp .env.auditclaw.example .env
```

Edit `.env` and add at least one API key. **OpenRouter is recommended for testing** as it provides access to many models at competitive prices:

```bash
# Recommended: OpenRouter (access to many models)
OPENROUTER_API_KEY=sk-or-v1-...

# Or use a direct provider:
# ANTHROPIC_API_KEY=sk-ant-api03-...
# OPENAI_API_KEY=sk-...
# GEMINI_API_KEY=...
# GROQ_API_KEY=gsk_...
```

### 4. Build and Start

```bash
docker compose -f docker-compose.auditclaw.yml build
docker compose -f docker-compose.auditclaw.yml up -d
```

### 5. Access the Web Interface

Open your browser to:

```
http://localhost:18789
```

## Volume Mappings

AuditClaw uses carefully scoped volume mounts to protect your system:

| Host Path | Container Path | Access | Purpose |
|-----------|----------------|--------|---------|
| `~/audit-input` | `/workspace/input` | Read-only | Documents to analyze |
| `~/audit-output` | `/workspace/output` | Read-write | Generated reports |
| `~/auditclaw-skills` | `/workspace/skills` | Read-only | Community skills |
| Named volume | `/home/auditclaw/.auditclaw` | Read-write | Configuration |
| Named volume | `/tmp` | Read-write | Temporary files |

### What the Container Cannot Access

The container is isolated from:
- `~/.ssh/` - SSH keys
- `~/.aws/` - Cloud credentials
- `~/Documents/` - Personal files
- Docker socket - Prevents container escape
- Host network - Isolated networking

## Security Model

AuditClaw runs with multiple layers of security hardening:

### Container Hardening

```yaml
security_opt:
  - no-new-privileges:true    # Prevents privilege escalation
cap_drop:
  - ALL                        # Removes all Linux capabilities
read_only: true                # Root filesystem is read-only
user: "1000:1000"              # Runs as non-root user
```

### Network Isolation

- Web interface binds to `127.0.0.1:18789` (localhost only)
- Cannot be accessed from other machines by default
- Outbound connections only to AI provider APIs

### Optional: LAN Access with Authentication

If you need to access AuditClaw from other devices on your network:

1. Generate a secure token:
   ```bash
   openssl rand -hex 32
   ```

2. Add to your `.env` file:
   ```bash
   AUDITCLAW_GATEWAY_TOKEN=your-generated-token
   ```

3. Modify the port binding in `docker-compose.auditclaw.yml`:
   ```yaml
   ports:
     - "0.0.0.0:18789:18789"  # Bind to all interfaces
   ```

4. Restart the container.

Access requires the token in the URL or headers.

## Configuration Options

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENROUTER_API_KEY` | Yes* | OpenRouter API key (recommended for testing) |
| `ANTHROPIC_API_KEY` | Yes* | Anthropic Claude API key |
| `OPENAI_API_KEY` | Yes* | OpenAI API key |
| `GEMINI_API_KEY` | Yes* | Google Gemini API key (has free tier) |
| `GROQ_API_KEY` | Yes* | Groq API key (fast inference) |
| `AUDITCLAW_GATEWAY_TOKEN` | No | Token for LAN access |
| `AUDIT_INPUT` | No | Custom input directory path |
| `AUDIT_OUTPUT` | No | Custom output directory path |
| `SKILLS_DIR` | No | Custom skills directory path |

*At least one AI provider API key is required. OpenRouter is recommended for testing.

### Custom Paths

Override default paths in your `.env` file:

```bash
AUDIT_INPUT=/path/to/your/documents
AUDIT_OUTPUT=/path/to/your/reports
SKILLS_DIR=/path/to/your/skills
```

## Daily Usage

### Starting AuditClaw

```bash
cd ~/auditclaw
docker compose -f docker-compose.auditclaw.yml up -d
```

### Stopping AuditClaw

```bash
docker compose -f docker-compose.auditclaw.yml down
```

### Viewing Logs

```bash
docker compose -f docker-compose.auditclaw.yml logs -f
```

### Workflow Example

1. Copy documents to analyze:
   ```bash
   cp ~/Downloads/process-narrative.pdf ~/audit-input/
   ```

2. Open web UI at `http://localhost:18789`

3. Chat with AuditClaw:
   > "Please analyze the process document in input/process-narrative.pdf"

4. Review results in the web UI

5. Find generated outputs:
   ```bash
   ls ~/audit-output/
   ```

## Loading Skills

### From Community Repository

```bash
# Clone skills to your skills directory
git clone https://github.com/auditclaw/skills.git ~/auditclaw-skills
```

### Manual Installation

Copy skill folders directly to `~/auditclaw-skills/`:

```bash
cp -r /path/to/risk-assessment ~/auditclaw-skills/
```

### Configuring Extra Skills Directories

Skills in `/workspace/skills` are loaded automatically. To configure additional directories, create or edit the config file in the container volume:

```bash
docker compose -f docker-compose.auditclaw.yml exec auditclaw \
  cat > /home/auditclaw/.auditclaw/config.json << 'EOF'
{
  "skills": {
    "load": {
      "extraDirs": ["/workspace/skills"]
    }
  }
}
EOF
```

## Troubleshooting

### Container Won't Start

Check logs for errors:
```bash
docker compose -f docker-compose.auditclaw.yml logs
```

Common issues:
- Missing API key in `.env`
- Port 18789 already in use
- Docker not running

### Health Check Failing

Verify the container is healthy:
```bash
docker inspect --format='{{.State.Health.Status}}' auditclaw
```

Note: The health check has a 30-second start period, so the container may show "starting" initially.

If unhealthy, check if the gateway started:
```bash
docker compose -f docker-compose.auditclaw.yml exec auditclaw \
  curl -I http://localhost:18789/
```

### Permission Denied on Volumes

Ensure host directories have correct permissions:
```bash
chmod 755 ~/audit-input ~/audit-output ~/auditclaw-skills
```

### Cannot Write to Output Directory

Verify the output mount is writable:
```bash
docker compose -f docker-compose.auditclaw.yml exec auditclaw \
  touch /workspace/output/test.txt && rm /workspace/output/test.txt
```

### Clearing All Data

To remove all AuditClaw data and start fresh:
```bash
docker compose -f docker-compose.auditclaw.yml down -v
# This removes both named volumes (config and tmp)
```

### Rebuilding the Image

After pulling updates:
```bash
docker compose -f docker-compose.auditclaw.yml build --no-cache
docker compose -f docker-compose.auditclaw.yml up -d
```

## Verification Steps

After setup, verify everything works:

### 1. Container Health

```bash
docker inspect --format='{{.State.Health.Status}}' auditclaw
# Expected: healthy
```

### 2. Web UI Access

```bash
curl -I http://localhost:18789/
# Expected: HTTP/1.1 200 OK
```

### 3. Volume Mounts

Test reading from input:
```bash
echo "test" > ~/audit-input/test.txt
docker compose -f docker-compose.auditclaw.yml exec auditclaw \
  cat /workspace/input/test.txt
# Expected: test
rm ~/audit-input/test.txt
```

Test writing to output:
```bash
docker compose -f docker-compose.auditclaw.yml exec auditclaw \
  sh -c 'echo "output" > /workspace/output/test.txt'
cat ~/audit-output/test.txt
# Expected: output
rm ~/audit-output/test.txt
```

### 4. Security Constraints

Verify read-only filesystem:
```bash
docker compose -f docker-compose.auditclaw.yml exec auditclaw \
  touch /app/test 2>&1 || echo "PASS: filesystem is read-only"
```

Verify input is read-only:
```bash
docker compose -f docker-compose.auditclaw.yml exec auditclaw \
  touch /workspace/input/test 2>&1 || echo "PASS: input is read-only"
```

## Updating AuditClaw

```bash
cd ~/auditclaw
git pull
docker compose -f docker-compose.auditclaw.yml build
docker compose -f docker-compose.auditclaw.yml up -d
```

## Support

- GitHub Issues: https://github.com/auditclaw/auditclaw/issues
- Documentation: See `vision/AUDITCLAW_VISION.md` for full project details
