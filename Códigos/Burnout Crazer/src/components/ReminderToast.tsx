import { motion, AnimatePresence } from 'motion/react';
import { Bell, X } from 'lucide-react';

export default function ReminderToast({ reminder, onClose }) {
  if (!reminder) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -100, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -100, scale: 0.8 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md"
      >
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border-2 border-orange-200 dark:border-orange-600 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-400 to-orange-500 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Bell className="w-6 h-6 text-orange-500 animate-bounce" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Lembrete</h3>
                  <p className="text-xs text-orange-100">Burnout Crazer</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-800 dark:text-white">{reminder.title}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{reminder.time}</p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
