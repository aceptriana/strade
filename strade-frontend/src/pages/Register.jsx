import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Phone, ArrowLeft, UserPlus } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

export default function Register({ onNavigate, onRegisterSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const activationCode = localStorage.getItem('activationCode');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Store user data (in real app, this would be in backend)
      const userData = {
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        activationCode: activationCode,
        registeredAt: new Date().toISOString()
      };

      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('authToken', 'dummy-token-' + formData.username);
      localStorage.setItem('username', formData.username);
      
      // Clear activation code after use
      localStorage.removeItem('activationCode');
      
      setLoading(false);
      onRegisterSuccess();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-b from-black via-[#041C1A] to-[#0a1f1d]">
      <Card className="w-full max-w-md border-[#84F7F0]/20 backdrop-blur-md">
        <div className="p-8 space-y-6">
          {/* Back Button */}
          <button
            onClick={() => onNavigate('activation')}
            className="flex items-center gap-2 text-white/60 hover:text-[#84F7F0] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Kembali</span>
          </button>

          {/* Logo & Title */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-white">Daftar Akun Baru</h1>
            <p className="text-white/60 text-sm">
              Lengkapi data Anda untuk membuat akun
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#84F7F0]/10 border border-[#84F7F0]/30 rounded-full">
              <span className="text-xs text-[#84F7F0] font-semibold">
                Kode: {activationCode}
              </span>
            </div>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">
                Nama Lengkap
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#84F7F0]/60" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap"
                  required
                  className="w-full rounded-lg border border-[#84F7F0]/40 bg-[#041C1A] pl-10 pr-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#84F7F0]/50 transition-all"
                />
              </div>
            </div>

            {/* Username */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#84F7F0]/60" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Pilih username unik"
                  required
                  className="w-full rounded-lg border border-[#84F7F0]/40 bg-[#041C1A] pl-10 pr-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#84F7F0]/50 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#84F7F0]/60" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@example.com"
                  required
                  className="w-full rounded-lg border border-[#84F7F0]/40 bg-[#041C1A] pl-10 pr-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#84F7F0]/50 transition-all"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">
                Nomor Telepon
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#84F7F0]/60" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="08123456789"
                  required
                  className="w-full rounded-lg border border-[#84F7F0]/40 bg-[#041C1A] pl-10 pr-4 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#84F7F0]/50 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#84F7F0]/60" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimal 6 karakter"
                  required
                  className="w-full rounded-lg border border-[#84F7F0]/40 bg-[#041C1A] pl-10 pr-12 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#84F7F0]/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#84F7F0]/60 hover:text-[#84F7F0] transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">
                Konfirmasi Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#84F7F0]/60" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Ulangi password"
                  required
                  className="w-full rounded-lg border border-[#84F7F0]/40 bg-[#041C1A] pl-10 pr-12 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#84F7F0]/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#84F7F0]/60 hover:text-[#84F7F0] transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
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
                  Mendaftar...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Daftar Sekarang
                </span>
              )}
            </Button>
          </form>

          {/* Terms */}
          <p className="text-xs text-white/50 text-center">
            Dengan mendaftar, Anda menyetujui{' '}
            <span className="text-[#84F7F0]">Syarat & Ketentuan</span> serta{' '}
            <span className="text-[#84F7F0]">Kebijakan Privasi</span> STRADE
          </p>
        </div>
      </Card>
    </div>
  );
}
