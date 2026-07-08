import { useEffect, useRef } from "react";

function WakeWordListener({ active, onWake }) {
  const recognitionRef = useRef(null);
  const stoppedRef = useRef(true);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    if (!active) {
      stoppedRef.current = true;
      recognitionRef.current?.stop();
      return;
    }

    stoppedRef.current = false;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-IN";

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript.toLowerCase();
      console.log("Wake word heard:", text);
      if (/sak?h?a|sacha|sasha|socha/.test(text)) {
        stoppedRef.current = true;
        recognition.stop();
        onWake();
      }
    };

    recognition.onerror = () => {};

    recognition.onend = () => {
      if (!stoppedRef.current) {
        setTimeout(() => {
          try {
            recognitionRef.current?.start();
          } catch (e) {}
        }, 300);
      }
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch (e) {}

    return () => {
      stoppedRef.current = true;
      recognition.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return null;
}

export default WakeWordListener;