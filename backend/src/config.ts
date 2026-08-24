import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const currentDir = path.dirname(fileURLToPath(import.meta.url));
export const backendRoot = path.resolve(currentDir, '..');

dotenv.config({ path: path.join(backendRoot, '.env') });

export const config = {
  port: parseInt(process.env.PORT || '3001', 10),
  openRouterApiKey: process.env.OPENROUTER_API_KEY || '',
  aiModel: process.env.AI_MODEL || 'google/gemini-2.5-flash',
  waSessionFile: process.env.WA_SESSION_FILE || 'auth_info.json',
  forceNewQrOnStart: process.env.FORCE_NEW_QR_ON_START === 'true',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:8080',
};

export const SUPPORTED_LANGUAGES = {
  '1': { code: 'en', name: 'English', native: 'English' },
  '2': { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  '3': { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  '4': { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  '5': { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
} as const;

export type LanguageCode = 'en' | 'kn' | 'hi' | 'te' | 'ta';

export const LANGUAGE_NAMES: Record<string, string> = {
  en: 'English',
  kn: 'Kannada',
  hi: 'Hindi',
  te: 'Telugu',
  ta: 'Tamil',
};
