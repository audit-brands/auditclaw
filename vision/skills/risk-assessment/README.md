# Risk Assessment Skill

An [AgentSkills](https://agentskills.io)-compatible skill for conducting risk assessments from uploaded documents. Designed for internal auditors, risk managers, and compliance professionals.

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![AgentSkills](https://img.shields.io/badge/AgentSkills-Compatible-green.svg)](https://agentskills.io)
[![OpenClaw](https://img.shields.io/badge/OpenClaw-Compatible-purple.svg)](https://openclaw.ai)

## Overview

This skill enables AI agents to systematically identify, assess, and rank risks from process documentation, policies, control matrices, and narratives. It follows COSO ERM and ISO 31000 principles to produce structured risk registers.

**Key capabilities:**
- Extract risks from uploaded documents
- Assess likelihood and impact using standardized scales
- Evaluate existing controls and their effectiveness
- Calculate inherent and residual risk scores
- Generate prioritized risk registers with recommended actions

## Installation

### For OpenClaw

```bash
# Clone to your skills directory
git clone https://github.com/[your-org]/risk-assessment.git ~/.openclaw/skills/risk-assessment

# Or install via ClawHub (if published)
clawdhub install risk-assessment
```

### For Other AgentSkills-Compatible Tools

Copy the `risk-assessment` directory to your agent's skills location:
- Claude Code: `.claude/skills/`
- VS Code Copilot: `.github/skills/`
- Custom agents: Configure your skills path

## Usage

The skill activates automatically when you:
- Upload process documentation and ask to identify risks
- Request a risk assessment or risk analysis
- Want to create or update a risk register
- Ask to evaluate likelihood and impact of risks

**Example prompts:**
- "Please review this process document and identify the key risks"
- "Create a risk register from the attached policy"
- "What are the top risks in this control matrix?"
- "Assess the risks in our vendor management process"

## Output

The skill produces a markdown risk register with:

| Column | Description |
|--------|-------------|
| Risk ID | Unique identifier (R-001, R-002) |
| Risk Statement | Structured: "Risk that [event] due to [cause], resulting in [impact]" |
| Category | Strategic, Operational, Financial, Compliance, Technology, Reputational |
| Likelihood | 1-5 scale |
| Impact | 1-5 scale |
| Inherent Risk | L × I (before controls) |
| Controls | Existing controls identified |
| Effectiveness | Effective, Partial, Ineffective, Missing |
| Residual Risk | Score after control consideration |
| Actions | Recommended mitigations |

Plus a summary with top priority risks and key themes.

## Directory Structure

```
risk-assessment/
├── SKILL.md              # Main skill file (required)
├── README.md             # This file
├── LICENSE               # Apache 2.0
├── CONTRIBUTING.md       # Contribution guidelines
├── references/           # Detailed guidance documents
│   ├── scaling-guidance.md
│   ├── risk-categories.md
│   └── examples.md
└── assets/               # Templates and examples
    ├── risk-register-template.md
    └── risk-statement-examples.md
```

## Customization

### Adjusting Scales

The default scales are calibrated for medium-sized organizations. See `references/scaling-guidance.md` for:
- Small/medium/large organization thresholds
- Risk appetite adjustments
- Calibration statements

### Adding Categories

Modify the risk categories in `SKILL.md` or extend with domain-specific categories in `references/risk-categories.md`.

### Output Format

Customize the output structure by modifying `assets/risk-register-template.md`.

## Frameworks Alignment

This skill aligns with:
- **COSO ERM** — Enterprise Risk Management framework
- **ISO 31000** — Risk management principles and guidelines
- **IIA Standards** — 2010 (Planning), 2120 (Risk Management)

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for:
- How to report issues
- How to suggest enhancements
- Pull request process
- Style guidelines

## License

Apache License 2.0 — see [LICENSE](LICENSE) for details.

## Acknowledgments

- [AgentSkills](https://agentskills.io) specification by Anthropic
- [OpenClaw](https://openclaw.ai) community
- COSO and ISO for risk management frameworks
- The internal audit community for methodology guidance

---

**Disclaimer:** This skill provides guidance based on established risk management frameworks but does not replace professional judgment. Risk assessments should be validated by qualified personnel before use in formal audit or compliance activities.
