import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { OrganicBackground } from './OrganicBackground';

interface ForgotPasswordScreenProps {
  onBack: () => void;
  onCodeSent: (email: string) => void;
}

export function ForgotPasswordScreen({ onBack, onCodeSent }: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState('');

  const handleSendCode = () => {
    if (email) {
      onCodeSent(email);
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
        
        <h1 className="mb-4 text-gray-800">Recuperar senha</h1>
        <p className="text-gray-600 mb-8">
          Digite seu e-mail e enviaremos um código de verificação
        </p>
        
        <div className="space-y-6 mb-8">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200 focus:outline-none focus:border-blue-400 transition-colors"
            />
          </div>
        </div>
        
        <button
          onClick={handleSendCode}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Enviar código
        </button>
      </div>
    </div>
  );
}
