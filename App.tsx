import React, { useState } from 'react';
import VideoGenerator from './components/VideoGenerator';
import ImageEditor from './components/ImageEditor';
import LanguageSwitcher from './components/LanguageSwitcher';
import { useLanguage } from './contexts/LanguageContext';

type ActiveTab = 'video' | 'image';

// A small helper component for tab buttons
interface TabButtonProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
    icon: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick, icon }) => {
    const activeClasses = "border-lime-400 text-white";
    const inactiveClasses = "border-transparent text-gray-400 hover:text-white";
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 py-3 px-4 text-sm font-semibold border-b-2 transition-colors duration-200 ${isActive ? activeClasses : inactiveClasses}`}
        >
            {icon}
            {label}
        </button>
    );
};


const App: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<ActiveTab>('video');

  return (
    <div className="min-h-screen bg-black text-gray-200 flex flex-col">
       <header className="flex items-center justify-between p-3 border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-bold text-white">
            {t('appTitle')}
          </h1>
          <span className="text-xs font-semibold text-gray-400 bg-gray-700/50 px-2 py-0.5 rounded-full">
            2.0
          </span>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="px-4 border-b border-gray-800 bg-gray-900/80">
        <div className="flex items-center">
          <TabButton
            label={t('videoGeneratorTab')}
            isActive={activeTab === 'video'}
            onClick={() => setActiveTab('video')}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /><path d="M14.553 7.106A1 1 0 0014 8v4a1 1 0 001.553.832l3-2a1 1 0 000-1.664l-3-2z" /></svg>}
          />
          <TabButton
            label={t('imageEditorTab')}
            isActive={activeTab === 'image'}
            onClick={() => setActiveTab('image')}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>}
          />
        </div>
      </nav>

      <div className="flex-grow relative">
        <div className={`h-full ${activeTab === 'video' ? 'block' : 'hidden'}`}>
          <VideoGenerator />
        </div>
        <div className={`h-full ${activeTab === 'image' ? 'block' : 'hidden'}`}>
          <div className="p-4 md:p-8 overflow-y-auto h-full">
            <ImageEditor />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;