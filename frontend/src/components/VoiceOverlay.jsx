import { useEffect, useRef, useState } from "react";

const STATES = {
  READY: "ready",
  LISTENING: "listening",
  THINKING: "thinking",
  SPEAKING: "speaking",
};

function VoiceOverlay({ onSendMessage, onClose }) {
  const [state, setState] = useState(STATES.READY);
  const [transcript, setTranscript] = useState("");
  const [reply, setReply] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const recognitionRef = useRef(null);
  const stoppedRef = useRef(false);
  const voicesRef = useRef([]);
  const stateRef = useRef(STATES.READY);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

 useEffect(() => {
  stoppedRef.current = false; 

  const loadVoices = () => {
    voicesRef.current = window.speechSynthesis.getVoices();
  };
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Voice mode isn't supported in this browser. Please use Chrome or Edge.");
    onClose();
    return;
  }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-IN";

    recognition.onresult = async (event) => {
      const text = event.results[0][0].transcript;
      setTranscript(text);
      setState(STATES.THINKING);

      try {
        const assistantReply = await onSendMessage(text);
        setReply(assistantReply);
        speak(assistantReply);
      } catch (err) {
        console.error("Send message error:", err);
        if (!stoppedRef.current) startListening();
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        setErrorMsg("Microphone access denied. Please allow mic permission in browser settings and reload.");
        setState(STATES.READY);
        return;
      }
      if (!stoppedRef.current) {
        setTimeout(() => startListening(), 300);
      }
    };

    recognition.onend = () => {
      if (!stoppedRef.current && stateRef.current === STATES.LISTENING) {
        setTimeout(() => startListening(), 200);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      stoppedRef.current = true;
      recognition.stop();
      window.speechSynthesis.cancel();
      window.speechSynthesis.onvoiceschanged = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pickVoice = () => {
    const voices = voicesRef.current;
    if (!voices || voices.length === 0) return null;
    return (
      voices.find((v) => v.lang === "en-IN") ||
      voices.find((v) => v.lang?.startsWith("en")) ||
      voices[0]
    );
  };

  const cleanTextForSpeech = (text) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1") // bold **text**
    .replace(/\*(.*?)\*/g, "$1")     // italic *text*
    .replace(/^\s*[\*\-•]\s+/gm, "") // bullet points
    .replace(/#{1,6}\s/g, "")        // markdown headers
    .replace(/`([^`]+)`/g, "$1")     // inline code
    .replace(/\n{2,}/g, ". ")        // multiple newlines -> pause
    .replace(/\n/g, ". ")            // single newlines -> pause
    .trim();
};

 const speak = (text) => {
  setState(STATES.SPEAKING);
  window.speechSynthesis.cancel();

  const cleanText = cleanTextForSpeech(text);
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.rate = 1;
  utterance.pitch = 1;

  const voice = pickVoice();
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang;
  } else {
    utterance.lang = "en-US";
  }

  utterance.onend = () => {
    if (!stoppedRef.current) startListening();
  };

  utterance.onerror = (e) => {
    console.error("Speech synthesis error:", e);
    if (!stoppedRef.current) startListening();
  };

  window.speechSynthesis.speak(utterance);
};

 const startListening = () => {
  if (stoppedRef.current) return;
  if (stateRef.current === STATES.LISTENING) return; // prevent double-start
  setErrorMsg("");
  setTranscript("");
  setReply("");
  setState(STATES.LISTENING);
  try {
    recognitionRef.current?.start();
    console.log("startListening: start() called successfully");
  } catch (e) {      
    console.log("startListening ERROR:", e.name, e.message);
  }
};

 const handleOrbClick = () => {
  console.log("Orb clicked! Current state:", state);
  if (state === STATES.READY) {
    console.log("Calling startListening from READY state");
    startListening();
  } else if (state === STATES.SPEAKING) {
    window.speechSynthesis.cancel();
    startListening();
  }
};

  const handleClose = () => {
    stoppedRef.current = true;
    recognitionRef.current?.stop();
    window.speechSynthesis.cancel();
    onClose();
  };

  const statusText = {
    [STATES.READY]: "Tap the orb to start talking",
    [STATES.LISTENING]: "Listening...",
    [STATES.THINKING]: "Thinking...",
    [STATES.SPEAKING]: "Speaking... (tap to interrupt)",
  };

  return (
    <div className="voice-overlay">
      <button className="voice-close-btn" onClick={handleClose}>
        ✕
      </button>

      <div className={`voice-orb ${state}`} onClick={handleOrbClick}>
        <span className="voice-orb-icon">✦</span>
      </div>

      <p className="voice-status">{statusText[state]}</p>

      {errorMsg && <p className="voice-error">{errorMsg}</p>}
      {transcript && <p className="voice-transcript">"{transcript}"</p>}
      {reply && <p className="voice-reply">{reply}</p>}
    </div>
  );
}

export default VoiceOverlay;