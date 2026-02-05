// AuditClaw: Messaging channels removed. Stub implementation.

export type WebMediaResult = {
  data?: Buffer;
  mimeType?: string;
};

export async function loadWebMedia(_params: unknown): Promise<WebMediaResult | null> {
  return null;
}

export async function optimizeImageToJpeg(_input: Buffer): Promise<Buffer> {
  throw new Error("Media processing not available in AuditClaw");
}
