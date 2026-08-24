import type { LanguageCode } from './config.js';

type DiseaseInfo = {
  name: string;
  symptoms: string;
  treatment: string;
  keywords: string[];
};

type CropInfo = {
  id: string;
  name: string;
  commonDiseases: DiseaseInfo[];
};

export const CROP_CHOICES: CropInfo[] = [
  {
    id: 'tomato',
    name: 'Tomato',
    commonDiseases: [
      {
        name: 'Early Blight',
        symptoms: 'Dark concentric rings on lower leaves; yellowing.',
        treatment: 'Mancozeb 75% WP @ 2g/L water; remove infected leaves; rotate crops.',
        keywords: ['yellow', 'spots', 'rings', 'lower leaves', 'brown'],
      },
      {
        name: 'Late Blight',
        symptoms: 'Water-soaked spots, white mold underside of leaves.',
        treatment: 'Metalaxyl + Mancozeb spray; improve air circulation; avoid overhead watering.',
        keywords: ['water soaked', 'white mold', 'spots', 'wet', 'black'],
      },
      {
        name: 'Bacterial Wilt',
        symptoms: 'Sudden wilting, brown vascular tissue.',
        treatment: 'Streptocycline 200ppm soil drench; use resistant varieties; solarize soil.',
        keywords: ['wilt', 'wilting', 'drooping', 'sudden'],
      },
    ],
  },
  {
    id: 'rice',
    name: 'Rice',
    commonDiseases: [
      {
        name: 'Rice Blast',
        symptoms: 'Diamond-shaped lesions on leaves, neck rot.',
        treatment: 'Tricyclazole 75% WP @ 0.6g/L; balanced nitrogen; resistant cultivars.',
        keywords: ['spots', 'lesions', 'neck', 'blast', 'brown'],
      },
      {
        name: 'Bacterial Leaf Blight',
        symptoms: 'Yellow water-soaked lesions along leaf margins.',
        treatment: 'Copper oxychloride spray; avoid excess nitrogen; certified seed.',
        keywords: ['yellow', 'water soaked', 'leaf margin', 'drying'],
      },
    ],
  },
  {
    id: 'wheat',
    name: 'Wheat',
    commonDiseases: [
      {
        name: 'Rust (Yellow/Brown)',
        symptoms: 'Orange-yellow pustules on leaves.',
        treatment: 'Propiconazole 25% EC @ 1ml/L water; resistant varieties.',
        keywords: ['yellow', 'orange', 'rust', 'pustules'],
      },
      {
        name: 'Powdery Mildew',
        symptoms: 'White powdery growth on leaves and stems.',
        treatment: 'Sulfur 80% WP @ 2.5g/L; avoid dense planting.',
        keywords: ['white powder', 'powder', 'mildew', 'white'],
      },
    ],
  },
  {
    id: 'potato',
    name: 'Potato',
    commonDiseases: [
      {
        name: 'Late Blight',
        symptoms: 'Dark lesions on leaves; rotting tubers.',
        treatment: 'Mancozeb + Metalaxyl spray; destroy infected plants; well-drained soil.',
        keywords: ['dark', 'spots', 'rot', 'rotting', 'black'],
      },
      {
        name: 'Early Blight',
        symptoms: 'Brown target-shaped spots on older leaves.',
        treatment: 'Chlorothalonil 75% WP @ 2g/L; crop rotation.',
        keywords: ['brown', 'spots', 'target', 'yellow'],
      },
    ],
  },
  {
    id: 'maize',
    name: 'Maize',
    commonDiseases: [
      {
        name: 'Northern Leaf Blight',
        symptoms: 'Long cigar-shaped grey-green lesions.',
        treatment: 'Mancozeb 75% WP @ 2.5g/L; resistant hybrids; residue management.',
        keywords: ['long spots', 'lesions', 'grey', 'green'],
      },
      {
        name: 'Fall Armyworm',
        symptoms: 'Ragged holes in whorl, sawdust frass.',
        treatment: 'Emamectin Benzoate 5% SG @ 0.4g/L; pheromone traps.',
        keywords: ['holes', 'eaten', 'insect', 'worm', 'frass'],
      },
    ],
  },
  {
    id: 'cotton',
    name: 'Cotton',
    commonDiseases: [
      {
        name: 'Bollworm',
        symptoms: 'Holes in bolls, damaged flowers.',
        treatment: 'Spinosad 45% SC @ 0.3ml/L; Bt cotton; pheromone traps.',
        keywords: ['holes', 'boll', 'flower', 'insect', 'worm'],
      },
      {
        name: 'Leaf Curl Virus',
        symptoms: 'Upward curling, thickened veins.',
        treatment: 'Control whitefly vector with Imidacloprid 17.8% SL; remove infected plants.',
        keywords: ['curl', 'curled', 'whitefly', 'veins'],
      },
    ],
  },
  {
    id: 'grape',
    name: 'Grape',
    commonDiseases: [
      {
        name: 'Downy Mildew',
        symptoms: 'Yellow oily spots, white fuzz underside.',
        treatment: 'Bordeaux mixture 1%; canopy management.',
        keywords: ['yellow', 'oily', 'white fuzz', 'spots'],
      },
      {
        name: 'Powdery Mildew',
        symptoms: 'White dusty patches on leaves and berries.',
        treatment: 'Sulfur dust; potassium bicarbonate sprays.',
        keywords: ['white', 'powder', 'dusty', 'berries'],
      },
    ],
  },
  {
    id: 'apple',
    name: 'Apple',
    commonDiseases: [
      {
        name: 'Apple Scab',
        symptoms: 'Olive-green velvety spots on leaves and fruit.',
        treatment: 'Captan 50% WP @ 2g/L; prune for airflow; sanitation.',
        keywords: ['spots', 'olive', 'scab', 'fruit'],
      },
      {
        name: 'Fire Blight',
        symptoms: "Blackened shoots with shepherd's crook.",
        treatment: 'Streptomycin spray at bloom; prune 30cm below infection.',
        keywords: ['black', 'shoots', 'burnt', 'blight'],
      },
    ],
  },
];

