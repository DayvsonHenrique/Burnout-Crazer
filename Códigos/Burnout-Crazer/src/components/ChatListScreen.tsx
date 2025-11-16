import { useState } from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import { OrganicBackground } from './OrganicBackground';
import { BottomNav } from './BottomNav';

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  avatar: string;
  isPsychologist: boolean;
}

interface ChatListScreenProps {
  chats: Chat[];
  onChatClick: (chatId: string) => void;
  onBack: () => void;
  onBottomNavChange: (tab: 'home' | 'chat' | 'activity' | 'profile') => void;
}

export function ChatListScreen({ chats, onChatClick, onBack, onBottomNavChange }: ChatListScreenProps) {
  const [activeTab, setActiveTab] = useState<'psychologists' | 'myspace'>('psychologists');

  const filteredChats = chats.filter(chat => 
    activeTab === 'psychologists' ? chat.isPsychologist : !chat.isPsychologist
  );

  return (
    <div className="relative min-h-screen pb-20 overflow-hidden">
      <OrganicBackground />
      
      <div className="relative z-10">
        <div className="bg-white/70 backdrop-blur-md px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-white/50 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} className="text-gray-700" />
            </button>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Pesquisar"
                className="w-full pl-10 pr-4 py-2 bg-white rounded-full border border-gray-200 focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setActiveTab('psychologists')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeTab === 'psychologists'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/50 text-gray-600 hover:bg-white'
              }`}
            >
              Psicólogos
            </button>
            <button
              onClick={() => setActiveTab('myspace')}
              className={`px-6 py-2 rounded-full transition-all ${
                activeTab === 'myspace'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/50 text-gray-600 hover:bg-white'
              }`}
            >
              Meu Espaço
            </button>
          </div>
        </div>
        
        <div className="px-6 py-4">
          {filteredChats.map(chat => (
            <button
              key={chat.id}
              onClick={() => onChatClick(chat.id)}
              className="w-full flex items-center gap-4 p-4 mb-2 bg-white/70 backdrop-blur-sm rounded-2xl hover:bg-white/90 transition-all"
            >
              <img
                src={chat.avatar}
                alt={chat.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div className="flex-1 text-left">
                <h3 className="text-gray-800 mb-1">{chat.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-1">{chat.lastMessage}</p>
              </div>
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
            </button>
          ))}
        </div>
      </div>
      
      <BottomNav activeTab="chat" onTabChange={onBottomNavChange} />
    </div>
  );
}
