// AuditClaw: Messaging channels removed. Stub implementation.

export async function sendMessageWhatsApp(..._args: unknown[]): Promise<void> {
  throw new Error("WhatsApp messaging is not available in AuditClaw");
}

export async function sendPollWhatsApp(..._args: unknown[]): Promise<void> {
  throw new Error("WhatsApp polling is not available in AuditClaw");
}
