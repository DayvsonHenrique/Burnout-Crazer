import { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';

const exercises = [
  {
    id: 1,
    name: 'Respiração 4-7-8',
    description: 'Técnica para reduzir ansiedade e induzir o sono',
    inhale: 4,
    hold: 7,
    exhale: 8,
    cycles: 4
  },
  {
    id: 2,
    name: 'Respiração Quadrada',
    description: 'Equilíbrio e foco mental',
    inhale: 4,
    hold: 4,
    exhale: 4,
    holdAfterExhale: 4,
    cycles: 5
  },
  {
    id: 3,
    name: 'Respiração Profunda',
    description: 'Relaxamento imediato',
    inhale: 5,
    hold: 5,
    exhale: 5,
    cycles: 6
  },
  {
    id: 4,
    name: 'Respiração Energizante',
    description: 'Aumenta energia e vitalidade',
    inhale: 3,
    hold: 3,
    exhale: 3,
    cycles: 8
  }
];

export default function Breathing({ onBack }) {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState('inhale');
  const [countdown, setCountdown] = useState(0);
  const [currentCycle, setCurrentCycle] = useState(1);

  useEffect(() => {
    if (!isActive || !selectedExercise) return;

    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev > 1) return prev - 1;

        // Move to next phase
        if (phase === 'inhale') {
          setPhase('hold');
          return selectedExercise.hold;
        } else if (phase === 'hold' && selectedExercise.holdAfterExhale) {
          setPhase('exhale');
          return selectedExercise.exhale;
        } else if (phase === 'hold') {
          setPhase('exhale');
          return selectedExercise.exhale;
        } else if (phase === 'exhale' && selectedExercise.holdAfterExhale) {
          setPhase('holdAfterExhale');
          return selectedExercise.holdAfterExhale;
        } else {
          // Cycle complete
          if (currentCycle >= selectedExercise.cycles) {
            setIsActive(false);
            setSelectedExercise(null);
            return 0;
          }
          setCurrentCycle(prev => prev + 1);
          setPhase('inhale');
          return selectedExercise.inhale;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, phase, selectedExercise, currentCycle, countdown]);

  const startExercise = (exercise) => {
    setSelectedExercise(exercise);
    setIsActive(true);
    setPhase('inhale');
    setCountdown(exercise.inhale);
    setCurrentCycle(1);
  };

  const stopExercise = () => {
    setIsActive(false);
    setSelectedExercise(null);
    setPhase('inhale');
    setCountdown(0);
    setCurrentCycle(1);
  };

  const getPhaseText = () => {
    if (phase === 'inhale') return 'Inspire';
    if (phase === 'hold') return 'Segure';
    if (phase === 'exhale') return 'Expire';
    if (phase === 'holdAfterExhale') return 'Segure';
    return '';
  };

  const getCircleScale = () => {
    if (phase === 'inhale') return 1.5;
    if (phase === 'hold') return 1.5;
    if (phase === 'exhale') return 0.8;
    if (phase === 'holdAfterExhale') return 0.8;
    return 1;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-black pb-20">
      {!selectedExercise ? (
        <>
          {/* Header */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
            <button onClick={onBack} className="text-gray-700 dark:text-gray-300">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl text-gray-900 dark:text-white">Exercícios de Respiração</h1>
            <div className="w-6" />
          </div>

          {/* Main Content */}
          <div className="px-6 py-6">
            <div className="space-y-4">
              {exercises.map((exercise) => (
                <motion.button
                  key={exercise.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => startExercise(exercise)}
                  className="w-full bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-3xl p-6 text-left hover:bg-white/80 dark:hover:bg-gray-700/70 transition-colors"
                >
                  <h3 className="text-xl mb-2 text-gray-900 dark:text-white">{exercise.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{exercise.description}</p>
                  <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-500">
                    <span>🫁 {exercise.cycles} ciclos</span>
                    <span>⏱️ {exercise.inhale + exercise.hold + exercise.exhale + (exercise.holdAfterExhale || 0)}s por ciclo</span>
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="mt-8 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-3xl p-6">
              <h3 className="text-xl mb-3 text-gray-900 dark:text-white">💡 Dicas</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Encontre um lugar tranquilo e confortável</li>
                <li>• Mantenha a postura ereta, mas relaxada</li>
                <li>• Respire pelo nariz sempre que possível</li>
                <li>• Não force a respiração, mantenha o conforto</li>
                <li>• Pratique regularmente para melhores resultados</li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        /* Active Exercise Screen */
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-black flex flex-col">
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
            <button onClick={stopExercise} className="text-gray-700 dark:text-gray-300">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl text-gray-900 dark:text-white">{selectedExercise.name}</h1>
            <div className="w-6" />
          </div>

          <div className="flex-1 flex flex-col items-center justify-center px-6">
            <div className="text-center mb-12">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Ciclo {currentCycle} de {selectedExercise.cycles}
              </p>
            </div>

            <div className="relative w-64 h-64 flex items-center justify-center mb-12">
              <motion.div
                animate={{
                  scale: getCircleScale(),
                }}
                transition={{
                  duration: countdown,
                  ease: "linear"
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 opacity-30 blur-xl"
              />
              <motion.div
                animate={{
                  scale: getCircleScale(),
                }}
                transition={{
                  duration: countdown,
                  ease: "linear"
                }}
                className="w-48 h-48 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-2xl"
              >
                <div className="text-center">
                  <div className="text-6xl mb-2">{countdown}</div>
                  <div className="text-xl">{getPhaseText()}</div>
                </div>
              </motion.div>
            </div>

            <Button
              onClick={stopExercise}
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 rounded-full px-8"
            >
              Parar
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}