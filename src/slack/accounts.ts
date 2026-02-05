// AuditClaw: Messaging channels removed. Stub implementation.

import type { OpenClawConfig } from "../config/config.js";

export type ResolvedSlackAccount = {
  accountId: string;
  dm?: { allowFrom?: Array<string | number> };
  config: {
    dms?: Record<string, unknown>;
    channels?: Record<string, { users?: Array<string | number> }>;
  };
};

export function resolveSlackAccount(_params: {
  cfg: OpenClawConfig;
  accountId?: string | null;
}): ResolvedSlackAccount {
  return { accountId: "", dm: { allowFrom: [] }, config: { dms: {}, channels: {} } };
}

export function listSlackAccountIds(_cfg: OpenClawConfig): string[] {
  return [];
}

export function listEnabledSlackAccounts(_cfg: OpenClawConfig): string[] {
  return [];
}

export function resolveDefaultSlackAccountId(_cfg: OpenClawConfig): string {
  return "";
}

export function resolveSlackReplyToMode(
  _account: ResolvedSlackAccount,
  _chatType?: string | null,
): string {
  return "off";
}
