import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { OrganicBackground } from './OrganicBackground';

interface NewPasswordScreenProps {
  onBack: () => void;
  onPasswordChanged: () => void;
}

export function NewPasswordScreen({ onBack, onPasswordChanged }: NewPasswordScreenProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = () => {
    if (password && confirmPassword && password === confirmPassword) {
      onPasswordChanged();
    }
  };

  return (
    <div className="relative min-h-screen px-6 py-8 overflow-hidden">
      <OrganicBackground />
      
      <div className="relative z-10 max-w-sm mx-auto">
        <button
          onClick={onBack}
          className="mb-6 p-2 hover:bg-white/30 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-700" />
        </button>
        
        <h1 className="mb-4 text-gray-800">Criar nova senha</h1>
        <p className="text-gray-600 mb-8">
          Crie uma nova senha segura para sua conta
        </p>
        
        <div className="space-y-4 mb-8">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Nova senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pr-12 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200 focus:outline-none focus:border-blue-400 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirmar nova senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 pr-12 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200 focus:outline-none focus:border-blue-400 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        
        <button
          onClick={handleSubmit}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Alterar senha
        </button>
      </div>
    </div>
  );
}
