// AuditClaw: Messaging channels removed. Stub implementation.

export async function createTelegramMonitor(): Promise<null> {
  return null;
}

export async function monitorTelegramProvider(): Promise<void> {
  throw new Error("Telegram monitoring is not available in AuditClaw");
}
