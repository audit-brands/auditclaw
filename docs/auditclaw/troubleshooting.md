# Troubleshooting Guide

Common issues and solutions for AuditClaw.

## Connection Issues

### Dashboard won't load at localhost:18789

**Symptoms:**

- Browser shows "connection refused" or timeout
- Dashboard page is blank

**Solutions:**

1. **Check if the container is running:**

   ```bash
   docker compose -f docker-compose.auditclaw.yml ps
   ```

2. **Check container health:**

   ```bash
   docker compose -f docker-compose.auditclaw.yml logs --tail=50
   ```

3. **Verify port is listening:**

   ```bash
   # Linux/macOS
   lsof -i :18789

   # or
   curl -I http://localhost:18789/
   ```

4. **Restart the container:**
   ```bash
   docker compose -f docker-compose.auditclaw.yml restart
   ```

### WebSocket connection fails

**Symptoms:**

- Dashboard loads but shows "Disconnected"
- Chat doesn't respond

**Solutions:**

1. **Check for authentication errors in logs:**

   ```bash
   docker compose -f docker-compose.auditclaw.yml logs | grep -i "auth\|token"
   ```

2. **Verify gateway token matches:**
   - Check `AUDITCLAW_GATEWAY_TOKEN` in `.env`
   - Default is `local` for localhost-only access

3. **Clear browser cache and reload**

## API Key Issues

### "No API key configured" error

**Symptoms:**

- Chat returns error about missing API key
- Logs show authentication failures

**Solutions:**

1. **Verify API key is set in `.env`:**

   ```bash
   grep API_KEY .env
   ```

2. **Check key is passed to container:**

   ```bash
   docker compose -f docker-compose.auditclaw.yml exec auditclaw env | grep API_KEY
   ```

3. **Restart after changing `.env`:**
   ```bash
   docker compose -f docker-compose.auditclaw.yml down
   docker compose -f docker-compose.auditclaw.yml up -d
   ```

### API rate limiting

**Symptoms:**

- Intermittent failures
- "Rate limit exceeded" errors

**Solutions:**

1. **Use OpenRouter for development** (better rate limits)
2. **Add fallback models:**
   ```json
   {
     "agents": {
       "defaults": {
         "model": {
           "primary": "anthropic/claude-sonnet-4-5",
           "fallbacks": ["openai/gpt-4o"]
         }
       }
     }
   }
   ```

## Document Issues

### Documents not found

**Symptoms:**

- "File not found" when referencing documents
- Can't read files in /workspace/input

**Solutions:**

1. **Verify volume mount:**

   ```bash
   docker compose -f docker-compose.auditclaw.yml exec auditclaw ls -la /workspace/input
   ```

2. **Check file permissions:**

   ```bash
   ls -la ~/audit-input/
   ```

3. **Ensure directory exists:**
   ```bash
   mkdir -p ~/audit-input
   ```

### PDF parsing fails

**Symptoms:**

- PDF content not extracted properly
- "Cannot read PDF" errors

**Solutions:**

1. **Check if PDF is image-only** (scanned document)
   - Image-only PDFs require OCR
   - Try converting to text first

2. **Check PDF file size:**
   - Very large PDFs may timeout
   - Split into smaller sections

3. **Try with a different PDF** to isolate the issue

## Performance Issues

### Slow responses

**Symptoms:**

- Long wait times for AI responses
- Timeouts

**Solutions:**

1. **Increase timeout:**

   ```json
   {
     "agents": {
       "defaults": {
         "timeoutSeconds": 300
       }
     }
   }
   ```

2. **Check container resources:**

   ```bash
   docker stats auditclaw
   ```

3. **Use a faster model for routine tasks:**
   ```json
   {
     "agents": {
       "defaults": {
         "model": {
           "primary": "openai/gpt-4o-mini"
         }
       }
     }
   }
   ```

### High memory usage

**Symptoms:**

- Container using excessive memory
- System slowdown

**Solutions:**

1. **Restart the container:**

   ```bash
   docker compose -f docker-compose.auditclaw.yml restart
   ```

2. **Clear session history:**
   - Use `/new` command in chat
   - Or start a new session from dashboard

## Configuration Issues

### Config file not loading

**Symptoms:**

- Changes to config not taking effect
- Default settings used despite config file

**Solutions:**

1. **Validate JSON syntax:**

   ```bash
   cat ~/.auditclaw/auditclaw.json | python3 -m json.tool
   ```

2. **Check config path:**

   ```bash
   docker compose -f docker-compose.auditclaw.yml exec auditclaw env | grep CONFIG
   ```

3. **Check logs for config errors:**
   ```bash
   docker compose -f docker-compose.auditclaw.yml logs | grep -i config
   ```

### Settings not persisting

**Symptoms:**

- Settings reset after restart
- Named volumes not working

**Solutions:**

1. **Verify volumes exist:**

   ```bash
   docker volume ls | grep auditclaw
   ```

2. **Check volume mounts:**
   ```bash
   docker inspect auditclaw | grep -A 10 Mounts
   ```

## Logging and Debugging

### Enable debug logging

```json
{
  "logging": {
    "level": "debug"
  }
}
```

### View detailed logs

```bash
# All logs
docker compose -f docker-compose.auditclaw.yml logs

# Follow logs in real-time
docker compose -f docker-compose.auditclaw.yml logs -f

# Last 100 lines
docker compose -f docker-compose.auditclaw.yml logs --tail=100
```

### Export logs for support

```bash
docker compose -f docker-compose.auditclaw.yml logs > auditclaw-logs.txt
```

## Getting Help

If you can't resolve an issue:

1. Check the [GitHub Issues](https://github.com/audit-brands/auditclaw/issues)
2. Search existing issues for similar problems
3. Open a new issue with:
   - AuditClaw version
   - Docker version
   - Operating system
   - Relevant log output
   - Steps to reproduce

## Related Guides

- [Configuration Guide](configuration.md)
- [Security Model](security-model.md)
- [Getting Started](getting-started.md)
