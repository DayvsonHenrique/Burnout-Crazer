import { useState } from 'react';
import { ChevronLeft, Plus, Trash2, Edit2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export default function WeeklyPlanning({ weeklyPlanning, setWeeklyPlanning, onBack }) {
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newActivity, setNewActivity] = useState({ title: '', time: '09:00' });
  const [editActivity, setEditActivity] = useState({ title: '', time: '' });

  const addActivity = () => {
    if (newActivity.title.trim()) {
      setWeeklyPlanning([...weeklyPlanning, {
        id: Date.now(),
        day: selectedDay,
        title: newActivity.title,
        time: newActivity.time || '09:00',
        completed: false
      }]);
      setNewActivity({ title: '', time: '09:00' });
      setIsAdding(false);
    }
  };

  const deleteActivity = (id) => {
    setWeeklyPlanning(weeklyPlanning.filter(a => a.id !== id));
  };

  const toggleActivity = (id) => {
    setWeeklyPlanning(weeklyPlanning.map(a =>
      a.id === id ? { ...a, completed: !a.completed } : a
    ));
  };

  const startEditing = (activity) => {
    setEditActivity({ title: activity.title, time: activity.time });
    setEditingId(activity.id);
  };

  const saveEdit = () => {
    if (editActivity.title.trim()) {
      setWeeklyPlanning(weeklyPlanning.map(a =>
        a.id === editingId ? { ...a, title: editActivity.title, time: editActivity.time } : a
      ));
      setEditActivity({ title: '', time: '' });
      setEditingId(null);
    }
  };

  const activitiesForDay = weeklyPlanning
    .filter(a => a.day === selectedDay)
    .sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <div className="p-4 flex items-center justify-between">
        <button onClick={onBack} className="text-gray-700 dark:text-gray-300">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl text-gray-900 dark:text-white">Planejamento Semanal</h1>
        <div className="w-6" />
      </div>

      <div className="px-6 pb-6">
        {/* Day Selector - Centralized */}
        <div className="flex justify-center gap-2 mb-6 overflow-x-auto pb-2">
          {daysOfWeek.map((day, index) => (
            <button
              key={index}
              onClick={() => setSelectedDay(index)}
              className={`px-4 py-3 rounded-2xl whitespace-nowrap transition-all min-w-16 ${
                selectedDay === index
                  ? 'bg-gradient-to-br from-green-400 to-green-600 text-white shadow-lg'
                  : 'bg-white/70 dark:bg-gray-800/70 text-gray-700 dark:text-gray-300'
              }`}
            >
              <div className="text-xs mb-1">{day}</div>
              <div className="text-xl">
                {weeklyPlanning.filter(a => a.day === index).length}
              </div>
            </button>
          ))}
        </div>

        {/* Activities */}
        <div className="space-y-3 mb-6">
          <AnimatePresence>
            {activitiesForDay.map((activity) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className={`bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-4 border ${
                  activity.completed ? 'border-green-300 dark:border-green-600 bg-green-50/50 dark:bg-green-900/20' : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => toggleActivity(activity.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                      activity.completed
                        ? 'bg-green-500 border-green-500'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {activity.completed && (
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                  <div className="flex-1">
                    <div className={`${activity.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                      {activity.title}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      🕐 {activity.time}
                    </div>
                  </div>
                  <button
                    onClick={() => startEditing(activity)}
                    className="text-blue-600 dark:text-blue-400 p-2"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteActivity(activity.id)}
                    className="text-red-500 dark:text-red-400 p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {activitiesForDay.length === 0 && !isAdding && editingId === null && (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              <div className="text-5xl mb-4">📅</div>
              <p>Nenhuma atividade para {daysOfWeek[selectedDay]}</p>
            </div>
          )}
        </div>

        {/* Edit Activity Modal */}
        {editingId !== null && (
          <div className="mb-4 bg-blue-50/70 dark:bg-blue-900/30 backdrop-blur-sm rounded-2xl p-4 border-2 border-blue-300 dark:border-blue-600">
            <h3 className="text-gray-900 dark:text-white mb-3">Editar Atividade</h3>
            <Input
              value={editActivity.title}
              onChange={(e) => setEditActivity({ ...editActivity, title: e.target.value })}
              placeholder="Título da atividade..."
              className="mb-3 bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
              autoFocus
            />
            <Input
              type="time"
              value={editActivity.time}
              onChange={(e) => setEditActivity({ ...editActivity, time: e.target.value })}
              className="mb-3 bg-white text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            <div className="flex gap-2">
              <Button onClick={saveEdit} className="flex-1 bg-blue-600 hover:bg-blue-700">
                Salvar
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setEditingId(null);
                  setEditActivity({ title: '', time: '' });
                }}
                className="flex-1 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}

        {/* Add Activity */}
        {isAdding ? (
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-4 border border-green-300 dark:border-green-600">
            <Input
              value={newActivity.title}
              onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
              placeholder="Título da atividade..."
              className="mb-3 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              autoFocus
            />
            <Input
              type="time"
              value={newActivity.time}
              onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
              className="mb-3 text-gray-900 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            <div className="flex gap-2">
              <Button onClick={addActivity} className="flex-1 bg-green-600 hover:bg-green-700">
                Adicionar
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAdding(false);
                  setNewActivity({ title: '', time: '09:00' });
                }}
                className="flex-1 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancelar
              </Button>
            </div>
          </div>
        ) : (
          editingId === null && (
            <Button
              onClick={() => setIsAdding(true)}
              className="w-full bg-green-600 hover:bg-green-700 rounded-full"
            >
              <Plus className="w-5 h-5 mr-2" />
              Adicionar Atividade
            </Button>
          )
        )}
      </div>
    </div>
  );
}