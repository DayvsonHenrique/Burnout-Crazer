import { ChevronRight } from 'lucide-react';
import { OrganicBackground } from './OrganicBackground';
import { BottomNav } from './BottomNav';

interface ProfileScreenProps {
  userName: string;
  userAvatar: string;
  onBack: () => void;
  onBottomNavChange: (tab: 'home' | 'chat' | 'activity' | 'profile') => void;
}

export function ProfileScreen({ userName, userAvatar, onBack, onBottomNavChange }: ProfileScreenProps) {
  return (
    <div className="relative min-h-screen pb-20 overflow-hidden">
      <OrganicBackground />
      
      <div className="relative z-10 px-6 py-8">
        <div className="flex flex-col items-center mb-8">
          <img
            src={userAvatar}
            alt={userName}
            className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-white/50"
          />
          <h2 className="text-gray-800">{userName}</h2>
        </div>
        
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-4 bg-gray-900 text-white rounded-2xl hover:bg-gray-800 transition-all">
            <span>Gestão dos meus dados</span>
            <ChevronRight size={24} />
          </button>
          
          <button className="w-full flex items-center justify-between p-4 bg-gray-900 text-white rounded-2xl hover:bg-gray-800 transition-all">
            <span>Notificações</span>
            <ChevronRight size={24} />
          </button>
          
          <button className="w-full flex items-center justify-between p-4 bg-gray-900 text-white rounded-2xl hover:bg-gray-800 transition-all">
            <span>Som</span>
            <ChevronRight size={24} />
          </button>
          
          <button className="w-full flex items-center justify-between p-4 bg-gray-900 text-white rounded-2xl hover:bg-gray-800 transition-all">
            <span>Tema</span>
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      
      <BottomNav activeTab="profile" onTabChange={onBottomNavChange} />
    </div>
  );
}
