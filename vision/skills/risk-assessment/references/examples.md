# Example Risk Assessments

This document provides sample completed risk assessments to illustrate expected output quality and format.

---

## Example 1: Accounts Payable Process

**Source document:** Accounts Payable Process Narrative (fictional)

### Context
A medium-sized manufacturing company's accounts payable process involving invoice receipt, three-way matching, approval, and payment.

### Risk Register

| ID | Risk Statement | Category | L | I | Inherent | Controls | Eff. | Residual | Level | Actions |
|----|----------------|----------|---|---|----------|----------|------|----------|-------|---------|
| R-001 | Risk that duplicate payments occur due to lack of systematic duplicate checking, resulting in financial loss and vendor confusion | Financial | 4 | 2 | 8 | Manual review by AP clerk | Partial | 6 | Medium | Implement automated duplicate detection in ERP |
| R-002 | Risk that fraudulent invoices are paid due to inadequate vendor verification, resulting in financial loss | Financial | 3 | 4 | 12 | Vendor master approval process | Partial | 9 | Medium | Implement vendor validation callbacks for new vendors and bank changes |
| R-003 | Risk that invoices are paid without proper authorization due to approval limit bypass, resulting in policy violation and potential fraud | Compliance | 3 | 3 | 9 | System-enforced approval limits | Effective | 4 | Low | Continue monitoring; periodic limit review |
| R-004 | Risk that payments are delayed due to three-way match exceptions, resulting in vendor relationship damage and late payment penalties | Operational | 4 | 2 | 8 | Weekly exception report review | Partial | 6 | Medium | Automate exception routing; set aging thresholds |
| R-005 | Risk that vendor master data is modified inappropriately due to inadequate segregation of duties, resulting in fraudulent payments | Financial | 2 | 5 | 10 | Quarterly vendor master audit | Partial | 7 | Medium | Implement dual approval for bank account changes |

### Summary

- **Total risks identified:** 5
- **Critical risks:** 0
- **High risks:** 0
- **Medium risks:** 4
- **Low risks:** 1

#### Top 3 Priority Risks

1. **R-002 (Fraudulent invoices):** Implement vendor validation callbacks for all new vendors and any bank account change requests. Consider third-party verification service.

2. **R-005 (Vendor master changes):** Implement dual approval requirement for any bank account modifications. Add real-time alerts for vendor master changes.

3. **R-001 (Duplicate payments):** Deploy automated duplicate detection based on invoice number, amount, and vendor combination. Review historical payments for recovery opportunities.

#### Key Themes

The assessment reveals a pattern of partial reliance on manual controls in an area susceptible to fraud. The combination of vendor master control weaknesses (R-002, R-005) and payment processing gaps (R-001) creates a fraud triangle opportunity. Recommended focus: strengthen preventive controls around vendor validation and payment authorization, complemented by automated detection capabilities.

---

## Example 2: Employee Onboarding Process

**Source document:** HR Onboarding Procedure Document (fictional)

### Context
Technology company's employee onboarding process covering offer acceptance through first-day completion, including background checks, system access provisioning, and compliance training.

### Risk Register

| ID | Risk Statement | Category | L | I | Inherent | Controls | Eff. | Residual | Level | Actions |
|----|----------------|----------|---|---|----------|----------|------|----------|-------|---------|
| R-001 | Risk that employees start before background check completion due to hiring timeline pressure, resulting in security exposure and compliance violation | Compliance | 3 | 4 | 12 | HR checklist requires completion | Partial | 9 | Medium | Implement system block preventing Day 1 access without cleared background check |
| R-002 | Risk that excessive system access is provisioned due to role-based access templates being outdated, resulting in segregation of duties violations | Technology | 4 | 3 | 12 | Annual access template review | Ineffective | 12 | High | Quarterly template review; implement access certification for new hires at 30 days |
| R-003 | Risk that compliance training is not completed timely due to lack of tracking mechanism, resulting in regulatory violations | Compliance | 4 | 3 | 12 | Manager follow-up | Partial | 9 | Medium | Implement LMS with automated reminders and escalation |
| R-004 | Risk that terminated employee access remains active due to delayed offboarding notification, resulting in unauthorized access | Technology | 3 | 5 | 15 | HR-IT termination process | Partial | 10 | High | Same-day termination notification SLA; automated AD integration |
| R-005 | Risk that I-9 documentation is not completed within 3 days due to decentralized process, resulting in regulatory fines | Compliance | 3 | 3 | 9 | HR checklist | Effective | 4 | Low | Maintain current process; monitor compliance rate |
| R-006 | Risk that confidential employee information is exposed due to onboarding packet handling, resulting in privacy violation | Compliance | 2 | 4 | 8 | Secure document handling policy | Partial | 6 | Medium | Migrate to digital onboarding platform with encryption |

### Summary

- **Total risks identified:** 6
- **Critical risks:** 0
- **High risks:** 2
- **Medium risks:** 3
- **Low risks:** 1

