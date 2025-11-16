import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { SignupScreen } from './components/SignupScreen';
import { ForgotPasswordScreen } from './components/ForgotPasswordScreen';
import { VerificationCodeScreen } from './components/VerificationCodeScreen';
import { NewPasswordScreen } from './components/NewPasswordScreen';
import { HomeScreen } from './components/HomeScreen';
import { ChatListScreen } from './components/ChatListScreen';
import { ChatScreen } from './components/ChatScreen';
import { MeditationScreen } from './components/MeditationScreen';
import { MeditationCategoryScreen } from './components/MeditationCategoryScreen';
import { BreathingScreen } from './components/BreathingScreen';
import { MusicPlayerScreen } from './components/MusicPlayerScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { FavoritesScreen } from './components/FavoritesScreen';
import { PlanningScreen } from './components/PlanningScreen';
import { HabitsScreen } from './components/HabitsScreen';
import { WeeklyPlanningScreen } from './components/WeeklyPlanningScreen';
import { MentalHealthScreen } from './components/MentalHealthScreen';

type Screen = 
  | 'login' 
  | 'signup' 
  | 'forgotPassword' 
  | 'verificationCode' 
  | 'newPassword'
  | 'home' 
  | 'chatList' 
  | 'chat' 
  | 'meditation' 
  | 'meditationAnxiety'
  | 'meditationDepression'
  | 'meditationSleep'
  | 'breathing' 
  | 'player' 
  | 'profile'
  | 'favorites'
  | 'planning'
  | 'habits'
  | 'weekly'
  | 'mentalHealth';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: string;
}

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  avatar: string;
  isPsychologist: boolean;
  messages: Message[];
}

