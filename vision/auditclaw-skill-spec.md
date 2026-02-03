# AuditClaw Skill Format Specification

**Version:** 1.0  
**Compatibility:** OpenClaw (AgentSkills standard)  
**Community:** Internal Auditors  

---

## Overview

This specification defines the skill format for AuditClaw, a walled OpenClaw instance designed for internal audit research and knowledge management. Skills follow the [AgentSkills](https://agentskills.io) open standard, ensuring compatibility with OpenClaw while adding audit-specific conventions.

Skills are shared via a private repository accessible to trusted community members. The trust model is social—if a known auditor publishes a skill, you can import it with confidence.

---

## Directory Structure

```
skill-name/
├── SKILL.md              # Required: metadata + instructions
├── scripts/              # Optional: executable code
│   └── extract_risks.py
├── references/           # Optional: supplementary docs
│   └── risk-matrix.md
└── assets/               # Optional: templates, examples
    └── assessment-template.xlsx
```

**Naming convention:** Use lowercase with hyphens: `risk-assessment`, `sox-testing`, `control-evaluation`

---

## SKILL.md Format

Every skill requires a `SKILL.md` file with YAML frontmatter followed by Markdown instructions.

### Minimal Example

```yaml
---
name: risk-assessment
description: Conduct risk assessments from uploaded documents. Use when analyzing process documentation, policies, or control matrices to identify and rank risks.
---

# Risk Assessment Skill

## When to Use
Invoke this skill when the user uploads documents and asks you to identify risks, assess likelihood/impact, or create a risk register.

## Process
1. Extract key processes and controls from uploaded documents
2. Identify potential failure points
3. Assess inherent risk (likelihood × impact)
4. Document control gaps
5. Output a structured risk register

## Output Format
Produce a markdown table with columns:
- Risk ID
- Risk Description
- Likelihood (1-5)
- Impact (1-5)
- Inherent Risk Score
- Existing Controls
- Residual Risk
- Recommended Actions
```

### Full Example with Audit Extensions

```yaml
---
name: sox-control-testing
description: Design and document SOX control testing procedures. Use when preparing test plans, workpapers, or evaluating control design and operating effectiveness.
author: jsmith-cia
version: "1.2.0"
license: CC-BY-4.0
audit-domain: SOX compliance
requires:
  - file-upload
  - document-analysis
metadata:
  iia-standard: "2300"
  last-reviewed: "2025-01-15"
  peer-reviewer: "mwilliams-cpa"
---

# SOX Control Testing

## Purpose
This skill helps design and execute SOX 404 control testing procedures following PCAOB AS 2201 guidance.

## Activation Triggers
- "Test this control"
- "Create a test plan for..."
- "Evaluate control effectiveness"
- "Design testing procedures"

## Methodology

### Control Understanding Phase
1. Obtain process documentation
2. Identify control objectives
3. Map controls to assertions (CEAVOP)
4. Classify as preventive/detective, manual/automated

### Test Design Phase
1. Determine testing approach (inquiry, observation, inspection, reperformance)
2. Set sample sizes based on control frequency
3. Document expected results
4. Define exception criteria

### Execution Guidance
[See references/testing-guidance.md for detailed procedures]

## Sample Size Reference

| Control Frequency | Minimum Sample |
|-------------------|----------------|
| Annual            | 1              |
| Quarterly         | 2              |
| Monthly           | 2-5            |
| Weekly            | 5-15           |
| Daily             | 20-40          |
| Multiple/day      | 25-60          |

## Workpaper Template
Use `assets/workpaper-template.xlsx` for documentation.

## References
- [Testing Guidance](references/testing-guidance.md)
- [Common Deficiencies](references/common-deficiencies.md)
```

---

## Frontmatter Fields

### Required Fields

| Field | Description | Constraints |
|-------|-------------|-------------|
| `name` | Skill identifier | Max 64 chars, lowercase, hyphens only, no leading/trailing hyphens |
| `description` | What the skill does and when to use it | Max 1024 chars, should include "Use when..." clause |

### Recommended Fields (AuditClaw Extensions)

| Field | Description | Example |
|-------|-------------|---------|
| `author` | Skill creator (professional handle) | `jsmith-cia` |
| `version` | Semantic version | `"1.0.0"` |
| `license` | License for sharing | `CC-BY-4.0`, `MIT`, `internal-use` |
| `audit-domain` | Primary audit area | `SOX compliance`, `IT audit`, `operational audit` |
| `requires` | Capability dependencies | `[file-upload, document-analysis]` |

### Optional Metadata

| Field | Description |
|-------|-------------|
| `iia-standard` | Relevant IIA standard reference |
| `last-reviewed` | Date of last peer review |
| `peer-reviewer` | Who reviewed the skill |
| `frameworks` | Applicable frameworks (COSO, COBIT, ISO) |

---

## Writing Effective Instructions

### Description Field (Critical)

The description determines when your skill gets activated. Write it as if answering: "What does this do and when should the agent use it?"

**Good:**
```yaml
description: Conduct risk assessments from uploaded documents. Use when analyzing process documentation, policies, or control matrices to identify and rank risks.
```

**Bad:**
```yaml
description: Risk assessment skill for auditors.
```

### Instruction Body Guidelines

1. **Start with "When to Use"** — Clear activation triggers help the agent decide when to load your skill

2. **Be procedural** — Auditors think in steps. Write instructions as numbered procedures.

3. **Include output specifications** — Define what deliverables look like (tables, formats, required fields)

4. **Reference external files** — Keep SKILL.md under 500 lines. Move detailed guidance to `references/`

5. **Provide examples** — Show sample inputs and expected outputs

### Progressive Disclosure

Skills load in stages to conserve context:

1. **Discovery** — Only `name` and `description` are read (always loaded)
2. **Activation** — Full SKILL.md body loaded when skill matches user request
3. **Execution** — Referenced files (`scripts/`, `references/`) loaded on demand

Design accordingly: put essential instructions in SKILL.md, detailed reference material in separate files.

---

## Scripts and Automation

Skills can include executable code in `scripts/`. Supported languages depend on your OpenClaw configuration, but typically include:

- Python
- Bash
- JavaScript/Node.js

### Example: Risk Extraction Script

```python
# scripts/extract_risks.py
"""
Extract risk statements from uploaded documents.
Usage: python extract_risks.py <input_file> <output_file>
"""
import sys
import json

def extract_risks(text):
    # Risk identification logic
    risks = []
    risk_indicators = [
        "may result in", "could lead to", "risk of",
        "failure to", "lack of", "inadequate"
    ]
    # ... extraction logic ...
    return risks

if __name__ == "__main__":
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    # Process and output
```

Reference from SKILL.md:
```markdown
## Automated Extraction
Run the extraction script on uploaded documents:
```bash
python scripts/extract_risks.py document.pdf risks.json
```
```

---

## Reference Files

Store supplementary documentation in `references/`. These are loaded only when the agent explicitly accesses them.

**Good candidates for reference files:**
- Detailed testing procedures
- Regulatory citations
- Framework mappings
- Decision trees
- Exception handling guidance

**Example structure:**
```
references/
├── testing-guidance.md      # Detailed test procedures
├── sample-sizes.md          # Statistical sampling tables
├── common-deficiencies.md   # Typical findings and root causes
└── regulatory-citations.md  # Relevant standards text
```

Reference from SKILL.md:
```markdown
For detailed testing procedures, see [Testing Guidance](references/testing-guidance.md).
```

---

## Assets and Templates

Store reusable templates in `assets/`:

```
assets/
├── workpaper-template.xlsx
├── risk-register-template.csv
├── control-matrix.xlsx
└── finding-template.md
```

Reference from SKILL.md:
```markdown
## Templates
- Use `assets/workpaper-template.xlsx` for test documentation
- Use `assets/risk-register-template.csv` as the output format
```

---

## Community Sharing Workflow

### Publishing a Skill

1. Create skill directory following this spec
2. Test locally in your OpenClaw instance
3. Push to the shared private repository
4. Notify the community channel

### Importing a Skill

```bash
# Clone/pull the shared repo
git pull origin main

# Copy skill to your workspace
cp -r shared-skills/sox-control-testing ~/.openclaw/skills/

# Or symlink for auto-updates
ln -s /path/to/shared-skills/sox-control-testing ~/.openclaw/skills/
```

OpenClaw picks up new skills on the next session.

### Skill Locations (Precedence)

1. `<workspace>/skills/` — Your agent workspace (highest priority)
2. `~/.openclaw/skills/` — User-level skills
3. Bundled skills — Ships with OpenClaw (lowest priority)

---

## Validation Checklist

Before sharing a skill, verify:

- [ ] `name` is lowercase with hyphens only
- [ ] `description` includes "Use when..." clause
- [ ] `description` is under 1024 characters
- [ ] SKILL.md is under 500 lines
- [ ] All file references use relative paths
- [ ] Scripts are self-contained or document dependencies
- [ ] Tested locally with representative inputs
- [ ] Peer reviewed by at least one community member

---

## Example Skills for Auditors

| Skill Name | Description |
|------------|-------------|
| `risk-assessment` | Identify and rank risks from uploaded documents |
| `sox-control-testing` | Design SOX 404 test procedures |
| `walkthrough-documentation` | Document process walkthroughs |
| `sample-selection` | Calculate and select audit samples |
| `finding-writer` | Draft audit findings with proper structure |
| `control-gap-analysis` | Compare controls to framework requirements |
| `evidence-request` | Generate PBC (prepared by client) lists |
| `audit-program` | Create audit programs from risk assessments |

---

## Appendix: OpenClaw Metadata Extensions

For advanced gating (optional), use the `metadata` field with OpenClaw-specific settings:

```yaml
metadata:
  openclaw:
    requires:
      bins: ["python3"]           # Required binaries on PATH
      env: ["OPENAI_API_KEY"]     # Required environment variables
    primaryEnv: "OPENAI_API_KEY"  # For API key configuration
```

Most audit skills won't need this—it's primarily for skills that call external APIs or require specific tooling.

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-01-31 | Initial specification |

---

*This specification is maintained by the AuditClaw community. For questions or updates, contact the repository maintainers.*