type BotText = {
  welcome: string;
  chooseLanguage: string;
  replyNumber: string;
  cropQuestion: string;
  leafTitle: (crop: string) => string;
  leafQuestion: string;
  leafOptions: string[];
  spotTitle: string;
  spotQuestion: string;
  spotOptions: string[];
  wiltTitle: string;
  wiltQuestion: string;
  wiltOptions: string[];
  damageTitle: string;
  damageQuestion: string;
  damageOptions: string[];
  photoTitle: (crop: string) => string;
  photoBody: string[];
  diagnosisTitle: string;
  crop: string;
  likelyProblem: string;
  confidence: string;
  confidenceText: (hasPhoto: boolean) => string;
  medium: string;
  low: string;
  matchedSymptoms: string;
  noSymptoms: string;
  commonSigns: string;
  recommendedTreatment: string;
  organicSteps: string;
  organicList: string[];
  prevention: string;
  preventionList: string[];
  note: string;
  closing: string;
  disclaimer: string;
  analyzing: string;
  imageOnly: string;
  downloadError: string;
  diagnosisError: string;
  languageRetry: string;
  cropRetry: string;
  symptomRetry: string;
  answerCurrentQuestion: string;
};

const TEXT: Record<LanguageCode, BotText> = {
  en: {
    welcome: '*Welcome to CropCare WhatsApp Bot*',
    chooseLanguage: 'Please choose your language:',
    replyNumber: 'Reply with only the number.',
    cropQuestion: '*Which crop are you growing?*',
    leafTitle: (crop) => `*Question 1/4 - ${crop} leaves*`,
    leafQuestion: 'What do the leaves look like?',
    leafOptions: ['Yellow leaves', 'Brown or black spots', 'White powder or white mold', 'Curling leaves', 'Leaves look mostly healthy'],
    spotTitle: '*Question 2/4 - Spots or marks*',
    spotQuestion: 'What type of marks do you see?',
    spotOptions: ['Round spots or rings', 'Long lesions or streaks', 'Water-soaked wet spots', 'Holes or eaten parts', 'No clear spots'],
    wiltTitle: '*Question 3/4 - Plant condition*',
    wiltQuestion: 'How is the plant standing?',
    wiltOptions: ['Wilting or drooping', 'Drying from leaf edges', 'Rotting stem, root, fruit, or tuber', 'Weak growth', 'Standing normally'],
    damageTitle: '*Question 4/4 - Pest signs*',
    damageQuestion: 'Do you see pest damage?',
    damageOptions: ['Worms or insects', 'Whiteflies or tiny sucking insects', 'Damaged flowers, fruits, or bolls', 'No insects visible', 'Not sure'],
    photoTitle: (crop) => `*Now upload a clear photo of your ${crop} plant.*`,
    photoBody: ['Send one clear image of the affected leaf, stem, fruit, or full plant.', 'I will reply with the likely disease and treatment using local crop data.', 'Or, if you do not have a camera, reply with *0* or *skip* to diagnose based on symptoms only.'],
    diagnosisTitle: '*CropCare Local Diagnosis*',
    crop: 'Crop',
    likelyProblem: 'Likely problem',
    confidence: 'Confidence',
    confidenceText: (hasPhoto) => `based on your selected symptoms${hasPhoto ? ' and uploaded photo context' : ''}.`,
    medium: 'Medium',
    low: 'Low',
    matchedSymptoms: 'Matched symptoms',
    noSymptoms: 'No symptoms selected',
    commonSigns: 'Common signs',
    recommendedTreatment: 'Recommended treatment',
    organicSteps: 'Organic / safe steps',
    organicList: ['Remove badly infected leaves or fruits and keep them away from the field.', 'Avoid overhead watering and keep good air flow between plants.', 'Use neem oil or approved organic spray for mild pest pressure where suitable.'],
    prevention: 'Prevention',
    preventionList: ['Check plants every 2-3 days.', 'Do not overuse nitrogen fertilizer.', 'Rotate crops and use healthy seed or seedlings.'],
    note: 'Note: This is a local guide, not a lab test. If the problem spreads fast, contact a local agriculture officer.',
    closing: '\n\n*Your report has been saved.* Type "hi" or "help" to start a new diagnosis.',
    disclaimer: '⚠️ *Disclaimer:* This report was generated without a plant photo, based only on symptoms. Accuracy may be lower. Please consult an agriculture expert if needed.',
    analyzing: '*Analyzing your crop locally...* Please wait a moment...',
    imageOnly: 'Please upload a clear image file.',
    downloadError: 'I could not download that photo. Please upload it again.',
    diagnosisError: 'Sorry, an error occurred during diagnosis. Please try again.',
    languageRetry: 'Please reply with a number from 1 to 5.',
    cropRetry: 'Please reply with a number from 1 to 8.',
    symptomRetry: 'Please reply with a number from 1 to 5.',
    answerCurrentQuestion: 'Please answer the current symptom question with a number first. I will ask for the photo after that.',
  },
  kn: {
    welcome: '*CropCare WhatsApp Bot ಗೆ ಸ್ವಾಗತ*',
    chooseLanguage: 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:',
    replyNumber: 'ಸಂಖ್ಯೆಯನ್ನು ಮಾತ್ರ ಕಳುಹಿಸಿ.',
    cropQuestion: '*ನೀವು ಯಾವ ಬೆಳೆ ಬೆಳೆಯುತ್ತಿದ್ದೀರಿ?*',
    leafTitle: (crop) => `*ಪ್ರಶ್ನೆ 1/4 - ${crop} ಎಲೆಗಳು*`,
    leafQuestion: 'ಎಲೆಗಳು ಹೇಗೆ ಕಾಣುತ್ತಿವೆ?',
    leafOptions: ['ಹಳದಿ ಎಲೆಗಳು', 'ಕಂದು ಅಥವಾ ಕಪ್ಪು ಕಲೆಗಳು', 'ಬಿಳಿ ಪುಡಿ ಅಥವಾ ಬಿಳಿ ಹುಳುಕು', 'ಎಲೆಗಳು ಮಡಚಿಕೊಳ್ಳುತ್ತಿವೆ', 'ಎಲೆಗಳು ಬಹುತೇಕ ಆರೋಗ್ಯವಾಗಿವೆ'],
    spotTitle: '*ಪ್ರಶ್ನೆ 2/4 - ಕಲೆಗಳು ಅಥವಾ ಗುರುತುಗಳು*',
    spotQuestion: 'ಯಾವ ರೀತಿಯ ಗುರುತುಗಳು ಕಾಣುತ್ತಿವೆ?',
    spotOptions: ['ವೃತ್ತಾಕಾರದ ಕಲೆಗಳು ಅಥವಾ ಉಂಗುರಗಳು', 'ಉದ್ದ ಗಾಯಗಳು ಅಥವಾ ಗೆರೆಗಳು', 'ನೀರಿನಿಂದ ಒದ್ದೆಯಾದ ಕಲೆಗಳು', 'ರಂಧ್ರಗಳು ಅಥವಾ ತಿಂದ ಭಾಗಗಳು', 'ಸ್ಪಷ್ಟ ಕಲೆಗಳಿಲ್ಲ'],
    wiltTitle: '*ಪ್ರಶ್ನೆ 3/4 - ಸಸ್ಯದ ಸ್ಥಿತಿ*',
    wiltQuestion: 'ಸಸ್ಯ ಹೇಗೆ ನಿಂತಿದೆ?',
    wiltOptions: ['ಬಾಡುತ್ತಿದೆ ಅಥವಾ ಕುಗ್ಗಿದೆ', 'ಎಲೆ ಅಂಚಿನಿಂದ ಒಣಗುತ್ತಿದೆ', 'ಕಾಂಡ, ಬೇರು, ಹಣ್ಣು ಅಥವಾ ಗಡ್ಡೆ ಕೊಳೆಯುತ್ತಿದೆ', 'ದುರ್ಬಲ ಬೆಳವಣಿಗೆ', 'ಸಾಮಾನ್ಯವಾಗಿ ನಿಂತಿದೆ'],
    damageTitle: '*ಪ್ರಶ್ನೆ 4/4 - ಕೀಟದ ಲಕ್ಷಣಗಳು*',
    damageQuestion: 'ಕೀಟ ಹಾನಿ ಕಾಣುತ್ತಿದೆಯೇ?',
    damageOptions: ['ಹುಳುಗಳು ಅಥವಾ ಕೀಟಗಳು', 'ಬಿಳಿ ಈಗೆಗಳು ಅಥವಾ ಸಣ್ಣ ರಸಹೀರುವ ಕೀಟಗಳು', 'ಹೂವು, ಹಣ್ಣು ಅಥವಾ ಬೋಲ್ ಹಾನಿಯಾಗಿದೆ', 'ಕೀಟಗಳು ಕಾಣುತ್ತಿಲ್ಲ', 'ಖಚಿತವಿಲ್ಲ'],
    photoTitle: (crop) => `*ಈಗ ನಿಮ್ಮ ${crop} ಸಸ್ಯದ ಸ್ಪಷ್ಟ ಫೋಟೋ ಕಳುಹಿಸಿ.*`,
    photoBody: ['ಬಾಧಿತ ಎಲೆ, ಕಾಂಡ, ಹಣ್ಣು ಅಥವಾ ಸಂಪೂರ್ಣ ಸಸ್ಯದ ಒಂದು ಸ್ಪಷ್ಟ ಚಿತ್ರ ಕಳುಹಿಸಿ.', 'ಸ್ಥಳೀಯ ಬೆಳೆ ಮಾಹಿತಿಯಿಂದ ಸಾಧ್ಯವಾದ ರೋಗ ಮತ್ತು ಚಿಕಿತ್ಸೆ ತಿಳಿಸುತ್ತೇನೆ.', 'ಅಥವಾ, ನಿಮ್ಮ ಬಳಿ ಕ್ಯಾಮೆರಾ ಇಲ್ಲದಿದ್ದರೆ, ಕೇವಲ ಲಕ್ಷಣಗಳ ಆಧಾರದ ಮೇಲೆ ನಿರ್ಣಯಿಸಲು *0* ಅಥವಾ *skip* ಎಂದು ಉತ್ತರಿಸಿ.'],
    diagnosisTitle: '*CropCare ಸ್ಥಳೀಯ ನಿರ್ಣಯ*',
    crop: 'ಬೆಳೆ',
    likelyProblem: 'ಸಂಭಾವ್ಯ ಸಮಸ್ಯೆ',
    confidence: 'ನಂಬಿಕೆ ಮಟ್ಟ',
    confidenceText: (hasPhoto) => `ನೀವು ಆಯ್ಕೆ ಮಾಡಿದ ಲಕ್ಷಣಗಳ${hasPhoto ? ' ಮತ್ತು ಅಪ್ಲೋಡ್ ಮಾಡಿದ ಫೋಟೋ ಮಾಹಿತಿಯ' : ''} ಆಧಾರದ ಮೇಲೆ.`,
    medium: 'ಮಧ್ಯಮ',
    low: 'ಕಡಿಮೆ',
    matchedSymptoms: 'ಹೊಂದಿದ ಲಕ್ಷಣಗಳು',
    noSymptoms: 'ಯಾವ ಲಕ್ಷಣಗಳೂ ಆಯ್ಕೆಯಾಗಿಲ್ಲ',
    commonSigns: 'ಸಾಮಾನ್ಯ ಲಕ್ಷಣಗಳು',
    recommendedTreatment: 'ಶಿಫಾರಸು ಮಾಡಿದ ಚಿಕಿತ್ಸೆ',
    organicSteps: 'ಸಾವಯವ / ಸುರಕ್ಷಿತ ಕ್ರಮಗಳು',
    organicList: ['ತೀವ್ರವಾಗಿ ಬಾಧಿತ ಎಲೆಗಳು ಅಥವಾ ಹಣ್ಣುಗಳನ್ನು ತೆಗೆದು ಹೊಲದಿಂದ ದೂರ ಇಡಿ.', 'ಮೇಲಿನಿಂದ ನೀರು ಹಾಕುವುದನ್ನು ತಪ್ಪಿಸಿ ಮತ್ತು ಗಾಳಿಯ ಹರಿವು ಚೆನ್ನಾಗಿರಲಿ.', 'ಸೌಮ್ಯ ಕೀಟ ಹಾನಿಗೆ ಸೂಕ್ತವಾದಲ್ಲಿ ನೀಮ್ ಎಣ್ಣೆ ಅಥವಾ ಮಾನ್ಯ ಸಾವಯವ ಸ್ಪ್ರೇ ಬಳಸಿ.'],
    prevention: 'ತಡೆಗಟ್ಟುವಿಕೆ',
    preventionList: ['ಪ್ರತಿ 2-3 ದಿನಕ್ಕೊಮ್ಮೆ ಸಸ್ಯಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.', 'ನೈಟ್ರೋಜನ್ ಗೊಬ್ಬರವನ್ನು ಅತಿಯಾಗಿ ಬಳಸಬೇಡಿ.', 'ಬೆಳೆ ಪರಿವರ್ತನೆ ಮಾಡಿ ಮತ್ತು ಆರೋಗ್ಯಕರ ಬೀಜ ಅಥವಾ ಮೊಳಕೆ ಬಳಸಿ.'],
    note: 'ಗಮನಿಸಿ: ಇದು ಸ್ಥಳೀಯ ಮಾರ್ಗದರ್ಶಿ, ಲ್ಯಾಬ್ ಪರೀಕ್ಷೆ ಅಲ್ಲ. ಸಮಸ್ಯೆ ಬೇಗ ಹರಡಿದರೆ ಸ್ಥಳೀಯ ಕೃಷಿ ಅಧಿಕಾರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ.',
    closing: '\n\n*ನಿಮ್ಮ ವರದಿ ಉಳಿಸಲಾಗಿದೆ.* ಹೊಸ ನಿರ್ಣಯಕ್ಕೆ "hi" ಅಥವಾ "help" ಟೈಪ್ ಮಾಡಿ.',
    disclaimer: '⚠️ *ಹಕ್ಕುತ್ಯಾಗ:* ಯಾವುದೇ ಫೋಟೋ ಇಲ್ಲದೆ, ಕೇವల ಲಕ್ಷಣಗಳ ಆಧಾರದ ಮೇಲೆ ಈ ವರದಿಯನ್ನು ತಯಾರಿಸಲಾಗಿದೆ. ನಿಖರತೆ ಕಡಿಮೆಯಿರಬಹುದು. ಅಗತ್ಯವಿದ್ದರೆ ಕೃಷಿ ಅಧಿಕಾರಿಯನ್ನು ಸಂಪర్కಿಸಿ.',
    analyzing: '*ನಿಮ್ಮ ಬೆಳೆಯನ್ನು ಸ್ಥಳೀಯವಾಗಿ ವಿಶ್ಲೇಷಿಸುತ್ತಿದ್ದೇನೆ...* ದಯವಿಟ್ಟು ಕ್ಷಣಕಾಲ ಕಾಯಿರಿ...',
    imageOnly: 'ದಯವಿಟ್ಟು ಸ್ಪಷ್ಟ ಚಿತ್ರ ಫೈಲ್ ಅಪ್ಲೋಡ್ ಮಾಡಿ.',
    downloadError: 'ಆ ಫೋಟೋ ಡೌನ್‌ಲೋಡ್ ಮಾಡಲು ಆಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಅಪ್ಲೋಡ್ ಮಾಡಿ.',
    diagnosisError: 'ನಿರ್ಣಯದ ವೇಳೆ ದೋಷ ಉಂಟಾಯಿತು. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.',
    languageRetry: 'ದಯವಿಟ್ಟು 1 ರಿಂದ 5 ರೊಳಗಿನ ಸಂಖ್ಯೆಯಿಂದ ಉತ್ತರಿಸಿ.',
    cropRetry: 'ದಯವಿಟ್ಟು 1 ರಿಂದ 8 ರೊಳಗಿನ ಸಂಖ್ಯೆಯಿಂದ ಉತ್ತರಿಸಿ.',
    symptomRetry: 'ದಯವಿಟ್ಟು 1 ರಿಂದ 5 ರೊಳಗಿನ ಸಂಖ್ಯೆಯಿಂದ ಉತ್ತರಿಸಿ.',
    answerCurrentQuestion: 'ಮೊದಲು ಪ್ರಸ್ತುತ ಲಕ್ಷಣ ಪ್ರಶ್ನೆಗೆ ಸಂಖ್ಯೆಯಿಂದ ಉತ್ತರಿಸಿ. ನಂತರ ನಾನು ಫೋಟೋ ಕೇಳುತ್ತೇನೆ.',
  },
  hi: {
    welcome: '*CropCare WhatsApp Bot में आपका स्वागत है*',
    chooseLanguage: 'कृपया अपनी भाषा चुनें:',
    replyNumber: 'केवल नंबर भेजें.',
    cropQuestion: '*आप कौन सी फसल उगा रहे हैं?*',
    leafTitle: (crop) => `*प्रश्न 1/4 - ${crop} की पत्तियां*`,
    leafQuestion: 'पत्तियां कैसी दिख रही हैं?',
    leafOptions: ['पीली पत्तियां', 'भूरे या काले धब्बे', 'सफेद पाउडर या सफेद फफूंद', 'मुड़ी हुई पत्तियां', 'पत्तियां अधिकतर स्वस्थ हैं'],
    spotTitle: '*प्रश्न 2/4 - धब्बे या निशान*',
    spotQuestion: 'किस प्रकार के निशान दिख रहे हैं?',
    spotOptions: ['गोल धब्बे या छल्ले', 'लंबे घाव या धारियां', 'पानी जैसे गीले धब्बे', 'छेद या खाए हुए भाग', 'स्पष्ट धब्बे नहीं'],
    wiltTitle: '*प्रश्न 3/4 - पौधे की स्थिति*',
    wiltQuestion: 'पौधा कैसा खड़ा है?',
    wiltOptions: ['मुरझा रहा है या झुक रहा है', 'पत्तियों के किनारे सूख रहे हैं', 'तना, जड़, फल या कंद सड़ रहा है', 'कमजोर वृद्धि', 'सामान्य रूप से खड़ा है'],
    damageTitle: '*प्रश्न 4/4 - कीट के संकेत*',
    damageQuestion: 'क्या कीट का नुकसान दिख रहा है?',
    damageOptions: ['कीड़े या इल्ली', 'सफेद मक्खी या छोटे रस चूसने वाले कीट', 'फूल, फल या बॉल खराब हैं', 'कीट दिखाई नहीं दे रहे', 'पक्का नहीं'],
    photoTitle: (crop) => `*अब अपने ${crop} पौधे की साफ फोटो अपलोड करें.*`,
    photoBody: ['प्रभावित पत्ती, तना, फल या पूरे पौधे की एक साफ फोटो भेजें.', 'मैं स्थानीय फसल डेटा से संभावित रोग और उपचार बताऊंगा.', 'अथवा, यदि आपके पास कैमरा नहीं है, तो केवल लक्षणों के आधार पर निदान के लिए *0* या *skip* उत्तर दें।'],
    diagnosisTitle: '*CropCare स्थानीय निदान*',
    crop: 'फसल',
    likelyProblem: 'संभावित समस्या',
    confidence: 'विश्वास स्तर',
    confidenceText: (hasPhoto) => `आपके चुने हुए लक्षणों${hasPhoto ? ' और अपलोड की गई फोटो संदर्भ' : ''} के आधार पर.`,
    medium: 'मध्यम',
    low: 'कम',
    matchedSymptoms: 'मिले हुए लक्षण',
    noSymptoms: 'कोई लक्षण नहीं चुना गया',
    commonSigns: 'सामान्य संकेत',
    recommendedTreatment: 'अनुशंसित उपचार',
    organicSteps: 'जैविक / सुरक्षित उपाय',
    organicList: ['बहुत संक्रमित पत्तियों या फलों को हटाकर खेत से दूर रखें.', 'ऊपर से पानी देने से बचें और पौधों में हवा का अच्छा प्रवाह रखें.', 'हल्के कीट दबाव में उपयुक्त हो तो नीम तेल या अनुमोदित जैविक स्प्रे उपयोग करें.'],
    prevention: 'रोकथाम',
    preventionList: ['हर 2-3 दिन में पौधों की जांच करें.', 'नाइट्रोजन उर्वरक का अधिक उपयोग न करें.', 'फसल चक्र अपनाएं और स्वस्थ बीज या पौध लगाएं.'],
    note: 'नोट: यह स्थानीय मार्गदर्शिका है, लैब टेस्ट नहीं. समस्या तेजी से फैले तो स्थानीय कृषि अधिकारी से संपर्क करें.',
    closing: '\n\n*आपकी रिपोर्ट सेव हो गई है.* नया निदान शुरू करने के लिए "hi" या "help" टाइप करें.',
    disclaimer: '⚠️ *अस्वीकरण:* यह रिपोर्ट बिना फोटो के, केवल लक्षणों के आधार पर तैयार की गई है। सटीकता कम हो सकती है। आवश्यकता होने पर कृषि विशेषज्ञ से संपर्क करें।',
    analyzing: '*आपकी फसल का स्थानीय विश्लेषण हो रहा है...* कृपया एक क्षण प्रतीक्षा करें...',
    imageOnly: 'कृपया साफ image file अपलोड करें.',
    downloadError: 'मैं वह फोटो डाउनलोड नहीं कर पाया. कृपया फिर से अपलोड करें.',
    diagnosisError: 'निदान के दौरान त्रुटि हुई. कृपया फिर से प्रयास करें.',
    languageRetry: 'कृपया 1 से 5 तक का नंबर भेजें.',
    cropRetry: 'कृपया 1 से 8 तक का नंबर भेजें.',
    symptomRetry: 'कृपया 1 से 5 तक का नंबर भेजें.',
    answerCurrentQuestion: 'कृपया पहले वर्तमान लक्षण प्रश्न का नंबर से उत्तर दें. उसके बाद मैं फोटो मांगूंगा.',
  },
  te: {
    welcome: '*CropCare WhatsApp Bot కు స్వాగతం*',
    chooseLanguage: 'దయచేసి మీ భాషను ఎంచుకోండి:',
    replyNumber: 'సంఖ్య మాత్రమే పంపండి.',
    cropQuestion: '*మీరు ఏ పంటను పెంచుతున్నారు?*',
    leafTitle: (crop) => `*ప్రశ్న 1/4 - ${crop} ఆకులు*`,
    leafQuestion: 'ఆకులు ఎలా కనిపిస్తున్నాయి?',
    leafOptions: ['పసుపు ఆకులు', 'గోధుమ లేదా నల్ల మచ్చలు', 'తెల్ల పొడి లేదా తెల్ల బూజు', 'ముడుచుకున్న ఆకులు', 'ఆకులు ఎక్కువగా ఆరోగ్యంగా ఉన్నాయి'],
    spotTitle: '*ప్రశ్న 2/4 - మచ్చలు లేదా గుర్తులు*',
    spotQuestion: 'ఏ రకం గుర్తులు కనిపిస్తున్నాయి?',
    spotOptions: ['గుండ్రని మచ్చలు లేదా వలయాలు', 'పొడవైన గాయాలు లేదా గీతలు', 'నీరు పట్టిన తడి మచ్చలు', 'రంధ్రాలు లేదా తిన్న భాగాలు', 'స్పష్టమైన మచ్చలు లేవు'],
    wiltTitle: '*ప్రశ్న 3/4 - మొక్క స్థితి*',
    wiltQuestion: 'మొక్క ఎలా నిలబడి ఉంది?',
    wiltOptions: ['వాడిపోతోంది లేదా వంగుతోంది', 'ఆకు అంచుల నుంచి ఎండుతోంది', 'కాండం, వేరు, పండు లేదా దుంప కుళ్లుతోంది', 'బలహీన పెరుగుదల', 'సాధారణంగా నిలబడి ఉంది'],
    damageTitle: '*ప్రశ్న 4/4 - పురుగు లక్షణాలు*',
    damageQuestion: 'పురుగు నష్టం కనిపిస్తుందా?',
    damageOptions: ['పురుగులు లేదా కీటకాలు', 'వైట్‌ఫ్లైలు లేదా చిన్న రసం పీల్చే కీటకాలు', 'పూలు, పండ్లు లేదా బోల్స్ దెబ్బతిన్నాయి', 'కీటకాలు కనిపించడం లేదు', 'ఖచ్చితంగా తెలియదు'],
    photoTitle: (crop) => `*ఇప్పుడు మీ ${crop} మొక్క స్పష్టమైన ఫోటో అప్లోడ్ చేయండి.*`,
    photoBody: ['దెబ్బతిన్న ఆకు, కాండం, పండు లేదా పూర్తి మొక్క యొక్క స్పష్టమైన చిత్రం పంపండి.', 'స్థానిక పంట డేటాతో సాధ్యమైన వ్యాధి మరియు చికిత్సను చెబుతాను.', 'లేదా, మీ వద్ద కెమెరా లేకపోతే, కేవలం లక్షణాల ఆధారంగా నిర్ధారణ కోసం *0* లేదా *skip* అని సమాధానం ఇవ్వండి.'],
    diagnosisTitle: '*CropCare స్థానిక నిర్ధారణ*',
    crop: 'పంట',
    likelyProblem: 'సంభావ్య సమస్య',
    confidence: 'నమ్మకం స్థాయి',
    confidenceText: (hasPhoto) => `మీరు ఎంచుకున్న లక్షణాల${hasPhoto ? ' మరియు అప్లోడ్ చేసిన ఫోటో సందర్భం' : ''} ఆధారంగా.`,
    medium: 'మధ్యస్థం',
    low: 'తక్కువ',
    matchedSymptoms: 'సరిపోలిన లక్షణాలు',
    noSymptoms: 'లక్షణాలు ఎంచుకోలేదు',
    commonSigns: 'సాధారణ సూచనలు',
    recommendedTreatment: 'సిఫార్సు చేసిన చికిత్స',
    organicSteps: 'సేంద్రియ / సురక్షిత చర్యలు',
    organicList: ['చాలా దెబ్బతిన్న ఆకులు లేదా పండ్లను తీసి పొలం నుండి దూరంగా ఉంచండి.', 'పై నుంచి నీరు పోయడం తగ్గించి మొక్కల మధ్య గాలి సరిగా వెళ్లేలా చూడండి.', 'స్వల్ప పురుగు సమస్యకు సరిపోతే నీమ్ ఆయిల్ లేదా ఆమోదిత సేంద్రియ స్ప్రే వాడండి.'],
    prevention: 'నివారణ',
    preventionList: ['ప్రతి 2-3 రోజులకు మొక్కలను పరిశీలించండి.', 'నైట్రోజన్ ఎరువును అధికంగా వాడకండి.', 'పంట మార్పిడి చేయండి మరియు ఆరోగ్యకరమైన విత్తనం లేదా నారు వాడండి.'],
    note: 'గమనిక: ఇది స్థానిక మార్గదర్శకం మాత్రమే, ల్యాబ్ పరీక్ష కాదు. సమస్య వేగంగా వ్యాపిస్తే స్థానిక వ్యవసాయ అధికారిని సంప్రదించండి.',
    closing: '\n\n*మీ నివేదిక సేవ్ అయింది.* కొత్త నిర్ధారణకు "hi" లేదా "help" టైప్ చేయండి.',
    disclaimer: '⚠️ *నిరాకరణ:* ఫోటో లేకుండా, కేవలం లక్షణాల ఆధారంగా ఈ నివేదిక తయారు చేయబడింది. ఖచ్చితత్వం తక్కువగా ఉండవచ్చు. అవసరమైతే వ్యవసాయ అధికారిని సంప్రదించండి.',
    analyzing: '*మీ పంటను స్థానికంగా విశ్లేషిస్తున్నాను...* దయచేసి కాసేపు వేచి ఉండండి...',
    imageOnly: 'దయచేసి స్పష్టమైన image file అప్లోడ్ చేయండి.',
    downloadError: 'ఆ ఫోటో డౌన్‌లోడ్ కాలేదు. దయచేసి మళ్లీ అప్లోడ్ చేయండి.',
    diagnosisError: 'నిర్ధారణలో లోపం జరిగింది. దయచేసి మళ్లీ ప్రయత్నించండి.',
    languageRetry: 'దయచేసి 1 నుండి 5 వరకు సంఖ్యతో సమాధానం ఇవ్వండి.',
    cropRetry: 'దయచేసి 1 నుండి 8 వరకు సంఖ్యతో సమాధానం ఇవ్వండి.',
    symptomRetry: 'దయచేసి 1 నుండి 5 వరకు సంఖ్యతో సమాధానం ఇవ్వండి.',
    answerCurrentQuestion: 'ముందుగా ప్రస్తుత లక్షణ ప్రశ్నకు సంఖ్యతో సమాధానం ఇవ్వండి. ఆ తర్వాత నేను ఫోటో అడుగుతాను.',
  },
  ta: {
    welcome: '*CropCare WhatsApp Bot-க்கு வரவேற்கிறோம்*',
    chooseLanguage: 'தயவுசெய்து உங்கள் மொழியை தேர்வு செய்யவும்:',
    replyNumber: 'எண்ணை மட்டும் அனுப்பவும்.',
    cropQuestion: '*நீங்கள் எந்த பயிரை வளர்க்கிறீர்கள்?*',
    leafTitle: (crop) => `*கேள்வி 1/4 - ${crop} இலைகள்*`,
    leafQuestion: 'இலைகள் எப்படி தெரிகின்றன?',
    leafOptions: ['மஞ்சள் இலைகள்', 'பழுப்பு அல்லது கருப்பு புள்ளிகள்', 'வெள்ளை தூள் அல்லது வெள்ளை பூஞ்சை', 'சுருண்ட இலைகள்', 'இலைகள் பெரும்பாலும் ஆரோக்கியமாக உள்ளன'],
    spotTitle: '*கேள்வி 2/4 - புள்ளிகள் அல்லது குறிகள்*',
    spotQuestion: 'எந்த வகை குறிகள் தெரிகின்றன?',
    spotOptions: ['வட்ட புள்ளிகள் அல்லது வளையங்கள்', 'நீண்ட காயங்கள் அல்லது கோடுகள்', 'நீர் ஊறிய ஈர புள்ளிகள்', 'துளைகள் அல்லது தின்னப்பட்ட பகுதிகள்', 'தெளிவான புள்ளிகள் இல்லை'],
    wiltTitle: '*கேள்வி 3/4 - செடியின் நிலை*',
    wiltQuestion: 'செடி எப்படி நிற்கிறது?',
    wiltOptions: ['வாடுகிறது அல்லது குனிகிறது', 'இலை ஓரங்களில் இருந்து உலர்கிறது', 'தண்டு, வேர், பழம் அல்லது கிழங்கு அழுகுகிறது', 'பலவீனமான வளர்ச்சி', 'சாதாரணமாக நிற்கிறது'],
    damageTitle: '*கேள்வி 4/4 - பூச்சி அறிகுறிகள்*',
    damageQuestion: 'பூச்சி சேதம் தெரிகிறதா?',
    damageOptions: ['புழுக்கள் அல்லது பூச்சிகள்', 'வெள்ளை ஈக்கள் அல்லது சிறிய சாறு உறிஞ்சும் பூச்சிகள்', 'மலர்கள், பழங்கள் அல்லது பந்துகள் சேதமடைந்துள்ளன', 'பூச்சிகள் தெரியவில்லை', 'உறுதி இல்லை'],
    photoTitle: (crop) => `*இப்போது உங்கள் ${crop} செடியின் தெளிவான புகைப்படத்தை பதிவேற்றவும்.*`,
    photoBody: ['பாதிக்கப்பட்ட இலை, தண்டு, பழம் அல்லது முழு செடியின் ஒரு தெளிவான படத்தை அனுப்பவும்.', 'உள்ளூர் பயிர் தரவின் அடிப்படையில் சாத்தியமான நோய் மற்றும் சிகிச்சையை சொல்லுகிறேன்.', 'அல்லது, உங்களிடம் கேமரா இல்லையென்றால், அறிகுறிகளின் அடிப்படையில் மட்டும் கண்டறிய *0* அல்லது *skip* என பதிலளிக்கவும்.'],
    diagnosisTitle: '*CropCare உள்ளூர் நோயறிதல்*',
    crop: 'பயிர்',
    likelyProblem: 'சாத்தியமான பிரச்சனை',
    confidence: 'நம்பிக்கை நிலை',
    confidenceText: (hasPhoto) => `நீங்கள் தேர்ந்தெடுத்த அறிகுறிகள்${hasPhoto ? ' மற்றும் பதிவேற்றிய புகைப்பட தகவல்' : ''} அடிப்படையில்.`,
    medium: 'நடுத்தரம்',
    low: 'குறைவு',
    matchedSymptoms: 'பொருந்திய அறிகுறிகள்',
    noSymptoms: 'அறிகுறிகள் தேர்வு செய்யப்படவில்லை',
    commonSigns: 'பொதுவான அறிகுறிகள்',
    recommendedTreatment: 'பரிந்துரைக்கப்பட்ட சிகிச்சை',
    organicSteps: 'இயற்கை / பாதுகாப்பான படிகள்',
    organicList: ['மிகவும் பாதிக்கப்பட்ட இலைகள் அல்லது பழங்களை அகற்றி வயலிலிருந்து தூரமாக வைக்கவும்.', 'மேலிருந்து நீர் ஊற்றுவதை தவிர்த்து செடிகளுக்கு நல்ல காற்றோட்டம் இருக்கச் செய்யவும்.', 'லேசான பூச்சி பிரச்சனையில் பொருத்தமாக இருந்தால் வேப்பெண்ணெய் அல்லது அங்கீகரிக்கப்பட்ட இயற்கை தெளிப்பை பயன்படுத்தவும்.'],
    prevention: 'தடுப்பு',
    preventionList: ['ஒவ்வொரு 2-3 நாட்களிலும் செடிகளைச் சரிபார்க்கவும்.', 'நைட்ரஜன் உரத்தை அதிகமாக பயன்படுத்த வேண்டாம்.', 'பயிர் மாற்றம் செய்யவும் மற்றும் ஆரோக்கியமான விதை அல்லது நாற்றுகளைப் பயன்படுத்தவும்.'],
    note: 'குறிப்பு: இது உள்ளூர் வழிகாட்டி, ஆய்வக பரிசோதனை அல்ல. பிரச்சனை வேகமாக பரவினால் உள்ளூர் வேளாண்மை அதிகாரியை தொடர்பு கொள்ளவும்.',
    closing: '\n\n*உங்கள் அறிக்கை சேமிக்கப்பட்டது.* புதிய நோயறிதலை தொடங்க "hi" அல்லது "help" என டைப் செய்யவும்.',
    disclaimer: '⚠️ *பொறுப்புத் துறப்பு:* புகைப்படம் இல்லாமல், அறிகுறிகளின் அடிப்படையில் மட்டுமே இந்த அறிக்கை தயாரிக்கப்பட்டுள்ளது. துல்லியம் குறைவாக இருக்கலாம். தேவைப்பட்டால் விவசாய அதிகாரியை அணுகவும்.',
    analyzing: '*உங்கள் பயிரை உள்ளூரில் பகுப்பாய்வு செய்கிறேன்...* தயவுசெய்து ஒரு நிமிடம் காத்திருக்கவும்...',
    imageOnly: 'தயவுசெய்து தெளிவான image file பதிவேற்றவும்.',
    downloadError: 'அந்த புகைப்படத்தை பதிவிறக்கம் செய்ய முடியவில்லை. தயவுசெய்து மீண்டும் பதிவேற்றவும்.',
    diagnosisError: 'நோயறிதலின் போது பிழை ஏற்பட்டது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.',
    languageRetry: 'தயவுசெய்து 1 முதல் 5 வரை எண்ணால் பதிலளிக்கவும்.',
    cropRetry: 'தயவுசெய்து 1 முதல் 8 வரை எண்ணால் பதிலளிக்கவும்.',
    symptomRetry: 'தயவுசெய்து 1 முதல் 5 வரை எண்ணால் பதிலளிக்கவும்.',
    answerCurrentQuestion: 'முதலில் தற்போதைய அறிகுறி கேள்விக்கு எண்ணால் பதிலளிக்கவும். அதன் பிறகு நான் புகைப்படம் கேட்பேன்.',
  },
};

