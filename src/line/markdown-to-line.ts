// AuditClaw: Messaging channels removed. Stub implementation.

export type ProcessedLineMessage = {
  text?: string;
};

export function processLineMessage(_text: string): ProcessedLineMessage {
  return {};
}

export function hasMarkdownToConvert(_text: string): boolean {
  return false;
}

export function stripMarkdown(text: string): string {
  return text;
}
