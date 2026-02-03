# Contributing to the Risk Assessment Skill

Thank you for your interest in improving this skill! This document provides guidelines for contributing to the risk-assessment skill.

## How to Contribute

### Reporting Issues

If you find a problem with the skill:

1. Check existing issues to avoid duplicates
2. Create a new issue with:
   - Clear description of the problem
   - Steps to reproduce (if applicable)
   - Expected vs. actual behavior
   - Relevant context (document types, edge cases)

### Suggesting Enhancements

For new features or improvements:

1. Open an issue describing the enhancement
2. Explain the use case and why it would benefit auditors
3. Reference any relevant standards or frameworks (COSO, IIA, ISO)
4. Wait for discussion before starting implementation

### Submitting Changes

1. **Fork the repository**
2. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** following the guidelines below
4. **Test your changes** with representative documents
5. **Commit with clear messages**:
   ```bash
   git commit -m "Add: description of what you added"
   git commit -m "Fix: description of what you fixed"
   git commit -m "Update: description of what you changed"
   ```
6. **Push and create a pull request**

---

## Contribution Guidelines

### SKILL.md Changes

When modifying the main skill file:

- **Preserve structure** — Keep the established sections (Purpose, When to Use, Methodology, Output Format)
- **Maintain compatibility** — Changes should not break existing workflows
- **Update version** — Increment version in frontmatter for significant changes
- **Test thoroughly** — Verify the skill produces expected output with sample documents

### Methodology Updates

When updating the risk assessment methodology:

- **Cite sources** — Reference authoritative standards (COSO ERM, ISO 31000, IIA)
- **Explain rationale** — Document why the change improves the methodology
- **Consider impact** — Changes to scales or scoring affect all assessments
- **Maintain consistency** — Ensure alignment across all reference documents

### Adding Reference Documents

When adding to `references/`:

- **Focus content** — Each file should address one topic well
- **Keep it practical** — Include actionable guidance, not just theory
- **Use examples** — Illustrate concepts with realistic scenarios
- **Limit length** — Break large topics into multiple focused files

### Adding Assets

When adding templates or examples to `assets/`:

- **Use markdown** — Prefer `.md` format for portability
- **Make it reusable** — Templates should work across different contexts
- **Include instructions** — Explain how to use the asset
- **Test rendering** — Verify markdown renders correctly

---

## Style Guidelines

### Writing Style

- **Professional but accessible** — Write for auditors of varying experience levels
- **Active voice** — "Assess the control" not "The control should be assessed"
- **Specific guidance** — "Review the last 12 months" not "Review recent history"
- **Consistent terminology** — Use terms consistently throughout

### Formatting

- Use standard markdown syntax
- Use tables for structured data
- Use code blocks for templates and examples
- Keep lines under 120 characters where practical

### Risk Statement Format

All risk statement examples must follow:
> Risk that **[event]** occurs due to **[cause]**, resulting in **[consequence]**

---

## Review Process

### What We Look For

- **Alignment with standards** — Does this reflect accepted risk management practices?
- **Practical utility** — Will this help auditors do their work better?
- **Clarity** — Is the guidance clear and unambiguous?
- **Completeness** — Are edge cases and limitations addressed?
- **Consistency** — Does this fit with existing skill content?

### Review Timeline

- Initial review within 1 week
- Feedback provided via PR comments
- Approval requires at least one maintainer review
- Merges happen after approval and any requested changes

---

## Maintainers

Current maintainers:
- [Add maintainer handles here]

To become a maintainer:
- Demonstrate consistent, quality contributions
- Show understanding of audit/risk management principles
- Be nominated by an existing maintainer

---

## Code of Conduct

### Our Standards

- Be respectful and constructive in all interactions
- Focus on improving the skill, not criticizing individuals
- Welcome newcomers and help them contribute
- Respect differing viewpoints and experience levels

### Unacceptable Behavior

- Harassment, discrimination, or personal attacks
- Trolling or deliberately inflammatory comments
- Sharing others' private information

### Enforcement

Violations may result in:
1. Warning
2. Temporary ban
3. Permanent ban

Report issues to maintainers privately.

---

## Questions?

- Open an issue with the "question" label
- Reach out to maintainers
- Check existing issues and discussions first

---

## License

By contributing, you agree that your contributions will be licensed under the same Apache-2.0 license that covers this project.

---

Thank you for helping improve this skill for the audit community!
