import type { Message, MessageMedia } from 'whatsapp-web.js';
import {
  getConversation,
  createConversation,
  updateConversation,
  resetConversation,
} from './conversation.js';
import {
  getGreeting,
  askCropQuestion,
  askLeafSymptomQuestion,
  askSpotSymptomQuestion,
  askWiltSymptomQuestion,
  askDamageSymptomQuestion,
  askPhotoQuestion,
  diagnoseCropDisease,
  getCropByChoice,
  getSymptomText,
  getThankYouMessage,
  getAnalyzingMessage,
  getImageOnlyMessage,
  getDownloadErrorMessage,
  getDiagnosisErrorMessage,
  getLanguageRetryMessage,
  getCropRetryMessage,
  getSymptomRetryMessage,
  getAnswerCurrentQuestionMessage,
} from './ai-service.js';
import { SUPPORTED_LANGUAGES, type LanguageCode } from './config.js';

type SymptomQuestion = 'leaf' | 'spot' | 'wilt' | 'damage';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function safeReply(message: Message, text: string): Promise<void> {
  try {
    await delay(500);
    console.log(`[SENDING REPLY] To: ${message.from}, Preview: "${text.replace(/\n/g, ' ').substring(0, 60)}..."`);
    try {
      await message.reply(text);
      console.log(`✅ [REPLY DELIVERED] via message.reply to ${message.from}`);
    } catch (replyErr) {
      console.warn(`[REPLY FALLBACK] message.reply failed: ${replyErr}. Retrying with client.sendMessage...`);
      const { client } = await import('./index.js');
      await client.sendMessage(message.from, text);
      console.log(`✅ [REPLY DELIVERED] via client.sendMessage to ${message.from}`);
    }
  } catch (error) {
    console.error(`❌ [REPLY ERROR] Could not deliver message to ${message.from}:`, error);
  }
}

