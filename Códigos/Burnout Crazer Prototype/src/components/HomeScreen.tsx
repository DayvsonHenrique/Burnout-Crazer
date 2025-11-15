import { useState } from 'react';
import { Flower2, Wind, Calendar, BookOpen, BellRing } from 'lucide-react';
import { OrganicBackground } from './OrganicBackground';
import { BottomNav } from './BottomNav';

interface HomeScreenProps {
  userName: string;
  onNavigate: (screen: string) => void;
  onBottomNavChange: (tab: 'home' | 'chat' | 'activity' | 'profile') => void;
}

export function HomeScreen({ userName, onNavigate, onBottomNavChange }: HomeScreenProps) {
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [moodMessage, setMoodMessage] = useState('');

  const handleMoodClick = (mood: string) => {
    let message = '';
    switch(mood) {
      case 'very-bad':
        message = 'Parece que o dia está difícil. Vamos cuidar de você 💛';
        break;
      case 'bad':
        message = 'Entendi! Que tal relaxar um pouco?';
        break;
      case 'neutral':
        message = 'Vamos juntos encontrar mais equilíbrio 🌿';
        break;
      case 'good':
        message = 'Ótimo! Continue cuidando de si mesmo ✨';
        break;
      case 'very-good':
        message = 'Que ótimo! Continue assim ✨';
        break;
    }
    setMoodMessage(message);
    setShowMoodModal(true);
  };

  return (
    <div className="relative min-h-screen pb-20 overflow-hidden">
      <OrganicBackground />
      
      <div className="relative z-10 px-6 py-8">
        <div className="mb-8">
          <h2 className="text-gray-800 mb-4">Olá, {userName} 👋</h2>
          <p className="text-gray-600 mb-4">Como você está hoje?</p>
          
          <div className="flex justify-between items-center gap-2 py-4">
            <button
              onClick={() => handleMoodClick('very-bad')}
              className="text-4xl hover:scale-110 transition-transform"
            >
              😢
            </button>
            <button
              onClick={() => handleMoodClick('bad')}
              className="text-4xl hover:scale-110 transition-transform"
            >
              😕
            </button>
            <button
              onClick={() => handleMoodClick('neutral')}
              className="text-4xl hover:scale-110 transition-transform"
            >
              😐
            </button>
            <button
              onClick={() => handleMoodClick('good')}
              className="text-4xl hover:scale-110 transition-transform"
            >
              🙂
            </button>
            <button
              onClick={() => handleMoodClick('very-good')}
              className="text-4xl hover:scale-110 transition-transform"
            >
              😄
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-700 mb-4">O que você gostaria de fazer?</p>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <button
              onClick={() => onNavigate('meditation')}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/90 transition-all hover:scale-105 flex flex-col items-center justify-center gap-3 min-h-[140px]"
            >
              <div className="p-3 bg-purple-100 rounded-full">
                <Flower2 size={32} className="text-purple-600" />
              </div>
              <span className="text-sm text-gray-700 text-center">Meditação</span>
            </button>
            
            <button
              onClick={() => onNavigate('breathing')}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/90 transition-all hover:scale-105 flex flex-col items-center justify-center gap-3 min-h-[140px]"
            >
              <div className="p-3 bg-blue-100 rounded-full">
                <Wind size={32} className="text-blue-600" />
              </div>
              <span className="text-sm text-gray-700 text-center">Exercícios de Respiração</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            <button 
              onClick={() => onNavigate('planning')}
              className="bg-white/70 backdrop-blur-sm rounded-xl p-4 hover:bg-white/90 transition-all hover:scale-105 flex items-center gap-3"
            >
              <div className="p-2 bg-green-100 rounded-lg">
                <Calendar size={24} className="text-green-600" />
              </div>
              <span className="text-sm text-gray-700">Planejamento e Produtividade Consciente</span>
            </button>
          </div>
        </div>
      </div>
      
      <BottomNav activeTab="home" onTabChange={onBottomNavChange} />
      
      {showMoodModal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6"
          onClick={() => setShowMoodModal(false)}
        >
          <div 
            className="bg-white rounded-2xl p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-gray-800 text-center mb-4">{moodMessage}</p>
            <button
              onClick={() => setShowMoodModal(false)}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Entendi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}