const CROP_NAMES: Record<LanguageCode, string[]> = {
  en: ['Tomato', 'Rice', 'Wheat', 'Potato', 'Maize', 'Cotton', 'Grape', 'Apple'],
  kn: ['ಟೊಮೇಟೊ', 'ಭತ್ತ', 'ಗೋಧಿ', 'ಆಲೂಗಡ್ಡೆ', 'ಮೆಕ್ಕೆಜೋಳ', 'ಹತ್ತಿ', 'ದ್ರಾಕ್ಷಿ', 'ಸೇಬು'],
  hi: ['टमाटर', 'धान', 'गेहूं', 'आलू', 'मक्का', 'कपास', 'अंगूर', 'सेब'],
  te: ['టమాటా', 'వరి', 'గోధుమ', 'బంగాళాదుంప', 'మొక్కజొన్న', 'పత్తి', 'ద్రాక్ష', 'ఆపిల్'],
  ta: ['தக்காளி', 'நெல்', 'கோதுமை', 'உருளைக்கிழங்கு', 'மக்காச்சோளம்', 'பருத்தி', 'திராட்சை', 'ஆப்பிள்'],
};

function lang(language: string): LanguageCode {
  return ['en', 'kn', 'hi', 'te', 'ta'].includes(language) ? (language as LanguageCode) : 'en';
}

