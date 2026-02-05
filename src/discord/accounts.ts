// AuditClaw: Messaging channels removed. Stub implementation.

import type { OpenClawConfig } from "../config/config.js";

export type ResolvedDiscordAccount = {
  accountId: string;
  config: {
    dm?: { allowFrom?: Array<string | number> };
    dms?: Record<string, unknown>;
    guilds?: Record<
      string,
      {
        users?: Array<string | number>;
        channels?: Record<string, { users?: Array<string | number> }>;
      }
    >;
  };
};

export function resolveDiscordAccount(_params: {
  cfg: OpenClawConfig;
  accountId?: string | null;
}): ResolvedDiscordAccount {
  return { accountId: "", config: { dm: { allowFrom: [] }, dms: {}, guilds: {} } };
}

export function listDiscordAccountIds(_cfg: OpenClawConfig): string[] {
  return [];
}

export function resolveDefaultDiscordAccountId(_cfg: OpenClawConfig): string {
  return "";
}
