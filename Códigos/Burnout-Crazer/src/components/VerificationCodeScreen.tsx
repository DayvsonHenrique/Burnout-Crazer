import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { OrganicBackground } from './OrganicBackground';

interface VerificationCodeScreenProps {
  email: string;
  onBack: () => void;
  onCodeVerified: () => void;
}

export function VerificationCodeScreen({ email, onBack, onCodeVerified }: VerificationCodeScreenProps) {
  const [code, setCode] = useState(['', '', '', '', '', '']);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      
      // Auto focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleVerify = () => {
    if (code.every(digit => digit !== '')) {
      onCodeVerified();
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
        
        <h1 className="mb-4 text-gray-800">Inserir código</h1>
        <p className="text-gray-600 mb-8">
          Enviamos um código de 6 dígitos para <br />
          <span className="text-gray-800">{email}</span>
        </p>
        
        <div className="flex gap-2 justify-center mb-8">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              className="w-12 h-14 text-center bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200 focus:outline-none focus:border-blue-400 transition-colors"
            />
          ))}
        </div>
        
        <button
          onClick={handleVerify}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-4"
        >
          Verificar código
        </button>
        
        <div className="text-center">
          <button className="text-sm text-blue-600 hover:underline">
            Reenviar código
          </button>
        </div>
      </div>
    </div>
  );
}
