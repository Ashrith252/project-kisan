import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';

interface ResultBoxProps {
  result: string;
  isVisible: boolean;
  isError?: boolean;
}

export const ResultBox: React.FC<ResultBoxProps> = ({ result, isVisible, isError = false }) => {
  const { speak, isSpeaking } = useSpeechSynthesis();

  const handleSpeakClick = () => {
    speak(result);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`
            relative mt-6 p-6 pt-12 rounded-xl border
            ${isError 
              ? 'bg-red-50 border-red-200 text-red-800' 
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
            }
          `}
        >
          {!isError && (
            <button
              onClick={handleSpeakClick}
              className={`
                absolute top-2 right-2 p-2 rounded-full transition-all duration-300
                ${isSpeaking 
                  ? 'bg-emerald-500 text-white' 
                  : 'bg-emerald-200 text-emerald-700 hover:bg-emerald-300'
                }
              `}
            >
              {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          )}
          
          <div className="whitespace-pre-wrap leading-relaxed">
            {result}
          </div>
          
          {!isError && (
            <div className="mt-4 text-sm text-emerald-600">
              🔊 Click the speaker icon to hear this response read aloud
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};