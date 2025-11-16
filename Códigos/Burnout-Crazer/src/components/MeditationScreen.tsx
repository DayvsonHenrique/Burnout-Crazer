import { ArrowLeft, Play } from 'lucide-react';

interface MeditationTrack {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

interface MeditationScreenProps {
  tracks: MeditationTrack[];
  onBack: () => void;
  onPlayTrack: (trackId: string) => void;
  onCategoryClick: (category: 'anxiety' | 'depression' | 'sleep') => void;
  onFavoritesClick: () => void;
}

export function MeditationScreen({ tracks, onBack, onPlayTrack, onCategoryClick, onFavoritesClick }: MeditationScreenProps) {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black overflow-hidden">
      {/* Starry background effect */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-white" />
          </button>
          <h2 className="text-white">Meditação</h2>
          <div className="w-10"></div>
        </div>
        
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          <button className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full whitespace-nowrap">
            Todos
          </button>
          <button
            onClick={() => onCategoryClick('anxiety')}
            className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white/70 rounded-full whitespace-nowrap hover:bg-white/20"
          >
            Ansiedade
          </button>
          <button
            onClick={() => onCategoryClick('depression')}
            className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white/70 rounded-full whitespace-nowrap hover:bg-white/20"
          >
            Depressão
          </button>
          <button
            onClick={() => onCategoryClick('sleep')}
            className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white/70 rounded-full whitespace-nowrap hover:bg-white/20"
          >
            Dormir
          </button>
          <button
            onClick={onFavoritesClick}
            className="px-4 py-2 bg-white/10 backdrop-blur-sm text-white/70 rounded-full whitespace-nowrap hover:bg-white/20"
          >
            Favoritos
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pb-20">
          {tracks.map(track => (
            <button
              key={track.id}
              onClick={() => onPlayTrack(track.id)}
              className="relative group"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-2">
                <img
                  src={track.image}
                  alt={track.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play size={24} className="text-gray-900 ml-1" />
                  </div>
                </div>
              </div>
              <h3 className="text-white text-sm mb-1">{track.title}</h3>
              <p className="text-white/60 text-xs">{track.subtitle}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}