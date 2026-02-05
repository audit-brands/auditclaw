import type { OutboundSendDeps } from "../infra/outbound/deliver.js";

// AuditClaw: Messaging channels removed. These are stub implementations.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SendMessageFn = (...args: any[]) => Promise<void>;

const stubSendMessage: SendMessageFn = async () => {
  throw new Error("Messaging channels are not available in AuditClaw");
};

export type CliDeps = {
  sendMessageWhatsApp: SendMessageFn;
  sendMessageTelegram: SendMessageFn;
  sendMessageDiscord: SendMessageFn;
  sendMessageSlack: SendMessageFn;
  sendMessageSignal: SendMessageFn;
  sendMessageIMessage: SendMessageFn;
};

export function createDefaultDeps(): CliDeps {
  return {
    sendMessageWhatsApp: stubSendMessage,
    sendMessageTelegram: stubSendMessage,
    sendMessageDiscord: stubSendMessage,
    sendMessageSlack: stubSendMessage,
    sendMessageSignal: stubSendMessage,
    sendMessageIMessage: stubSendMessage,
  };
}

// Provider docking: extend this mapping when adding new outbound send deps.
export function createOutboundSendDeps(deps: CliDeps): OutboundSendDeps {
  return {
    sendWhatsApp: deps.sendMessageWhatsApp,
    sendTelegram: deps.sendMessageTelegram,
    sendDiscord: deps.sendMessageDiscord,
    sendSlack: deps.sendMessageSlack,
    sendSignal: deps.sendMessageSignal,
    sendIMessage: deps.sendMessageIMessage,
  };
}

export const logWebSelfId = async () => {
  // Stub - WhatsApp web login not available
};
