import { useState, useEffect } from 'react';
import Onboarding from './components/Onboarding';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import Home from './components/Home';
import Meditation from './components/Meditation';
import MusicPlayer from './components/MusicPlayer';
import MiniPlayer from './components/MiniPlayer';
import Breathing from './components/Breathing';
import Planning from './components/Planning';
import Chat from './components/Chat';
import Profile from './components/Profile';
import Reminders from './components/Reminders';
import ReminderToast from './components/ReminderToast';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('onboarding');
  const [user, setUser] = useState(null);
  
  // Função auxiliar para obter data local no formato YYYY-MM-DD
  const getLocalDateString = (date = new Date()) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  // Inicializar moodHistory com dados de exemplo dos últimos 7 dias
  const [moodHistory, setMoodHistory] = useState(() => {
    const moods = [
      { emoji: '😢', name: 'Triste', color: 'from-blue-400 to-blue-600' },
      { emoji: '😕', name: 'Preocupado', color: 'from-yellow-400 to-yellow-600' },
      { emoji: '😐', name: 'Normal', color: 'from-gray-400 to-gray-600' },
      { emoji: '😊', name: 'Bem', color: 'from-green-400 to-green-600' },
      { emoji: '😄', name: 'Ótimo', color: 'from-pink-400 to-pink-600' }
    ];
    
    const history = [];
    const today = new Date();
    
    // Criar registros dos últimos 6 dias (SEM incluir hoje - só ao selecionar emoji)
    for (let i = 6; i >= 1; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateStr = `${year}-${month}-${day}`;
      
      // Gerar um humor aleatório mas com tendência positiva
      const moodIndex = Math.min(Math.floor(Math.random() * 5), 4);
      history.push({
        date: dateStr,
        mood: moods[moodIndex]
      });
    }
    
    return history;
  });
  
  const [favorites, setFavorites] = useState([]);
  const [goals, setGoals] = useState([]);
  const [habits, setHabits] = useState([]);
  const [weeklyPlanning, setWeeklyPlanning] = useState([]);
  const [mentalHealthActivities, setMentalHealthActivities] = useState([
    { id: 1, title: 'Meditar por 10 minutos', completed: false },
    { id: 2, title: 'Escrever no diário', completed: false },
    { id: 3, title: 'Fazer uma caminhada', completed: false },
    { id: 4, title: 'Praticar gratidão', completed: false },
  ]);
  const [darkMode, setDarkMode] = useState(false);
  const [chatMessages, setChatMessages] = useState({
    'psych-1': [
      { id: 1, text: 'Olá, como você está hoje?', sender: 'them', time: '09:15' },
      { id: 2, text: 'Oi, estou me sentindo melhor', sender: 'me', time: '09:20' },
      { id: 3, text: 'Que bom ouvir isso! O que te ajudou?', sender: 'them', time: '09:22' },
      { id: 4, text: 'Consegui manter uma rotina de meditação', sender: 'me', time: '09:25' },
      { id: 5, text: 'Excelente! Continue assim', sender: 'them', time: '09:28' },
      { id: 6, text: 'Vou tentar, obrigado', sender: 'me', time: '09:30' },
      { id: 7, text: 'Estou aqui se precisar conversar', sender: 'them', time: '09:32' },
      { id: 8, text: 'Muito obrigado pelo apoio', sender: 'me', time: '09:35' }
    ],
    'psych-2': [
      { id: 1, text: 'Bom dia! Como foi seu fim de semana?', sender: 'them', time: '10:00' },
      { id: 2, text: 'Foi tranquilo, descansei bastante', sender: 'me', time: '10:05' },
      { id: 3, text: 'Ótimo, descanso é muito importante', sender: 'them', time: '10:08' },
      { id: 4, text: 'Sim, me sinto mais disposto agora', sender: 'me', time: '10:10' },
      { id: 5, text: 'Continue priorizando seu bem-estar', sender: 'them', time: '10:12' },
      { id: 6, text: 'Vou fazer isso', sender: 'me', time: '10:15' }
    ],
    'psych-3': [
      { id: 1, text: 'Olá, tudo bem?', sender: 'them', time: '14:30' },
      { id: 2, text: 'Sim, e com você?', sender: 'me', time: '14:35' },
      { id: 3, text: 'Bem, obrigado. Conseguiu fazer os exercícios?', sender: 'them', time: '14:40' },
      { id: 4, text: 'Fiz alguns, mas não todos', sender: 'me', time: '14:42' },
      { id: 5, text: 'Não se cobre tanto, o importante é começar', sender: 'them', time: '14:45' },
      { id: 6, text: 'Você tem razão', sender: 'me', time: '14:48' },
      { id: 7, text: 'Vamos com calma, no seu ritmo', sender: 'them', time: '14:50' },
      { id: 8, text: 'Obrigado pela compreensão', sender: 'me', time: '14:55' }
    ],
    'psych-4': [
      { id: 1, text: 'Oi! Como está sua semana?', sender: 'them', time: '16:00' },
      { id: 2, text: 'Está indo bem, mas corrida', sender: 'me', time: '16:10' },
      { id: 3, text: 'Lembre-se de fazer pausas', sender: 'them', time: '16:15' },
      { id: 4, text: 'Vou tentar me organizar melhor', sender: 'me', time: '16:20' },
      { id: 5, text: 'Isso é muito bom', sender: 'them', time: '16:25' },
      { id: 6, text: 'Valeu pela dica', sender: 'me', time: '16:30' }
    ],
    'friend-1': [
      { id: 1, text: 'E aí, tudo certo?', sender: 'them', time: '11:00' },
      { id: 2, text: 'Tudo sim! E você?', sender: 'me', time: '11:05' },
      { id: 3, text: 'Também! Vamos estudar hoje?', sender: 'them', time: '11:10' },
      { id: 4, text: 'Bora! Que horas?', sender: 'me', time: '11:12' },
      { id: 5, text: 'Umas 15h está bom?', sender: 'them', time: '11:15' },
      { id: 6, text: 'Perfeito!', sender: 'me', time: '11:18' },
      { id: 7, text: 'Então até mais tarde', sender: 'them', time: '11:20' }
    ],
    'friend-2': [
      { id: 1, text: 'Oi! Tudo bem?', sender: 'them', time: '13:00' },
      { id: 2, text: 'Oi! Tudo ótimo', sender: 'me', time: '13:05' },
      { id: 3, text: 'Que bom! Conseguiu fazer aquela atividade?', sender: 'them', time: '13:08' },
      { id: 4, text: 'Consegui sim, foi legal', sender: 'me', time: '13:10' },
      { id: 5, text: 'Que ótimo! Me conta como foi', sender: 'them', time: '13:12' },
      { id: 6, text: 'Depois te conto com calma', sender: 'me', time: '13:15' },
      { id: 7, text: 'Combinado!', sender: 'them', time: '13:18' }
    ],
    'friend-3': [
      { id: 1, text: 'Fala! Beleza?', sender: 'them', time: '15:30' },
      { id: 2, text: 'Fala! Tudo certo', sender: 'me', time: '15:35' },
      { id: 3, text: 'Viu aquele vídeo que te mandei?', sender: 'them', time: '15:40' },
      { id: 4, text: 'Vi sim, muito bom!', sender: 'me', time: '15:45' },
      { id: 5, text: 'Né? Achei muito interessante', sender: 'them', time: '15:48' },
      { id: 6, text: 'Também achei', sender: 'me', time: '15:50' }
    ],
    'friend-4': [
      { id: 1, text: 'Oi! Como está o dia?', sender: 'them', time: '17:00' },
      { id: 2, text: 'Está indo bem! E o seu?', sender: 'me', time: '17:05' },
      { id: 3, text: 'Também! Está animado para amanhã?', sender: 'them', time: '17:10' },
      { id: 4, text: 'Sim! Vai ser legal', sender: 'me', time: '17:15' },
      { id: 5, text: 'Com certeza!', sender: 'them', time: '17:18' },
      { id: 6, text: 'Mal posso esperar', sender: 'me', time: '17:20' },
      { id: 7, text: 'Eu também!', sender: 'them', time: '17:22' }
    ]
  });
  const [reminders, setReminders] = useState([]);
  const [showReminders, setShowReminders] = useState(false);
  const [toastReminder, setToastReminder] = useState(null);
  const [customFriends, setCustomFriends] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [settings, setSettings] = useState({
    notifications: true,
    emailNotifications: true,
    reminderNotifications: true
  });
  
  // Music Player State
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [allTracks, setAllTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [shuffleEnabled, setShuffleEnabled] = useState(false);
  const [showMiniPlayerState, setShowMiniPlayerState] = useState(true);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (hasSeenOnboarding) {
      setCurrentScreen('login');
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('login');
  };

  const addMoodEntry = (mood) => {
    const today = getLocalDateString();
    setMoodHistory(prev => {
      const filtered = prev.filter(entry => entry.date !== today);
      return [...filtered, { date: today, mood }];
    });
  };

  const toggleFavorite = (track) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.id === track.id);
      if (exists) {
        return prev.filter(f => f.id !== track.id);
      }
      return [...prev, track];
    });
  };

  // Music Player Handlers
  const handleOpenPlayer = (track, tracksList) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setAllTracks(tracksList);
    const index = tracksList.findIndex(t => t.id === track.id);
    setCurrentTrackIndex(index !== -1 ? index : 0);
    setShowMiniPlayerState(true); // Resetar estado do mini-player
    setCurrentScreen('music-player');
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = () => {
    if (allTracks.length > 0) {
      let nextIndex;
      if (shuffleEnabled) {
        // Gerar índice aleatório diferente do atual
        do {
          nextIndex = Math.floor(Math.random() * allTracks.length);
        } while (nextIndex === currentTrackIndex && allTracks.length > 1);
      } else {
        nextIndex = (currentTrackIndex + 1) % allTracks.length;
      }
      setCurrentTrackIndex(nextIndex);
      setCurrentTrack(allTracks[nextIndex]);
      setIsPlaying(true);
    }
  };

  const handlePreviousTrack = () => {
    if (allTracks.length > 0) {
      let prevIndex;
      if (shuffleEnabled) {
        // Gerar índice aleatório diferente do atual
        do {
          prevIndex = Math.floor(Math.random() * allTracks.length);
        } while (prevIndex === currentTrackIndex && allTracks.length > 1);
      } else {
        prevIndex = currentTrackIndex === 0 ? allTracks.length - 1 : currentTrackIndex - 1;
      }
      setCurrentTrackIndex(prevIndex);
      setCurrentTrack(allTracks[prevIndex]);
      setIsPlaying(true);
    }
  };

  const handleToggleFavorite = () => {
    if (currentTrack) {
      toggleFavorite(currentTrack);
    }
  };

  const handleToggleShuffle = () => {
    setShuffleEnabled(!shuffleEnabled);
  };

  const handleCloseMiniPlayer = () => {
    setShowMiniPlayerState(false);
    setCurrentTrack(null);
    setIsPlaying(false);
  };

  const isFavorite = (track) => {
    return favorites.some(f => f.id === track?.id);
  };

  const handleOpenMiniPlayer = () => {
    if (currentTrack) {
      setCurrentScreen('music-player');
    }
  };

  const showMiniPlayer = currentTrack && currentScreen !== 'music-player' && currentScreen !== 'onboarding' && currentScreen !== 'login' && currentScreen !== 'register' && currentScreen !== 'forgot';

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <Onboarding onComplete={() => setCurrentScreen('login')} />;
      case 'login':
        return <Login 
          onLogin={handleLogin}
          onNavigateToRegister={() => setCurrentScreen('register')}
          onNavigateToForgot={() => setCurrentScreen('forgot')}
        />;
      case 'register':
        return <Register 
          onRegister={handleLogin}
          onNavigateToLogin={() => setCurrentScreen('login')}
        />;
      case 'forgot':
        return <ForgotPassword 
          onComplete={() => setCurrentScreen('login')}
          onBack={() => setCurrentScreen('login')}
        />;
      case 'home':
        return <Home 
          user={user}
          onNavigate={setCurrentScreen}
          onAddMood={addMoodEntry}
          moodHistory={moodHistory}
          onOpenReminders={() => setShowReminders(true)}
          profilePhoto={profilePhoto}
        />;
      case 'meditation':
        return <Meditation 
          onBack={() => setCurrentScreen('home')}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onOpenPlayer={handleOpenPlayer}
        />;
      case 'music-player':
        return <MusicPlayer 
          track={currentTrack}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onNext={handleNextTrack}
          onPrevious={handlePreviousTrack}
          onBack={() => setCurrentScreen('meditation')}
          isFavorite={isFavorite(currentTrack)}
          onToggleFavorite={handleToggleFavorite}
          onToggleShuffle={handleToggleShuffle}
          shuffleEnabled={shuffleEnabled}
          onClose={handleCloseMiniPlayer}
        />;
      case 'breathing':
        return <Breathing 
          onBack={() => setCurrentScreen('home')}
        />;
      case 'planning':
        return <Planning 
          onBack={() => setCurrentScreen('home')}
          goals={goals}
          setGoals={setGoals}
          habits={habits}
          setHabits={setHabits}
          weeklyPlanning={weeklyPlanning}
          setWeeklyPlanning={setWeeklyPlanning}
          mentalHealthActivities={mentalHealthActivities}
          setMentalHealthActivities={setMentalHealthActivities}
        />;
      case 'chat':
        return <Chat 
          onBack={() => setCurrentScreen('home')}
          user={user}
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
          customFriends={customFriends}
          setCustomFriends={setCustomFriends}
          onNavigate={setCurrentScreen}
        />;
      case 'profile':
        return <Profile 
          user={user}
          setUser={setUser}
          onBack={() => setCurrentScreen('home')}
          onLogout={handleLogout}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          profilePhoto={profilePhoto}
          setProfilePhoto={setProfilePhoto}
          settings={settings}
          setSettings={setSettings}
        />;
      case 'reminders':
        return <Reminders 
          onBack={() => setCurrentScreen('home')}
          reminders={reminders}
          setReminders={setReminders}
          showReminders={showReminders}
          setShowReminders={setShowReminders}
        />;
      default:
        return <Login onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-green-100">
      {renderScreen()}
      <Reminders 
        reminders={reminders}
        setReminders={setReminders}
        isOpen={showReminders}
        onClose={() => setShowReminders(false)}
        onShowToast={(reminder) => {
          setToastReminder(reminder);
          setTimeout(() => setToastReminder(null), 10000);
        }}
        reminderNotificationsEnabled={settings.reminderNotifications}
      />
      <ReminderToast 
        reminder={toastReminder}
        onClose={() => setToastReminder(null)}
      />
      {showMiniPlayer && showMiniPlayerState && (
        <MiniPlayer 
          track={currentTrack}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onClick={handleOpenMiniPlayer}
          onClose={handleCloseMiniPlayer}
        />
      )}
    </div>
  );
}