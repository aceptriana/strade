import React, { useState } from 'react';
import { Key, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

export default function Activation({ onNavigate, onActivationSuccess }) {
  const [activationCode, setActivationCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Dummy activation codes
  const validCodes = [
    'STRADE-2025-ALPHA',
    'STRADE-2025-BETA',
    'STRADE-2025-GAMMA',
    'STRADE-VIP-001',
    'STRADE-VIP-002'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (validCodes.includes(activationCode.toUpperCase())) {
        // Store activation code
        localStorage.setItem('activationCode', activationCode.toUpperCase());
        onActivationSuccess();
      } else {
        setError('Kode aktivasi tidak valid atau sudah digunakan');
      }
      setLoading(false);
    }, 1000);
  };

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
              <Key className="h-8 w-8 text-[#84F7F0]" />
            </div>
            <h1 className="text-2xl font-bold text-white">Aktivasi Akun</h1>
            <p className="text-white/60 text-sm">
              Masukkan kode aktivasi untuk membuat akun baru
            </p>
          </div>

          {/* Activation Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Activation Code Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">
                Kode Aktivasi
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#84F7F0]/60" />
                <input
                  type="text"
                  value={activationCode}
                  onChange={(e) => setActivationCode(e.target.value.toUpperCase())}
                  placeholder="STRADE-2025-XXXXX"
                  required
                  className="w-full rounded-lg border border-[#84F7F0]/40 bg-[#041C1A] pl-10 pr-4 py-3 text-sm text-[#84F7F0] placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#84F7F0]/50 transition-all uppercase"
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
                  Memverifikasi...
                </span>
              ) : (
                'Verifikasi Kode'
              )}
            </Button>
          </form>

          {/* Info Box */}
          <div className="p-4 bg-[#84F7F0]/5 border border-[#84F7F0]/20 rounded-lg space-y-3">
            <p className="text-xs font-semibold text-[#84F7F0]">
              Cara mendapatkan kode aktivasi:
            </p>
            <ul className="text-xs text-white/60 space-y-1 list-disc list-inside">
              <li>Hubungi tim STRADE melalui email</li>
              <li>Ikuti program referral member aktif</li>
              <li>Dapatkan dari event atau promosi khusus</li>
            </ul>
          </div>

          {/* Demo Codes Info */}
          <div className="p-4 bg-[#84F7F0]/5 border border-[#84F7F0]/20 rounded-lg">
            <p className="text-xs text-white/50 text-center mb-2">Demo Activation Codes:</p>
            <div className="text-xs text-white/60 space-y-1">
              <p>• STRADE-2025-ALPHA</p>
              <p>• STRADE-2025-BETA</p>
              <p>• STRADE-VIP-001</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