function text(language: string): BotText {
  return TEXT[lang(language)];
}

function cropName(crop: string, language: string): string {
  const index = CROP_CHOICES.findIndex((item) => item.name.toLowerCase() === crop.toLowerCase());
  return index >= 0 ? CROP_NAMES[lang(language)][index] : crop;
}

function cropListText(language: string): string {
  return CROP_CHOICES.map((_crop, index) => `${index + 1}. ${CROP_NAMES[lang(language)][index]}`).join('\n');
}

export function getCropByChoice(choice: string): CropInfo | null {
  const index = Number.parseInt(choice, 10) - 1;
  return CROP_CHOICES[index] || null;
}

export function getGreeting(language: string): string {
  const t = text(language);
  return [
    t.welcome,
    '',
    t.chooseLanguage,
    '1. English',
    '2. Kannada',
    '3. Hindi',
    '4. Telugu',
    '5. Tamil',
    '',
    t.replyNumber,
  ].join('\n');
}

export function askCropQuestion(language: string): string {
  const t = text(language);
  return [
    t.cropQuestion,
    '',
    cropListText(language),
    '',
    t.replyNumber,
  ].join('\n');
}

export function askLeafSymptomQuestion(crop: string, language = 'en'): string {
  const t = text(language);
  return [
    t.leafTitle(cropName(crop, language)),
    '',
    t.leafQuestion,
    ...t.leafOptions.map((option, index) => `${index + 1}. ${option}`),
    '',
    t.replyNumber,
  ].join('\n');
}

