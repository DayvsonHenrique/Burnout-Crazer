import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { OrganicBackground } from './OrganicBackground';

interface SignupScreenProps {
  onSignup: (name: string, email: string, password: string) => void;
  onBack: () => void;
}

export function SignupScreen({ onSignup, onBack }: SignupScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = () => {
    if (name && email && password && password === confirmPassword) {
      onSignup(name, email, password);
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
        
        <h1 className="mb-8 text-gray-800">Criar uma conta</h1>
        
        <div className="space-y-4 mb-6">
          <div>
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200 focus:outline-none focus:border-blue-400 transition-colors"
            />
          </div>
          
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200 focus:outline-none focus:border-blue-400 transition-colors"
            />
          </div>
          
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
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
              placeholder="Confirmar Senha"
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
          onClick={handleSignup}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-6"
        >
          Cadastrar
        </button>
        
        <div className="text-center text-sm text-gray-500 mb-4">OU</div>
        
        <div className="space-y-3">
          <button className="w-full py-3 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 hover:bg-white transition-colors flex items-center justify-center gap-3">
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path d="M19.6 10.23c0-.82-.1-1.42-.25-2.05H10v3.72h5.5c-.15.96-.74 2.31-2.04 3.22v2.45h3.16c1.89-1.73 2.98-4.3 2.98-7.34z" fill="#4285F4"/>
              <path d="M13.46 15.13c-.83.59-1.96 1-3.46 1-2.64 0-4.88-1.74-5.68-4.15H1.07v2.52C2.72 17.75 6.09 20 10 20c2.7 0 4.96-.89 6.62-2.42l-3.16-2.45z" fill="#34A853"/>
              <path d="M3.99 10c0-.69.12-1.35.32-1.97V5.51H1.07A9.973 9.973 0 000 10c0 1.61.39 3.14 1.07 4.49l3.24-2.52c-.2-.62-.32-1.28-.32-1.97z" fill="#FBBC05"/>
              <path d="M10 3.88c1.88 0 3.13.81 3.85 1.48l2.84-2.76C14.96.99 12.7 0 10 0 6.09 0 2.72 2.25 1.07 5.51l3.24 2.52C5.12 5.62 7.36 3.88 10 3.88z" fill="#EA4335"/>
            </svg>
            Login com Google
          </button>
          
          <button className="w-full py-3 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 hover:bg-white transition-colors flex items-center justify-center gap-3">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="#1877F2">
              <path d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"/>
            </svg>
            Login com Facebook
          </button>
        </div>
      </div>
    </div>
  );
}
