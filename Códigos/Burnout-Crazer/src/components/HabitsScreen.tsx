import { ArrowLeft, Plus, Check, Trash2, Edit2 } from 'lucide-react';
import { useState } from 'react';
import { OrganicBackground } from './OrganicBackground';

interface HabitsScreenProps {
  onBack: () => void;
}

interface Habit {
  id: string;
  name: string;
  days: boolean[];
}

export function HabitsScreen({ onBack }: HabitsScreenProps) {
  const [habits, setHabits] = useState<Habit[]>([
    { id: '1', name: 'Beber 2L de água', days: [true, true, false, false, false, false, false] },
    { id: '2', name: 'Meditação 10min', days: [true, false, false, false, false, false, false] },
    { id: '3', name: 'Exercício físico', days: [false, false, false, false, false, false, false] },
  ]);
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [showEditHabit, setShowEditHabit] = useState(false);
  const [editingHabitId, setEditingHabitId] = useState<string | null>(null);
  const [newHabitName, setNewHabitName] = useState('');
  const [editHabitName, setEditHabitName] = useState('');

  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const handleAddHabit = () => {
    if (newHabitName.trim()) {
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: newHabitName,
        days: [false, false, false, false, false, false, false],
      };
      setHabits([...habits, newHabit]);
      setNewHabitName('');
      setShowAddHabit(false);
    }
  };

  const handleEditHabit = (id: string, name: string) => {
    setEditingHabitId(id);
    setEditHabitName(name);
    setShowEditHabit(true);
  };

  const handleSaveEdit = () => {
    if (editHabitName.trim() && editingHabitId) {
      setHabits(habits.map(habit =>
        habit.id === editingHabitId ? { ...habit, name: editHabitName } : habit
      ));
      setShowEditHabit(false);
      setEditingHabitId(null);
      setEditHabitName('');
    }
  };

  const handleDeleteHabit = (id: string) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  const handleToggleDay = (habitId: string, dayIndex: number) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const newDays = [...habit.days];
        newDays[dayIndex] = !newDays[dayIndex];
        return { ...habit, days: newDays };
      }
      return habit;
    }));
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <OrganicBackground />
      
      <div className="relative z-10 px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/30 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <h2 className="text-gray-800">Planejamento de Hábitos</h2>
          <div className="w-10"></div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 mb-4">
          <p className="text-sm text-gray-600 mb-2">
            Acompanhe seus hábitos diários e construa uma rotina saudável
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {habits.map(habit => (
            <div key={habit.id} className="bg-white/70 backdrop-blur-sm rounded-xl p-4">
              <h3 className="text-gray-800 mb-3">{habit.name}</h3>
              <div className="grid grid-cols-7 gap-2">
                {dayNames.map((day, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <span className="text-xs text-gray-500 mb-1">{day}</span>
                    <button
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                        habit.days[index]
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-200 text-gray-400'
                      }`}
                      onClick={() => handleToggleDay(habit.id, index)}
                    >
                      {habit.days[index] && <Check size={16} />}
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-2">
                <button
                  className="p-1 text-gray-500 hover:text-gray-700"
                  onClick={() => handleEditHabit(habit.id, habit.name)}
                >
                  <Edit2 size={16} />
                </button>
                <button
                  className="p-1 text-gray-500 hover:text-gray-700"
                  onClick={() => handleDeleteHabit(habit.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2" onClick={() => setShowAddHabit(true)}>
          <Plus size={20} />
          Adicionar Novo Hábito
        </button>
      </div>

      {showAddHabit && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6"
          onClick={() => setShowAddHabit(false)}
        >
          <div 
            className="bg-white rounded-2xl p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-gray-800 mb-4">Novo Hábito</h3>
            <input
              type="text"
              placeholder="Nome do hábito..."
              className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-400 mb-4"
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddHabit(false)}
                className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddHabit}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditHabit && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6"
          onClick={() => setShowEditHabit(false)}
        >
          <div 
            className="bg-white rounded-2xl p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-gray-800 mb-4">Editar Hábito</h3>
            <input
              type="text"
              placeholder="Nome do hábito..."
              className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-400 mb-4"
              value={editHabitName}
              onChange={(e) => setEditHabitName(e.target.value)}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowEditHabit(false)}
                className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}