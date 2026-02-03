# AuditClaw Vision

This folder contains the design documents, specifications, and reference materials for the AuditClaw project — a local-first AI assistant for internal auditors, built on OpenClaw.

These documents were developed during the planning phase and serve as the foundation for implementation.

## Contents

### Core Documents

| Document | Description |
|----------|-------------|
| [AUDITCLAW_VISION.md](./AUDITCLAW_VISION.md) | Master vision document — architecture, roadmap, and design decisions |
| [auditclaw-skill-spec.md](./auditclaw-skill-spec.md) | Skill format specification (AgentSkills-compatible with audit extensions) |
| [auditclaw-skills-brainstorm.md](./auditclaw-skills-brainstorm.md) | Complete catalog of 123 identified audit skills across 13 categories |

### Configuration

| Document | Description |
|----------|-------------|
| [docs/CONFIGURATION_GUIDE.md](./docs/CONFIGURATION_GUIDE.md) | Detailed guide to configurable features with trade-offs and deployment scenarios |

### Reference Skills

| Skill | Description |
|-------|-------------|
| [skills/risk-assessment/](./skills/risk-assessment/) | Complete, production-ready skill demonstrating full specification compliance |

## How to Use These Documents

**If you're implementing AuditClaw**, start with `AUDITCLAW_VISION.md`. It contains the architecture overview, development roadmap, and key decisions.

**If you're developing skills**, read `auditclaw-skill-spec.md` for the format specification, then reference `skills/risk-assessment/` as a working example.

**If you're configuring a deployment**, refer to `docs/CONFIGURATION_GUIDE.md` for trade-offs on each configurable feature.

**If you're planning skill development**, `auditclaw-skills-brainstorm.md` has the prioritized catalog.

## Status

These are living documents. They will be updated as implementation progresses and decisions evolve.
