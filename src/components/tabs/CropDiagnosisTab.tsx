import React, { useState } from 'react';
import { ImageUpload } from '../ImageUpload';
import { ActionButton } from '../ActionButton';
import { ResultBox } from '../ResultBox';
import { apiService } from '../../services/api';

export const CropDiagnosisTab: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showResult, setShowResult] = useState(false);

  const handleDiagnose = async () => {
    if (!selectedImage) {
      setError('Please upload an image first.');
      setShowResult(true);
      return;
    }

    setIsLoading(true);
    setShowResult(false);
    setError('');

    try {
      const response = await apiService.diagnoseCrop(selectedImage);
      
      if (response.success && response.result) {
        setResult(response.result);
        setError('');
      } else {
        setError(response.error || 'Failed to analyze the image');
        setResult('');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setResult('');
    } finally {
      setIsLoading(false);
      setShowResult(true);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Instant Crop Disease Diagnosis
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Upload a photo of a plant leaf. Our AI will analyze it and suggest remedies.
        </p>
      </div>

      <ImageUpload 
        onImageSelect={setSelectedImage}
        selectedImage={selectedImage}
      />

      {selectedImage && (
        <div className="text-center">
          <ActionButton
            onClick={handleDiagnose}
            isLoading={isLoading}
            disabled={!selectedImage}
          >
            {isLoading ? 'Analyzing...' : 'Diagnose Crop'}
          </ActionButton>
        </div>
      )}

      <ResultBox
        result={error || result}
        isVisible={showResult}
        isError={!!error}
      />
    </div>
  );
};