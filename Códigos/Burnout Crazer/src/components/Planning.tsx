import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';
import TodayGoals from './planning/TodayGoals';
import HabitsPlanning from './planning/HabitsPlanning';
import WeeklyPlanning from './planning/WeeklyPlanning';
import MentalHealth from './planning/MentalHealth';

export default function Planning({ 
  onBack, 
  goals, 
  setGoals, 
  habits, 
  setHabits,
  weeklyPlanning,
  setWeeklyPlanning,
  mentalHealthActivities,
  setMentalHealthActivities
}) {
  const [activeView, setActiveView] = useState('menu');

  const renderView = () => {
    switch (activeView) {
      case 'goals':
        return (
          <TodayGoals
            goals={goals}
            setGoals={setGoals}
            onBack={() => setActiveView('menu')}
          />
        );
      case 'habits':
        return (
          <HabitsPlanning
            habits={habits}
            setHabits={setHabits}
            onBack={() => setActiveView('menu')}
          />
        );
      case 'weekly':
        return (
          <WeeklyPlanning
            weeklyPlanning={weeklyPlanning}
            setWeeklyPlanning={setWeeklyPlanning}
            onBack={() => setActiveView('menu')}
          />
        );
      case 'mental':
        return (
          <MentalHealth
            activities={mentalHealthActivities}
            setActivities={setMentalHealthActivities}
            onBack={() => setActiveView('menu')}
          />
        );
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-black pb-20">
            {/* Header */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
              <button onClick={onBack} className="text-gray-700 dark:text-gray-300">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h1 className="text-xl text-gray-900 dark:text-white">Planejamento</h1>
              <div className="w-6" />
            </div>

            <div className="px-6 pb-6">
              <h1 className="text-3xl text-gray-900 mb-2 dark:text-white">
                Planejamento e Produtividade
              </h1>
              <p className="text-gray-600 mb-8 dark:text-gray-400">
                Organize sua vida de forma consciente
              </p>

              <div className="space-y-4">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveView('goals')}
                  className="w-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center text-3xl">
                      🎯
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-xl text-gray-900 dark:text-white">Metas de Hoje</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {goals.filter(g => !g.completed).length} metas pendentes
                      </p>
                    </div>
                  </div>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveView('habits')}
                  className="w-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-6 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-500 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center text-3xl">
                      ✅
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-xl text-gray-900 dark:text-white">Planejamento de Hábitos</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Construa hábitos saudáveis
                      </p>
                    </div>
                  </div>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveView('weekly')}
                  className="w-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-6 border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-500 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center text-3xl">
                      📅
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-xl text-gray-900 dark:text-white">Planejamento Semanal</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Organize sua semana
                      </p>
                    </div>
                  </div>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveView('mental')}
                  className="w-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-6 border border-gray-200 dark:border-gray-700 hover:border-pink-300 dark:hover:border-pink-500 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center text-3xl">
                      🧠
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-xl text-gray-900 dark:text-white">Saúde Mental</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Atividades de bem-estar
                      </p>
                    </div>
                  </div>
                </motion.button>
              </div>
            </div>
          </div>
        );
    }
  };

  return renderView();
}