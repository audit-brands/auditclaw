// AuditClaw: Messaging channels removed. Stub implementation.

import type { OpenClawConfig } from "../config/config.js";

export type ResolvedIMessageAccount = {
  accountId: string;
  config: {
    allowFrom?: Array<string | number>;
  };
};

export function resolveIMessageAccount(_params: {
  cfg: OpenClawConfig;
  accountId?: string | null;
}): ResolvedIMessageAccount {
  return { accountId: "", config: { allowFrom: [] } };
}

export function listIMessageAccountIds(_cfg: OpenClawConfig): string[] {
  return [];
}

export function resolveDefaultIMessageAccountId(_cfg: OpenClawConfig): string {
  return "";
}
