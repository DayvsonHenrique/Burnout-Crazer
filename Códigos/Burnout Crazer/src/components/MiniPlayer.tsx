import { Play, Pause, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function MiniPlayer({ track, isPlaying, onPlayPause, onClick, onClose }) {
  if (!track) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        className="fixed bottom-20 left-4 right-4 z-40"
      >
        <motion.div
          className="bg-gradient-to-r from-purple-500 to-purple-700 dark:from-purple-600 dark:to-purple-800 rounded-2xl p-3 shadow-lg backdrop-blur-sm flex items-center gap-3"
        >
          <div
            onClick={onClick}
            className="flex items-center gap-3 flex-1 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
              <ImageWithFallback
                src={track.image}
                alt={track.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-sm text-white truncate">{track.title}</h3>
              <p className="text-xs text-purple-200 truncate">{track.subtitle}</p>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onPlayPause();
            }}
            className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white" fill="currentColor" />
            ) : (
              <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}