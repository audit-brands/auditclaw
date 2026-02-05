// AuditClaw: Messaging channels removed. Stub implementation.

export async function createSlackMonitor(): Promise<null> {
  return null;
}

export async function monitorSlackProvider(): Promise<void> {
  throw new Error("Slack monitoring is not available in AuditClaw");
}

export * from "./accounts.js";
export * from "./scopes.js";
export * from "./targets.js";
export * from "./threading-tool-context.js";
