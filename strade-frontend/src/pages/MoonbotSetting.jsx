import React, { useMemo, useState } from 'react';
import { Activity, Monitor, Power, Radio, ShieldCheck } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';
import PageLayout from '../components/PageLayout';

const curatedBots = [
  {
    id: 'btc-scalper',
    name: 'BTC Scalper',
    exchange: 'Binance Spot',
    objective: 'Scalping volatilitas tinggi',
    risk: 'Menengah',
    status: 'Standby',
    lastSignal: '06 Nov 2025 08:00'
  },
  {
    id: 'eth-swing',
    name: 'ETH Swing Momentum',
    exchange: 'Tokocrypto',
    objective: 'Swing 4H pada L1',
    risk: 'Konservatif',
    status: 'Standby',
    lastSignal: '05 Nov 2025 21:45'
  },
  {
    id: 'bnb-grid',
    name: 'BNB Grid Income',
    exchange: 'Binance Futures',
    objective: 'Grid otomatis range harian',
    risk: 'Agresif',
    status: 'Standby',
    lastSignal: '01 Nov 2025 10:12'
  }
];

const exchangeCatalog = [
  { id: 'binance', name: 'Binance', type: 'Global', connected: false },
  { id: 'tokocrypto', name: 'Tokocrypto', type: 'Indonesia', connected: false },
  { id: 'bybit', name: 'Bybit', type: 'Derivatives', connected: false }
];

