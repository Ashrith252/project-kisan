import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface ImageUploadProps {
  onImageSelect: (file: File | null) => void;
  selectedImage: File | null;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, selectedImage }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
    
    onImageSelect(file);
  };

  const handleRemoveImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    onImageSelect(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center">
        <label className="
          cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-white
          px-6 py-3 rounded-xl font-semibold transition-all duration-300
          shadow-lg hover:shadow-xl flex items-center gap-2
        ">
          <Upload size={20} />
          Upload Plant Photo
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {previewUrl && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative text-center"
        >
          <div className="relative inline-block">
            <img
              src={previewUrl}
              alt="Preview"
              className="max-w-full h-auto max-h-80 rounded-lg shadow-lg"
            />
            <button
              onClick={handleRemoveImage}
              className="
                absolute -top-2 -right-2 bg-red-500 text-white 
                rounded-full p-1 hover:bg-red-600 transition-colors
              "
            >
              <X size={16} />
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Image ready for diagnosis
          </p>
        </motion.div>
      )}
    </div>
  );
};