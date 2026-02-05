// AuditClaw: Messaging channels removed. Stub implementation.

export function getWebAuthStore(): null {
  return null;
}

export function hasWebAuth(): boolean {
  return false;
}

export function webAuthExists(): boolean {
  return false;
}

export function getWebAuthAgeMs(): number {
  return 0;
}

export async function logoutWeb(): Promise<void> {
  // Stub
}

export async function logWebSelfId(): Promise<void> {
  // Stub
}

export function readWebSelfId(): string | null {
  return null;
}
