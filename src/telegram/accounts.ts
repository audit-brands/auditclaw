// AuditClaw: Messaging channels removed. Stub implementation.

import type { OpenClawConfig } from "../config/config.js";

export type ResolvedTelegramAccount = {
  accountId: string;
  config: {
    allowFrom?: Array<string | number>;
    dms?: Record<string, unknown>;
    groups?: Record<string, unknown>;
  };
};

export function resolveTelegramAccount(_params: {
  cfg: OpenClawConfig;
  accountId?: string | null;
}): ResolvedTelegramAccount {
  return { accountId: "", config: { allowFrom: [], dms: {}, groups: {} } };
}

export function listTelegramAccountIds(_cfg: OpenClawConfig): string[] {
  return [];
}

export function resolveDefaultTelegramAccountId(_cfg: OpenClawConfig): string {
  return "";
}
