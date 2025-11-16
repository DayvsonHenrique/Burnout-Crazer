import { ArrowLeft, Plus, Trash2, Edit2 } from 'lucide-react';
import { useState } from 'react';
import { OrganicBackground } from './OrganicBackground';

interface WeeklyPlanningScreenProps {
  onBack: () => void;
}

interface Activity {
  id: string;
  text: string;
}

interface DaySchedule {
  name: string;
  tasks: Activity[];
}

export function WeeklyPlanningScreen({ onBack }: WeeklyPlanningScreenProps) {
  const [days, setDays] = useState<DaySchedule[]>([
    { name: 'Segunda', tasks: [
      { id: '1', text: 'Sessão de terapia - 14h' },
      { id: '2', text: 'Meditação matinal' }
    ]},
    { name: 'Terça', tasks: [{ id: '3', text: 'Exercício físico - 7h' }] },
    { name: 'Quarta', tasks: [{ id: '4', text: 'Grupo de apoio - 19h' }] },
    { name: 'Quinta', tasks: [] },
    { name: 'Sexta', tasks: [{ id: '5', text: 'Yoga - 18h' }] },
    { name: 'Sábado', tasks: [{ id: '6', text: 'Caminhada ao ar livre' }] },
    { name: 'Domingo', tasks: [{ id: '7', text: 'Dia de descanso' }] },
  ]);
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [showEditActivity, setShowEditActivity] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
  const [newActivityText, setNewActivityText] = useState('');
  const [editActivityText, setEditActivityText] = useState('');
  const [editActivityId, setEditActivityId] = useState<string | null>(null);
  const [editDayIndex, setEditDayIndex] = useState<number | null>(null);

  const handleAddActivity = () => {
    if (newActivityText.trim() && selectedDayIndex !== null) {
      const newActivity: Activity = {
        id: Date.now().toString(),
        text: newActivityText,
      };
      const newDays = [...days];
      newDays[selectedDayIndex].tasks.push(newActivity);
      setDays(newDays);
      setNewActivityText('');
      setShowAddActivity(false);
      setSelectedDayIndex(null);
    }
  };

  const handleEditActivity = (dayIndex: number, activityId: string, text: string) => {
    setEditDayIndex(dayIndex);
    setEditActivityId(activityId);
    setEditActivityText(text);
    setShowEditActivity(true);
  };

  const handleSaveEdit = () => {
    if (editActivityText.trim() && editDayIndex !== null && editActivityId) {
      const newDays = [...days];
      newDays[editDayIndex].tasks = newDays[editDayIndex].tasks.map(task =>
        task.id === editActivityId ? { ...task, text: editActivityText } : task
      );
      setDays(newDays);
      setShowEditActivity(false);
      setEditActivityId(null);
      setEditActivityText('');
      setEditDayIndex(null);
    }
  };

  const handleDeleteActivity = (dayIndex: number, activityId: string) => {
    const newDays = [...days];
    newDays[dayIndex].tasks = newDays[dayIndex].tasks.filter(task => task.id !== activityId);
    setDays(newDays);
  };

  const openAddActivity = (dayIndex: number) => {
    setSelectedDayIndex(dayIndex);
    setShowAddActivity(true);
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
          <h2 className="text-gray-800">Planejamento Semanal</h2>
          <div className="w-10"></div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 mb-4">
          <p className="text-sm text-gray-600">
            Organize suas atividades de bem-estar para toda a semana
          </p>
        </div>

        <div className="space-y-3">
          {days.map((day, dayIndex) => (
            <div key={dayIndex} className="bg-white/70 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-800">{day.name}</h3>
                <button 
                  className="p-1 hover:bg-white/50 rounded transition-colors"
                  onClick={() => openAddActivity(dayIndex)}
                >
                  <Plus size={18} className="text-blue-600" />
                </button>
              </div>
              {day.tasks.length > 0 ? (
                <div className="space-y-2">
                  {day.tasks.map((task) => (
                    <div key={task.id} className="flex items-center gap-2">
                      <p className="flex-1 text-sm text-gray-600 pl-3 border-l-2 border-blue-600">
                        {task.text}
                      </p>
                      <button
                        className="p-1 text-gray-500 hover:text-gray-700"
                        onClick={() => handleEditActivity(dayIndex, task.id, task.text)}
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        className="p-1 text-gray-500 hover:text-gray-700"
                        onClick={() => handleDeleteActivity(dayIndex, task.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">Nenhuma atividade</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {showAddActivity && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6"
          onClick={() => setShowAddActivity(false)}
        >
          <div 
            className="bg-white rounded-2xl p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-gray-800 mb-4">Nova Atividade</h3>
            <input
              type="text"
              placeholder="Descreva a atividade..."
              className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-400 mb-4"
              value={newActivityText}
              onChange={(e) => setNewActivityText(e.target.value)}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddActivity(false)}
                className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddActivity}
                className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditActivity && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-6"
          onClick={() => setShowEditActivity(false)}
        >
          <div 
            className="bg-white rounded-2xl p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-gray-800 mb-4">Editar Atividade</h3>
            <input
              type="text"
              placeholder="Descreva a atividade..."
              className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-400 mb-4"
              value={editActivityText}
              onChange={(e) => setEditActivityText(e.target.value)}
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowEditActivity(false)}
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