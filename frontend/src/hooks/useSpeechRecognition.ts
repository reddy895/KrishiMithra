import { useState, useEffect, useRef, useCallback } from "react";

export type SpeechRecognitionState = "IDLE" | "LISTENING" | "PROCESSING" | "ERROR";

export interface UseSpeechRecognitionOptions {
  language?: string;
  onResult?: (transcript: string) => void;
  onError?: (error: string) => void;
}

export interface UseSpeechRecognitionReturn {
  state: SpeechRecognitionState;
  isListening: boolean;
  transcript: string;
  finalTranscript: string;
  interimTranscript: string;
  error: string | null;
  isSupported: boolean;
  language: string;
  startListening: () => Promise<void>;
  stopListening: () => void;
  resetTranscript: () => void;
  setLanguage: (lang: string) => void;
}

const LANGUAGE_MAP: Record<string, string> = {
  en: "en-IN",
  "en-IN": "en-IN",
  "en-US": "en-US",
  hi: "hi-IN",
  "hi-IN": "hi-IN",
  kn: "kn-IN",
  "kn-IN": "kn-IN",
  te: "te-IN",
  "te-IN": "te-IN",
  ta: "ta-IN",
  "ta-IN": "ta-IN",
  mr: "mr-IN",
  "mr-IN": "mr-IN",
  bn: "bn-IN",
  "bn-IN": "bn-IN",
  pt: "pt-BR",
  "pt-BR": "pt-BR",
  ru: "ru-RU",
  "ru-RU": "ru-RU",
  zh: "zh-CN",
  "zh-CN": "zh-CN",
};

export const useSpeechRecognition = (
  options: UseSpeechRecognitionOptions = {}
): UseSpeechRecognitionReturn => {
  const [state, setState] = useState<SpeechRecognitionState>("IDLE");
  const [finalTranscript, setFinalTranscript] = useState<string>("");
  const [interimTranscript, setInterimTranscript] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  
  const initialLang = options.language 
    ? (LANGUAGE_MAP[options.language] || options.language)
    : "en-IN";
  const [language, setLanguageState] = useState<string>(initialLang);

  // References to manage state without stale closures
  const recognitionRef = useRef<any>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const isListeningRef = useRef<boolean>(false);
  const restartTimerRef = useRef<any>(null);
  const finalTranscriptRef = useRef<string>("");
  const languageRef = useRef<string>(initialLang);

  const isSupported = typeof window !== "undefined" && 
    Boolean((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

  useEffect(() => {
    finalTranscriptRef.current = finalTranscript;
  }, [finalTranscript]);

  useEffect(() => {
    languageRef.current = language;
  }, [language]);

  const cleanupRecognition = useCallback(() => {
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.onstart = null;
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.abort();
      } catch (err) {
        // Ignored
      }
      recognitionRef.current = null;
    }
  }, []);

  const initAndStart = useCallback(() => {
    if (!isSupported) {
      setError("Speech recognition is not supported in this browser.");
      setState("ERROR");
      return;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.onstart = null;
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.abort();
      } catch {}
      recognitionRef.current = null;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognition.lang = languageRef.current;

    recognition.onstart = () => {
      if (isListeningRef.current) {
        setState("LISTENING");
        setError(null);
      }
    };

    recognition.onresult = (event: any) => {
      if (!isListeningRef.current) return;

      let currentInterim = "";
      let newlyFinalized = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const item = event.results[i];
        const text = item[0].transcript;
        if (item.isFinal) {
          newlyFinalized += text;
        } else {
          currentInterim += text;
        }
      }

      if (newlyFinalized.trim()) {
        const combined = finalTranscriptRef.current
          ? `${finalTranscriptRef.current.trim()} ${newlyFinalized.trim()}`
          : newlyFinalized.trim();
        
        finalTranscriptRef.current = combined;
        setFinalTranscript(combined);
        if (options.onResult) {
          options.onResult(combined);
        }
      }

      setInterimTranscript(currentInterim);
    };

    recognition.onerror = (event: any) => {
      console.warn("[useSpeechRecognition] Event error:", event.error);
      
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        isListeningRef.current = false;
        const msg = "Microphone access denied. Please click the camera/mic icon in the browser address bar to allow.";
        setError(msg);
        setState("ERROR");
        if (options.onError) options.onError(msg);
        cleanupRecognition();
        return;
      }

      if (event.error === "audio-capture") {
        isListeningRef.current = false;
        const msg = "No microphone hardware detected. Please check your mic connection.";
        setError(msg);
        setState("ERROR");
        if (options.onError) options.onError(msg);
        cleanupRecognition();
        return;
      }
    };

    recognition.onend = () => {
      if (isListeningRef.current) {
        restartTimerRef.current = setTimeout(() => {
          if (isListeningRef.current) {
            try {
              recognition.start();
            } catch {
              initAndStart();
            }
          }
        }, 100);
      } else {
        setState("IDLE");
      }
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (err: any) {
      console.warn("[useSpeechRecognition] start call error:", err);
      if (isListeningRef.current) {
        restartTimerRef.current = setTimeout(() => {
          if (isListeningRef.current) initAndStart();
        }, 150);
      }
    }
  }, [isSupported, cleanupRecognition, options]);

  // Request explicit mic permission & Start Listening
  const startListening = useCallback(async () => {
    setError(null);
    setInterimTranscript("");
    isListeningRef.current = true;
    setState("LISTENING");

    // Acquire microphone hardware stream explicitly
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStreamRef.current = stream;
      } catch (e: any) {
        console.warn("getUserMedia request warning:", e);
        if (e.name === "NotAllowedError" || e.name === "PermissionDeniedError") {
          setError("Microphone permission was denied. Please allow mic in browser settings.");
          setState("ERROR");
          isListeningRef.current = false;
          return;
        }
      }
    }

    initAndStart();
  }, [initAndStart]);

  const stopListening = useCallback(() => {
    isListeningRef.current = false;
    setState("IDLE");
    setInterimTranscript("");
    cleanupRecognition();
  }, [cleanupRecognition]);

  const resetTranscript = useCallback(() => {
    finalTranscriptRef.current = "";
    setFinalTranscript("");
    setInterimTranscript("");
  }, []);

  const setLanguage = useCallback((newLang: string) => {
    const mapped = LANGUAGE_MAP[newLang] || newLang;
    setLanguageState(mapped);
    languageRef.current = mapped;
    
    if (isListeningRef.current) {
      initAndStart();
    }
  }, [initAndStart]);

  useEffect(() => {
    return () => {
      isListeningRef.current = false;
      cleanupRecognition();
    };
  }, [cleanupRecognition]);

  const fullTranscript = (
    finalTranscript + (interimTranscript ? (finalTranscript ? " " : "") + interimTranscript : "")
  ).trim();

  return {
    state,
    isListening: state === "LISTENING",
    transcript: fullTranscript,
    finalTranscript,
    interimTranscript,
    error,
    isSupported,
    language,
    startListening,
    stopListening,
    resetTranscript,
    setLanguage,
  };
};
