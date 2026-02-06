# Configuration Guide

AuditClaw is configured via a JSON file at `~/.auditclaw/auditclaw.json`. This guide covers the key settings for audit work.

## Configuration File Location

- **Default**: `~/.auditclaw/auditclaw.json`
- **Override**: Set `AUDITCLAW_CONFIG_PATH` environment variable
- **Docker**: Mount a config file or use environment variables

## Example Configuration

See `config/auditclaw.example.json` for a complete example with audit-focused defaults.

```json
{
  "ui": {
    "assistant": {
      "name": "AuditClaw",
      "avatar": "\ud83d\udccb"
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "anthropic/claude-sonnet-4-5"
      },
      "workspace": "/workspace",
      "thinkingDefault": "medium"
    }
  }
}
```

## Key Configuration Sections

### Agent Defaults

Configure the default behavior for the audit assistant.

```json
{
  "agents": {
    "defaults": {
      "model": {
        "primary": "anthropic/claude-sonnet-4-5",
        "fallbacks": ["openai/gpt-4o"]
      },
      "thinkingDefault": "medium",
      "timeoutSeconds": 300
    }
  }
}
```

| Setting           | Description                                                 | Default                       |
| ----------------- | ----------------------------------------------------------- | ----------------------------- |
| `model.primary`   | Primary AI model                                            | `anthropic/claude-sonnet-4-5` |
| `model.fallbacks` | Fallback models                                             | `[]`                          |
| `thinkingDefault` | Reasoning level (`off`, `minimal`, `low`, `medium`, `high`) | `medium`                      |
| `timeoutSeconds`  | Request timeout                                             | `120`                         |
| `workspace`       | Default working directory                                   | `/workspace`                  |

### Multiple Agents

Configure specialized agents for different audit tasks:

```json
{
  "agents": {
    "list": [
      {
        "id": "auditor",
        "name": "Audit Assistant",
        "default": true,
        "workspace": "/workspace"
      },
      {
        "id": "workpaper",
        "name": "Workpaper Generator",
        "workspace": "/workspace/output"
      }
    ]
  }
}
```

### Tools Configuration

Enable or disable specific tools:

```json
{
  "tools": {
    "read": { "enabled": true },
    "write": { "enabled": true },
    "exec": { "enabled": true },
    "web_search": { "enabled": true }
  }
}
```

### Skills Configuration

Configure audit skills directories:

```json
{
  "skills": {
    "enabled": true,
    "dirs": ["/workspace/skills"]
  }
}
```

### Gateway Settings

Configure the gateway server:

```json
{
  "gateway": {
    "mode": "local",
    "auth": {
      "mode": "token"
    },
    "controlUi": {
      "enabled": true
    }
  }
}
```

### Logging

Configure audit trail logging:

```json
{
  "logging": {
    "level": "info",
    "redactSensitive": "tools"
  }
}
```

| Setting           | Description                                  |
| ----------------- | -------------------------------------------- |
| `level`           | Log level: `debug`, `info`, `warn`, `error`  |
| `redactSensitive` | Redact sensitive data: `off`, `tools`, `all` |

## Environment Variables

Key environment variables (can override config file):

| Variable                  | Description                               |
| ------------------------- | ----------------------------------------- |
| `AUDITCLAW_STATE_DIR`     | State directory (default: `~/.auditclaw`) |
| `AUDITCLAW_CONFIG_PATH`   | Config file path                          |
| `AUDITCLAW_GATEWAY_TOKEN` | Gateway authentication token              |
| `AUDITCLAW_GATEWAY_PORT`  | Gateway port (default: `18789`)           |

### AI Provider Keys

Set at least one:

| Variable             | Provider                             |
| -------------------- | ------------------------------------ |
| `OPENROUTER_API_KEY` | OpenRouter (recommended for testing) |
| `ANTHROPIC_API_KEY`  | Anthropic Claude                     |
| `OPENAI_API_KEY`     | OpenAI GPT                           |
| `GEMINI_API_KEY`     | Google Gemini                        |

## Docker Configuration

When running in Docker, configure via:

1. **Environment variables** in `docker-compose.auditclaw.yml`
2. **Mounted config file** (commented out by default)

To use a custom config file:

```yaml
volumes:
  - ./config/auditclaw.json:/home/auditclaw/.auditclaw/auditclaw.json:ro
```

## Validation

AuditClaw validates the config file on startup. Check logs for validation errors:

```bash
docker compose -f docker-compose.auditclaw.yml logs | grep -i "config"
```

## Hot Reload

Config changes require a gateway restart:

```bash
docker compose -f docker-compose.auditclaw.yml restart
```

Or use the gateway restart command from the dashboard.

## Related Guides

- [System Prompt Customization](system-prompt.md)
- [Security Model](security-model.md)
- [Getting Started](getting-started.md)
