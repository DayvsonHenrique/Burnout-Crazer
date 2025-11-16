import { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, SkipBack, SkipForward, Heart } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

interface MusicPlayerScreenProps {
  track: Track;
  allTracks: Track[];
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: (trackId: string) => void;
}

export function MusicPlayerScreen({ track, allTracks, onBack, isFavorite, onToggleFavorite }: MusicPlayerScreenProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(track);
  const duration = 180; // 3 minutes in seconds

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePrevious = () => {
    const currentIndex = allTracks.findIndex(t => t.id === currentTrack.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : allTracks.length - 1;
    setCurrentTrack(allTracks[prevIndex]);
    setProgress(0);
  };

  const handleNext = () => {
    const currentIndex = allTracks.findIndex(t => t.id === currentTrack.id);
    const nextIndex = currentIndex < allTracks.length - 1 ? currentIndex + 1 : 0;
    setCurrentTrack(allTracks[nextIndex]);
    setProgress(0);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black overflow-hidden flex flex-col">
      {/* Starry background */}
      <div className="absolute inset-0 opacity-20">
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
      
      <div className="relative z-10 flex flex-col h-screen px-6 py-6">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-white" />
          </button>
          <button
            onClick={() => onToggleFavorite(currentTrack.id)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Heart size={24} className={isFavorite ? "text-red-500" : "text-white"} />
          </button>
        </div>
        
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <div className="w-full max-w-sm aspect-square rounded-3xl overflow-hidden mb-8 shadow-2xl">
            <img
              src={currentTrack.image}
              alt={currentTrack.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <h2 className="text-white text-center mb-2">{currentTrack.title}</h2>
          <p className="text-white/60 text-center mb-8">{currentTrack.subtitle}</p>
          
          <div className="w-full max-w-sm mb-2">
            <div className="relative h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="absolute h-full bg-green-500 transition-all duration-1000 ease-linear rounded-full"
                style={{ width: `${(progress / duration) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="w-full max-w-sm flex justify-between text-white/60 text-sm mb-8">
            <span>{formatTime(progress)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          
          <div className="flex items-center gap-8">
            <button
              onClick={handlePrevious}
              className="p-3 hover:bg-white/10 rounded-full transition-colors"
            >
              <SkipBack size={28} className="text-white" />
            </button>
            
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-6 bg-white rounded-full hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <Pause size={32} className="text-gray-900" />
              ) : (
                <Play size={32} className="text-gray-900 ml-1" />
              )}
            </button>
            
            <button
              onClick={handleNext}
              className="p-3 hover:bg-white/10 rounded-full transition-colors"
            >
              <SkipForward size={28} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}