import { useEffect, useRef, useState } from "react";

const STATES = {
  LISTENING: "listening",
  THINKING: "thinking",
  SPEAKING: "speaking",
};

function VoiceOverlay({ onSendMessage, onClose }) {
  const [state, setState] = useState(STATES.LISTENING);
  const [transcript, setTranscript] = useState("");
  const [reply, setReply] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const recognitionRef = useRef(null);
  const stoppedRef = useRef(false);
  const voicesRef = useRef([]);
  const stateRef = useRef(STATES.LISTENING);
  const busyRef = useRef(false);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    stoppedRef.current = false;
    busyRef.current = false;

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
      const text = event.results[0][0].transcript.trim();
      if (!text || busyRef.current) return;

      if (stateRef.current === STATES.SPEAKING) {
        window.speechSynthesis.cancel();
      }

      busyRef.current = true;
      setTranscript(text);
      setReply("");
      setState(STATES.THINKING);

      try {
        const assistantReply = await onSendMessage(text);
        setReply(assistantReply);
        speak(assistantReply);
      } catch (err) {
        console.error("Send message error:", err);
        busyRef.current = false;
        if (!stoppedRef.current) restartRecognition();
      }
    };

    recognition.onerror = (event) => {
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        setErrorMsg("Microphone access denied. Please allow mic permission and reload.");
        return;
      }
      // no-speech / aborted etc — restart handled in onend
    };

    recognition.onend = () => {
      if (!stoppedRef.current) {
        setTimeout(() => restartRecognition(), 150);
      }
    };

    recognitionRef.current = recognition;

    const restartRecognition = () => {
      try {
        recognitionRef.current?.start();
      } catch (e) {
        // already running — ignore
      }
    };

    restartRecognition();

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

    const priorityNames = ["natural", "neural", "aria", "jenny", "zira", "samantha", "female"];
    for (const name of priorityNames) {
      const match = voices.find(
        (v) => v.lang?.startsWith("en") && v.name.toLowerCase().includes(name)
      );
      if (match) return match;
    }
    return (
      voices.find((v) => v.lang === "en-IN") ||
      voices.find((v) => v.lang?.startsWith("en")) ||
      voices[0]
    );
  };

  const cleanTextForSpeech = (text) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/^\s*[\*\-•]\s+/gm, "")
      .replace(/#{1,6}\s/g, "")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\n{2,}/g, ". ")
      .replace(/\n/g, ". ")
      .trim();
  };

  const speak = (text) => {
    setState(STATES.SPEAKING);
    window.speechSynthesis.cancel();

    const cleanText = cleanTextForSpeech(text);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.03;
    utterance.pitch = 1.05;

    const voice = pickVoice();
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = "en-US";
    }

    utterance.onend = () => {
      busyRef.current = false;
      if (!stoppedRef.current) {
        setState(STATES.LISTENING);
        setTranscript("");
        setReply("");
        try {
          recognitionRef.current?.start();
        } catch (e) {}
      }
    };
    utterance.onerror = () => {
      busyRef.current = false;
      if (!stoppedRef.current) {
        setState(STATES.LISTENING);
        try {
          recognitionRef.current?.start();
        } catch (e) {}
      }
    };

    // Restart recognition WHILE speaking too, so barge-in can be heard
    try {
      recognitionRef.current?.start();
    } catch (e) {}

    window.speechSynthesis.speak(utterance);
  };

  const handleClose = () => {
    stoppedRef.current = true;
    recognitionRef.current?.stop();
    window.speechSynthesis.cancel();
    onClose();
  };

  const statusText = {
    [STATES.LISTENING]: "Listening...",
    [STATES.THINKING]: "Thinking...",
    [STATES.SPEAKING]: "Speaking... (just start talking to interrupt)",
  };

  return (
    <div className="voice-overlay">
      <button className="voice-close-btn" onClick={handleClose}>
        ✕
      </button>

      <div className={`voice-orb ${state}`}>
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