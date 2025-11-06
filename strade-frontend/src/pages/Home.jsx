import React from 'react';
import { ArrowRight, TrendingUp, Zap, Award, Clock } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import PageLayout from '../components/PageLayout';
import StatBox from '../components/StatBox';

export default function Home({ onNavigate, onBack }) {
  const stats = [
    { label: 'Active Bots', value: '0', icon: <Zap className="w-5 h-5" />, color: 'from-84F7F0 to-000000' },
    { label: 'Total Profit', value: '$0', icon: <TrendingUp className="w-5 h-5" />, color: 'from-purple-500 to-pink-500' },
    { label: 'Win Rate', value: '0%', icon: <Award className="w-5 h-5" />, color: 'from-blue-500 to-cyan-500' },
    { label: 'Uptime', value: '0h', icon: <Clock className="w-5 h-5" />, color: 'from-orange-500 to-red-500' },
  ];

  const recentBots = [
    { name: 'BTC Trading Bot', status: 'inactive', profit: '+0%' },
    { name: 'ETH Swing Bot', status: 'inactive', profit: '+0%' },
    { name: 'ALT Runner', status: 'inactive', profit: '+0%' },
  ];

  return (
    <PageLayout
      title="BIDBOX"
      subtitle="Minimal control center untuk automasi trading kamu"
      onBack={onBack}
    >
  <Card className="">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3 text-left">
            <p className="text-sm uppercase tracking-[0.2em] text-white/50">Trading Ops</p>
            <h2 className="text-2xl font-semibold text-white md:text-3xl">Semua bot dalam satu kontrol terpusat</h2>
            <p className="max-w-xl text-sm text-white/60 md:text-base">
              Pantau performa, kelola strategi, dan ambil aksi tanpa panel yang berat.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" onClick={() => onNavigate('trade')}>
              Buka Trading Panel
            </Button>
            <Button variant="secondary" size="lg" onClick={() => onNavigate('bots')}>
              Kelola Bot
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {stats.map((stat, idx) => (
          <StatBox
            key={idx}
            title={stat.label}
            value={stat.value}
            change="+0%"
            changeType="neutral"
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
  <Card className="">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-base font-semibold text-white md:text-lg">Bot Terakhir</h3>
            <Button size="sm" variant="secondary" onClick={() => onNavigate('bots')}>
              Lihat Semua
            </Button>
          </div>
          <div className="space-y-3">
            {recentBots.map((bot, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-white md:text-base">{bot.name}</p>
                  <p className="text-xs text-white/50">Profit {bot.profit}</p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium uppercase ${
                    bot.status === 'active'
                      ? 'bg-000000/15 text-84F7F0'
                      : 'bg-white/10 text-white/60'
                  }`}
                >
                  {bot.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

  <Card className="">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-base font-semibold text-white md:text-lg">Quick Actions</h3>
            <ArrowRight className="h-5 w-5 text-84F7F0" />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              onClick={() => onNavigate('api-config')}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white/70 hover:border-84F7F0/40 hover:text-white"
            >
              Kelola API Key
            </button>
            <button
              onClick={() => onNavigate('profile')}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white/70 hover:border-84F7F0/40 hover:text-white"
            >
              Update Profil & KYC
            </button>
            <button
              onClick={() => onNavigate('cashback')}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white/70 hover:border-84F7F0/40 hover:text-white"
            >
              Buat Campaign Cashback
            </button>
            <button
              onClick={() => onNavigate('saving')}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-sm text-white/70 hover:border-84F7F0/40 hover:text-white"
            >
              Kelola Saving Plan
            </button>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
}