#### Top 3 Priority Risks

1. **R-004 (Terminated employee access):** Implement automated integration between HRIS and Active Directory for real-time access termination. Establish same-day SLA for manual notifications with escalation.

2. **R-002 (Excessive access provisioning):** Conduct immediate review of role-based access templates. Implement 30-day access certification for all new hires. Establish quarterly template review cadence.

3. **R-001 (Background check timing):** Configure system access provisioning to require background check clearance flag. No exceptions without CISO and HR VP approval.

#### Key Themes

Access management emerges as the primary risk theme, with vulnerabilities at both onboarding (excessive access) and offboarding (delayed revocation) creating a continuous exposure window. The reliance on manual checklists and annual reviews is insufficient for a technology company where access risks translate directly to data breach exposure. Recommended focus: automation of access lifecycle with integration between HR and IT systems.

---

## Example 3: Vendor Risk Assessment

**Source document:** Third-Party Risk Management Policy (fictional)

### Context
Financial services firm's process for assessing and monitoring third-party vendors, particularly those with access to customer data or critical business processes.

### Risk Register

| ID | Risk Statement | Category | L | I | Inherent | Controls | Eff. | Residual | Level | Actions |
|----|----------------|----------|---|---|----------|----------|------|----------|-------|---------|
| R-001 | Risk that critical vendor experiences service disruption due to financial instability, resulting in business continuity impact | Operational | 3 | 5 | 15 | Annual financial review | Partial | 12 | High | Implement continuous monitoring via financial health service; update BCP for critical vendors |
| R-002 | Risk that vendor data breach exposes customer PII due to inadequate vendor security controls, resulting in regulatory fines and reputational damage | Technology | 4 | 5 | 20 | Initial SOC 2 review | Partial | 15 | High | Require annual SOC 2, implement right-to-audit clause exercise, add breach notification SLA |
| R-003 | Risk that fourth-party (subcontractor) introduces uncontrolled risk due to lack of visibility, resulting in compliance gaps and security exposure | Compliance | 4 | 4 | 16 | Contractual subcontractor notification | Ineffective | 16 | Critical | Require subcontractor disclosure and approval; extend security requirements to fourth parties |
| R-004 | Risk that vendor contract terms expose organization to unfavorable liability due to inadequate legal review, resulting in financial loss | Financial | 2 | 4 | 8 | Legal review for contracts >$100K | Effective | 4 | Low | Maintain current process; consider lowering threshold to $50K |
| R-005 | Risk that vendor performance issues go undetected due to lack of ongoing monitoring, resulting in service degradation | Operational | 4 | 3 | 12 | Quarterly business review for top 10 vendors | Partial | 9 | Medium | Implement SLA dashboards; extend monitoring to top 25 vendors |
| R-006 | Risk that regulatory requirements are not flowed down to vendors due to incomplete contract terms, resulting in compliance violations | Compliance | 3 | 4 | 12 | Standard contract template | Partial | 9 | Medium | Review and update standard terms for current regulations; implement compliance addendum |

### Summary

- **Total risks identified:** 6
- **Critical risks:** 1
- **High risks:** 2
- **Medium risks:** 2
- **Low risks:** 1

#### Top 3 Priority Risks

1. **R-003 (Fourth-party risk):** CRITICAL. Current controls are ineffective. Implement mandatory subcontractor disclosure and approval process. Require contractual flow-down of security and compliance requirements. Consider fourth-party mapping exercise for critical vendors.

2. **R-002 (Vendor data breach):** Exercise right-to-audit clause for top 5 data-handling vendors. Implement vendor security rating service. Add 24-hour breach notification requirement to contracts.

3. **R-001 (Vendor financial instability):** Subscribe to continuous financial monitoring for critical vendors. Develop contingency plans for top 10 vendors. Consider escrow arrangements for custom software.

#### Key Themes

The assessment reveals significant concentration of risk in extended enterprise relationships. The critical fourth-party risk (R-003) combined with vendor data breach exposure (R-002) indicates that the organization's security perimeter effectively extends to entities over which it has limited visibility and control. The "assess once, monitor rarely" approach is inadequate for the current threat environment. Recommended focus: shift from point-in-time assessment to continuous monitoring, with particular attention to the subcontractor ecosystem.

---

## Output Quality Checklist

When producing risk assessments, verify:

- [ ] Risk statements follow "Risk that [event] due to [cause], resulting in [consequence]" format
- [ ] All risks have likelihood and impact scores with rationale
- [ ] Existing controls are identified from source documents
- [ ] Control effectiveness assessment is justified
- [ ] Residual risk correctly reflects control effectiveness
- [ ] Risks are sorted by residual risk score (descending)
- [ ] Top 3 priority risks have specific, actionable recommendations
- [ ] Key themes narrative synthesizes patterns across individual risks
- [ ] Assumptions and limitations are documented

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-02-01 | auditclaw-community | Initial version |