interface Track {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);
  const [playerContext, setPlayerContext] = useState<'meditation' | 'breathing' | 'category'>('meditation');
  const [categoryContext, setCategoryContext] = useState<'anxiety' | 'depression' | 'sleep'>('anxiety');
  const [favoriteTrackIds, setFavoriteTrackIds] = useState<Set<string>>(new Set());

  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      name: 'Maria Joaquina dos Santos',
      lastMessage: 'Oi Marcos, tudo bem?',
      avatar: 'https://images.unsplash.com/photo-1748723941010-3822af70f9de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHRoZXJhcGlzdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MzIyMDE1N3ww&ixlib=rb-4.1.0&q=80&w=400',
      isPsychologist: true,
      messages: [
        { id: 'm1', text: 'Olá! Como está se sentindo hoje?', sender: 'other', timestamp: '10:30' },
        { id: 'm2', text: 'Oi! Estou um pouco ansioso com o trabalho', sender: 'user', timestamp: '10:32' },
        { id: 'm3', text: 'Entendo. Vamos trabalhar algumas técnicas de respiração que podem ajudar.', sender: 'other', timestamp: '10:33' },
        { id: 'm4', text: 'Oi Marcos, tudo bem?', sender: 'other', timestamp: '14:15' },
      ],
    },
    {
      id: '2',
      name: 'Marinalva Callegario',
      lastMessage: 'Você já fez o seu diário?',
      avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400',
      isPsychologist: true,
      messages: [
        { id: 'm1', text: 'Bom dia! Como foi seu fim de semana?', sender: 'other', timestamp: '09:00' },
        { id: 'm2', text: 'Foi bom, consegui descansar bastante', sender: 'user', timestamp: '09:15' },
        { id: 'm3', text: 'Que ótimo! Lembre-se de continuar com os exercícios.', sender: 'other', timestamp: '09:20' },
        { id: 'm4', text: 'Você já fez o seu diário?', sender: 'other', timestamp: '11:45' },
      ],
    },
    {
      id: '3',
      name: 'Ademar Ferreira da Silva',
      lastMessage: 'Bom dia, Ademar!',
      avatar: 'https://images.unsplash.com/photo-1593444286621-98245b7d4530?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwc3ljaG9sb2dpc3QlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYzMTkzODgzfDA&ixlib=rb-4.1.0&q=80&w=400',
      isPsychologist: true,
      messages: [
        { id: 'm1', text: 'Bom dia! Pronto para nossa sessão?', sender: 'other', timestamp: '08:00' },
        { id: 'm2', text: 'Bom dia, Ademar!', sender: 'user', timestamp: '08:05' },
      ],
    },
    {
      id: '4',
      name: 'Bruno Henrique de Souza',
      lastMessage: 'Sim, já fiz a atividade!',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      isPsychologist: true,
      messages: [
        { id: 'm1', text: 'Você conseguiu fazer a atividade que passamos?', sender: 'other', timestamp: '15:00' },
        { id: 'm2', text: 'Sim, já fiz a atividade!', sender: 'user', timestamp: '15:30' },
      ],
    },
    {
      id: '5',
      name: 'Marcos Vinicius',
      lastMessage: 'Oi, Marcos, bom dia!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      isPsychologist: false,
      messages: [
        { id: 'm1', text: 'Oi! Tudo bem?', sender: 'other', timestamp: '12:00' },
        { id: 'm2', text: 'Oi, Marcos, bom dia!', sender: 'user', timestamp: '12:15' },
      ],
    },
    {
      id: '6',
      name: 'Ana Carolina Silva',
      lastMessage: 'Vamos marcar aquele café?',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
      isPsychologist: false,
      messages: [
        { id: 'm1', text: 'Oi! Como você está?', sender: 'other', timestamp: '16:00' },
        { id: 'm2', text: 'Oi Ana! Estou bem, e você?', sender: 'user', timestamp: '16:05' },
        { id: 'm3', text: 'Também! Vamos marcar aquele café?', sender: 'other', timestamp: '16:10' },
      ],
    },
    {
      id: '7',
      name: 'Lucas Fernandes',
      lastMessage: 'Obrigado pelo apoio!',
      avatar: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=400',
      isPsychologist: false,
      messages: [
        { id: 'm1', text: 'Como foi sua semana?', sender: 'other', timestamp: '10:00' },
        { id: 'm2', text: 'Foi corrida, mas consegui fazer minhas meditações', sender: 'user', timestamp: '10:15' },
        { id: 'm3', text: 'Obrigado pelo apoio!', sender: 'other', timestamp: '10:20' },
      ],
    },
    {
      id: '8',
      name: 'Beatriz Oliveira',
      lastMessage: 'Te entendo perfeitamente',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      isPsychologist: false,
      messages: [
        { id: 'm1', text: 'Hoje tive um dia difícil no trabalho', sender: 'user', timestamp: '18:00' },
        { id: 'm2', text: 'Te entendo perfeitamente', sender: 'other', timestamp: '18:05' },
      ],
    },
    {
      id: '9',
      name: 'Pedro Henrique',
      lastMessage: 'Vamos treinar juntos amanhã?',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
      isPsychologist: false,
      messages: [
        { id: 'm1', text: 'E aí, tudo certo?', sender: 'other', timestamp: '14:00' },
        { id: 'm2', text: 'Tudo sim! E você?', sender: 'user', timestamp: '14:10' },
        { id: 'm3', text: 'Vamos treinar juntos amanhã?', sender: 'other', timestamp: '14:15' },
      ],
    },
    {
      id: '10',
      name: 'Juliana Costa',
      lastMessage: 'Adorei a dica de meditação!',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      isPsychologist: false,
      messages: [
        { id: 'm1', text: 'Você conhece alguma boa meditação?', sender: 'other', timestamp: '11:00' },
        { id: 'm2', text: 'Tenho usado as do app, são ótimas!', sender: 'user', timestamp: '11:10' },
        { id: 'm3', text: 'Adorei a dica de meditação!', sender: 'other', timestamp: '11:20' },
      ],
    },
    {
      id: '11',
      name: 'Rafael Santos',
      lastMessage: 'Conte comigo sempre!',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400',
      isPsychologist: false,
      messages: [
        { id: 'm1', text: 'Precisava desabafar um pouco', sender: 'user', timestamp: '20:00' },
        { id: 'm2', text: 'Estou aqui para ouvir', sender: 'other', timestamp: '20:05' },
        { id: 'm3', text: 'Conte comigo sempre!', sender: 'other', timestamp: '20:30' },
      ],
    },
  ]);

  const meditationTracks: Track[] = [
    {
      id: 'med1',
      title: 'Manhã Tranquila',
      subtitle: 'Meditação guiada',
      image: 'https://images.unsplash.com/photo-1758274539654-23fa349cc090?w=1080',
    },
    {
      id: 'med2',
      title: 'Paz Interior',
      subtitle: 'Sons da natureza',
      image: 'https://images.unsplash.com/photo-1626466170806-e8e528a0c873?w=1080',
    },
    {
      id: 'med3',
      title: 'Relaxamento Profundo',
      subtitle: 'Música ambiente',
      image: 'https://images.unsplash.com/photo-1622479130009-feda8f2767bb?w=1080',
    },
    {
      id: 'med4',
      title: 'Mindfulness Diário',
      subtitle: 'Prática guiada',
      image: 'https://images.unsplash.com/photo-1649003592455-77c0efdec77e?w=1080',
    },
  ];

  const anxietyTracks: Track[] = [
    {
      id: 'anx1',
      title: 'Acalme a Ansiedade',
      subtitle: 'Respiração guiada',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080',
    },
    {
      id: 'anx2',
      title: 'Liberando Tensões',
      subtitle: 'Body scan',
      image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1080',
    },
    {
      id: 'anx3',
      title: 'Mente Serena',
      subtitle: 'Meditação focada',
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1080',
    },
    {
      id: 'anx4',
      title: 'Paz no Caos',
      subtitle: 'Técnicas rápidas',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1080',
    },
  ];

  const depressionTracks: Track[] = [
    {
      id: 'dep1',
      title: 'Luz Interior',
      subtitle: 'Meditação de esperança',
      image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=1080',
    },
    {
      id: 'dep2',
      title: 'Energia Positiva',
      subtitle: 'Afirmações guiadas',
      image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1080',
    },
    {
      id: 'dep3',
      title: 'Renascimento',
      subtitle: 'Visualização criativa',
      image: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=1080',
    },
    {
      id: 'dep4',
      title: 'Gratidão Diária',
      subtitle: 'Prática positiva',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1080',
    },
  ];

  const sleepTracks: Track[] = [
    {
      id: 'sleep1',
      title: 'Noite Tranquila',
      subtitle: 'Preparação para dormir',
      image: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=1080',
    },
    {
      id: 'sleep2',
      title: 'Sono Profundo',
      subtitle: 'Relaxamento total',
      image: 'https://images.unsplash.com/photo-1494352491613-11d0b5e1c2e7?w=1080',
    },
    {
      id: 'sleep3',
      title: 'Estrelas e Silêncio',
      subtitle: 'Sons noturnos',
      image: 'https://images.unsplash.com/photo-1484589065579-248aad0d8b13?w=1080',
    },
    {
      id: 'sleep4',
      title: 'Descanso Reparador',
      subtitle: 'Meditação do sono',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=1080',
    },
  ];

  const breathingTracks: Track[] = [
    {
      id: 'br1',
      title: 'Respiração 4-7-8',
      subtitle: 'Técnica anti-ansiedade',
      image: 'https://images.unsplash.com/photo-1545289414-1c3cb1c06238?w=1080',
    },
    {
      id: 'br2',
      title: 'Respiração Quadrada',
      subtitle: 'Box breathing',
      image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1080',
    },
    {
      id: 'br3',
      title: 'Respiração Diafragmática',
      subtitle: 'Respiração profunda',
      image: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1080',
    },
    {
      id: 'br4',
      title: 'Respiração Alternada',
      subtitle: 'Nadi Shodhana',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080',
    },
    {
      id: 'br5',
      title: 'Respiração Consciente',
      subtitle: 'Atenção plena',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080',
    },
  ];

  const handleLogin = (email: string, password: string) => {
    setUserEmail(email);
    setUserName(email.split('@')[0]);
    setCurrentScreen('home');
  };

  const handleSignup = (name: string, email: string, password: string) => {
    setUserName(name);
    setUserEmail(email);
    setCurrentScreen('home');
  };

  const handleNavigate = (screen: string) => {
    if (screen === 'meditation') {
      setPlayerContext('meditation');
      setCurrentScreen('meditation');
    } else if (screen === 'breathing') {
      setPlayerContext('breathing');
      setCurrentScreen('breathing');
    } else if (screen === 'planning') {
      setCurrentScreen('planning');
    }
  };

  const handleBottomNavChange = (tab: 'home' | 'chat' | 'activity' | 'profile') => {
    if (tab === 'home') {
      setCurrentScreen('home');
    } else if (tab === 'chat') {
      setCurrentScreen('chatList');
    } else if (tab === 'profile') {
      setCurrentScreen('profile');
    } else if (tab === 'activity') {
      setCurrentScreen('planning');
    }
  };

  const handleChatClick = (chatId: string) => {
    setSelectedChatId(chatId);
    setCurrentScreen('chat');
  };

  const handleSendMessage = (chatId: string, message: string) => {
    setChats(prevChats => 
      prevChats.map(chat => {
        if (chat.id === chatId) {
          const newMessage: Message = {
            id: `m${Date.now()}`,
            text: message,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          };
          return {
            ...chat,
            messages: [...chat.messages, newMessage],
            lastMessage: message,
          };
        }
        return chat;
      })
    );
  };

  const handlePlayTrack = (trackId: string) => {
    setSelectedTrackId(trackId);
    setCurrentScreen('player');
  };

  const handleCategoryClick = (category: 'anxiety' | 'depression' | 'sleep') => {
    setCategoryContext(category);
    setPlayerContext('category');
    if (category === 'anxiety') {
      setCurrentScreen('meditationAnxiety');
    } else if (category === 'depression') {
      setCurrentScreen('meditationDepression');
    } else {
      setCurrentScreen('meditationSleep');
    }
  };

  const handleToggleFavorite = (trackId: string) => {
    setFavoriteTrackIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(trackId)) {
        newSet.delete(trackId);
      } else {
        newSet.add(trackId);
      }
      return newSet;
    });
  };

  const getAllTracks = () => {
    return [...meditationTracks, ...anxietyTracks, ...depressionTracks, ...sleepTracks, ...breathingTracks];
  };

  const getFavoriteTracks = () => {
    const allTracks = getAllTracks();
    return allTracks.filter(track => favoriteTrackIds.has(track.id));
  };

  const selectedChat = chats.find(chat => chat.id === selectedChatId);
  
  let currentTracks: Track[] = meditationTracks;
  if (playerContext === 'meditation') {
    currentTracks = meditationTracks;
  } else if (playerContext === 'breathing') {
    currentTracks = breathingTracks;
  } else if (playerContext === 'category') {
    if (categoryContext === 'anxiety') currentTracks = anxietyTracks;
    else if (categoryContext === 'depression') currentTracks = depressionTracks;
    else currentTracks = sleepTracks;
  }
  
  const selectedTrack = currentTracks.find(track => track.id === selectedTrackId);

  return (
    <div className="min-h-screen bg-gray-50">
      {currentScreen === 'login' && (
        <LoginScreen
          onLogin={handleLogin}
          onGoToSignup={() => setCurrentScreen('signup')}
          onGoToForgotPassword={() => setCurrentScreen('forgotPassword')}
        />
      )}
      
      {currentScreen === 'signup' && (
        <SignupScreen
          onSignup={handleSignup}
          onBack={() => setCurrentScreen('login')}
        />
      )}

      {currentScreen === 'forgotPassword' && (
        <ForgotPasswordScreen
          onBack={() => setCurrentScreen('login')}
          onCodeSent={(email) => {
            setRecoveryEmail(email);
            setCurrentScreen('verificationCode');
          }}
        />
      )}

      {currentScreen === 'verificationCode' && (
        <VerificationCodeScreen
          email={recoveryEmail}
          onBack={() => setCurrentScreen('forgotPassword')}
          onCodeVerified={() => setCurrentScreen('newPassword')}
        />
      )}

      {currentScreen === 'newPassword' && (
        <NewPasswordScreen
          onBack={() => setCurrentScreen('verificationCode')}
          onPasswordChanged={() => setCurrentScreen('login')}
        />
      )}
      
      {currentScreen === 'home' && (
        <HomeScreen
          userName={userName}
          onNavigate={handleNavigate}
          onBottomNavChange={handleBottomNavChange}
        />
      )}
      
      {currentScreen === 'chatList' && (
        <ChatListScreen
          chats={chats}
          onChatClick={handleChatClick}
          onBack={() => setCurrentScreen('home')}
          onBottomNavChange={handleBottomNavChange}
        />
      )}
      
      {currentScreen === 'chat' && selectedChat && (
        <ChatScreen
          chatId={selectedChat.id}
          chatName={selectedChat.name}
          chatAvatar={selectedChat.avatar}
          messages={selectedChat.messages}
          onBack={() => setCurrentScreen('chatList')}
          onSendMessage={handleSendMessage}
        />
      )}
      
      {currentScreen === 'meditation' && (
        <MeditationScreen
          tracks={meditationTracks}
          onBack={() => setCurrentScreen('home')}
          onPlayTrack={handlePlayTrack}
          onCategoryClick={handleCategoryClick}
          onFavoritesClick={() => setCurrentScreen('favorites')}
        />
      )}

      {currentScreen === 'meditationAnxiety' && (
        <MeditationCategoryScreen
          category="anxiety"
          tracks={anxietyTracks}
          onBack={() => setCurrentScreen('meditation')}
          onPlayTrack={handlePlayTrack}
        />
      )}

      {currentScreen === 'meditationDepression' && (
        <MeditationCategoryScreen
          category="depression"
          tracks={depressionTracks}
          onBack={() => setCurrentScreen('meditation')}
          onPlayTrack={handlePlayTrack}
        />
      )}

      {currentScreen === 'meditationSleep' && (
        <MeditationCategoryScreen
          category="sleep"
          tracks={sleepTracks}
          onBack={() => setCurrentScreen('meditation')}
          onPlayTrack={handlePlayTrack}
        />
      )}

      {currentScreen === 'favorites' && (
        <FavoritesScreen
          favorites={getFavoriteTracks()}
          onBack={() => setCurrentScreen('meditation')}
          onPlayTrack={handlePlayTrack}
        />
      )}
      
      {currentScreen === 'breathing' && (
        <BreathingScreen
          tracks={breathingTracks}
          onBack={() => setCurrentScreen('home')}
          onPlayTrack={handlePlayTrack}
        />
      )}

      {currentScreen === 'planning' && (
        <PlanningScreen
          onBack={() => setCurrentScreen('home')}
          onBottomNavChange={handleBottomNavChange}
          onNavigateToSubscreen={(screen) => {
            if (screen === 'habits') setCurrentScreen('habits');
            else if (screen === 'weekly') setCurrentScreen('weekly');
            else if (screen === 'mentalHealth') setCurrentScreen('mentalHealth');
          }}
        />
      )}
      
      {currentScreen === 'player' && selectedTrack && (
        <MusicPlayerScreen
          track={selectedTrack}
          allTracks={currentTracks}
          onBack={() => {
            if (playerContext === 'meditation') setCurrentScreen('meditation');
            else if (playerContext === 'breathing') setCurrentScreen('breathing');
            else if (categoryContext === 'anxiety') setCurrentScreen('meditationAnxiety');
            else if (categoryContext === 'depression') setCurrentScreen('meditationDepression');
            else setCurrentScreen('meditationSleep');
          }}
          isFavorite={favoriteTrackIds.has(selectedTrack.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
      
      {currentScreen === 'profile' && (
        <ProfileScreen
          userName={userName}
          userAvatar={userAvatar}
          onBack={() => setCurrentScreen('home')}
          onBottomNavChange={handleBottomNavChange}
          onAvatarChange={(newAvatar) => setUserAvatar(newAvatar)}
        />
      )}

      {currentScreen === 'habits' && (
        <HabitsScreen onBack={() => setCurrentScreen('planning')} />
      )}

      {currentScreen === 'weekly' && (
        <WeeklyPlanningScreen onBack={() => setCurrentScreen('planning')} />
      )}

      {currentScreen === 'mentalHealth' && (
        <MentalHealthScreen onBack={() => setCurrentScreen('planning')} />
      )}
    </div>
  );
}