import React, { useState } from 'react';
import { SpeechInput } from '../SpeechInput';
import { ActionButton } from '../ActionButton';
import { ResultBox } from '../ResultBox';
import { apiService } from '../../services/api';

export const GovernmentSchemesTab: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showResult, setShowResult] = useState(false);

  const handleGetSchemes = async () => {
    if (!query.trim()) {
      setError('Please enter a query about government schemes.');
      setShowResult(true);
      return;
    }

    setIsLoading(true);
    setShowResult(false);
    setError('');

    try {
      const response = await apiService.getGovernmentSchemes(query);
      
      if (response.success && response.result) {
        setResult(response.result);
        setError('');
      } else {
        setError(response.error || 'Failed to fetch scheme information');
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
          Government Scheme Navigator
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Ask about government subsidies or schemes. (e.g., "Subsidies for drip irrigation?")
        </p>
      </div>

      <SpeechInput
        onTranscript={setQuery}
        placeholder="Type or click the mic to speak..."
        value={query}
        onChange={setQuery}
      />

      <div className="text-center">
        <ActionButton
          onClick={handleGetSchemes}
          isLoading={isLoading}
        >
          {isLoading ? 'Searching...' : 'Get Scheme Info'}
        </ActionButton>
      </div>

      <ResultBox
        result={error || result}
        isVisible={showResult}
        isError={!!error}
      />
    </div>
  );
};