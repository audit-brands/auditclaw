// AuditClaw: Messaging channels removed. Stub implementation.

export async function createSignalMonitor(): Promise<null> {
  return null;
}

export async function monitorSignalProvider(): Promise<void> {
  throw new Error("Signal monitoring is not available in AuditClaw");
}

export * from "./accounts.js";
export * from "./format.js";
export * from "./reaction-level.js";
export * from "./send.js";
