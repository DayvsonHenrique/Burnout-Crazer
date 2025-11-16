import { useState } from 'react';
import { ArrowLeft, Plus, ChevronLeft, ChevronRight, Target, Calendar as CalendarIcon, Heart, Trash2, Edit2 } from 'lucide-react';
import { OrganicBackground } from './OrganicBackground';
import { BottomNav } from './BottomNav';

interface Goal {
  id: string;
  text: string;
  completed: boolean;
}

interface PlanningScreenProps {
  onBack: () => void;
  onBottomNavChange: (tab: 'home' | 'chat' | 'activity' | 'profile') => void;
  onNavigateToSubscreen?: (screen: 'habits' | 'weekly' | 'mentalHealth') => void;
}

export function PlanningScreen({ onBack, onBottomNavChange, onNavigateToSubscreen }: PlanningScreenProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [showEditGoal, setShowEditGoal] = useState(false);
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [newGoalText, setNewGoalText] = useState('');
  const [editGoalText, setEditGoalText] = useState('');
  const [goals, setGoals] = useState<Goal[]>([
    { id: '1', text: 'Meditar 10 minutos', completed: false },
    { id: '2', text: 'Exercício de respiração', completed: false },
    { id: '3', text: 'Escrever no diário', completed: false },
  ]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
  const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleAddGoal = () => {
    if (newGoalText.trim()) {
      const newGoal: Goal = {
        id: Date.now().toString(),
        text: newGoalText,
        completed: false,
      };
      setGoals([...goals, newGoal]);
      setNewGoalText('');
      setShowAddGoal(false);
    }
  };

  const handleToggleGoal = (id: string) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const handleEditGoal = (id: string, text: string) => {
    setEditingGoalId(id);
    setEditGoalText(text);
    setShowEditGoal(true);
  };

  const handleSaveEdit = () => {
    if (editGoalText.trim() && editingGoalId) {
      setGoals(goals.map(goal =>
        goal.id === editingGoalId ? { ...goal, text: editGoalText } : goal
      ));
      setShowEditGoal(false);
      setEditingGoalId(null);
      setEditGoalText('');
    }
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  return (
    <div className="relative min-h-screen pb-20 overflow-hidden">
      <OrganicBackground />
      
      <div className="relative z-10 px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/30 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <h2 className="text-gray-800">Planejamento</h2>
          <div className="w-10"></div>
        </div>

        {/* Calendar */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <button onClick={previousMonth} className="p-2 hover:bg-white/50 rounded-lg transition-colors">
              <ChevronLeft size={20} className="text-gray-700" />
            </button>
            <h3 className="text-gray-800">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <button onClick={nextMonth} className="p-2 hover:bg-white/50 rounded-lg transition-colors">
              <ChevronRight size={20} className="text-gray-700" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2">
            {dayNames.map(day => (
              <div key={day} className="text-center text-xs text-gray-500 py-1">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {[...Array(startingDayOfWeek)].map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square"></div>
            ))}
            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1;
              const isToday = day === new Date().getDate() && 
                             currentDate.getMonth() === new Date().getMonth() &&
                             currentDate.getFullYear() === new Date().getFullYear();
              return (
                <button
                  key={day}
                  className={`aspect-square flex items-center justify-center rounded-lg text-sm transition-colors ${
                    isToday 
                      ? 'bg-blue-600 text-white' 
                      : 'hover:bg-white/50 text-gray-700'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Daily Goals */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-800">Metas de Hoje</h3>
            <button
              onClick={() => setShowAddGoal(true)}
              className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
            </button>
          </div>
          
          <div className="space-y-2">
            {goals.map(goal => (
              <div key={goal.id} className="bg-white/70 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-gray-300"
                  checked={goal.completed}
                  onChange={() => handleToggleGoal(goal.id)}
                />
                <span className="flex-1 text-gray-700">{goal.text}</span>
                <button
                  onClick={() => handleEditGoal(goal.id, goal.text)}
                  className="p-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDeleteGoal(goal.id)}
                  className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Planning Cards */}
        <div className="grid grid-cols-1 gap-3">
          <button
            className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl p-6 hover:from-purple-200 hover:to-purple-100 transition-all text-left"
            onClick={() => onNavigateToSubscreen?.('habits')}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Target size={24} className="text-white" />
              </div>
              <h3 className="text-gray-800">Planejamento de Hábitos</h3>
            </div>
            <p className="text-sm text-gray-600">Crie e acompanhe novos hábitos saudáveis</p>
          </button>

          <button
            className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-6 hover:from-blue-200 hover:to-blue-100 transition-all text-left"
            onClick={() => onNavigateToSubscreen?.('weekly')}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <CalendarIcon size={24} className="text-white" />
              </div>
              <h3 className="text-gray-800">Planejamento Semanal</h3>
            </div>
            <p className="text-sm text-gray-600">Organize suas atividades da semana</p>
          </button>

          <button
            className="bg-gradient-to-br from-green-100 to-green-50 rounded-2xl p-6 hover:from-green-200 hover:to-green-100 transition-all text-left"
            onClick={() => onNavigateToSubscreen?.('mentalHealth')}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-600 rounded-lg">
                <Heart size={24} className="text-white" />
              </div>
              <h3 className="text-gray-800">Saúde Mental</h3>
            </div>
            <p className="text-sm text-gray-600">Atividades de autocuidado e bem-estar</p>
          </button>
        </div>
      </div>

      <BottomNav activeTab="activity" onTabChange={onBottomNavChange} />

      {showAddGoal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6"
          onClick={() => setShowAddGoal(false)}
        >
          <div 
            className="bg-white rounded-2xl p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-gray-800 mb-4">Nova Meta</h3>
            <input
              type="text"
              placeholder="Descreva sua meta..."
              className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-400 mb-4"
              value={newGoalText}
              onChange={(e) => setNewGoalText(e.target.value)}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddGoal(false)}
                className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddGoal}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditGoal && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6"
          onClick={() => setShowEditGoal(false)}
        >
          <div 
            className="bg-white rounded-2xl p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-gray-800 mb-4">Editar Meta</h3>
            <input
              type="text"
              placeholder="Descreva sua meta..."
              className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-400 mb-4"
              value={editGoalText}
              onChange={(e) => setEditGoalText(e.target.value)}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowEditGoal(false)}
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