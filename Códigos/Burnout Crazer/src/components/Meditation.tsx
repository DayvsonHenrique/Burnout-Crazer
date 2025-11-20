import { useState } from 'react';
import { ChevronLeft, Heart, MoreVertical, Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const tracks = {
  'Todos': [
    { id: 1, title: 'Best Insomnia', subtitle: 'Nome da música', category: 'Dormir', image: 'https://images.unsplash.com/photo-1758620942741-5a03e479c313?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjBzbGVlcHxlbnwxfHx8fDE3NjM1OTk0NzN8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 2, title: 'Relaxamento Profundo', subtitle: 'Música calma', category: 'Ansiedade', image: 'https://images.unsplash.com/photo-1670761787147-562e809e354a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWxheGluZyUyMG5hdHVyZSUyMHplbnxlbnwxfHx8fDE3NjM1OTk0NzN8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 3, title: 'Paz Interior', subtitle: 'Sons da natureza', category: 'Depressão', image: 'https://images.unsplash.com/photo-1568571022375-ad4f3ef34972?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHdhdmVzJTIwY2FsbXxlbnwxfHx8fDE3NjM1NTc4ODV8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 4, title: 'Meditação Guiada', subtitle: 'Voz suave', category: 'Ansiedade', image: 'https://images.unsplash.com/photo-1758466872393-57aad0d6512b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwbXVzaWMlMjBzcGlyaXR1YWx8ZW58MXx8fHwxNzYzNTk5NDc0fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  ],
  'Ansiedade': [
    { id: 2, title: 'Relaxamento Profundo', subtitle: 'Música calma', category: 'Ansiedade', image: 'https://images.unsplash.com/photo-1670761787147-562e809e354a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWxheGluZyUyMG5hdHVyZSUyMHplbnxlbnwxfHx8fDE3NjM1OTk0NzN8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 4, title: 'Meditação Guiada', subtitle: 'Voz suave', category: 'Ansiedade', image: 'https://images.unsplash.com/photo-1758466872393-57aad0d6512b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwbXVzaWMlMjBzcGlyaXR1YWx8ZW58MXx8fHwxNzYzNTk5NDc0fDA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 5, title: 'Respiração Consciente', subtitle: 'Exercício guiado', category: 'Ansiedade', image: 'https://images.unsplash.com/photo-1758620942741-5a03e479c313?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjBzbGVlcHxlbnwxfHx8fDE3NjM1OTk0NzN8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  ],
  'Depressão': [
    { id: 3, title: 'Paz Interior', subtitle: 'Sons da natureza', category: 'Depressão', image: 'https://images.unsplash.com/photo-1568571022375-ad4f3ef34972?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHdhdmVzJTIwY2FsbXxlbnwxfHx8fDE3NjM1NTc4ODV8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 6, title: 'Energia Positiva', subtitle: 'Música motivacional', category: 'Depressão', image: 'https://images.unsplash.com/photo-1670761787147-562e809e354a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWxheGluZyUyMG5hdHVyZSUyMHplbnxlbnwxfHx8fDE3NjM1OTk0NzN8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 7, title: 'Renovação', subtitle: 'Sons relaxantes', category: 'Depressão', image: 'https://images.unsplash.com/photo-1758466872393-57aad0d6512b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwbXVzaWMlMjBzcGlyaXR1YWx8ZW58MXx8fHwxNzYzNTk5NDc0fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  ],
  'Dormir': [
    { id: 1, title: 'Best Insomnia', subtitle: 'Nome da música', category: 'Dormir', image: 'https://images.unsplash.com/photo-1758620942741-5a03e479c313?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwcGVhY2VmdWwlMjBzbGVlcHxlbnwxfHx8fDE3NjM1OTk0NzN8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 8, title: 'Sono Profundo', subtitle: 'Ondas delta', category: 'Dormir', image: 'https://images.unsplash.com/photo-1568571022375-ad4f3ef34972?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHdhdmVzJTIwY2FsbXxlbnwxfHx8fDE3NjM1NTc4ODV8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { id: 9, title: 'Ninar', subtitle: 'Melodia suave', category: 'Dormir', image: 'https://images.unsplash.com/photo-1758466872393-57aad0d6512b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGF0aW9uJTIwbXVzaWMlMjBzcGlyaXR1YWx8ZW58MXx8fHwxNzYzNTk5NDc0fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  ],
};

export default function Meditation({ onBack, favorites, onToggleFavorite, onOpenPlayer }) {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [showFavorites, setShowFavorites] = useState(false);

  const categories = ['Todos', 'Ansiedade', 'Depressão', 'Dormir'];
  
  const displayTracks = showFavorites 
    ? favorites 
    : tracks[selectedCategory] || tracks['Todos'];

  const isFavorite = (track) => {
    return favorites.some(f => f.id === track.id);
  };

  const handleTrackClick = (track) => {
    // Passar a lista atual de tracks para o player
    onOpenPlayer(track, displayTracks);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-black pb-20">
      {/* Header */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <button onClick={onBack} className="text-gray-700 dark:text-gray-300">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl text-gray-900 dark:text-white">Meditação</h1>
        <div className="w-6" />
      </div>

      {!showFavorites && (
        <>
          {/* Categories */}
          <div className="px-4 mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Tracks List */}
          <div className="px-4 space-y-3 mb-24">
            {displayTracks.map((track) => (
              <motion.div
                key={track.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleTrackClick(track)}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-3 flex items-center gap-3 border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-all"
              >
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-xl flex-shrink-0 overflow-hidden">
                  <ImageWithFallback
                    src={track.image}
                    alt={track.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm truncate text-gray-900 dark:text-white">{track.title}</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{track.subtitle}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(track);
                  }}
                  className="flex-shrink-0"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorite(track) ? 'fill-green-500 text-green-500' : 'text-gray-400 dark:text-gray-500'
                    }`}
                  />
                </button>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {showFavorites && (
        <div className="px-4 pb-24">
          <h2 className="text-2xl mb-6 text-gray-900 dark:text-white">favoritos</h2>
          {favorites.length === 0 ? (
            <div className="text-center text-gray-400 dark:text-gray-500 mt-12">
              <Heart className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Nenhum favorito ainda</p>
              <p className="text-sm mt-2">Adicione músicas aos favoritos para vê-las aqui</p>
            </div>
          ) : (
            <div className="space-y-3">
              {favorites.map((track) => (
                <div
                  key={track.id}
                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-4 border border-gray-200 dark:border-gray-700"
                >
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 overflow-hidden">
                    <ImageWithFallback
                      src={track.image}
                      alt={track.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="truncate text-gray-900 dark:text-white">{track.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{track.subtitle}</p>
                  </div>
                  <button
                    onClick={() => onToggleFavorite(track)}
                    className="flex-shrink-0"
                  >
                    <Heart className="w-5 h-5 fill-green-500 text-green-500" />
                  </button>
                  <button className="flex-shrink-0">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}