import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TabButton } from './components/TabButton';
import { CropDiagnosisTab } from './components/tabs/CropDiagnosisTab';
import { MarketAnalysisTab } from './components/tabs/MarketAnalysisTab';
import { GovernmentSchemesTab } from './components/tabs/GovernmentSchemesTab';

type TabType = 'diagnosis' | 'market' | 'schemes';

const tabs = [
  { id: 'diagnosis', label: 'Crop Diagnosis', icon: '🌱' },
  { id: 'market', label: 'Market Analysis', icon: '📈' },
  { id: 'schemes', label: 'Govt. Schemes', icon: '🏛️' },
] as const;

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('diagnosis');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'diagnosis':
        return <CropDiagnosisTab />;
      case 'market':
        return <MarketAnalysisTab />;
      case 'schemes':
        return <GovernmentSchemesTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-8 text-center text-white">
            <motion.h1 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-4xl md:text-5xl font-bold mb-2"
            >
              🌾 Project Kisan
            </motion.h1>
            <p className="text-emerald-100 text-lg">
              Your AI-Powered Farmer Assistant
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="p-8 border-b border-gray-100">
            <div className="flex flex-wrap justify-center gap-4">
              {tabs.map((tab) => (
                <TabButton
                  key={tab.id}
                  label={tab.label}
                  icon={tab.icon}
                  isActive={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                />
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 text-gray-600"
        >
          <p className="text-sm">
            Empowering farmers with AI technology • Built with ❤️ for agriculture
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default App;