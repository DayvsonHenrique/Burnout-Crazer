import { useState } from 'react';
import { ChevronLeft, Search, UserPlus, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';

const psychologists = [
  {
    id: 'psych-1',
    name: 'Maria Joaquina dos Santos',
    avatar: '👩‍⚕️',
    profilePhoto: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHxkb2N0b3IlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYzNTY5OTg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    online: true,
    lastSeen: 'Agora'
  },
  {
    id: 'psych-2',
    name: 'Marinalva Callegario',
    avatar: '👨‍⚕️',
    profilePhoto: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxkb2N0b3IlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYzNTY5OTg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    online: false,
    lastSeen: '2h atrás'
  },
  {
    id: 'psych-3',
    name: 'Ademar Ferreira da Silva',
    avatar: '👨‍⚕️',
    profilePhoto: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxkb2N0b3IlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYzNTY5OTg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    online: false,
    lastSeen: '1d atrás'
  },
  {
    id: 'psych-4',
    name: 'Bruno Henrique do Souza',
    avatar: '👨‍⚕️',
    profilePhoto: 'https://images.unsplash.com/photo-1755189118414-14c8dacdb082?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYzNTY5OTg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    online: true,
    lastSeen: 'Agora'
  }
];

const defaultFriends = [
  {
    id: 'friend-1',
    name: 'Marcos Vinicius',
    avatar: '🧑',
    profilePhoto: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwYXZhdGFyfGVufDF8fHx8MTc2MzY1OTA5OXww&ixlib=rb-4.1.0&q=80&w=1080',
    online: true
  },
  {
    id: 'friend-2',
    name: 'Ana Silva',
    avatar: '👩',
    profilePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxwcm9maWxlJTIwYXZhdGFyfGVufDF8fHx8MTc2MzY1OTA5OXww&ixlib=rb-4.1.0&q=80&w=1080',
    online: true
  },
  {
    id: 'friend-3',
    name: 'Pedro Santos',
    avatar: '👨',
    profilePhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwcm9maWxlJTIwYXZhdGFyfGVufDF8fHx8MTc2MzY1OTA5OXww&ixlib=rb-4.1.0&q=80&w=1080',
    online: false
  },
  {
    id: 'friend-4',
    name: 'Julia Costa',
    avatar: '👩',
    profilePhoto: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxwcm9maWxlJTIwYXZhdGFyfGVufDF8fHx8MTc2MzY1OTA5OXww&ixlib=rb-4.1.0&q=80&w=1080',
    online: false
  }
];

export default function Chat({ onBack, user, chatMessages, setChatMessages, customFriends, setCustomFriends, onNavigate }) {
  const [activeTab, setActiveTab] = useState('psychologists');
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [newFriendName, setNewFriendName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [longPressTimer, setLongPressTimer] = useState(null);
  const [showRemoveDialog, setShowRemoveDialog] = useState(null);

  const allFriends = [...defaultFriends, ...customFriends];

  const getMessagesForChat = (chatId) => {
    return chatMessages[chatId] || [];
  };

  const getLastMessage = (chatId) => {
    const messages = getMessagesForChat(chatId);
    if (messages.length === 0) return 'Sem mensagens';
    const lastMsg = messages[messages.length - 1];
    return lastMsg.text.length > 30 ? lastMsg.text.substring(0, 30) + '...' : lastMsg.text;
  };

  const handleSendMessage = () => {
    if (message.trim() && selectedChat) {
      const newMessage = {
        id: Date.now(),
        text: message,
        sender: 'me',
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };
      
      setChatMessages({
        ...chatMessages,
        [selectedChat.id]: [...(chatMessages[selectedChat.id] || []), newMessage]
      });
      setMessage('');
    }
  };

  const handleAddFriend = () => {
    if (newFriendName.trim()) {
      const newFriend = {
        id: `custom-friend-${Date.now()}`,
        name: newFriendName,
        avatar: '🧑',
        online: true
      };
      setCustomFriends([...customFriends, newFriend]);
      setShowAddFriend(false);
      setNewFriendName('');
    }
  };

  const handleLongPressStart = (person) => {
    if (activeTab === 'friends' && person.id.startsWith('custom-friend-')) {
      const timer = setTimeout(() => {
        setShowRemoveDialog(person);
      }, 500); // Long press duration: 500ms
      setLongPressTimer(timer);
    }
  };

  const handleLongPressEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const handleRemoveFriend = () => {
    if (showRemoveDialog) {
      setCustomFriends(customFriends.filter(f => f.id !== showRemoveDialog.id));
      setShowRemoveDialog(null);
    }
  };

  const filterContacts = (contacts) => {
    if (!searchQuery.trim()) return contacts;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  if (selectedChat) {
    const messages = getMessagesForChat(selectedChat.id);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-black flex flex-col">
        {/* Chat Header */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-4 flex items-center gap-3 border-b border-gray-200 dark:border-gray-700">
          <button onClick={() => setSelectedChat(null)} className="text-gray-700 dark:text-gray-300">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="relative">
            {selectedChat.profilePhoto ? (
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-200 dark:border-gray-700">
                <ImageWithFallback
                  src={selectedChat.profilePhoto}
                  alt={selectedChat.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${
                activeTab === 'psychologists' ? 'from-blue-400 to-blue-600' : 'from-purple-400 to-purple-600'
              } flex items-center justify-center text-2xl`}>
                {selectedChat.avatar}
              </div>
            )}
            {selectedChat.online && (
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-gray-900 dark:text-white">{selectedChat.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {selectedChat.online ? 'Online' : selectedChat.lastSeen}
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-12">
              <div className="text-5xl mb-4">💬</div>
              <p>Inicie uma conversa</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl ${
                    msg.sender === 'me'
                      ? 'bg-blue-600 text-white rounded-br-sm'
                      : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-sm'
                  }`}
                >
                  <p>{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Digite sua mensagem..."
              className="flex-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            <Button
              onClick={handleSendMessage}
              className="bg-blue-600 hover:bg-blue-700 rounded-full w-12 h-12 p-0"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentContacts = activeTab === 'psychologists' ? psychologists : allFriends;
  const filteredContacts = filterContacts(currentContacts);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-black pb-20">
      {!selectedChat ? (
        <>
          {/* Header */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
            <button onClick={onBack} className="text-gray-700 dark:text-gray-300">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl text-gray-900 dark:text-white">Meu Espaço</h1>
            <div className="w-6" />
          </div>

          {/* Tabs */}
          <div className="flex gap-2 px-4 mt-4 mb-6">
            <button
              onClick={() => setActiveTab('psychologists')}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeTab === 'psychologists'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300'
              }`}
            >
              Psicólogos
            </button>
            <button
              onClick={() => setActiveTab('friends')}
              className={`px-6 py-2 rounded-full transition-colors ${
                activeTab === 'friends'
                  ? 'bg-purple-400 text-white'
                  : 'bg-white/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300'
              }`}
            >
              Meu Espaço
            </button>
          </div>

          {/* Search Bar */}
          <div className="px-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquisar..."
                className="pl-10 bg-white/70 dark:bg-gray-800/70 border-gray-200 dark:border-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="px-4 pb-4 space-y-2">
            {filteredContacts.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 mt-12">
                <p>Nenhum resultado encontrado</p>
              </div>
            ) : (
              filteredContacts.map((person) => (
                <motion.button
                  key={person.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedChat(person)}
                  onPointerDown={() => handleLongPressStart(person)}
                  onPointerUp={handleLongPressEnd}
                  onPointerLeave={handleLongPressEnd}
                  className={`w-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3 border border-gray-200 dark:border-gray-700 ${
                    activeTab === 'psychologists' ? 'hover:border-blue-300 dark:hover:border-blue-500' : 'hover:border-purple-300 dark:hover:border-purple-500'
                  } transition-colors`}
                >
                  <div className="relative">
                    {person.profilePhoto ? (
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-200 dark:border-gray-700">
                        <ImageWithFallback
                          src={person.profilePhoto}
                          alt={person.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${
                        activeTab === 'psychologists' ? 'from-blue-400 to-blue-600' : 'from-purple-400 to-purple-600'
                      } flex items-center justify-center text-2xl`}>
                        {person.avatar}
                      </div>
                    )}
                    {person.online && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-gray-900 dark:text-white">{person.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{getLastMessage(person.id)}</p>
                  </div>
                  {person.online && (
                    <div className={`w-3 h-3 rounded-full ${
                      activeTab === 'psychologists' ? 'bg-blue-600' : 'bg-purple-600'
                    }`} />
                  )}
                </motion.button>
              ))
            )}

            {/* Add Friend */}
            {activeTab === 'friends' && (
              <>
                {showAddFriend ? (
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-purple-300 mt-4">
                    <Input
                      value={newFriendName}
                      onChange={(e) => setNewFriendName(e.target.value)}
                      placeholder="Digite o nome do amigo..."
                      className="mb-3"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleAddFriend} className="flex-1 bg-purple-600 hover:bg-purple-700">
                        Adicionar
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setShowAddFriend(false);
                          setNewFriendName('');
                        }}
                        className="flex-1"
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    onClick={() => setShowAddFriend(true)}
                    className="w-full bg-purple-600 hover:bg-purple-700 rounded-full mt-4"
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Adicionar Novo Amigo
                  </Button>
                )}
              </>
            )}

            {/* Remove Friend Dialog */}
            {showRemoveDialog && (
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-purple-300 mt-4">
                <p className="text-gray-900">Tem certeza que deseja remover {showRemoveDialog.name}?</p>
                <div className="flex gap-2 mt-3">
                  <Button onClick={handleRemoveFriend} className="flex-1 bg-red-600 hover:bg-red-700">
                    Remover
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowRemoveDialog(null)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-purple-200/80 backdrop-blur-sm border-t border-purple-300">
            <div className="flex justify-around items-center py-3 px-6">
              <button onClick={onBack} className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl">
                  🏠
                </div>
              </button>
              <button className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 bg-purple-400 rounded-2xl flex items-center justify-center text-2xl">
                  💬
                </div>
              </button>
              <button onClick={() => { setSelectedChat(null); onNavigate('profile'); }} className="flex flex-col items-center gap-1">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl">
                  ⚙️
                </div>
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-green-100 flex flex-col">
          {/* Chat Header */}
          <div className="bg-white/70 backdrop-blur-sm p-4 flex items-center gap-3 border-b border-gray-200">
            <button onClick={() => setSelectedChat(null)} className="text-gray-700">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="relative">
              {selectedChat.profilePhoto ? (
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-200 dark:border-gray-700">
                  <ImageWithFallback
                    src={selectedChat.profilePhoto}
                    alt={selectedChat.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${
                  activeTab === 'psychologists' ? 'from-blue-400 to-blue-600' : 'from-purple-400 to-purple-600'
                } flex items-center justify-center text-2xl`}>
                  {selectedChat.avatar}
                </div>
              )}
              {selectedChat.online && (
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900">{selectedChat.name}</h3>
              <p className="text-sm text-gray-500">
                {selectedChat.online ? 'Online' : selectedChat.lastSeen}
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-3 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-12">
                <div className="text-5xl mb-4">💬</div>
                <p>Inicie uma conversa</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl ${
                      msg.sender === 'me'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-white text-gray-900 rounded-bl-sm'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-blue-100' : 'text-gray-500'}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input */}
          <div className="bg-white/70 backdrop-blur-sm p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Digite sua mensagem..."
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-blue-600 hover:bg-blue-700 rounded-full w-12 h-12 p-0"
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}