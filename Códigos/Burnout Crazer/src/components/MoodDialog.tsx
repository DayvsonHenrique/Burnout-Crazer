import { motion } from 'motion/react';
import { Button } from './ui/button';

const motivationalMessages = {
  'Triste': [
    'Está tudo bem não estar bem. Você é forte e vai superar isso.',
    'Dias difíceis acontecem, mas lembre-se: você já superou 100% dos seus piores dias.',
    'Permita-se sentir, mas não se esqueça de cuidar de você.'
  ],
  'Preocupado': [
    'Respire fundo. Você consegue lidar com isso, um passo de cada vez.',
    'A ansiedade mente para você. Você é mais forte do que pensa.',
    'Que tal fazer uma pausa e praticar alguns exercícios de respiração?'
  ],
  'Normal': [
    'Um dia normal também é um dia válido. Continue assim!',
    'Estabilidade é um sinal de progresso. Continue cuidando de você.',
    'Aproveite esse momento de equilíbrio para se fortalecer.'
  ],
  'Bem': [
    'Que maravilha! Continue cultivando esse sentimento positivo.',
    'Você está indo bem! Celebre suas pequenas vitórias.',
    'Guarde esse sentimento bom para os dias mais difíceis.'
  ],
  'Ótimo': [
    'Incrível! Você está radiante hoje! 🌟',
    'Que energia maravilhosa! Compartilhe esse brilho com o mundo.',
    'Continue assim! Você merece toda essa felicidade.'
  ]
};

export default function MoodDialog({ mood, onClose, onConfirm }) {
  const messages = motivationalMessages[mood.name] || [];
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl p-8 max-w-md w-full"
      >
        {/* Animated Emoji */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: 0.5,
            repeat: 2
          }}
          className="text-8xl text-center mb-6"
        >
          {mood.emoji}
        </motion.div>

        <h2 className="text-2xl text-center mb-4 text-gray-800">
          Você está se sentindo <br />
          <span className={`bg-gradient-to-r ${mood.color} bg-clip-text text-transparent`}>
            {mood.name}
          </span> hoje?
        </h2>

        <p className="text-center text-gray-600 mb-8">
          {randomMessage}
        </p>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 rounded-full border-2 border-gray-300"
          >
            Cancelar
          </Button>
          <Button
            onClick={onConfirm}
            className={`flex-1 rounded-full bg-gradient-to-r ${mood.color} text-white border-0`}
          >
            Confirmar
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
