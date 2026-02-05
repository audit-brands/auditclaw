// AuditClaw: Messaging channels removed. Stub implementation.

import type { OpenClawConfig } from "../config/config.js";

export type ResolvedSignalAccount = {
  accountId: string;
  config: {
    allowFrom?: Array<string | number>;
  };
};

export function resolveSignalAccount(_params: {
  cfg: OpenClawConfig;
  accountId?: string | null;
}): ResolvedSignalAccount {
  return { accountId: "", config: { allowFrom: [] } };
}

export function listSignalAccountIds(_cfg: OpenClawConfig): string[] {
  return [];
}

export function resolveDefaultSignalAccountId(_cfg: OpenClawConfig): string {
  return "";
}