export default function MoonbotSetting({ onBack, onNavigate }) {
  const [botList, setBotList] = useState(curatedBots);
  const [apiConnections, setApiConnections] = useState(exchangeCatalog);

  const activeCount = useMemo(
    () => botList.filter((bot) => bot.status === 'Aktif').length,
    [botList]
  );

  const toggleBotStatus = (botId) => {
    setBotList((prev) =>
      prev.map((bot) =>
        bot.id === botId
          ? {
              ...bot,
              status: bot.status === 'Aktif' ? 'Standby' : 'Aktif'
            }
          : bot
      )
    );
  };

  const toggleConnection = (exchangeId) => {
    setApiConnections((prev) =>
      prev.map((exchange) =>
        exchange.id === exchangeId
          ? { ...exchange, connected: !exchange.connected }
          : exchange
      )
    );
  };

  return (
    <PageLayout
      title="Bot Library"
      subtitle="Semua strategi dikurasi admin. Pengguna cukup mengaktifkan dan hubungkan API"
      onBack={onBack}
      actions={
        <Button size="sm" variant="secondary" onClick={() => onNavigate?.('api-config')}>
          Kelola API
        </Button>
      }
      maxWidth="max-w-6xl"
      contentClassName="space-y-8"
    >
  <Card className="">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">Bot Aktif</p>
            <p className="mt-2 text-2xl font-semibold text-white">{activeCount}</p>
            <p className="text-xs text-white/50">Aktifkan hanya bot yang sesuai API aktif</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">Strategi Siap Pakai</p>
            <p className="mt-2 text-2xl font-semibold text-white">{botList.length}</p>
            <p className="text-xs text-white/50">Dikurasi dan dikelola tim BIDBOX</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">Integrasi API</p>
            <p className="mt-2 text-2xl font-semibold text-white">{apiConnections.filter((item) => item.connected).length}/{apiConnections.length}</p>
            <p className="text-xs text-white/50">Hubungkan exchange pilihan Anda</p>
          </div>
        </div>
      </Card>

  <Card className="space-y-6">
        <SectionTitle
          title="Daftar Bot"
          subtitle="Hanya admin yang dapat mengubah parameter, pengguna cukup mengaktifkan"
          align="left"
          className="mb-0"
        />
        <div className="space-y-3">
          {botList.map((bot) => (
            <div
              key={bot.id}
              className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/80 md:flex-row md:items-center md:justify-between"
            >
              <div className="space-y-1">
                <p className="text-base font-semibold text-white">{bot.name}</p>
                <div className="flex flex-wrap gap-4 text-xs text-white/50 md:text-sm">
                  <span>{bot.exchange}</span>
                  <span>Tujuan: {bot.objective}</span>
                  <span>Profil Risiko: {bot.risk}</span>
                  <span>Signal Terakhir: {bot.lastSignal}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    bot.status === 'Aktif'
                      ? 'bg-000000/20 text-84F7F0'
                      : 'bg-slate-800/60 text-white/50'
                  }`}
                >
                  {bot.status}
                </span>
                <Button size="sm" variant="secondary" onClick={() => toggleBotStatus(bot.id)}>
                  {bot.status === 'Aktif' ? 'Standby' : 'Aktifkan'}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
  <Card className="space-y-5">
          <SectionTitle
            title="Integrasi Exchange"
            subtitle="Toggle untuk simulasi koneksi API"
            align="left"
            className="mb-0"
          />
          <div className="space-y-3">
            {apiConnections.map((exchange) => (
              <div
                key={exchange.id}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-white md:text-base">{exchange.name}</p>
                  <p className="text-xs text-white/60 md:text-sm">{exchange.type}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium ${exchange.connected ? 'text-84F7F0' : 'text-white/50'}`}>
                    {exchange.connected ? 'Terhubung' : 'Belum tersambung'}
                  </span>
                  <Button size="sm" variant="secondary" onClick={() => toggleConnection(exchange.id)}>
                    {exchange.connected ? 'Putuskan' : 'Hubungkan' }
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <Button onClick={() => onNavigate?.('api-config')}>Kelola API Detail</Button>
        </Card>

  <Card className="space-y-5">
          <SectionTitle
            title="Checklist Aktivasi"
            subtitle="Langkah cepat sebelum demo atau go-live"
            align="left"
            className="mb-0"
          />
          <div className="space-y-3 text-sm text-white/70 md:text-base">
            {[ 
              'Hubungkan API exchange yang ingin digunakan.',
              'Aktifkan bot yang sesuai dengan strategi klien.',
              'Buka panel Trade untuk menampilkan posisi berjalan.'
            ].map((item, index) => (
              <div key={index} className="flex gap-3">
                <span className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-84F7F0/15 text-xs font-semibold text-84F7F0">{index + 1}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Button size="sm" onClick={() => onNavigate?.('trade')}>
              <Monitor className="mr-2 h-4 w-4" />
              Buka Trade
            </Button>
            <Button size="sm" variant="secondary" onClick={() => onNavigate?.('api-config')}>
              <Radio className="mr-2 h-4 w-4" />
              Sambungkan API
            </Button>
          </div>
        </Card>
      </div>

  <Card className="space-y-5">
        <SectionTitle
          title="Proteksi & Monitoring"
          subtitle="Semua bot dimonitor live 24/7 oleh tim BIDBOX"
          align="left"
          className="mb-0"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <ShieldCheck className="mb-3 h-5 w-5 text-84F7F0" />
            <p className="text-sm font-semibold text-white">Risk Guard</p>
            <p className="text-xs text-white/60">Stop-loss dan take-profit dikunci oleh admin.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <Activity className="mb-3 h-5 w-5 text-84F7F0" />
            <p className="text-sm font-semibold text-white">Live Monitor</p>
            <p className="text-xs text-white/60">Tim NOC memantau sinyal dan koneksi setiap menit.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <Power className="mb-3 h-5 w-5 text-84F7F0" />
            <p className="text-sm font-semibold text-white">One-click Control</p>
            <p className="text-xs text-white/60">Pengguna hanya menyalakan atau mematikan strategi.</p>
          </div>
        </div>
        <Button variant="secondary" className="w-full" onClick={() => onNavigate?.('dashboard')}>
          Kembali ke Dashboard
        </Button>
      </Card>
    </PageLayout>
  );
}
