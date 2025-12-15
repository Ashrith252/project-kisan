import React from 'react';
import { motion } from 'framer-motion';

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon: string;
}

export const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick, icon }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        px-6 py-3 rounded-xl font-semibold transition-all duration-300 
        border border-transparent flex items-center gap-2
        ${isActive 
          ? 'bg-emerald-500 text-white shadow-lg' 
          : 'bg-gray-50 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600'
        }
      `}
    >
      <span className="text-lg">{icon}</span>
      <span className="hidden sm:inline">{label}</span>
    </motion.button>
  );
};