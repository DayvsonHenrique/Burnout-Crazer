import { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { OrganicBackground } from './OrganicBackground';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: string;
}

interface ChatScreenProps {
  chatId: string;
  chatName: string;
  chatAvatar: string;
  messages: Message[];
  onBack: () => void;
  onSendMessage: (chatId: string, message: string) => void;
}

export function ChatScreen({ chatId, chatName, chatAvatar, messages, onBack, onSendMessage }: ChatScreenProps) {
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(chatId, newMessage.trim());
      setNewMessage('');
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <OrganicBackground />
      
      <div className="relative z-10 flex flex-col h-screen">
        <div className="bg-white/80 backdrop-blur-md px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-white/50 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} className="text-gray-700" />
            </button>
            <img
              src={chatAvatar}
              alt={chatName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="text-gray-800">{chatName}</h3>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-md'
                    : 'bg-white/80 backdrop-blur-sm text-gray-800 rounded-bl-md'
                }`}
              >
                <p>{message.text}</p>
                <span className={`text-xs mt-1 block ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white/80 backdrop-blur-md px-6 py-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Digite sua mensagem..."
              className="flex-1 px-4 py-3 bg-white rounded-full border border-gray-200 focus:outline-none focus:border-blue-400"
            />
            <button
              onClick={handleSend}
              className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
