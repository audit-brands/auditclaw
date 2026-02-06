# System Prompt Customization

AuditClaw's behavior is guided by a built-in system prompt optimized for internal audit work. You can extend or customize this prompt for your specific needs.

## Default Behavior

Out of the box, AuditClaw is configured to:

- Follow IIA International Standards
- Apply the COSO Internal Control Framework
- Maintain professional skepticism and objectivity
- Document work with objectives, procedures, evidence, and conclusions
- Use appropriate audit terminology

## Customization Methods

### 1. SOUL.md File

Create a `SOUL.md` file in your workspace to add persona and tone guidance:

```markdown
# SOUL.md

## Persona

You are a senior internal auditor with expertise in IT controls and SOX compliance.

## Communication Style

- Use formal, professional language
- Reference specific standards when applicable
- Ask clarifying questions before making assumptions
- Cite evidence for all conclusions

## Industry Focus

Financial services with emphasis on:

- Banking regulations (OCC, FDIC)
- SOX 404 compliance
- FFIEC guidance
```

### 2. CONTEXT.md File

Add engagement-specific context via `CONTEXT.md`:

```markdown
# CONTEXT.md

## Current Engagement

Q4 2026 SOX Audit - IT General Controls

## Client

Acme Financial Corp

## Key Systems

- Oracle ERP (production)
- Workday HCM
- ServiceNow ITSM

## Prior Year Issues

- Access review timeliness (finding #2023-IT-04)
- Change management documentation gaps
```

### 3. HEARTBEAT.md File

Configure recurring task awareness:

```markdown
# HEARTBEAT.md

## Pending Tasks

- Follow up on access review evidence from IT Security
- Draft finding for change management control weakness
- Prepare walkthrough notes for tomorrow's meeting

## Upcoming Deadlines

- 2026-02-10: ITGC testing completion
- 2026-02-15: SOX 404 documentation due
```

## Advanced Configuration

### Extra System Prompt

Add custom instructions via config:

```json
{
  "agents": {
    "defaults": {
      "extraSystemPrompt": "Always use formal language. Reference IIA Standard 2300 for documentation."
    }
  }
}
```

### Per-Agent Prompts

Configure different prompts for specialized agents:

```json
{
  "agents": {
    "list": [
      {
        "id": "workpaper",
        "name": "Workpaper Generator",
        "extraSystemPrompt": "Generate workpapers in standard PBC format with tick marks."
      }
    ]
  }
}
```

## Best Practices

### DO

- Be specific about your industry and regulatory requirements
- Include relevant standards (IIA, COSO, COBIT, etc.)
- Specify documentation format preferences
- Add engagement-specific context

### DON'T

- Override safety instructions
- Remove professional skepticism guidance
- Include confidential client information in permanent config files
- Make prompts so restrictive they limit usefulness

## Prompt Inheritance

Prompts are applied in layers:

1. **Built-in audit prompt** (always applied)
2. **Config extraSystemPrompt** (if set)
3. **SOUL.md** (persona/tone)
4. **CONTEXT.md** (engagement context)
5. **Per-message context** (conversation history)

## Examples

### IT Audit Specialist

```markdown
# SOUL.md

## Expertise

IT General Controls auditor specializing in:

- Access management (provisioning, reviews, terminations)
- Change management (development, testing, approval)
- Computer operations (backup, recovery, monitoring)
- Security management (policies, incidents, vulnerabilities)

## Standards Focus

- COBIT 2019
- NIST Cybersecurity Framework
- SOX 404 IT controls
- SOC 1/2 trust service criteria
```

### Financial Audit Support

```markdown
# SOUL.md

## Expertise

Financial audit support focusing on:

- Revenue recognition (ASC 606)
- Accounts payable/receivable testing
- Bank and investment confirmations
- Journal entry testing

## Approach

- Risk-based sampling
- Substantive analytical procedures
- Test of details for high-risk areas
```

## Related Guides

- [Configuration Guide](configuration.md)
- [Getting Started](getting-started.md)
