import { Home, MessageCircle, Activity, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'chat' | 'activity' | 'profile';
  onTabChange: (tab: 'home' | 'chat' | 'activity' | 'profile') => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 py-2 px-4 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <button
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
            activeTab === 'home' ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          <Home size={24} />
        </button>
        <button
          onClick={() => onTabChange('chat')}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
            activeTab === 'chat' ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          <MessageCircle size={24} />
        </button>
        <button
          onClick={() => onTabChange('activity')}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
            activeTab === 'activity' ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          <Activity size={24} />
        </button>
        <button
          onClick={() => onTabChange('profile')}
          className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
            activeTab === 'profile' ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          <User size={24} />
        </button>
      </div>
    </div>
  );
}
