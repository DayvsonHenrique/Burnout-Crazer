import { useState, useEffect } from 'react';
import { ChevronLeft, Camera, User, Mail, Phone, Calendar, Bell, Moon, Sun, LogOut } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';

export default function Profile({ user, setUser, onBack, onLogout, darkMode, setDarkMode, profilePhoto, setProfilePhoto, settings, setSettings }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    birthdate: user?.birthdate || ''
  });

  // Carregar configurações do localStorage ao montar o componente
  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // Salvar configurações no localStorage sempre que mudarem
  useEffect(() => {
    localStorage.setItem('userSettings', JSON.stringify(settings));
  }, [settings]);

  const handleSave = () => {
    setUser({ ...user, ...formData });
    setIsEditing(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const photoUrl = reader.result;
        setUser({ ...user, avatar: photoUrl });
        setProfilePhoto(photoUrl); // Sincronizar globalmente
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-green-100 dark:from-gray-900 dark:via-gray-800 dark:to-black pb-20">
      {/* Header */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <button onClick={onBack} className="text-gray-700 dark:text-gray-300">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl text-gray-900 dark:text-white">Perfil e Configurações</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-blue-600 dark:text-blue-400"
        >
          {isEditing ? 'Cancelar' : 'Editar'}
        </button>
      </div>

      <div className="px-6 py-6">
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            {user?.avatar || profilePhoto ? (
              <img
                src={profilePhoto || user?.avatar}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-4xl border-4 border-white dark:border-gray-700 shadow-lg">
                {formData.name?.[0]?.toUpperCase() || 'U'}
              </div>
            )}
            {isEditing && (
              <label className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer shadow-lg">
                <Camera className="w-5 h-5 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
          {!isEditing && (
            <>
              <h2 className="text-2xl text-gray-900 dark:text-white mb-1">{formData.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">{formData.email}</p>
            </>
          )}
        </div>

        {/* Personal Information */}
        {isEditing ? (
          <div className="space-y-4 mb-6">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg text-gray-900 dark:text-white mb-4">Informações Pessoais</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="dark:text-gray-300">Nome</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Seu nome"
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="dark:text-gray-300">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="seu@email.com"
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="dark:text-gray-300">Telefone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(00) 00000-0000"
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                </div>

                <div>
                  <Label htmlFor="birthdate" className="dark:text-gray-300">Data de Nascimento</Label>
                  <Input
                    id="birthdate"
                    type="date"
                    value={formData.birthdate}
                    onChange={(e) => setFormData({ ...formData, birthdate: e.target.value })}
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                </div>
              </div>

              <Button
                onClick={handleSave}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 rounded-full"
              >
                Salvar Alterações
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Information Cards */}
            <div className="space-y-3 mb-6">
              {formData.phone && (
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 dark:border-gray-700 flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Telefone</div>
                    <div className="text-gray-900 dark:text-white">{formData.phone}</div>
                  </div>
                </div>
              )}

              {formData.birthdate && (
                <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 dark:border-gray-700 flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Data de Nascimento</div>
                    <div className="text-gray-900 dark:text-white">
                      {new Date(formData.birthdate + 'T00:00:00').toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Settings */}
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-6 border border-gray-200 dark:border-gray-700 mb-6">
              <h3 className="text-lg text-gray-900 dark:text-white mb-4">Configurações</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    {darkMode ? (
                      <Moon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    ) : (
                      <Sun className="w-5 h-5 text-yellow-600" />
                    )}
                    <div>
                      <div className="text-gray-900 dark:text-white">Modo Escuro</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Tema escuro para o app</div>
                    </div>
                  </div>
                  <Switch
                    checked={darkMode}
                    onCheckedChange={(checked) => setDarkMode(checked)}
                  />
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <div>
                      <div className="text-gray-900 dark:text-white">Lembretes</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Lembretes de atividades</div>
                    </div>
                  </div>
                  <Switch
                    checked={settings.reminderNotifications}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, reminderNotifications: checked })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <Button
              onClick={onLogout}
              variant="outline"
              className="w-full border-2 border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sair
            </Button>
          </>
        )}
      </div>
    </div>
  );
}