// AuditClaw: Messaging channels removed. Stub implementation.

export async function createDiscordMonitor(): Promise<null> {
  return null;
}

export async function monitorDiscordProvider(): Promise<void> {
  throw new Error("Discord monitoring is not available in AuditClaw");
}
