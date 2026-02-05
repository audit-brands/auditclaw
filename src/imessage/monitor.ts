// AuditClaw: Messaging channels removed. Stub implementation.

export async function createIMessageMonitor(): Promise<null> {
  return null;
}

export async function monitorIMessageProvider(): Promise<void> {
  throw new Error("iMessage monitoring is not available in AuditClaw");
}
