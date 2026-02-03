---
name: risk-assessment
description: Conduct risk assessments from uploaded documents. Use when analyzing process documentation, policies, control matrices, or narratives to identify, assess, and rank risks. Produces structured risk registers with likelihood, impact, and recommended actions.
author: auditclaw-community
version: "1.0.0"
license: Apache-2.0
audit-domain: Enterprise Risk Management
frameworks:
  - COSO ERM
  - ISO 31000
  - IIA Standards
metadata:
  iia-standard: "2010, 2120"
  last-reviewed: "2025-02-01"
  contributors: []
---

# Risk Assessment Skill

## Purpose

This skill enables systematic risk identification and assessment from uploaded documents. It follows a structured methodology aligned with COSO ERM and ISO 31000 principles.

## When to Use

Activate this skill when the user:
- Uploads process documentation and asks to identify risks
- Requests a risk assessment or risk analysis
- Wants to create or update a risk register
- Asks to evaluate likelihood and impact of risks
- Needs to identify control gaps or risk mitigation opportunities
- Requests prioritization of risks for audit planning

**Trigger phrases:** "assess risks", "identify risks", "risk register", "risk analysis", "what could go wrong", "evaluate risks", "risk ranking"

## Methodology

### Phase 1: Document Analysis

1. **Identify the process scope**
   - What business process or area is being assessed?
   - What are the stated objectives?
   - Who are the key stakeholders?

2. **Extract key elements**
   - Process steps and decision points
   - Existing controls mentioned
   - Dependencies (systems, people, third parties)
   - Regulatory or compliance requirements referenced

3. **Note information gaps**
   - Missing process steps
   - Unclear ownership
   - Undocumented controls

### Phase 2: Risk Identification

Apply the following risk categories systematically:

| Category | Consider |
|----------|----------|
| **Strategic** | Alignment with objectives, market changes, competitive factors |
| **Operational** | Process failures, human error, capacity constraints |
| **Financial** | Fraud, misstatement, liquidity, credit exposure |
| **Compliance** | Regulatory violations, policy breaches, contractual obligations |
| **Technology** | System failures, cybersecurity, data integrity |
| **Reputational** | Brand damage, stakeholder trust, public perception |

For each identified risk, document:
- **Risk statement**: Clear description following the format: "Risk that [event] occurs due to [cause], resulting in [consequence]"
- **Risk category**: From the table above
- **Risk owner**: Who is accountable (if identifiable from documents)

### Phase 3: Risk Assessment

#### Likelihood Scale

| Score | Rating | Description | Frequency Guidance |
|-------|--------|-------------|-------------------|
| 1 | Rare | Exceptional circumstances only | <5% probability, less than once per 10 years |
| 2 | Unlikely | Not expected but possible | 5-20% probability, once per 5-10 years |
| 3 | Possible | May occur occasionally | 20-50% probability, once per 1-5 years |
| 4 | Likely | Will probably occur | 50-80% probability, once per year |
| 5 | Almost Certain | Expected to occur | >80% probability, multiple times per year |

#### Impact Scale

| Score | Rating | Financial | Operational | Reputational |
|-------|--------|-----------|-------------|--------------|
| 1 | Insignificant | <$10K | Minor delays | No external awareness |
| 2 | Minor | $10K-$100K | Short-term disruption | Limited local awareness |
| 3 | Moderate | $100K-$1M | Significant disruption | Regional media coverage |
| 4 | Major | $1M-$10M | Extended disruption | National media coverage |
| 5 | Severe | >$10M | Business continuity threat | International coverage, regulatory action |

*Note: Adjust thresholds based on organization size. See [references/scaling-guidance.md](references/scaling-guidance.md) for small/medium/large organization scales.*

#### Risk Scoring

```
Inherent Risk Score = Likelihood × Impact
```

| Score Range | Risk Level | Response |
|-------------|------------|----------|
| 1-4 | Low | Accept or monitor |
| 5-9 | Medium | Mitigate with standard controls |
| 10-15 | High | Priority mitigation required |
| 16-25 | Critical | Immediate action required |

### Phase 4: Control Evaluation

For each identified risk:

1. **Identify existing controls** from the documentation
2. **Assess control effectiveness**:
   - Effective: Control adequately addresses the risk
   - Partially Effective: Control addresses some but not all aspects
   - Ineffective: Control does not adequately address the risk
   - Missing: No control identified

3. **Calculate residual risk**:
   - Effective control: Reduce score by 1-2 levels
   - Partially effective: Reduce score by 1 level
   - Ineffective/Missing: No reduction

### Phase 5: Output Generation

Produce a risk register using the format in [assets/risk-register-template.md](assets/risk-register-template.md).

**Required columns:**
- Risk ID (format: R-001, R-002, etc.)
- Risk Statement
- Category
- Likelihood (1-5)
- Impact (1-5)
- Inherent Risk Score
- Existing Controls
- Control Effectiveness
- Residual Risk Score
- Risk Level (Critical/High/Medium/Low)
- Recommended Actions
- Risk Owner (if identifiable)

**Sort output by:** Residual Risk Score (descending)

## Output Format

Present results as a markdown table followed by a summary:

```markdown
## Risk Register

| ID | Risk Statement | Category | L | I | Inherent | Controls | Eff. | Residual | Level | Actions |
|----|----------------|----------|---|---|----------|----------|------|----------|-------|---------|
| R-001 | Risk that... | Operational | 4 | 3 | 12 | Monthly review | Partial | 9 | Medium | Increase frequency |

## Summary

- **Total risks identified:** X
- **Critical risks:** X
- **High risks:** X
- **Medium risks:** X
- **Low risks:** X

### Top 3 Priority Risks
1. R-XXX: [Brief description and recommended action]
2. R-XXX: [Brief description and recommended action]
3. R-XXX: [Brief description and recommended action]

### Key Themes
[Narrative summary of risk themes observed]
```

## Handling Ambiguity

When documents lack sufficient detail:

1. **State assumptions clearly** — Document what you assumed and why
2. **Use conservative estimates** — When uncertain, lean toward higher likelihood/impact
3. **Flag for follow-up** — Mark risks that need validation with "(Requires validation)"
4. **Request additional information** — Ask the user for specific missing details

## Limitations

This skill:
- Relies on information provided in uploaded documents
- Does not replace professional judgment or subject matter expertise
- Should be validated by qualified personnel before use in formal risk assessments
- Uses generic scales that may need calibration for specific organizations

## References

- [Scaling Guidance](references/scaling-guidance.md) — Adjust scales for organization size
- [Risk Categories Extended](references/risk-categories.md) — Detailed category definitions
- [Example Assessments](references/examples.md) — Sample completed assessments

## Templates

- [Risk Register Template](assets/risk-register-template.md)
- [Risk Statement Examples](assets/risk-statement-examples.md)

## Contributing

This skill is maintained by the AuditClaw community. To contribute:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request with clear description of changes
4. Ensure changes align with COSO ERM or ISO 31000 principles

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.
