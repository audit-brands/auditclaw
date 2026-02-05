// AuditClaw: Messaging channels removed. Stub implementation.

import type { OpenClawConfig } from "../config/config.js";

export type ResolvedWhatsAppAccount = {
  accountId: string;
  allowFrom?: Array<string | number>;
  groups?: Record<string, unknown>;
};

export function resolveWhatsAppAccount(_params: {
  cfg: OpenClawConfig;
  accountId?: string | null;
}): ResolvedWhatsAppAccount {
  return { accountId: "", allowFrom: [], groups: {} };
}

export function listWhatsAppAccountIds(_cfg: OpenClawConfig): string[] {
  return [];
}

export function resolveDefaultWhatsAppAccountId(_cfg: OpenClawConfig): string {
  return "";
}

export function hasAnyWhatsAppAuth(): boolean {
  return false;
}
