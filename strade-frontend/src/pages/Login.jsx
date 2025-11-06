import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, LogIn } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

export default function Login({ onLogin, onNavigate }) {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Dummy credentials
      const validCredentials = [
        { username: 'admin', email: 'admin@strade.ai', password: 'admin123' },
        { username: 'demo', email: 'demo@strade.ai', password: 'demo123' },
        { username: 'alya', email: 'alya.prananda@strade.ai', password: 'alya123' }
      ];

      const user = validCredentials.find(
        cred => 
          (cred.username === emailOrUsername || cred.email === emailOrUsername) &&
          cred.password === password
      );

      if (user) {
        // Store auth token
        localStorage.setItem('authToken', 'dummy-token-' + user.username);
        localStorage.setItem('username', user.username);
        onLogin();
      } else {
        setError('Email/Username atau Password salah');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-black via-[#041C1A] to-[#0a1f1d]">
      <Card className="w-full max-w-md border-[#84F7F0]/20 backdrop-blur-md">
        <div className="p-8 space-y-6">
          {/* Logo & Title */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-[#84F7F0]">STRADE</h1>
            <p className="text-white/60 text-sm">Masuk ke akun Anda</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email/Username Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">
                Email atau Username
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#84F7F0]/60" />
                <input
                  type="text"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  placeholder="Masukkan email atau username"
                  required
                  className="w-full rounded-lg border border-[#84F7F0]/40 bg-[#041C1A] pl-10 pr-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#84F7F0]/50 transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#84F7F0]/60" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  required
                  className="w-full rounded-lg border border-[#84F7F0]/40 bg-[#041C1A] pl-10 pr-12 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#84F7F0]/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#84F7F0]/60 hover:text-[#84F7F0] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-400 text-sm text-center bg-red-400/10 border border-red-400/30 rounded-lg py-2">
                {error}
              </div>
            )}

            {/* Login Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#84F7F0] hover:bg-[#6dd9d3] text-black font-bold py-3 shadow-lg shadow-[#84F7F0]/30 transition-all"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full"></div>
                  Memproses...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Masuk
                </span>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-[#041C1A] px-2 text-white/50">atau</span>
            </div>
          </div>

          {/* Secondary Actions */}
          <div className="space-y-3">
            <Button
              onClick={() => onNavigate('activation')}
              variant="outline"
              className="w-full border-[#84F7F0]/40 text-[#84F7F0] hover:bg-[#84F7F0]/10"
            >
              Aktivasi Kode
            </Button>
            
            <button
              onClick={() => onNavigate('forgot')}
              className="w-full text-sm text-white/60 hover:text-[#84F7F0] transition-colors"
            >
              Lupa Password?
            </button>
          </div>

          {/* Demo Credentials Info */}
          <div className="mt-6 p-4 bg-[#84F7F0]/5 border border-[#84F7F0]/20 rounded-lg">
            <p className="text-xs text-white/50 text-center mb-2">Demo Credentials:</p>
            <div className="text-xs text-white/60 space-y-1">
              <p>• admin@strade.ai / admin123</p>
              <p>• demo@strade.ai / demo123</p>
              <p>• alya.prananda@strade.ai / alya123</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
