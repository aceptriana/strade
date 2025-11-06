import React, { useState } from 'react';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

export default function ForgotPassword({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // In real app, send email to backend
      setSubmitted(true);
      setLoading(false);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-black via-[#041C1A] to-[#0a1f1d]">
        <Card className="w-full max-w-md border-[#84F7F0]/20 backdrop-blur-md">
          <div className="p-8 space-y-6 text-center">
            {/* Success Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#84F7F0]/10 border border-[#84F7F0]/30 mb-4">
              <Send className="h-10 w-10 text-[#84F7F0]" />
            </div>

            {/* Success Message */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white">Email Terkirim!</h1>
              <p className="text-white/60 text-sm">
                Link reset password telah dikirim ke <span className="text-[#84F7F0] font-semibold">{email}</span>
              </p>
            </div>

            {/* Info Box */}
            <div className="p-4 bg-[#84F7F0]/5 border border-[#84F7F0]/20 rounded-lg text-left">
              <p className="text-xs text-white/70 space-y-2">
                <span className="block">• Cek folder inbox dan spam</span>
                <span className="block">• Link berlaku selama 24 jam</span>
                <span className="block">• Jika tidak menerima, coba kirim ulang</span>
              </p>
            </div>

            {/* Back to Login */}
            <Button
              onClick={() => onNavigate('login')}
              className="w-full bg-[#84F7F0] hover:bg-[#6dd9d3] text-black font-bold py-3 shadow-lg shadow-[#84F7F0]/30 transition-all"
            >
              Kembali ke Login
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-black via-[#041C1A] to-[#0a1f1d]">
      <Card className="w-full max-w-md border-[#84F7F0]/20 backdrop-blur-md">
        <div className="p-8 space-y-6">
          {/* Back Button */}
          <button
            onClick={() => onNavigate('login')}
            className="flex items-center gap-2 text-white/60 hover:text-[#84F7F0] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Kembali ke Login</span>
          </button>

          {/* Logo & Title */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#84F7F0]/10 border border-[#84F7F0]/30 mb-4">
              <Mail className="h-8 w-8 text-[#84F7F0]" />
            </div>
            <h1 className="text-2xl font-bold text-white">Lupa Password?</h1>
            <p className="text-white/60 text-sm">
              Masukkan email Anda untuk menerima link reset password
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#84F7F0]/60" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  required
                  className="w-full rounded-lg border border-[#84F7F0]/40 bg-[#041C1A] pl-10 pr-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#84F7F0]/50 transition-all"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-400 text-sm text-center bg-red-400/10 border border-red-400/30 rounded-lg py-2">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#84F7F0] hover:bg-[#6dd9d3] text-black font-bold py-3 shadow-lg shadow-[#84F7F0]/30 transition-all"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full"></div>
                  Mengirim...
                </span>
              ) : (
                'Kirim Link Reset'
              )}
            </Button>
          </form>

          {/* Help Text */}
          <div className="p-4 bg-[#84F7F0]/5 border border-[#84F7F0]/20 rounded-lg">
            <p className="text-xs text-white/70">
              <span className="block font-semibold text-[#84F7F0] mb-1">Butuh bantuan?</span>
              Hubungi support STRADE di support@strade.ai atau melalui live chat untuk bantuan lebih lanjut.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
