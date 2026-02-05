// AuditClaw: Messaging channels removed. Stub implementation.

export async function createLineMonitor(): Promise<null> {
  return null;
}

export async function monitorLineProvider(): Promise<void> {
  throw new Error("LINE monitoring is not available in AuditClaw");
}
