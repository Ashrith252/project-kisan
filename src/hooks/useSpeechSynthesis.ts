import { useState, useCallback } from 'react';

export const useSpeechSynthesis = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synth = window.speechSynthesis;

  const speak = useCallback((text: string) => {
    if (!text) return;

    // Stop any currently playing speech
    if (synth.speaking) {
      synth.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    // Try to use a more natural voice if available
    const voices = synth.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.lang.includes('en') && 
      (voice.name.includes('Google') || voice.name.includes('Microsoft'))
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    synth.speak(utterance);
  }, [synth]);

  const stop = useCallback(() => {
    synth.cancel();
    setIsSpeaking(false);
  }, [synth]);

  return {
    speak,
    stop,
    isSpeaking,
    isSupported: 'speechSynthesis' in window,
  };
};