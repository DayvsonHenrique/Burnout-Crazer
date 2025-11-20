import { useState, useEffect } from 'react';
import { ChevronLeft, Heart, Play, Pause, SkipBack, SkipForward, Shuffle, Repeat } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function MusicPlayer({ 
  track, 
  isPlaying, 
  onPlayPause, 
  onNext, 
  onPrevious, 
  onBack,
  isFavorite,
  onToggleFavorite,
  shuffleEnabled,
  onToggleShuffle
}) {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(180); // 3 minutos simulado
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (isPlaying && !isDragging) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            onNext();
            return 0;
          }
          return prev + (100 / duration);
        });
        setCurrentTime((prev) => Math.min(prev + 1, duration));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, isDragging, duration, onNext]);

  useEffect(() => {
    // Reset progress when track changes
    setProgress(0);
    setCurrentTime(0);
  }, [track?.id]);

  const handleProgressChange = (e) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    setCurrentTime(Math.floor((newProgress / 100) * duration));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!track) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-black flex flex-col">
      {/* Header */}
      <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm p-4 flex items-center justify-between">
        <button onClick={onBack} className="text-gray-700 dark:text-gray-300">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg text-gray-900 dark:text-white">Reproduzindo</h1>
        <div className="w-6" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 pb-8">
        {/* Album Art */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="w-72 h-72 mb-8 rounded-3xl overflow-hidden shadow-2xl"
        >
          <ImageWithFallback
            src={track.image}
            alt={track.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Track Info */}
        <div className="text-center mb-8 w-full">
          <h2 className="text-2xl mb-2 text-gray-900 dark:text-white">{track.title}</h2>
          <p className="text-gray-600 dark:text-gray-400">{track.subtitle}</p>
        </div>

        {/* Progress Bar */}
        <div className="w-full mb-2">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #a78bfa ${progress}%, #d1d5db ${progress}%)`
            }}
          />
        </div>

        {/* Time */}
        <div className="flex justify-between w-full text-sm text-gray-600 dark:text-gray-400 mb-8">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <button
            onClick={onToggleFavorite}
            className="text-gray-600 dark:text-gray-400 hover:scale-110 transition-transform"
          >
            <Heart
              className={`w-7 h-7 ${
                isFavorite ? 'fill-green-500 text-green-500' : ''
              }`}
            />
          </button>

          <button
            onClick={onPrevious}
            className="text-gray-700 dark:text-gray-300 hover:scale-110 transition-transform"
          >
            <SkipBack className="w-8 h-8" fill="currentColor" />
          </button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onPlayPause}
            className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8" fill="currentColor" />
            ) : (
              <Play className="w-8 h-8 ml-1" fill="currentColor" />
            )}
          </motion.button>

          <button
            onClick={onNext}
            className="text-gray-700 dark:text-gray-300 hover:scale-110 transition-transform"
          >
            <SkipForward className="w-8 h-8" fill="currentColor" />
          </button>

          <button
            onClick={onToggleShuffle}
            className="text-gray-600 dark:text-gray-400 hover:scale-110 transition-transform"
          >
            <Shuffle
              className={`w-7 h-7 ${
                shuffleEnabled ? 'fill-green-500 text-green-500' : ''
              }`}
            />
          </button>
        </div>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: #a78bfa;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: #a78bfa;
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}