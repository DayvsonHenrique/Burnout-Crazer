import { useState } from 'react';
import { BrainLogo } from './BrainLogo';
import { OrganicBackground } from './OrganicBackground';

interface LoginScreenProps {
  onLogin: (email: string, password: string) => void;
  onGoToSignup: () => void;
  onGoToForgotPassword: () => void;
}

export function LoginScreen({ onLogin, onGoToSignup, onGoToForgotPassword }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      setError(true);
      return;
    }
    setError(false);
    onLogin(email, password);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <OrganicBackground />
      
      <div className="relative z-10 w-full max-w-sm flex flex-col items-center">
        <div className="mb-8">
          <BrainLogo size={100} />
        </div>
        
        <h1 className="mb-12 text-gray-800">Burnout Crazer</h1>
        
        <div className="w-full space-y-4 mb-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(false);
              }}
              className={`w-full px-4 py-3 bg-white/60 backdrop-blur-sm rounded-lg border ${
                error && !email ? 'border-red-500' : 'border-gray-200'
              } focus:outline-none focus:border-blue-400 transition-colors`}
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className={`w-full px-4 py-3 bg-white/60 backdrop-blur-sm rounded-lg border ${
                error && !password ? 'border-red-500' : 'border-gray-200'
              } focus:outline-none focus:border-blue-400 transition-colors`}
            />
          </div>
          
          <div className="text-right">
            <button 
              onClick={onGoToForgotPassword}
              className="text-sm text-blue-600 hover:underline"
            >
              Esqueceu a senha?
            </button>
          </div>
        </div>
        
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-4"
        >
          Login
        </button>
        
        <div className="text-center">
          <span className="text-sm text-gray-600">Não tem uma conta? </span>
          <button
            onClick={onGoToSignup}
            className="text-sm text-blue-600 hover:underline"
          >
            Cadastre-se
          </button>
        </div>
      </div>
    </div>
  );
}