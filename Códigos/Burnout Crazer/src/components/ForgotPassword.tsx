import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ChevronLeft } from 'lucide-react';

export default function ForgotPassword({ onComplete, onBack }) {
  const [step, setStep] = useState(1); // 1: email, 2: code, 3: new password
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSendCode = (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Digite seu email');
      return;
    }

    // Simular envio de código
    setStep(2);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    setError('');

    if (!code || code.length !== 6) {
      setError('Digite o código de 6 dígitos');
      return;
    }

    setStep(3);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setError('');

    if (!newPassword || !confirmPassword) {
      setError('Preencha todos os campos');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (newPassword.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    onComplete();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <button
          onClick={onBack}
          className="mb-6 flex items-center text-gray-700 hover:text-gray-900"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
        </button>

        {step === 1 && (
          <>
            <h1 className="text-2xl text-gray-800 mb-4">Esqueceu a senha?</h1>
            <p className="text-gray-600 mb-8">
              Digite seu email e enviaremos um código de verificação.
            </p>

            <form onSubmit={handleSendCode} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/50 border-0 border-b-2 border-gray-300 rounded-none focus:border-blue-600"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-6"
              >
                Enviar Código
              </Button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="text-2xl text-gray-800 mb-4">Verificar Código</h1>
            <p className="text-gray-600 mb-8">
              Digite o código de 6 dígitos enviado para {email}
            </p>

            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div>
                <Label htmlFor="code" className="text-gray-700">Código</Label>
                <Input
                  id="code"
                  type="text"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-white/50 border-0 border-b-2 border-gray-300 rounded-none focus:border-blue-600 text-center text-2xl tracking-widest"
                  placeholder="000000"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-6"
              >
                Verificar
              </Button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full text-sm text-blue-600 hover:underline"
              >
                Reenviar código
              </button>
            </form>
          </>
        )}

        {step === 3 && (
          <>
            <h1 className="text-2xl text-gray-800 mb-4">Nova Senha</h1>
            <p className="text-gray-600 mb-8">
              Digite sua nova senha
            </p>

            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <Label htmlFor="newPassword" className="text-gray-700">Nova Senha</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-white/50 border-0 border-b-2 border-gray-300 rounded-none focus:border-blue-600"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-gray-700">Confirmar Senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-white/50 border-0 border-b-2 border-gray-300 rounded-none focus:border-blue-600"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-6"
              >
                Redefinir Senha
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
