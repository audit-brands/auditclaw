// AuditClaw: Messaging channels removed. Stub implementation.

import type { ChannelId, ChannelOutboundAdapter } from "../types.js";

export function loadChannelOutboundAdapter(
  _channelId: ChannelId,
): ChannelOutboundAdapter | undefined {
  return undefined;
}
