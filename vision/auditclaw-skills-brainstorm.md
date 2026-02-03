# AuditClaw Skills Brainstorm

A comprehensive catalog of skills for internal auditors, designed to be implemented as AgentSkills-compatible modules for AuditClaw.

**Total Skills Identified:** 123

---

## Table of Contents

1. [Core Audit Process Skills](#core-audit-process-skills)
2. [Risk Assessment Specializations](#risk-assessment-specializations)
3. [SOX and Financial Audit](#sox-and-financial-audit)
4. [IT Audit](#it-audit)
5. [Operational Audit](#operational-audit)
6. [Compliance Audit](#compliance-audit)
7. [Fraud and Investigation](#fraud-and-investigation)
8. [Data Analytics](#data-analytics)
9. [Communication and Reporting](#communication-and-reporting)
10. [Audit Management](#audit-management)
11. [Specialized Domains](#specialized-domains)
12. [Document Analysis](#document-analysis)
13. [Frameworks and Standards](#frameworks-and-standards)
14. [Summary Statistics](#summary-statistics)
15. [Implementation Priority](#implementation-priority)

---

## Core Audit Process Skills

These skills cover the fundamental audit lifecycle from planning through reporting.

| # | Skill Name | Description | IIA Standard |
|---|------------|-------------|--------------|
| 1 | `risk-assessment` | Identify and rank risks from uploaded documents. Produces structured risk registers with likelihood, impact, and recommended actions. | 2010, 2120 |
| 2 | `audit-planning` | Develop audit scope, objectives, timeline, and resource allocation. Creates engagement planning memos. | 2200 |
| 3 | `audit-program` | Create detailed test procedures from risk assessments. Links risks to specific audit steps. | 2240 |
| 4 | `walkthrough-documentation` | Document process walkthroughs with narratives and flowcharts. Captures key controls and decision points. | 2310 |
| 5 | `control-identification` | Extract and catalog controls from process documentation. Maps controls to objectives and risks. | 2120 |
| 6 | `control-evaluation` | Assess control design adequacy against stated objectives. Identifies design gaps. | 2120 |
| 7 | `sample-selection` | Calculate statistically valid sample sizes and select items for testing. Supports attribute and variable sampling. | 2320 |
| 8 | `workpaper-documentation` | Structure and document audit evidence according to professional standards. Ensures completeness and clarity. | 2330 |
| 9 | `testing-execution` | Guide test execution and evidence collection. Provides step-by-step testing instructions. | 2300 |
| 10 | `exception-analysis` | Analyze test exceptions and determine root causes. Distinguishes isolated errors from systemic issues. | 2320 |
| 11 | `finding-writer` | Draft audit findings with condition, criteria, cause, effect, and recommendation (5 Cs). | 2410 |
| 12 | `finding-rating` | Assign severity ratings to findings consistently using defined criteria. | 2410 |
| 13 | `report-drafting` | Compile findings into executive-ready audit reports with appropriate tone and structure. | 2400 |
| 14 | `management-response` | Evaluate and challenge management action plans for adequacy and timeliness. | 2500 |
| 15 | `issue-tracking` | Monitor remediation status and validate issue closure. Tracks aging and escalations. | 2500 |
| 16 | `quality-review` | Perform supervisory review of workpapers and findings. Identifies gaps and improvement areas. | 2340 |

---

## Risk Assessment Specializations

Specialized approaches to risk assessment for different contexts.

| # | Skill Name | Description | Framework Alignment |
|---|------------|-------------|---------------------|
| 17 | `inherent-risk-assessment` | Assess risk exposure before considering the effect of controls. Establishes baseline risk. | COSO ERM |
| 18 | `control-risk-assessment` | Evaluate the likelihood that controls will fail to prevent or detect errors. | COSO ERM |
| 19 | `fraud-risk-assessment` | Apply fraud triangle (pressure, opportunity, rationalization) to identify potential fraud schemes by process area. | ACFE, SAS 99 |
| 20 | `it-risk-assessment` | Assess technology-specific risks including availability, confidentiality, integrity, and compliance. | COBIT, NIST |
| 21 | `third-party-risk-assessment` | Evaluate vendor, supplier, and partner risks. Considers concentration, criticality, and data access. | Shared Assessments |
| 22 | `emerging-risk-identification` | Identify new and evolving risks from external sources, industry trends, and horizon scanning. | COSO ERM |
| 23 | `risk-appetite-alignment` | Map identified risks to organizational risk appetite statements. Identifies risks outside tolerance. | COSO ERM |
| 24 | `scenario-analysis` | Develop and assess risk scenarios including likelihood, impact, and velocity. | ISO 31000 |
| 25 | `key-risk-indicator` | Design key risk indicators (KRIs) for ongoing risk monitoring. Establishes thresholds and escalation triggers. | COSO ERM |

---

## SOX and Financial Audit

Skills specific to Sarbanes-Oxley compliance and financial statement audits.

| # | Skill Name | Description | Regulatory Reference |
|---|------------|-------------|---------------------|
| 26 | `sox-scoping` | Determine in-scope accounts, locations, and controls based on materiality and risk. | PCAOB AS 2201 |
| 27 | `sox-control-testing` | Design and execute SOX 404 test procedures for design and operating effectiveness. | PCAOB AS 2201 |
| 28 | `sox-deficiency-evaluation` | Classify control deficiencies as control deficiency, significant deficiency, or material weakness. | PCAOB AS 2201 |
| 29 | `sox-documentation` | Prepare SOX-compliant control documentation including RCMs, narratives, and flowcharts. | PCAOB AS 2201 |
| 30 | `management-review-control` | Evaluate management review control (MRC) precision and completeness of information produced by entity (IPE). | PCAOB AS 2201 |
| 31 | `journal-entry-testing` | Design tests for journal entry controls including access, approval, and unusual entry identification. | PCAOB AS 2401 |
| 32 | `segregation-of-duties` | Analyze segregation of duties conflicts across systems. Design compensating controls where needed. | COSO |
| 33 | `account-reconciliation-review` | Evaluate reconciliation controls for completeness, timeliness, and investigation of differences. | PCAOB AS 2201 |
| 34 | `financial-close-assessment` | Assess month-end, quarter-end, and year-end close processes for control and efficiency. | PCAOB AS 2201 |
| 35 | `ipe-validation` | Validate information produced by entity (IPE) used in control execution. Tests completeness and accuracy. | PCAOB AS 2201 |
| 36 | `system-generated-report-testing` | Test reliability of system-generated reports used as evidence in control operation. | PCAOB AS 2201 |

---

## IT Audit

Skills for auditing technology environments, systems, and controls.

| # | Skill Name | Description | Framework Alignment |
|---|------------|-------------|---------------------|
| 37 | `itgc-assessment` | Evaluate IT general controls across access management, change management, and IT operations. | COBIT, SOC 1 |
| 38 | `access-control-review` | Analyze user access appropriateness including provisioning, periodic review, and termination. | COBIT, NIST |
| 39 | `privileged-access-review` | Evaluate administrative and privileged account controls including monitoring and justification. | COBIT, CIS |
| 40 | `change-management-audit` | Assess SDLC and change control processes including authorization, testing, and segregation. | COBIT, ITIL |
| 41 | `data-center-audit` | Evaluate physical and environmental controls including access, fire suppression, and power. | COBIT, TIA-942 |
| 42 | `backup-recovery-audit` | Assess backup procedures, retention, and disaster recovery capabilities including testing. | COBIT, ISO 22301 |
| 43 | `cybersecurity-assessment` | Evaluate security controls against established frameworks. Identifies gaps and vulnerabilities. | NIST CSF, CIS |
| 44 | `vulnerability-assessment-review` | Analyze vulnerability scan results. Prioritize remediation based on risk and exploitability. | CVSS, NIST |
| 45 | `penetration-test-review` | Interpret and validate penetration test findings. Assess remediation adequacy. | PTES, OWASP |
| 46 | `cloud-security-audit` | Assess cloud configuration and shared responsibility model compliance. | CSA CCM, CIS Benchmarks |
| 47 | `network-security-review` | Evaluate network architecture, segmentation, and perimeter controls. | NIST, CIS |
| 48 | `database-security-audit` | Assess database access controls, encryption, and configuration hardening. | CIS Benchmarks |
| 49 | `application-control-review` | Evaluate input validation, processing controls, and output controls within applications. | COBIT |
| 50 | `soc-report-review` | Analyze SOC 1 and SOC 2 reports. Map complementary user entity controls (CUECs). | AICPA |
| 51 | `it-project-audit` | Assess IT project governance, delivery methodology, and risk management. | PMBOK, COBIT |
| 52 | `data-privacy-audit` | Evaluate GDPR, CCPA, and other privacy regulation compliance. Assess data handling practices. | GDPR, CCPA |
| 53 | `ai-ml-audit` | Assess AI and machine learning model governance, bias, explainability, and controls. | NIST AI RMF |

---

## Operational Audit

Skills for auditing business operations and processes.

| # | Skill Name | Description | Process Area |
|---|------------|-------------|--------------|
| 54 | `process-efficiency-analysis` | Identify process waste, bottlenecks, and improvement opportunities using lean principles. | All |
| 55 | `procurement-audit` | Evaluate purchasing processes including vendor selection, competitive bidding, and approval. | Procure-to-Pay |
| 56 | `inventory-audit` | Assess inventory management controls including counts, valuation, and obsolescence. | Inventory |
| 57 | `payroll-audit` | Evaluate payroll processing controls including authorization, calculation, and disbursement. | HR/Payroll |
| 58 | `expense-audit` | Assess travel and expense policies and compliance. Identify policy violations and fraud indicators. | T&E |
| 59 | `revenue-cycle-audit` | Evaluate order-to-cash processes including credit, billing, and collections. | Order-to-Cash |
| 60 | `accounts-payable-audit` | Assess procure-to-pay controls including invoice processing, matching, and payment. | Procure-to-Pay |
| 61 | `fixed-assets-audit` | Evaluate capital asset management including acquisition, depreciation, and disposal. | Fixed Assets |
| 62 | `treasury-audit` | Assess cash management, banking relationships, and investment controls. | Treasury |
| 63 | `contract-compliance-audit` | Evaluate adherence to contract terms including pricing, SLAs, and obligations. | Contract Management |
| 64 | `hr-audit` | Assess human resources processes including hiring, performance management, and termination. | Human Resources |
| 65 | `facilities-audit` | Evaluate physical security, safety compliance, and facilities management. | Facilities |
| 66 | `supply-chain-audit` | Assess supply chain risks, resilience, and controls including logistics and distribution. | Supply Chain |
| 67 | `manufacturing-audit` | Evaluate production controls, quality management, and equipment maintenance. | Manufacturing |

---

## Compliance Audit

Skills for regulatory and policy compliance assessment.

| # | Skill Name | Description | Regulatory Domain |
|---|------------|-------------|-------------------|
| 68 | `regulatory-mapping` | Map regulatory requirements to existing controls and processes. Identify compliance gaps. | Multiple |
| 69 | `policy-compliance-review` | Assess adherence to internal policies and procedures. Document deviations. | Internal |
| 70 | `license-permit-audit` | Verify business license, permit, and certification compliance and renewals. | Multiple |
| 71 | `aml-bsa-audit` | Evaluate anti-money laundering and Bank Secrecy Act controls including CDD and SAR filing. | BSA/AML |
| 72 | `sanctions-screening-audit` | Assess OFAC and international sanctions screening processes and controls. | OFAC |
| 73 | `environmental-compliance-audit` | Evaluate environmental regulation adherence including permits, reporting, and waste management. | EPA, State |
| 74 | `health-safety-audit` | Assess OSHA and workplace safety compliance including training and incident management. | OSHA |
| 75 | `export-control-audit` | Evaluate export compliance including ITAR, EAR, and deemed export controls. | ITAR, EAR |
| 76 | `hipaa-audit` | Assess healthcare privacy and security rule compliance including PHI handling. | HIPAA |
| 77 | `pci-dss-audit` | Evaluate payment card industry data security standard compliance. | PCI DSS |

---

## Fraud and Investigation

Skills for fraud prevention, detection, and investigation.

| # | Skill Name | Description | ACFE Alignment |
|---|------------|-------------|----------------|
| 78 | `fraud-scheme-identification` | Identify potential fraud schemes specific to each process area using fraud tree methodology. | ACFE Fraud Tree |
| 79 | `data-analytics-fraud` | Design data analytics routines to detect fraud patterns, anomalies, and red flags. | ACFE |
| 80 | `investigation-planning` | Plan fraud investigation approach including scope, resources, and legal considerations. | ACFE |
| 81 | `interview-planning` | Prepare investigation interview questions and strategy. Covers admission-seeking techniques. | ACFE |
| 82 | `evidence-preservation` | Guide evidence collection, documentation, and chain of custody procedures. | ACFE |
| 83 | `benford-analysis` | Apply Benford's Law to detect anomalies in numerical data distributions. | Data Analytics |
| 84 | `red-flag-identification` | Identify behavioral and transactional fraud indicators in data and documentation. | ACFE |

---

## Data Analytics

Skills for audit data analytics and continuous monitoring.

| # | Skill Name | Description | Technique |
|---|------------|-------------|-----------|
| 85 | `data-request-generator` | Create data extraction specifications including field definitions, formats, and validation rules. | Data Management |
| 86 | `data-profiling` | Analyze data quality, completeness, accuracy, and consistency. Identify data issues. | Data Quality |
| 87 | `continuous-auditing-design` | Design automated monitoring routines for ongoing risk and control assessment. | Continuous Auditing |
| 88 | `anomaly-detection` | Identify statistical outliers and unusual patterns in transactional data. | Statistical Analysis |
| 89 | `duplicate-detection` | Find duplicate payments, invoices, records using fuzzy matching and exact match techniques. | Data Matching |
| 90 | `gap-sequence-testing` | Identify gaps and duplicates in sequential data (check numbers, invoice numbers, etc.). | Sequence Analysis |
| 91 | `trend-analysis` | Analyze data trends over time to identify unusual patterns and seasonality deviations. | Time Series |
| 92 | `population-stratification` | Segment populations for targeted testing based on risk characteristics. | Stratified Sampling |

---

## Communication and Reporting

Skills for effective audit communication.

| # | Skill Name | Description | Audience |
|---|------------|-------------|----------|
| 93 | `executive-summary-writer` | Distill complex findings into concise executive summaries for senior leadership. | Executives |
| 94 | `audit-committee-presentation` | Prepare board and audit committee presentations with appropriate content and tone. | Board/Committee |
| 95 | `finding-negotiation` | Facilitate productive finding discussions with management. Navigate disagreements constructively. | Management |
| 96 | `root-cause-analysis` | Apply structured techniques (5-whys, fishbone, fault tree) to identify true root causes. | All |
| 97 | `recommendation-development` | Craft actionable, specific, measurable recommendations that address root causes. | Management |
| 98 | `benchmarking-analysis` | Compare practices and performance against industry standards and peer organizations. | All |

---

## Audit Management

Skills for managing the internal audit function.

| # | Skill Name | Description | IIA Standard |
|---|------------|-------------|--------------|
| 99 | `annual-audit-plan` | Develop risk-based annual audit plan aligned with organizational strategy and risk profile. | 2010 |
| 100 | `resource-estimation` | Estimate audit hours, staffing needs, and budget based on scope and complexity. | 2030 |
| 101 | `stakeholder-analysis` | Map key stakeholders, their interests, and communication preferences. | 2000 |
| 102 | `audit-universe-maintenance` | Maintain and update the audit universe based on organizational changes and risk assessment. | 2010 |
| 103 | `qa-improvement-program` | Assess internal audit quality and conformance with IIA Standards (QAIP). | 1300 |
| 104 | `co-sourcing-management` | Manage external audit resource relationships including scope, oversight, and quality. | 2070 |

---

## Specialized Domains

Skills for emerging and specialized audit areas.

| # | Skill Name | Description | Domain |
|---|------------|-------------|--------|
| 105 | `esg-audit` | Assess environmental, social, and governance practices and controls. | ESG |
| 106 | `sustainability-reporting-audit` | Evaluate ESG and sustainability disclosures for accuracy and completeness. | ESG Reporting |
| 107 | `m-and-a-due-diligence` | Conduct pre-acquisition due diligence covering financial, operational, and compliance risks. | M&A |
| 108 | `post-acquisition-audit` | Assess integration execution, synergy realization, and control environment post-close. | M&A |
| 109 | `business-continuity-audit` | Evaluate business continuity and disaster recovery plans, testing, and readiness. | BCM |
| 110 | `crisis-management-audit` | Assess crisis response capabilities, plans, and communication protocols. | Crisis Management |
| 111 | `ethics-hotline-audit` | Evaluate whistleblower program effectiveness including intake, investigation, and resolution. | Ethics |
| 112 | `culture-assessment` | Assess organizational culture indicators through surveys, interviews, and behavioral analysis. | Culture |
| 113 | `governance-assessment` | Evaluate board and committee effectiveness, composition, and oversight practices. | Governance |

---

## Document Analysis

Skills for analyzing audit-relevant documents.

| # | Skill Name | Description | Document Type |
|---|------------|-------------|---------------|
| 114 | `contract-analysis` | Extract key terms, obligations, risks, and compliance requirements from contracts. | Contracts |
| 115 | `policy-gap-analysis` | Compare policies against regulatory requirements, frameworks, or best practices. | Policies |
| 116 | `procedure-adequacy-review` | Assess whether procedures adequately address policy requirements and control objectives. | Procedures |
| 117 | `evidence-sufficiency-evaluation` | Determine if collected evidence is sufficient, relevant, and reliable to support conclusions. | Workpapers |
| 118 | `minutes-review` | Analyze board and committee minutes for governance, decisions, and follow-up items. | Minutes |

---

## Frameworks and Standards

Skills for framework-based assessments.

| # | Skill Name | Description | Framework |
|---|------------|-------------|-----------|
| 119 | `coso-icf-mapping` | Map controls to COSO Internal Control Framework components and principles. | COSO ICF |
| 120 | `cobit-assessment` | Assess IT governance and management against COBIT objectives and practices. | COBIT 2019 |
| 121 | `nist-csf-assessment` | Evaluate cybersecurity program against NIST Cybersecurity Framework functions. | NIST CSF |
| 122 | `iso-27001-assessment` | Assess information security management system against ISO 27001 requirements. | ISO 27001 |
| 123 | `iia-standards-compliance` | Ensure internal audit work conforms to IIA International Standards. | IIA Standards |

---

## Summary Statistics

### Skills by Category

| Category | Count | Percentage |
|----------|-------|------------|
| Core Audit Process | 16 | 13% |
| Risk Assessment Specializations | 9 | 7% |
| SOX and Financial Audit | 11 | 9% |
| IT Audit | 17 | 14% |
| Operational Audit | 14 | 11% |
| Compliance Audit | 10 | 8% |
| Fraud and Investigation | 7 | 6% |
| Data Analytics | 8 | 7% |
| Communication and Reporting | 6 | 5% |
| Audit Management | 6 | 5% |
| Specialized Domains | 9 | 7% |
| Document Analysis | 5 | 4% |
| Frameworks and Standards | 5 | 4% |
| **Total** | **123** | **100%** |

### Skills by Complexity

| Complexity | Description | Estimated Count |
|------------|-------------|-----------------|
| Low | Single-purpose, straightforward output | ~40 |
| Medium | Multiple steps, moderate judgment required | ~55 |
| High | Complex analysis, significant domain expertise | ~28 |

---

## Implementation Priority

### Tier 1: Foundation (Build First)

High-frequency, foundational skills that enable other work.

| Priority | Skill | Rationale |
|----------|-------|-----------|
| 1 | `risk-assessment` | ✅ Complete — Foundation for audit planning |
| 2 | `finding-writer` | Highest daily use; visible output |
| 3 | `audit-program` | Connects risk assessment to testing |
| 4 | `control-identification` | Foundation for control-based skills |
| 5 | `sample-selection` | Frequently needed; quantitative |
| 6 | `workpaper-documentation` | Quality driver across all audits |

### Tier 2: Core Expansion

Essential skills for common audit types.

| Priority | Skill | Rationale |
|----------|-------|-----------|
| 7 | `sox-control-testing` | High demand in public companies |
| 8 | `executive-summary-writer` | High visibility output |
| 9 | `walkthrough-documentation` | Used in every process audit |
| 10 | `soc-report-review` | Growing need with cloud adoption |
| 11 | `control-evaluation` | Core to all control testing |
| 12 | `exception-analysis` | Needed after every test |

### Tier 3: Specialized Value

Differentiated capabilities for specific needs.

| Priority | Skill | Rationale |
|----------|-------|-----------|
| 13 | `data-analytics-fraud` | Differentiating capability |
| 14 | `contract-analysis` | Broad applicability |
| 15 | `fraud-risk-assessment` | High value, specialized |
| 16 | `itgc-assessment` | IT audit foundation |
| 17 | `cybersecurity-assessment` | Growing demand |
| 18 | `regulatory-mapping` | Compliance foundation |

### Tier 4: Advanced/Emerging

Specialized and emerging areas.

| Priority | Skill | Rationale |
|----------|-------|-----------|
| 19+ | `ai-ml-audit` | Emerging area |
| 19+ | `esg-audit` | Growing regulatory focus |
| 19+ | `culture-assessment` | Specialized capability |
| 19+ | `continuous-auditing-design` | Advanced analytics |

---

## Contributing

This brainstorm is a living document. To suggest additions or modifications:

1. Open an issue describing the proposed skill
2. Include: skill name, description, category, and rationale
3. Reference relevant standards or frameworks
4. Submit a pull request if you've developed the skill

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-02-01 | Initial brainstorm with 123 skills |

---

*This document is maintained by the AuditClaw community. Skills are designed for compatibility with the AgentSkills standard and OpenClaw platform.*
