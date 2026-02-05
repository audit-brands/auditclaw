// AuditClaw: Messaging channels removed. Stub implementation.

export async function sendMessageDiscord(..._args: unknown[]): Promise<void> {
  throw new Error("Discord messaging is not available in AuditClaw");
}

export async function sendPollDiscord(..._args: unknown[]): Promise<void> {
  throw new Error("Discord polling is not available in AuditClaw");
}
