// AuditClaw: Messaging channels removed. Stub implementation.

export function handleDiscordMessageAction(): void {
  // Stub - Discord actions not available
}

export async function executeDiscordAction(..._args: unknown[]): Promise<void> {
  throw new Error("Discord actions are not available in AuditClaw");
}

export const discordMessageActions = {};
