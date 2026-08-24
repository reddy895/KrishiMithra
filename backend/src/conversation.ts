// Conversation state management for WhatsApp chatbot

export type ConversationStep =
  | 'idle'           // Just started, waiting for first message
  | 'awaiting_language'   // Asked language preference
  | 'awaiting_crop'      // Asked which crop
  | 'awaiting_leaf_symptom'
  | 'awaiting_spot_symptom'
  | 'awaiting_wilt_symptom'
  | 'awaiting_damage_symptom'
  | 'awaiting_photo'     // Asked to send photo
  | 'awaiting_disease_description' // Asked about symptoms
  | 'processing';        // AI is generating response

export interface ConversationState {
  phoneNumber: string;
  step: ConversationStep;
  language: string;      // language code: en, kn, hi, te, ta
  languageName: string;  // native language name
  crop: string;          // selected crop
  diseaseDescription: string;
  symptomAnswers: string[];
  photoBase64?: string;
  photoMimeType?: string;
  createdAt: Date;
  updatedAt: Date;
}

const conversations = new Map<string, ConversationState>();

export function getConversation(phoneNumber: string): ConversationState | undefined {
  return conversations.get(phoneNumber);
}

export function createConversation(phoneNumber: string): ConversationState {
  const conv: ConversationState = {
    phoneNumber,
    step: 'idle',
    language: 'en',
    languageName: 'English',
    crop: '',
    diseaseDescription: '',
    symptomAnswers: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  conversations.set(phoneNumber, conv);
  return conv;
}

export function updateConversation(phoneNumber: string, updates: Partial<ConversationState>): ConversationState {
  const conv = conversations.get(phoneNumber);
  if (!conv) {
    return createConversation(phoneNumber);
  }
  Object.assign(conv, updates, { updatedAt: new Date() });
  return conv;
}

export function resetConversation(phoneNumber: string): void {
  conversations.delete(phoneNumber);
}

export function getAllConversations(): Map<string, ConversationState> {
  return conversations;
}
