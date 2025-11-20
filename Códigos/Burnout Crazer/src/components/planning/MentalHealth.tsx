import { ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { Checkbox } from '../ui/checkbox';

export default function MentalHealth({ activities, setActivities, onBack }) {
  const toggleActivity = (id) => {
    setActivities(activities.map(a =>
      a.id === id ? { ...a, completed: !a.completed } : a
    ));
  };

  const completedCount = activities.filter(a => a.completed).length;
  const progress = (completedCount / activities.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <div className="p-4 flex items-center justify-between">
        <button onClick={onBack} className="text-gray-700 dark:text-gray-300">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl text-gray-900 dark:text-white">Saúde Mental</h1>
        <div className="w-6" />
      </div>

      <div className="px-6 pb-6">
        {/* Header */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl text-gray-900 dark:text-white mb-2">Atividades Diárias</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Complete estas atividades para cuidar da sua saúde mental
          </p>
          
          {/* Progress */}
          <div className="mb-2">
            <div className="flex justify-between items-center mb-2 text-sm">
              <span className="text-gray-700 dark:text-gray-300">Progresso de Hoje</span>
              <span className="text-pink-600 dark:text-pink-400">{completedCount}/{activities.length}</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-pink-400 to-pink-600"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Activities List */}
        <div className="space-y-3">
          {activities.map((activity) => (
            <motion.div
              key={activity.id}
              whileTap={{ scale: 0.98 }}
              className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-5 border transition-all ${
                activity.completed
                  ? 'border-pink-300 dark:border-pink-600 bg-pink-50/50 dark:bg-pink-900/20'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex items-center gap-4">
                <Checkbox
                  checked={activity.completed}
                  onCheckedChange={() => toggleActivity(activity.id)}
                  className="w-6 h-6"
                />
                <span className={`flex-1 ${
                  activity.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-white'
                }`}>
                  {activity.title}
                </span>
                {activity.completed && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-2xl"
                  >
                    ✨
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Completion Message */}
        {completedCount === activities.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 bg-gradient-to-r from-pink-400 to-pink-600 text-white rounded-3xl p-6 text-center"
          >
            <div className="text-5xl mb-3">🎉</div>
            <h3 className="text-xl mb-2">Parabéns!</h3>
            <p className="text-pink-100">
              Você completou todas as atividades de saúde mental hoje!
            </p>
          </motion.div>
        )}

        {/* Tips */}
        <div className="mt-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg text-gray-900 dark:text-white mb-3">💡 Dicas para Saúde Mental</h3>
          <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>• Pratique a autocompaixão diariamente</li>
            <li>• Mantenha uma rotina de sono regular</li>
            <li>• Conecte-se com pessoas queridas</li>
            <li>• Reserve tempo para atividades prazerosas</li>
            <li>• Não hesite em buscar ajuda profissional</li>
          </ul>
        </div>
      </div>
    </div>
  );
}