export function askSpotSymptomQuestion(language = 'en'): string {
  const t = text(language);
  return [
    t.spotTitle,
    '',
    t.spotQuestion,
    ...t.spotOptions.map((option, index) => `${index + 1}. ${option}`),
    '',
    t.replyNumber,
  ].join('\n');
}

export function askWiltSymptomQuestion(language = 'en'): string {
  const t = text(language);
  return [
    t.wiltTitle,
    '',
    t.wiltQuestion,
    ...t.wiltOptions.map((option, index) => `${index + 1}. ${option}`),
    '',
    t.replyNumber,
  ].join('\n');
}

export function askDamageSymptomQuestion(language = 'en'): string {
  const t = text(language);
  return [
    t.damageTitle,
    '',
    t.damageQuestion,
    ...t.damageOptions.map((option, index) => `${index + 1}. ${option}`),
    '',
    t.replyNumber,
  ].join('\n');
}

export function askPhotoQuestion(language: string, crop: string): string {
  const t = text(language);
  return [
    t.photoTitle(cropName(crop, language)),
    '',
    ...t.photoBody,
  ].join('\n');
}

export function getSymptomText(question: string, choice: string): string | null {
  const choices: Record<string, Record<string, string>> = {
    leaf: {
      '1': 'yellow leaves',
      '2': 'brown or black spots',
      '3': 'white powder or white mold',
      '4': 'curling leaves',
      '5': 'mostly healthy leaves',
    },
    spot: {
      '1': 'round spots or rings',
      '2': 'long lesions or streaks',
      '3': 'water-soaked wet spots',
      '4': 'holes or eaten parts',
      '5': 'no clear spots',
    },
    wilt: {
      '1': 'wilting or drooping',
      '2': 'drying from leaf edges',
      '3': 'rotting plant part',
      '4': 'weak growth',
      '5': 'standing normally',
    },
    damage: {
      '1': 'worms or insects',
      '2': 'whiteflies or sucking insects',
      '3': 'damaged flowers fruits or bolls',
      '4': 'no insects visible',
      '5': 'not sure about pests',
    },
  };

  return choices[question]?.[choice] || null;
}

