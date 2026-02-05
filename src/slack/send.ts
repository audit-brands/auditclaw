// AuditClaw: Messaging channels removed. Stub implementation.

export async function sendMessageSlack(..._args: unknown[]): Promise<void> {
  throw new Error("Slack messaging is not available in AuditClaw");
}
