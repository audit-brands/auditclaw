// AuditClaw: Messaging channels removed. Stub implementation.

import type { OpenClawConfig } from "../config/config.js";

export type ResolvedLineAccount = {
  accountId: string;
};

export type LineChannelData = Record<string, unknown>;

export function resolveLineAccount(_params: {
  cfg: OpenClawConfig;
  accountId?: string | null;
}): ResolvedLineAccount {
  return { accountId: "" };
}

export function listLineAccountIds(_cfg: OpenClawConfig): string[] {
  return [];
}

export function resolveDefaultLineAccountId(_cfg: OpenClawConfig): string {
  return "";
}

export function normalizeAccountId(_accountId: string): string {
  return "";
}
