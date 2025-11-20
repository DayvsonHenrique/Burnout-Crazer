import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';

const slides = [
  {
    emoji: '🧠',
    title: 'Bem-vindo ao Burnout Crazer',
    description: 'Seu companheiro para bem-estar emocional, saúde mental e produtividade consciente.'
  },
  {
    emoji: '🧘',
    title: 'Cuide da sua mente',
    description: 'Meditação guiada, exercícios de respiração e ferramentas para gerenciar ansiedade e estresse.'
  },
  {
    emoji: '📅',
    title: 'Organize sua vida',
    description: 'Planejamento de hábitos, metas diárias e produtividade consciente para uma vida equilibrada.'
  }
];

export default function Onboarding({ onComplete }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      localStorage.setItem('hasSeenOnboarding', 'true');
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center"
          >
            <div className="text-8xl mb-8">
              {slides[currentSlide].emoji}
            </div>
            <h1 className="text-2xl mb-4 text-gray-800">
              {slides[currentSlide].title}
            </h1>
            <p className="text-gray-600 mb-12">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        <div className="flex gap-4">
          {currentSlide > 0 && (
            <Button
              variant="outline"
              onClick={handlePrev}
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>
          )}
          <Button
            onClick={handleNext}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            {currentSlide === slides.length - 1 ? 'Começar' : 'Próximo'}
            {currentSlide < slides.length - 1 && <ChevronRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </div>
    </div>
  );
}
