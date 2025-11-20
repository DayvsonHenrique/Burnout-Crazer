import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MessageCircle, User, Home as HomeIcon } from 'lucide-react';
import MoodDialog from './MoodDialog';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const moods = [
  { emoji: '😢', name: 'Triste', color: 'from-blue-400 to-blue-600', value: 1, hex: '#60a5fa' },
  { emoji: '😕', name: 'Preocupado', color: 'from-yellow-400 to-yellow-600', value: 2, hex: '#fbbf24' },
  { emoji: '😐', name: 'Normal', color: 'from-gray-400 to-gray-600', value: 3, hex: '#9ca3af' },
  { emoji: '😊', name: 'Bem', color: 'from-green-400 to-green-600', value: 4, hex: '#34d399' },
  { emoji: '😄', name: 'Ótimo', color: 'from-pink-400 to-pink-600', value: 5, hex: '#f472b6' }
];

export default function Home({ user, onNavigate, onAddMood, moodHistory, onOpenReminders, profilePhoto }) {
  const [selectedMood, setSelectedMood] = useState(null);
  const [showMoodDialog, setShowMoodDialog] = useState(false);

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
    setShowMoodDialog(true);
  };

  const handleConfirmMood = () => {
    if (selectedMood) {
      onAddMood(selectedMood);
      setShowMoodDialog(false);
    }
  };

  // Obter data local no formato YYYY-MM-DD
  const getLocalDateString = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const today = getLocalDateString();
  const todayMood = moodHistory.find(entry => entry.date === today);

  return (
    <div className="min-h-screen pb-20 bg-gradient-to-br from-blue-100 via-purple-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      {/* Header */}
      <div className="bg-white/30 backdrop-blur-sm p-4 flex items-center justify-between dark:bg-gray-800/30">
        <button
          onClick={() => onNavigate('profile')}
          className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white overflow-hidden"
        >
          {profilePhoto ? (
            <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            user?.name?.[0]?.toUpperCase() || 'U'
          )}
        </button>
        <div className="flex-1" />
        <button onClick={onOpenReminders} className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
          🔔
        </button>
      </div>

      <div className="p-6">
        {/* Greeting */}
        <div className="mb-8">
          <h1 className="text-xl text-gray-800 dark:text-gray-200">
            Olá 👋
          </h1>
          <p className="text-2xl text-gray-900 dark:text-white">Como você está hoje?</p>
        </div>

        {/* Mood Selection */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {moods.map((mood) => (
              <motion.button
                key={mood.name}
                onClick={() => handleMoodClick(mood)}
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className={`text-5xl transition-all ${
                  todayMood?.mood?.name === mood.name ? 'scale-125' : ''
                }`}
              >
                {mood.emoji}
              </motion.button>
            ))}
          </div>
          {todayMood && (
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Hoje você está se sentindo: {todayMood.mood.name}
            </p>
          )}
        </div>

        {/* Main Question */}
        <div className="mb-8">
          <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
            O que você gostaria de fazer?
          </p>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('meditation')}
              className="bg-gray-200 dark:bg-gray-700 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 min-h-32 transition-all"
            >
              <div className="text-3xl">🧘</div>
              <span className="text-sm text-gray-800 dark:text-gray-200 text-center">Meditação</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate('breathing')}
              className="bg-gray-200 dark:bg-gray-700 rounded-3xl p-6 flex flex-col items-center justify-center gap-3 min-h-32 transition-all"
            >
              <div className="text-3xl">🫁</div>
              <span className="text-sm text-gray-800 dark:text-gray-200 text-center">Exercícios de Respiração</span>
            </motion.button>
          </div>
        </div>

        {/* Planning Section */}
        <motion.button
          whileHover={{ scale: 1.01, boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('planning')}
          className="w-full bg-gray-200 dark:bg-gray-700 rounded-3xl p-6 mb-6 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center text-2xl">
              📅
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-gray-900 dark:text-gray-200">Planejamento e Produtividade Consciente</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Organize suas metas e hábitos</p>
            </div>
          </div>
        </motion.button>

        {/* Quick Stats */}
        {moodHistory.length > 0 && (
          <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-gray-900 dark:text-white mb-4">Seu histórico de humor</h3>
            
            {/* Mood Graph - Enhanced with Recharts */}
            <div className="mb-4 bg-white/70 dark:bg-gray-900/50 rounded-2xl p-4">
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart 
                  data={moodHistory.slice(-7).map(entry => {
                    const moodData = moods.find(m => m.name === entry.mood.name);
                    // Parse data local sem conversão UTC
                    const [year, month, day] = entry.date.split('-');
                    return {
                      date: `${day}/${month}`,
                      value: moodData?.value || 3,
                      emoji: entry.mood.emoji,
                      name: entry.mood.name,
                      color: moodData?.hex
                    };
                  })}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#a78bfa" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                    stroke="#e5e7eb"
                  />
                  <YAxis 
                    domain={[0, 5]}
                    ticks={[1, 2, 3, 4, 5]}
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                    stroke="#e5e7eb"
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      padding: '8px 12px'
                    }}
                    labelStyle={{ color: '#374151', fontWeight: '600' }}
                    formatter={(value, name, props) => [props.payload.emoji + ' ' + props.payload.name, 'Humor']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#a78bfa" 
                    strokeWidth={3}
                    fill="url(#moodGradient)"
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7, fill: '#7c3aed' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* History Timeline */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {moodHistory.slice(-7).map((entry, index) => {
                // Parse data local sem conversão UTC
                const [year, month, day] = entry.date.split('-');
                return (
                  <div key={index} className="flex flex-col items-center gap-1 min-w-12">
                    <div className="text-2xl">{entry.mood.emoji}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {day}/{month}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-purple-200/80 backdrop-blur-sm border-t border-purple-300">
        <div className="flex justify-around items-center py-3 px-6">
          <button className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl">
              🏠
            </div>
          </button>
          <button 
            onClick={() => onNavigate('chat')}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-12 h-12 bg-purple-400 rounded-2xl flex items-center justify-center text-2xl">
              💬
            </div>
          </button>
          <button 
            onClick={() => onNavigate('profile')}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl">
              ⚙️
            </div>
          </button>
        </div>
      </div>

      {/* Mood Dialog */}
      <AnimatePresence>
        {showMoodDialog && selectedMood && (
          <MoodDialog
            mood={selectedMood}
            onClose={() => setShowMoodDialog(false)}
            onConfirm={handleConfirmMood}
          />
        )}
      </AnimatePresence>
    </div>
  );
}