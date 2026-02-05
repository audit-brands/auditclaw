// AuditClaw: Messaging channels removed. Stub implementation.

export type SignalTextStyleRange = {
  start: number;
  length: number;
  style: string;
};

export function markdownToSignalTextChunks(_text: string): Array<{
  text: string;
  styles?: SignalTextStyleRange[];
}> {
  return [];
}