export async function handleIncomingMessage(message: Message, botStartTime: number = 0): Promise<void> {
  const phoneNumber = message.from;

  console.log(`[MSG RECEIVED] From: ${phoneNumber}, To: ${message.to}, fromMe: ${message.fromMe}, Body: "${message.body}"`);

  // SAFETY RULE 1: Allow self-chat messages (testing on own number) but ignore messages sent by bot to other users
  const isSelfChat = Boolean(message.fromMe && message.to && message.from === message.to);
  if (message.fromMe && !isSelfChat) {
    console.log(`[MSG SKIPPED] Outgoing message sent by bot to another contact.`);
    return;
  }

  // SAFETY RULE 2: Only reply to individual user chats (@c.us / @lid). Strictly ignore status broadcasts and group chats (@g.us)
  if (
    !phoneNumber ||
    message.isStatus ||
    phoneNumber.includes('status@broadcast') ||
    phoneNumber.endsWith('@g.us')
  ) {
    console.log(`[MSG SKIPPED] Non-user or group/status message: ${phoneNumber}`);
    return;
  }

  // SAFETY RULE 3: Ignore old historical unread messages synced when WhatsApp opens (allow 5-minute grace period)
  if (botStartTime > 0 && message.timestamp && message.timestamp < botStartTime - 300 && !isSelfChat) {
    console.log(`[MSG SKIPPED] Historical message from before bot start time: ${message.timestamp} < ${botStartTime - 300}`);
    return;
  }

  const body = (message.body || '').trim().toLowerCase();
  const cleanBody = body.replace(/^[.,\/#!$%\^&\*;:{}=\-_`~()?]+|[.,\/#!$%\^&\*;:{}=\-_`~()?]+$/g, "").trim();

  // SAFETY RULE 4: Ignore empty messages / system notifications without media
  if (!cleanBody && !message.hasMedia) {
    console.log(`[MSG SKIPPED] Empty body and no media.`);
    return;
  }

  console.log(`[PROCESSING USER ENQUIRY] From ${phoneNumber}: "${body}"`);

  let conv = getConversation(phoneNumber);
  const isFirstMessage = !conv || conv.step === 'idle';
  const isHelp = cleanBody === 'hi' || cleanBody === 'help' || cleanBody === 'start' || cleanBody === 'hello';

  if (isHelp || isFirstMessage) {
    conv = createConversation(phoneNumber);
    conv.step = 'awaiting_language';
    await safeReply(message, getGreeting(conv.language));
    return;
  }

  if (!conv) {
    await safeReply(message, getGreeting('en'));
    return;
  }

  switch (conv.step) {
    case 'awaiting_language':
      await handleLanguageSelection(message, conv.phoneNumber, cleanBody);
      break;
    case 'awaiting_crop':
      await handleCropSelection(message, conv.phoneNumber, cleanBody);
      break;
    case 'awaiting_leaf_symptom':
      await handleSymptomSelection(message, conv.phoneNumber, cleanBody, 'leaf');
      break;
    case 'awaiting_spot_symptom':
      await handleSymptomSelection(message, conv.phoneNumber, cleanBody, 'spot');
      break;
    case 'awaiting_wilt_symptom':
      await handleSymptomSelection(message, conv.phoneNumber, cleanBody, 'wilt');
      break;
    case 'awaiting_damage_symptom':
      await handleSymptomSelection(message, conv.phoneNumber, cleanBody, 'damage');
      break;
    case 'awaiting_photo':
      await handlePhotoAndDescription(message, conv.phoneNumber, cleanBody);
      break;
    default:
      resetConversation(phoneNumber);
      await safeReply(message, getGreeting('en'));
      break;
  }
}

async function handleLanguageSelection(
  message: Message,
  phoneNumber: string,
  body: string
): Promise<void> {
  const langOption = SUPPORTED_LANGUAGES[body as keyof typeof SUPPORTED_LANGUAGES];

  if (!langOption) {
    await safeReply(message, `${getLanguageRetryMessage('en')}\n\n${getGreeting('en')}`);
    return;
  }

  updateConversation(phoneNumber, {
    language: langOption.code,
    languageName: langOption.native,
    step: 'awaiting_crop',
  });
  await safeReply(message, askCropQuestion(langOption.code));
}

async function handleCropSelection(
  message: Message,
  phoneNumber: string,
  body: string
): Promise<void> {
  const conv = getConversation(phoneNumber);
  if (!conv) return;

  const crop = getCropByChoice(body);
  if (!crop) {
    await safeReply(message, `${getCropRetryMessage(conv.language)}\n\n${askCropQuestion(conv.language)}`);
    return;
  }

  updateConversation(phoneNumber, {
    crop: crop.name,
    diseaseDescription: '',
    symptomAnswers: [],
    step: 'awaiting_leaf_symptom',
  });

  await safeReply(message, askLeafSymptomQuestion(crop.name, conv.language));
}

async function handleSymptomSelection(
  message: Message,
  phoneNumber: string,
  body: string,
  question: SymptomQuestion
): Promise<void> {
  const conv = getConversation(phoneNumber);
  if (!conv) return;

  const symptom = getSymptomText(question, body);
  if (!symptom) {
    await safeReply(message, `${getSymptomRetryMessage(conv.language)}\n\n${getQuestionText(question, conv.crop, conv.language)}`);
    return;
  }

  const symptomAnswers = [...(conv.symptomAnswers || []), symptom];
  const nextStep = getNextStep(question);
  updateConversation(phoneNumber, {
    symptomAnswers,
    diseaseDescription: symptomAnswers.join(', '),
    step: nextStep,
  });

  if (nextStep === 'awaiting_photo') {
    await safeReply(message, askPhotoQuestion(conv.language, conv.crop));
  } else {
    await safeReply(message, getQuestionText(stepToQuestion(nextStep), conv.crop, conv.language));
  }
}

async function downloadMediaWithRetry(message: Message, retries = 3): Promise<MessageMedia | null> {
  for (let i = 0; i < retries; i++) {
    try {
      const media = await message.downloadMedia();
      if (media && media.data) return media;
    } catch (err) {
      console.warn(`[MEDIA DOWNLOAD] Retry ${i + 1}/${retries} failed: ${err}`);
      if (i < retries - 1) await delay(1000);
    }
  }
  return null;
}

async function handlePhotoAndDescription(
  message: Message,
  phoneNumber: string,
  body: string,
  downloadedMedia?: MessageMedia | null
): Promise<void> {
  const conv = getConversation(phoneNumber);
  if (!conv) return;

  const cleanBody = body.trim().toLowerCase();
  const isSkip = cleanBody === '0' || cleanBody === 'skip' || cleanBody === 'no' || cleanBody === 'none';

  if (!message.hasMedia && !isSkip) {
    await safeReply(message, askPhotoQuestion(conv.language, conv.crop));
    return;
  }

  if (message.hasMedia) {
    let media = downloadedMedia;
    if (!media || !media.data) {
      media = await downloadMediaWithRetry(message, 3);
    }

    if (media && media.mimetype?.startsWith('image/')) {
      updateConversation(phoneNumber, {
        photoBase64: media.data,
        photoMimeType: media.mimetype,
        step: 'processing',
      });
    } else {
      console.warn('[MEDIA DOWNLOAD] Image download failed or unsupported format. Proceeding with symptom-based diagnosis.');
      updateConversation(phoneNumber, {
        photoBase64: undefined,
        photoMimeType: undefined,
        step: 'processing',
      });
    }
  } else {
    // Skipped photo, perform diagnosis on symptoms only
    updateConversation(phoneNumber, {
      photoBase64: undefined,
      photoMimeType: undefined,
      step: 'processing',
    });
  }

  await safeReply(message, getAnalyzingMessage(conv.language));

  try {
    const currentConv = getConversation(phoneNumber);
    const diagnosis = await diagnoseCropDisease(
      currentConv?.photoBase64 || null,
      currentConv?.photoMimeType || null,
      currentConv?.crop || 'Tomato',
      currentConv?.diseaseDescription || '',
      (currentConv?.language as LanguageCode) || 'en'
    );

    const closing = getThankYouMessage(currentConv?.language || 'en');
    await safeReply(message, `${diagnosis}${closing}`);
  } catch (error) {
    console.error('Diagnosis error:', error);
    await safeReply(message, getDiagnosisErrorMessage(conv.language));
  }

  resetConversation(phoneNumber);
}

export async function handleImageMessage(
  message: Message,
  downloadedMedia?: MessageMedia | null,
  botStartTime: number = 0
): Promise<void> {
  const phoneNumber = message.from;

  const isSelfChat = Boolean(message.fromMe && message.to && message.from === message.to);
  if (message.fromMe && !isSelfChat) return;
  if (
    !phoneNumber ||
    !phoneNumber.endsWith('@c.us') ||
    phoneNumber.endsWith('@lid') ||
    message.isStatus ||
    phoneNumber.includes('status@broadcast') ||
    phoneNumber.endsWith('@g.us')
  ) {
    return;
  }
  if (botStartTime > 0 && message.timestamp && message.timestamp < botStartTime - 120 && !isSelfChat) {
    return;
  }

  const conv = getConversation(phoneNumber);

  if (conv && conv.step === 'awaiting_photo') {
    await handlePhotoAndDescription(message, phoneNumber, '', downloadedMedia);
  } else if (conv && conv.step === 'awaiting_language') {
    await safeReply(message, getLanguageRetryMessage(conv.language));
  } else if (conv && conv.step === 'awaiting_crop') {
    await safeReply(message, `${getCropRetryMessage(conv.language)}\n\n${askCropQuestion(conv.language)}`);
  } else if (conv && isSymptomStep(conv.step)) {
    await safeReply(message, getAnswerCurrentQuestionMessage(conv.language));
  } else {
    const next = createConversation(phoneNumber);
    next.step = 'awaiting_language';
    await safeReply(message, getGreeting(next.language));
  }
}

function getQuestionText(question: SymptomQuestion, crop: string, language: string): string {
  if (question === 'leaf') return askLeafSymptomQuestion(crop, language);
  if (question === 'spot') return askSpotSymptomQuestion(language);
  if (question === 'wilt') return askWiltSymptomQuestion(language);
  return askDamageSymptomQuestion(language);
}

function getNextStep(question: SymptomQuestion) {
  if (question === 'leaf') return 'awaiting_spot_symptom';
  if (question === 'spot') return 'awaiting_wilt_symptom';
  if (question === 'wilt') return 'awaiting_damage_symptom';
  return 'awaiting_photo';
}

function stepToQuestion(step: string): SymptomQuestion {
  if (step === 'awaiting_spot_symptom') return 'spot';
  if (step === 'awaiting_wilt_symptom') return 'wilt';
  if (step === 'awaiting_damage_symptom') return 'damage';
  return 'leaf';
}

function isSymptomStep(step: string): boolean {
  return [
    'awaiting_leaf_symptom',
    'awaiting_spot_symptom',
    'awaiting_wilt_symptom',
    'awaiting_damage_symptom',
  ].includes(step);
}
