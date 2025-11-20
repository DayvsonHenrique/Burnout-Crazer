import { useState } from 'react';
import { ChevronLeft, Plus, Trash2, Edit2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Checkbox } from '../ui/checkbox';

export default function TodayGoals({ goals, setGoals, onBack }) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newGoalText, setNewGoalText] = useState('');

  const addGoal = () => {
    if (newGoalText.trim()) {
      setGoals([...goals, {
        id: Date.now(),
        text: newGoalText,
        completed: false,
        createdAt: new Date().toISOString()
      }]);
      setNewGoalText('');
      setIsAdding(false);
    }
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const toggleGoal = (id) => {
    setGoals(goals.map(g => 
      g.id === id ? { ...g, completed: !g.completed } : g
    ));
  };

  const updateGoal = (id, newText) => {
    setGoals(goals.map(g => 
      g.id === id ? { ...g, text: newText } : g
    ));
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <div className="p-4 flex items-center justify-between">
        <button onClick={onBack} className="text-gray-700 dark:text-gray-300">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl text-gray-900 dark:text-white">Metas de Hoje</h1>
        <div className="w-6" />
      </div>

      <div className="px-6 pb-6">
        {/* Progress */}
        <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-6 mb-6 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700 dark:text-gray-300">Progresso</span>
            <span className="text-blue-600 dark:text-blue-400">
              {goals.filter(g => g.completed).length}/{goals.length}
            </span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
              initial={{ width: 0 }}
              animate={{ 
                width: goals.length > 0 
                  ? `${(goals.filter(g => g.completed).length / goals.length) * 100}%` 
                  : '0%' 
              }}
            />
          </div>
        </div>

        {/* Goals List */}
        <div className="space-y-3 mb-6">
          <AnimatePresence>
            {goals.map((goal) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 dark:border-gray-700"
              >
                {editingId === goal.id ? (
                  <div className="flex gap-2">
                    <Input
                      defaultValue={goal.text}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          updateGoal(goal.id, e.target.value);
                        }
                      }}
                      autoFocus
                      className="flex-1 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                    />
                    <Button
                      size="sm"
                      onClick={() => {
                        const input = document.querySelector(`input[value="${goal.text}"]`);
                        if (input) updateGoal(goal.id, input.value);
                      }}
                    >
                      <Check className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={goal.completed}
                      onCheckedChange={() => toggleGoal(goal.id)}
                    />
                    <span className={`flex-1 ${goal.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                      {goal.text}
                    </span>
                    <button
                      onClick={() => setEditingId(goal.id)}
                      className="text-blue-600 dark:text-blue-400 p-2"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="text-red-500 dark:text-red-400 p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Add Goal */}
        {isAdding ? (
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-4 border border-blue-300 dark:border-blue-600">
            <Input
              value={newGoalText}
              onChange={(e) => setNewGoalText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addGoal()}
              placeholder="Digite sua meta..."
              autoFocus
              className="mb-3 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            <div className="flex gap-2">
              <Button onClick={addGoal} className="flex-1 bg-blue-600 hover:bg-blue-700">
                Adicionar
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAdding(false);
                  setNewGoalText('');
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
            className="w-full bg-blue-600 hover:bg-blue-700 rounded-full"
          >
            <Plus className="w-5 h-5 mr-2" />
            Adicionar Meta
          </Button>
        )}
      </div>
    </div>
  );
}