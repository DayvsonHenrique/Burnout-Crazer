import { ArrowLeft, Heart, BookOpen, Sparkles, Sun } from 'lucide-react';
import { useState } from 'react';
import { OrganicBackground } from './OrganicBackground';

interface MentalHealthScreenProps {
  onBack: () => void;
}

interface Activity {
  id: string;
  title: string;
  description: string;
  icon: any;
  color: string;
  completed: boolean;
}

export function MentalHealthScreen({ onBack }: MentalHealthScreenProps) {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      title: 'Diário de Gratidão',
      description: 'Escreva 3 coisas pelas quais é grato hoje',
      icon: BookOpen,
      color: 'purple',
      completed: false,
    },
    {
      id: '2',
      title: 'Autocuidado',
      description: 'Reserve 30 minutos para você',
      icon: Heart,
      color: 'pink',
      completed: false,
    },
    {
      id: '3',
      title: 'Afirmações Positivas',
      description: 'Repita suas afirmações diárias',
      icon: Sparkles,
      color: 'yellow',
      completed: false,
    },
    {
      id: '4',
      title: 'Momento ao Sol',
      description: '15 minutos de exposição solar',
      icon: Sun,
      color: 'orange',
      completed: false,
    },
  ]);

  const getColorClasses = (color: string) => {
    const colors: any = {
      purple: { bg: 'bg-purple-100', icon: 'text-purple-600', button: 'bg-purple-600' },
      pink: { bg: 'bg-pink-100', icon: 'text-pink-600', button: 'bg-pink-600' },
      yellow: { bg: 'bg-yellow-100', icon: 'text-yellow-600', button: 'bg-yellow-600' },
      orange: { bg: 'bg-orange-100', icon: 'text-orange-600', button: 'bg-orange-600' },
    };
    return colors[color] || colors.purple;
  };

  const handleToggleActivity = (id: string) => {
    setActivities(activities.map(activity =>
      activity.id === id ? { ...activity, completed: !activity.completed } : activity
    ));
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
          <h2 className="text-gray-800">Saúde Mental</h2>
          <div className="w-10"></div>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 mb-6">
          <p className="text-sm text-gray-600">
            Atividades diárias de autocuidado e bem-estar emocional
          </p>
        </div>

        <div className="space-y-3">
          {activities.map(activity => {
            const colors = getColorClasses(activity.color);
            const Icon = activity.icon;
            
            return (
              <div key={activity.id} className="bg-white/70 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-start gap-4">
                  <div className={`p-3 ${colors.bg} rounded-lg`}>
                    <Icon size={24} className={colors.icon} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-800 mb-1">{activity.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
                    <button
                      onClick={() => handleToggleActivity(activity.id)}
                      className={`px-4 py-1 ${
                        activity.completed
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-200 text-gray-700'
                      } rounded-lg text-sm transition-colors`}
                    >
                      {activity.completed ? 'Concluído' : 'Marcar como feito'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}