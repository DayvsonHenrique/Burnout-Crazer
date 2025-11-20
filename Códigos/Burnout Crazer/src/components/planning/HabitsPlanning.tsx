import { useState } from 'react';
import { ChevronLeft, Plus, Trash2, Edit2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';

export default function HabitsPlanning({ habits, setHabits, onBack }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newHabitText, setNewHabitText] = useState('');

  const addHabit = () => {
    if (newHabitText.trim()) {
      setHabits([...habits, {
        id: Date.now(),
        text: newHabitText,
        completed: false,
        streak: 0,
        createdAt: new Date().toISOString()
      }]);
      setNewHabitText('');
      setIsAdding(false);
    }
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter(h => h.id !== id));
  };

  const toggleHabit = (id) => {
    setHabits(habits.map(h => {
      if (h.id === id) {
        const wasCompleted = h.completed;
        const newCompleted = !wasCompleted;
        return {
          ...h,
          completed: newCompleted,
          streak: newCompleted ? (h.streak || 0) + 1 : Math.max(0, (h.streak || 0) - 1)
        };
      }
      return h;
    }));
  };

  const updateHabit = (id, newText) => {
    setHabits(habits.map(h => 
      h.id === id ? { ...h, text: newText } : h
    ));
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <div className="p-4 flex items-center justify-between">
        <button onClick={onBack} className="text-gray-700 dark:text-gray-300">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl text-gray-900 dark:text-white">Hábitos</h1>
        <div className="w-6" />
      </div>

      <div className="px-6 pb-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-3xl text-purple-600 dark:text-purple-400 mb-1">
              {habits.filter(h => h.completed).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Completados Hoje</div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 dark:border-gray-700">
            <div className="text-3xl text-green-600 dark:text-green-400 mb-1">
              {Math.max(...habits.map(h => h.streak), 0)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Maior Sequência</div>
          </div>
        </div>

        {/* Habits List */}
        <div className="space-y-3 mb-6">
          <AnimatePresence>
            {habits.map((habit) => (
              <motion.div
                key={habit.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 dark:border-gray-700"
              >
                {editingId === habit.id ? (
                  <div className="flex gap-2">
                    <Input
                      defaultValue={habit.text}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          updateHabit(habit.id, e.target.value);
                        }
                      }}
                      autoFocus
                      className="flex-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                    <Button
                      size="sm"
                      onClick={() => {
                        const input = document.querySelector('input:focus');
                        if (input) updateHabit(habit.id, input.value);
                      }}
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-2">
                      <Checkbox
                        checked={habit.completed}
                        onCheckedChange={() => toggleHabit(habit.id)}
                      />
                      <span className={`flex-1 ${habit.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                        {habit.text}
                      </span>
                      <button
                        onClick={() => setEditingId(habit.id)}
                        className="text-blue-600 dark:text-blue-400 p-2"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteHabit(habit.id)}
                        className="text-red-500 dark:text-red-400 p-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {habit.streak > 0 && (
                      <div className="ml-9 text-sm text-orange-600 dark:text-orange-400">
                        🔥 {habit.streak} dias seguidos
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Add Habit */}
        {isAdding ? (
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-4 border border-purple-300 dark:border-purple-600">
            <Input
              value={newHabitText}
              onChange={(e) => setNewHabitText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addHabit()}
              placeholder="Digite seu novo hábito..."
              autoFocus
              className="mb-3 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            <div className="flex gap-2">
              <Button onClick={addHabit} className="flex-1 bg-purple-600 hover:bg-purple-700">
                Adicionar
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAdding(false);
                  setNewHabitText('');
                }}
                className="flex-1 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancelar
              </Button>
            </div>
          </div>
        ) : (
          <Button
            onClick={() => setIsAdding(true)}
            className="w-full bg-purple-600 hover:bg-purple-700 rounded-full"
          >
            <Plus className="w-5 h-5 mr-2" />
            Adicionar Hábito
          </Button>
        )}
      </div>
    </div>
  );
}