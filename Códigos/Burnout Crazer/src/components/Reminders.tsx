import { useState, useEffect } from 'react';
import { Plus, Trash2, Bell, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function Reminders({ reminders, setReminders, isOpen, onClose, onShowToast, reminderNotificationsEnabled }) {
  const [newReminder, setNewReminder] = useState({ title: '', time: '' });

  useEffect(() => {
    // Só executa se lembretes estiverem habilitados
    if (!reminderNotificationsEnabled) {
      return;
    }

    // Check for reminders that should trigger
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      reminders.forEach(reminder => {
        if (reminder.time === currentTime && !reminder.triggered) {
          // Show toast notification immediately
          onShowToast(reminder);
          
          // Try browser notification if permission granted
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Burnout Crazer - Lembrete', {
              body: reminder.title,
              icon: '🔔',
              badge: '🔔'
            });
          }
          
          // Mark as triggered for today
          setReminders(prev => prev.map(r => 
            r.id === reminder.id ? { ...r, triggered: true } : r
          ));
        }
      });

      // Reset triggers at midnight
      if (currentTime === '00:00') {
        setReminders(prev => prev.map(r => ({ ...r, triggered: false })));
      }
    }, 1000); // Check every second for accurate timing

    return () => clearInterval(interval);
  }, [reminders, setReminders, onShowToast, reminderNotificationsEnabled]);

  const addReminder = () => {
    if (newReminder.title.trim() && newReminder.time) {
      setReminders([...reminders, {
        id: Date.now(),
        title: newReminder.title,
        time: newReminder.time,
        triggered: false
      }]);
      setNewReminder({ title: '', time: '' });
    }
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-gray-800 rounded-t-3xl sm:rounded-3xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Bell className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl text-gray-900 dark:text-white">Lembretes</h2>
            </div>
            <button onClick={onClose} className="text-gray-500">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Add New Reminder */}
          <div className="bg-blue-50 dark:bg-gray-700 rounded-2xl p-4 mb-4">
            <Label htmlFor="reminderTitle" className="text-gray-900 dark:text-white">Título do Lembrete</Label>
            <Input
              id="reminderTitle"
              value={newReminder.title}
              onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
              placeholder="Ex: Meditar"
              className="mb-3 mt-2"
            />
            <Label htmlFor="reminderTime" className="text-gray-900 dark:text-white">Horário</Label>
            <Input
              id="reminderTime"
              type="time"
              value={newReminder.time}
              onChange={(e) => setNewReminder({ ...newReminder, time: e.target.value })}
              className="mb-3 mt-2"
            />
            <Button onClick={addReminder} className="w-full bg-blue-600 hover:bg-blue-700">
              <Plus className="w-5 h-5 mr-2" />
              Adicionar Lembrete
            </Button>
          </div>

          {/* Reminders List */}
          <div className="space-y-3">
            {reminders.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Nenhum lembrete configurado</p>
              </div>
            ) : (
              reminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-blue-600" />
                    <div>
                      <h3 className="text-gray-900 dark:text-white">{reminder.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{reminder.time}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteReminder(reminder.id)}
                    className="text-red-500 p-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}