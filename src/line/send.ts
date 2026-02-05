// AuditClaw: Messaging channels removed. Stub implementation.

export async function sendMessageLine(..._args: unknown[]): Promise<void> {
  throw new Error("LINE messaging is not available in AuditClaw");
}

export async function pushMessageLine(..._args: unknown[]): Promise<void> {
  throw new Error("LINE messaging is not available in AuditClaw");
}

export async function pushMessagesLine(..._args: unknown[]): Promise<void> {
  throw new Error("LINE messaging is not available in AuditClaw");
}

export async function pushFlexMessage(..._args: unknown[]): Promise<void> {
  throw new Error("LINE messaging is not available in AuditClaw");
}

export async function pushTemplateMessage(..._args: unknown[]): Promise<void> {
  throw new Error("LINE messaging is not available in AuditClaw");
}

export async function pushLocationMessage(..._args: unknown[]): Promise<void> {
  throw new Error("LINE messaging is not available in AuditClaw");
}

export async function pushTextMessageWithQuickReplies(..._args: unknown[]): Promise<void> {
  throw new Error("LINE messaging is not available in AuditClaw");
}

export function createQuickReplyItems(_params: unknown): unknown[] {
  return [];
}
