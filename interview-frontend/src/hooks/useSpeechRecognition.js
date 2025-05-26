import { useState, useEffect, useRef, useCallback } from "react";

export default function useSpeechRecognition(onResult) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const finalTranscriptRef = useRef(""); // keep track of final speech

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = finalTranscriptRef.current;

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }

      finalTranscriptRef.current = finalTranscript;

      // Send combined text: final + interim (for live display)
      onResult(finalTranscript + interimTranscript);
    };

    recognition.onstart = () => setListening(true);

    recognition.onend = () => {
      if (recognitionRef.current && recognitionRef.current.listening) {
        recognitionRef.current.start();
      } else {
        setListening(false);
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === "aborted" || event.error === "no-speech") {
        setListening(false);
      }
    };

    recognitionRef.current = recognition;
    recognitionRef.current.listening = false;

    return () => {
      recognition.stop();
    };
  }, [onResult]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current) return;
    if (listening) return;
    finalTranscriptRef.current = "";  // reset transcript on new start
    recognitionRef.current.listening = true;
    recognitionRef.current.start();
  }, [listening]);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current) return;
    recognitionRef.current.listening = false;
    recognitionRef.current.stop();
    setListening(false);
  }, []);

  return { listening, startListening, stopListening };
}
