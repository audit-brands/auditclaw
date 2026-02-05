// AuditClaw: Messaging channels removed. Stub implementation.

export const WA_WEB_AUTH_DIR = "";

export function webAuthExists(): boolean {
  return false;
}

export async function logWebSelfId(): Promise<void> {
  // Stub
}

export async function loginWeb(): Promise<void> {
  throw new Error("WhatsApp login is not available in AuditClaw");
}

export async function createWaSocket(): Promise<null> {
  return null;
}

export async function monitorWebChannel(): Promise<void> {
  throw new Error("WhatsApp is not available in AuditClaw");
}

export async function monitorWebInbox(): Promise<void> {
  throw new Error("WhatsApp is not available in AuditClaw");
}

export async function pickWebChannel(): Promise<null> {
  return null;
}

export async function sendMessageWhatsApp(..._args: unknown[]): Promise<void> {
  throw new Error("WhatsApp messaging is not available in AuditClaw");
}

export async function waitForWaConnection(): Promise<void> {
  throw new Error("WhatsApp is not available in AuditClaw");
}
