import React, { useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

interface SpeechInputProps {
  onTranscript: (text: string) => void;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export const SpeechInput: React.FC<SpeechInputProps> = ({ 
  onTranscript, 
  placeholder, 
  value, 
  onChange 
}) => {
  const { 
    isListening, 
    transcript, 
    error, 
    isSupported, 
    startListening, 
    stopListening, 
    resetTranscript 
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      onTranscript(transcript);
      resetTranscript();
    }
  }, [transcript, onTranscript, resetTranscript]);

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full p-4 pr-14 border border-emerald-200 rounded-xl
          focus:outline-none focus:ring-3 focus:ring-emerald-100 focus:border-emerald-400
          resize-vertical min-h-[100px] font-inherit
          shadow-sm transition-all duration-300
        "
      />
      
      {isSupported && (
        <button
          onClick={handleMicClick}
          disabled={!isSupported}
          className={`
            absolute right-3 top-1/2 transform -translate-y-1/2
            p-2 rounded-full transition-all duration-300
            ${isListening 
              ? 'bg-red-500 text-white animate-pulse' 
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }
            disabled:bg-gray-100 disabled:text-gray-400
          `}
        >
          {isListening ? <MicOff size={20} /> : <Mic size={20} />}
        </button>
      )}
      
      {isListening && (
        <div className="flex items-center gap-2 mt-2 text-sm text-emerald-600">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span>Listening...</span>
        </div>
      )}
      
      {error && (
        <div className="mt-2 text-sm text-red-600">
          ⚠️ {error}
        </div>
      )}
      
      <div className="mt-2 text-sm text-gray-500">
        💡 Tip: Click the microphone to use voice input, or type manually
      </div>
    </div>
  );
};