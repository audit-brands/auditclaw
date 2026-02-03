# Risk Register Template

Use this template structure when outputting risk assessment results.

---

## Header Section

```markdown
# Risk Assessment: [Process/Area Name]

**Assessment Date:** YYYY-MM-DD  
**Assessed By:** [Name/Role]  
**Document Sources:** [List source documents analyzed]  

**Assessment Calibration:**
- Organization Profile: [Small/Medium/Large]
- Risk Appetite: [Conservative/Moderate/Aggressive]
- Impact Scale: [Reference which scale used]
- Risk Thresholds: High ≥[X], Critical ≥[Y]
```

---

## Risk Register Table

```markdown
## Risk Register

| ID | Risk Statement | Category | L | I | Inherent | Controls | Eff. | Residual | Level | Actions | Owner |
|----|----------------|----------|---|---|----------|----------|------|----------|-------|---------|-------|
| R-001 | | | | | | | | | | | |
| R-002 | | | | | | | | | | | |
```

### Column Definitions

| Column | Description | Format |
|--------|-------------|--------|
| ID | Unique identifier | R-001, R-002, etc. |
| Risk Statement | "Risk that [event] due to [cause], resulting in [consequence]" | Full sentence |
| Category | Primary risk category | Strategic, Operational, Financial, Compliance, Technology, Reputational |
| L | Likelihood score | 1-5 |
| I | Impact score | 1-5 |
| Inherent | Likelihood × Impact (before controls) | 1-25 |
| Controls | Existing controls identified | Brief description |
| Eff. | Control effectiveness | Effective, Partial, Ineffective, Missing |
| Residual | Risk score after controls | 1-25 |
| Level | Risk classification | Critical, High, Medium, Low |
| Actions | Recommended mitigation | Brief, actionable |
| Owner | Accountable party | Name/role if identifiable |

---

## Summary Section

```markdown
## Summary

**Total risks identified:** X

| Risk Level | Count | Percentage |
|------------|-------|------------|
| Critical (16-25) | X | X% |
| High (10-15) | X | X% |
| Medium (5-9) | X | X% |
| Low (1-4) | X | X% |

### Top Priority Risks

1. **R-XXX: [Risk Title]**
   - Current state: [Brief description]
   - Recommended action: [Specific, actionable recommendation]
   - Expected outcome: [What improvement looks like]

2. **R-XXX: [Risk Title]**
   - Current state: [Brief description]
   - Recommended action: [Specific, actionable recommendation]
   - Expected outcome: [What improvement looks like]

3. **R-XXX: [Risk Title]**
   - Current state: [Brief description]
   - Recommended action: [Specific, actionable recommendation]
   - Expected outcome: [What improvement looks like]

### Key Themes

[2-3 paragraphs synthesizing patterns observed across the risk portfolio. Include:
- Common root causes
- Control gaps that appear multiple times
- Interconnected risks
- Strategic implications
- Recommended focus areas for management attention]

### Assumptions and Limitations

- [List any assumptions made due to incomplete information]
- [Note information gaps that limited the assessment]
- [Flag items requiring validation]
```

---

## Risk Level Reference

| Score Range | Level | Color Code | Response Expectation |
|-------------|-------|------------|---------------------|
| 20-25 | Critical | Red | Immediate executive attention; action within days |
| 10-19 | High | Orange | Management attention; action within weeks |
| 5-9 | Medium | Yellow | Monitoring; action within quarter |
| 1-4 | Low | Green | Accept or standard monitoring |

---

## Example Completed Header

```markdown
# Risk Assessment: Procure-to-Pay Process

**Assessment Date:** 2025-02-01  
**Assessed By:** Risk Assessment Skill v1.0  
**Document Sources:**  
- Procurement Policy v3.2 (2024-06)
- AP Process Narrative (2024-09)
- Vendor Management Procedure (2024-03)

**Assessment Calibration:**
- Organization Profile: Medium
- Risk Appetite: Moderate  
- Impact Scale: Medium Organization (see scaling-guidance.md)
- Risk Thresholds: High ≥10, Critical ≥16
```

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-02-01 | auditclaw-community | Initial template |
