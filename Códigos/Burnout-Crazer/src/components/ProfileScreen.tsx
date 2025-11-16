import { useState } from 'react';
import { ChevronRight, User } from 'lucide-react';
import { OrganicBackground } from './OrganicBackground';
import { BottomNav } from './BottomNav';

interface ProfileScreenProps {
  userName: string;
  userAvatar: string | null;
  onBack: () => void;
  onBottomNavChange: (tab: 'home' | 'chat' | 'activity' | 'profile') => void;
  onAvatarChange?: (newAvatar: string) => void;
}

export function ProfileScreen({ userName, userAvatar, onBack, onBottomNavChange, onAvatarChange }: ProfileScreenProps) {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        onAvatarChange?.(result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative min-h-screen pb-20 overflow-hidden">
      <OrganicBackground />
      
      <div className="relative z-10 px-6 py-8">
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            {userAvatar ? (
              <img
                src={userAvatar}
                alt={userName}
                className="w-32 h-32 rounded-full object-cover border-4 border-white/50"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-300 border-4 border-white/50 flex items-center justify-center">
                <User size={48} className="text-gray-600" />
              </div>
            )}
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
          <h2 className="text-gray-800 mt-4">{userName}</h2>
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