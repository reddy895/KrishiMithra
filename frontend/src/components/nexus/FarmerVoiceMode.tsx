import React, { useState, useEffect, useRef } from "react";
import { FarmProfile } from "@/types/nexus";
import { AiAdvisorService } from "@/services/aiAdvisorService";
import { 
  Mic, MicOff, Volume2, VolumeX, Sparkles, X, 
  Sprout, CloudSun, Droplets, CheckCircle2, ArrowRight,
  Send, Trash2, Edit3, AlertCircle, RefreshCw, Loader2,
  Check, MessageSquare, HelpCircle, Activity, Play, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Props {
  farm: FarmProfile;
  onClose: () => void;
  onOpenScan: () => void;
}

const SUPPORTED_LANGUAGES = [
  { code: "en-IN", name: "English", label: "English" },
  { code: "kn-IN", name: "ಕನ್ನಡ", label: "Kannada" },
  { code: "hi-IN", name: "हिन्दी", label: "Hindi" },
  { code: "te-IN", name: "తెలుగు", label: "Telugu" },
  { code: "ta-IN", name: "தமிழ்", label: "Tamil" },
  { code: "mr-IN", name: "मराठी", label: "Marathi" },
  { code: "bn-IN", name: "বাংলা", label: "Bengali" },
];

const PRESET_VOICE_QUERIES = [
  "My tomato plants have yellow spots and drying leaves",
  "How to cure rice blast disease on my paddy field?",
  "Will it rain in next 48 hours and can I spray pesticide?",
  "What organic bio-fertilizer should I apply for low Nitrogen?",
  "Why are cotton leaves curling and what spray to use?",
  "How to control fall armyworm in maize crops?"
];

const PYTHON_AGENT_URL = "http://127.0.0.1:8000";

export const FarmerVoiceMode: React.FC<Props> = ({ farm, onClose, onOpenScan }) => {
  const [selectedLang, setSelectedLang] = useState("en-IN");
  const [editedInput, setEditedInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [pythonAgentOnline, setPythonAgentOnline] = useState<boolean>(true);
  const [micVolume, setMicVolume] = useState<number>(0);
  const [spokenResponse, setSpokenResponse] = useState<string>(
    `Namaskara! I am the KrishiMithra Python Voice Agent. Your ${farm.crop} farm in ${farm.region} has an NDVI vigor of ${farm.satellite.ndviCurrent} with moderate leaf blast risk. High humidity of ${farm.weather.humidityPercent}% is detected. Tap the big button once and speak your question.`
  );

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const silenceTimerRef = useRef<any>(null);
  const speechDetectedRef = useRef<boolean>(false);

  // Check Python backend health
  useEffect(() => {
    fetch(`${PYTHON_AGENT_URL}/health`)
      .then((res) => res.json())
      .then(() => setPythonAgentOnline(true))
      .catch(() => setPythonAgentOnline(false));

    return () => {
      stopSpeaking();
      stopVolumeMeter();
    };
  }, []);

  // Visual Volume Meter & Automatic Silence Detector
  const startVolumeMeterAndSilenceDetection = (stream: MediaStream) => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = ctx;
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);
      const data = new Uint8Array(analyser.frequencyBinCount);

      const loop = () => {
        analyser.getByteFrequencyData(data);
        let sum = 0;
        for (let i = 0; i < data.length; i++) sum += data[i];
        const avg = sum / data.length;
        const vol = Math.min(100, Math.round((avg / 128) * 100));
        setMicVolume(vol);

        // If user is speaking (volume > 15%)
        if (vol > 15) {
          speechDetectedRef.current = true;
          if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
            silenceTimerRef.current = null;
          }
        } else if (speechDetectedRef.current) {
          // If speech was detected and now silent for 1.8s -> Auto submit!
          if (!silenceTimerRef.current) {
            silenceTimerRef.current = setTimeout(() => {
              autoFinishRecording();
            }, 1800); // 1.8s silence threshold
          }
        }

        animFrameRef.current = requestAnimationFrame(loop);
      };
      loop();
    } catch {}
  };

  const stopVolumeMeter = () => {
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      try { audioContextRef.current.close(); } catch {}
      audioContextRef.current = null;
    }
    setMicVolume(0);
    speechDetectedRef.current = false;
  };

  // Play audio response
  const playAudioOrFallback = (audioUrl: string | undefined, textFallback: string) => {
    stopSpeaking();

    if (audioUrl && audioUrl.startsWith("data:audio")) {
      try {
        const audio = new Audio(audioUrl);
        audioPlayerRef.current = audio;
        audio.onplay = () => setIsSpeaking(true);
        audio.onended = () => setIsSpeaking(false);
        audio.onerror = () => fallbackSpeechSynthesis(textFallback);
        audio.play().catch(() => fallbackSpeechSynthesis(textFallback));
        toast.success("Playing Python Voice Agent speech...");
        return;
      } catch {
        fallbackSpeechSynthesis(textFallback);
      }
    } else {
      fallbackSpeechSynthesis(textFallback);
    }
  };

  const fallbackSpeechSynthesis = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.88;
      utterance.pitch = 1.05;
      utterance.lang = selectedLang;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      toast.success("Speaking advisory answer aloud...");
    } catch (e) {
      setIsSpeaking(false);
    }
  };

  const stopSpeaking = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  // Single Tap Start Recording (Auto-Stops when you finish speaking!)
  const handleSingleButtonTap = async () => {
    if (isRecording) {
      autoFinishRecording();
      return;
    }

    try {
      stopSpeaking();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      speechDetectedRef.current = false;
      startVolumeMeterAndSilenceDetection(stream);

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        await sendAudioToPythonAgent(audioBlob);
      };

      mediaRecorder.start(200);
      setIsRecording(true);
      toast.info("🎙️ Listening... Speak your question, I will auto-detect when you finish!");
    } catch (err: any) {
      console.error("Mic error:", err);
      toast.error("Microphone access blocked. Please allow mic in browser settings.");
      setIsRecording(false);
    }
  };

  const autoFinishRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      stopVolumeMeter();
      toast.info("⚡ Processing your voice with Python SpeechRecognition...");
    }
  };

  // Send Recorded Audio to Python Backend
  const sendAudioToPythonAgent = async (audioBlob: Blob) => {
    setIsProcessing(true);
    const formData = new FormData();
    formData.append("audio", audioBlob, "farmer_speech.webm");
    formData.append("crop", farm.crop);
    formData.append("language", selectedLang);

    try {
      const response = await fetch(`${PYTHON_AGENT_URL}/api/voice/transcribe`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.transcribedText || data.query || `My ${farm.crop} health diagnosis`;
        setEditedInput(text);
        const summary = `Diagnosis: ${data.diagnosis}. Treatment: ${data.treatment}`;
        setSpokenResponse(summary);
        playAudioOrFallback(data.audioDataUrl, summary);
      } else {
        throw new Error("Python voice backend error");
      }
    } catch (err) {
      console.warn("Python agent fallback to local AI advisor:", err);
      const adv = AiAdvisorService.generateStructuredAdvisory(`My ${farm.crop} health diagnosis`, farm);
      const summary = `${adv.whatIsHappening} Key Action: ${adv.whatYouShouldDo[0]?.action || "Inspect leaves and maintain soil moisture."}`;
      setSpokenResponse(summary);
      fallbackSpeechSynthesis(summary);
    } finally {
      setIsProcessing(false);
    }
  };

  // Submit Text Query to Python Voice Agent
  const handleSubmitQuery = async (queryText: string) => {
    const textToSubmit = queryText.trim() || editedInput.trim();
    if (!textToSubmit) return;

    if (isRecording) {
      autoFinishRecording();
    }

    setIsProcessing(true);

    try {
      const response = await fetch(`${PYTHON_AGENT_URL}/api/voice/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: textToSubmit,
          crop: farm.crop,
          language: selectedLang,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const summary = `Diagnosis: ${data.diagnosis}. Treatment: ${data.treatment}`;
        setSpokenResponse(summary);
        playAudioOrFallback(data.audioDataUrl, summary);
      } else {
        throw new Error("API call failed");
      }
    } catch (err) {
      console.warn("Using local AI engine:", err);
      const adv = AiAdvisorService.generateStructuredAdvisory(textToSubmit, farm);
      const summary = `${adv.whatIsHappening} Key Action: ${adv.whatYouShouldDo[0]?.action || "Inspect leaves and maintain soil moisture."}`;
      setSpokenResponse(summary);
      fallbackSpeechSynthesis(summary);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/98 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8 overflow-y-auto font-sans">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-border/40 pb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg transition-all duration-300 ${
            isRecording ? "bg-red-500 shadow-red-500/40 animate-pulse" : "bg-emerald-600 shadow-emerald-600/30"
          }`}>
            <Mic className={`w-5 h-5 ${isRecording ? "animate-bounce text-amber-300" : ""}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-foreground">
                Python Voice Agent
              </h2>
              <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px] font-bold">
                SpeechRecognition 3.17 + FastAPI
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">1-Tap Voice Assistant • Automatically detects when you finish speaking</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <div className="flex items-center gap-1 overflow-x-auto max-w-[170px] sm:max-w-none">
            {SUPPORTED_LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setSelectedLang(l.code);
                  toast.success(`Language set to ${l.name}`);
                }}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedLang === l.code
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.name}
              </button>
            ))}
          </div>

          <Button
            size="icon"
            variant="ghost"
            onClick={() => {
              stopSpeaking();
              if (isRecording) autoFinishRecording();
              onClose();
            }}
            className="rounded-full h-10 w-10"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Main Interactive Center */}
      <div className="my-auto py-4 max-w-3xl mx-auto w-full space-y-6 text-center">
        {/* Spoken Audio Response Box */}
        <div className="p-5 sm:p-7 rounded-3xl bg-card border-2 border-primary/30 shadow-xl space-y-3.5 text-left relative overflow-hidden">
          {isSpeaking && (
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 animate-pulse" />
          )}

          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-primary" />
              Python Voice Agent Diagnosis
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={isSpeaking ? stopSpeaking : () => playAudioOrFallback(undefined, spokenResponse)}
              className="h-9 px-4 gap-2 text-xs font-bold rounded-xl border-primary/30 bg-primary/5 hover:bg-primary/15"
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4 text-red-500 animate-pulse" />
                  <span className="text-red-500">Stop Audio</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-primary" />
                  <span>🔊 Listen to Answer</span>
                </>
              )}
            </Button>
          </div>

          <p className="text-base sm:text-lg font-medium text-foreground leading-relaxed">
            {spokenResponse}
          </p>

          {isSpeaking && (
            <div className="flex items-center gap-2 pt-1 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
              <div className="flex items-center gap-1">
                <span className="w-1 h-3 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1 h-5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1 h-4 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                <span className="w-1 h-6 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: "75ms" }} />
              </div>
              <span>Playing spoken answer from Python Voice Synthesizer...</span>
            </div>
          )}
        </div>

        {/* SINGLE GIANT 1-TAP MIC BUTTON (AUTO-DETECTS WHEN YOU FINISH) */}
        <div className="flex flex-col items-center justify-center space-y-3 py-2">
          <button
            onClick={handleSingleButtonTap}
            disabled={isProcessing}
            className={`w-32 h-32 sm:w-36 sm:h-36 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer ${
              isProcessing
                ? "bg-slate-700 text-white animate-spin opacity-80"
                : isRecording
                ? "bg-red-500 text-white animate-pulse scale-110 shadow-red-500/50 ring-8 ring-red-500/30"
                : "bg-emerald-600 hover:bg-emerald-700 text-white hover:scale-105 shadow-emerald-600/35"
            }`}
          >
            {isProcessing ? (
              <Loader2 className="w-12 h-12 animate-spin" />
            ) : isRecording ? (
              <>
                <MicOff className="w-12 h-12" />
                <span className="text-[11px] font-bold mt-1 uppercase tracking-wider">Listening...</span>
              </>
            ) : (
              <>
                <Mic className="w-12 h-12" />
                <span className="text-[11px] font-bold mt-1 uppercase tracking-wider">Tap to Speak</span>
              </>
            )}
          </button>

          <div className="space-y-1">
            <span className="text-sm font-extrabold text-foreground block">
              {isProcessing
                ? "Python AI is transcribing & analyzing..."
                : isRecording
                ? `Recording your voice (Mic level: ${micVolume}%) • Stop speaking when done!`
                : "Single Tap to Speak (Auto-submits when you finish speaking)"}
            </span>
            {isRecording && (
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                ✨ Just speak your whole question naturally. No need to click stop!
              </p>
            )}
          </div>
        </div>

        {/* Quick Sample Voice Queries */}
        <div className="space-y-2 text-left pt-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-primary" />
            Or 1-Tap Sample Voice Questions:
          </span>
          <div className="flex flex-wrap gap-2">
            {PRESET_VOICE_QUERIES.map((queryText, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setEditedInput(queryText);
                  handleSubmitQuery(queryText);
                }}
                className="px-3 py-2 rounded-xl bg-card hover:bg-primary/10 border border-border/80 hover:border-primary text-xs font-semibold text-foreground transition-all cursor-pointer shadow-sm hover:scale-[1.02] text-left"
              >
                🌾 {queryText}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="text-center text-[11px] text-muted-foreground pt-3 border-t border-border/30">
        KrishiMithra Python Voice Agent • SpeechRecognition 3.17.0 on Port 8000 • 1-Tap Voice Assistant
      </div>
    </div>
  );
};
