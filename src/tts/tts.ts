// AuditClaw: Voice/TTS removed. Stub implementation for type compatibility.

import type { ReplyPayload } from "../auto-reply/types.js";
import type { OpenClawConfig } from "../config/config.js";
import type { TtsAutoMode, TtsProvider } from "../config/types.tts.js";

export type ResolvedTtsConfig = {
  auto: TtsAutoMode;
  mode: "final" | "streaming";
  provider: TtsProvider;
  providerSource: "config" | "default";
  summaryModel?: string;
  modelOverrides: {
    enabled: boolean;
    allowText: boolean;
    allowProvider: boolean;
    allowVoice: boolean;
    allowModelId: boolean;
    allowVoiceSettings: boolean;
    allowNormalization: boolean;
    allowSeed: boolean;
  };
  elevenlabs: {
    apiKey?: string;
    baseUrl: string;
    voiceId: string;
    modelId: string;
    seed?: number;
    applyTextNormalization?: "auto" | "on" | "off";
    languageCode?: string;
    voiceSettings: {
      stability: number;
      similarityBoost: number;
      style: number;
      useSpeakerBoost: boolean;
      speed: number;
    };
  };
  openai: {
    apiKey?: string;
    model: string;
    voice: string;
  };
  edge: {
    enabled: boolean;
    voice: string;
    lang: string;
    outputFormat: string;
    outputFormatConfigured: boolean;
    pitch?: string;
    rate?: string;
    volume?: string;
    saveSubtitles: boolean;
    proxy?: string;
    timeoutMs?: number;
  };
  prefsPath?: string;
  maxTextLength: number;
  timeoutMs: number;
};

export type TtsResult = {
  success: boolean;
  audioPath?: string;
  error?: string;
  latencyMs?: number;
  provider?: string;
  outputFormat?: string;
  voiceCompatible?: boolean;
};

export type TtsTelephonyResult = {
  success: boolean;
  audioBuffer?: Buffer;
  error?: string;
  latencyMs?: number;
  provider?: string;
  outputFormat?: string;
  sampleRate?: number;
};

type TtsStatusEntry = {
  timestamp: number;
  success: boolean;
  textLength: number;
  summarized: boolean;
  provider?: string;
  latencyMs?: number;
  error?: string;
};

// Stub implementations - TTS is not available in AuditClaw

export function normalizeTtsAutoMode(_value: unknown): TtsAutoMode | undefined {
  return "off";
}

export function resolveTtsConfig(_cfg: OpenClawConfig): ResolvedTtsConfig {
  return {
    auto: "off",
    mode: "final",
    provider: "edge",
    providerSource: "default",
    modelOverrides: {
      enabled: false,
      allowText: false,
      allowProvider: false,
      allowVoice: false,
      allowModelId: false,
      allowVoiceSettings: false,
      allowNormalization: false,
      allowSeed: false,
    },
    elevenlabs: {
      baseUrl: "",
      voiceId: "",
      modelId: "",
      voiceSettings: {
        stability: 0,
        similarityBoost: 0,
        style: 0,
        useSpeakerBoost: false,
        speed: 1,
      },
    },
    openai: {
      model: "",
      voice: "",
    },
    edge: {
      enabled: false,
      voice: "",
      lang: "",
      outputFormat: "",
      outputFormatConfigured: false,
      saveSubtitles: false,
    },
    maxTextLength: 0,
    timeoutMs: 0,
  };
}

export function resolveTtsPrefsPath(_config: ResolvedTtsConfig): string {
  return "";
}

export function resolveTtsAutoMode(_params: {
  config: ResolvedTtsConfig;
  prefsPath: string;
  sessionAuto?: string;
}): TtsAutoMode {
  return "off";
}

export function buildTtsSystemPromptHint(_cfg: OpenClawConfig): string | undefined {
  return undefined;
}

export function isTtsEnabled(
  _config: ResolvedTtsConfig,
  _prefsPath: string,
  _sessionAuto?: string,
): boolean {
  return false;
}

export function setTtsAutoMode(_prefsPath: string, _mode: TtsAutoMode): void {
  // Stub
}

export function setTtsEnabled(_prefsPath: string, _enabled: boolean): void {
  // Stub
}

export function getTtsProvider(_config: ResolvedTtsConfig, _prefsPath: string): TtsProvider {
  return "edge";
}

export function setTtsProvider(_prefsPath: string, _provider: TtsProvider): void {
  // Stub
}

export function getTtsMaxLength(_prefsPath: string): number {
  return 0;
}

export function setTtsMaxLength(_prefsPath: string, _maxLength: number): void {
  // Stub
}

export function isSummarizationEnabled(_prefsPath: string): boolean {
  return false;
}

export function setSummarizationEnabled(_prefsPath: string, _enabled: boolean): void {
  // Stub
}

export function getLastTtsAttempt(): TtsStatusEntry | undefined {
  return undefined;
}

export function setLastTtsAttempt(_entry: TtsStatusEntry | undefined): void {
  // Stub
}

export function resolveTtsApiKey(
  _config: ResolvedTtsConfig,
  _provider: TtsProvider,
): string | undefined {
  return undefined;
}

export const TTS_PROVIDERS = ["openai", "elevenlabs", "edge"] as const;

export function resolveTtsProviderOrder(_primary: TtsProvider): TtsProvider[] {
  return [];
}

export function isTtsProviderConfigured(
  _config: ResolvedTtsConfig,
  _provider: TtsProvider,
): boolean {
  return false;
}

export const OPENAI_TTS_MODELS = ["gpt-4o-mini-tts", "tts-1", "tts-1-hd"] as const;

export const OPENAI_TTS_VOICES = [
  "alloy",
  "ash",
  "coral",
  "echo",
  "fable",
  "onyx",
  "nova",
  "sage",
  "shimmer",
] as const;

export async function textToSpeech(_params: {
  text: string;
  cfg: OpenClawConfig;
  prefsPath?: string;
  channel?: string;
  overrides?: unknown;
}): Promise<TtsResult> {
  return {
    success: false,
    error: "TTS is not available in AuditClaw",
  };
}

export async function textToSpeechTelephony(_params: {
  text: string;
  cfg: OpenClawConfig;
  prefsPath?: string;
}): Promise<TtsTelephonyResult> {
  return {
    success: false,
    error: "TTS is not available in AuditClaw",
  };
}

export async function maybeApplyTtsToPayload(params: {
  payload: ReplyPayload;
  cfg: OpenClawConfig;
  channel?: string;
  kind?: "tool" | "block" | "final";
  inboundAudio?: boolean;
  ttsAuto?: string;
}): Promise<ReplyPayload> {
  // TTS disabled - return payload unchanged
  return params.payload;
}

export const _test = {
  isValidVoiceId: () => false,
  isValidOpenAIVoice: () => false,
  isValidOpenAIModel: () => false,
  OPENAI_TTS_MODELS,
  OPENAI_TTS_VOICES,
  parseTtsDirectives: () => ({ cleanedText: "", overrides: {}, warnings: [], hasDirective: false }),
  resolveModelOverridePolicy: () => ({
    enabled: false,
    allowText: false,
    allowProvider: false,
    allowVoice: false,
    allowModelId: false,
    allowVoiceSettings: false,
    allowNormalization: false,
    allowSeed: false,
  }),
  summarizeText: async () => ({ summary: "", latencyMs: 0, inputLength: 0, outputLength: 0 }),
  resolveOutputFormat: () => ({
    openai: "mp3" as const,
    elevenlabs: "",
    extension: ".mp3",
    voiceCompatible: false,
  }),
  resolveEdgeOutputFormat: () => "",
};