export async function diagnoseCropDisease(
  imageBase64: string | null,
  _imageMimeType: string | null,
  crop: string,
  description: string,
  language: LanguageCode
): Promise<string> {
  const t = text(language);
  const cropInfo =
    CROP_CHOICES.find((item) => item.name.toLowerCase() === crop.toLowerCase()) || CROP_CHOICES[0];
  const selectedSymptoms = description.toLowerCase();

  const ranked = cropInfo.commonDiseases
    .map((disease) => ({
      disease,
      score: disease.keywords.reduce((score, keyword) => {
        return selectedSymptoms.includes(keyword) ? score + 1 : score;
      }, 0),
    }))
    .sort((a, b) => b.score - a.score);

  const best = ranked[0].score > 0 ? ranked[0].disease : cropInfo.commonDiseases[0];
  const confidence = ranked[0].score > 1 ? t.medium : t.low;

  return [
    t.diagnosisTitle,
    '',
    `${t.crop}: ${cropName(cropInfo.name, language)}`,
    `${t.likelyProblem}: ${best.name}`,
    `${t.confidence}: ${confidence} - ${t.confidenceText(Boolean(imageBase64))}`,
    '',
    ...(!imageBase64 ? [t.disclaimer, ''] : []),
    `${t.matchedSymptoms}: ${description || t.noSymptoms}`,
    `${t.commonSigns}: ${best.symptoms}`,
    '',
    `${t.recommendedTreatment}: ${best.treatment}`,
    '',
    `${t.organicSteps}:`,
    ...t.organicList.map((item, index) => `${index + 1}. ${item}`),
    '',
    `${t.prevention}:`,
    ...t.preventionList.map((item, index) => `${index + 1}. ${item}`),
    '',
    t.note,
  ].join('\n');
}

export function getThankYouMessage(language: string): string {
  return text(language).closing;
}

export function getAnalyzingMessage(language: string): string {
  return text(language).analyzing;
}

export function getImageOnlyMessage(language: string): string {
  return text(language).imageOnly;
}

export function getDownloadErrorMessage(language: string): string {
  return text(language).downloadError;
}

export function getDiagnosisErrorMessage(language: string): string {
  return text(language).diagnosisError;
}

export function getLanguageRetryMessage(language: string): string {
  return text(language).languageRetry;
}

export function getCropRetryMessage(language: string): string {
  return text(language).cropRetry;
}

export function getSymptomRetryMessage(language: string): string {
  return text(language).symptomRetry;
}

export function getAnswerCurrentQuestionMessage(language: string): string {
  return text(language).answerCurrentQuestion;
}
