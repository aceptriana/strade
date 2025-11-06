import React from 'react';
import { Activity, BarChart3, CreditCard, HelpCircle, Settings, TrendingUp, Zap } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import StatBox from '../components/StatBox';
import SectionTitle from '../components/SectionTitle';
import PageLayout from '../components/PageLayout';
import Logo from '../components/Logo';

const stats = [
  {
    title: 'Balance',
    value: '$0.00',
    change: '+0%',
    changeType: 'neutral',
    icon: <CreditCard className="h-5 w-5" />,
    color: 'from-84F7F0 to-000000'
  },
  {
    title: 'Active Bots',
    value: '0',
    change: '+0',
    changeType: 'neutral',
    icon: <Activity className="h-5 w-5" />,
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: 'PnL 24h',
    value: '$0',
    change: '+0%',
    changeType: 'neutral',
    icon: <TrendingUp className="h-5 w-5" />,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    title: 'Connected',
    value: '0/3',
    change: 'APIs',
    changeType: 'neutral',
    icon: <Zap className="h-5 w-5" />,
    color: 'from-orange-500 to-red-500'
  }
];

const curatedBots = [
  { id: 'btc-scalper', name: 'BTC Scalper', exchange: 'Binance', status: 'Ready', performance: '+2.1%' },
  { id: 'eth-swing', name: 'ETH Swing', exchange: 'Tokocrypto', status: 'Maintenance', performance: '-' },
  { id: 'bnb-grid', name: 'BNB Grid', exchange: 'Bybit', status: 'Ready', performance: '+0.8%' }
];

const quickShortcuts = [
  { id: 'trade', label: 'Trading', icon: <BarChart3 className="h-4 w-4" /> },
  { id: 'bots', label: 'Bots', icon: <Settings className="h-4 w-4" /> },
  { id: 'api-config', label: 'API Keys', icon: <Zap className="h-4 w-4" /> },
  { id: 'faq', label: 'Help', icon: <HelpCircle className="h-4 w-4" /> }
];

const addOnFeatures = [
  { id: 'saving', title: 'Savings', blurb: 'Earn daily interest on stablecoins' },
  { id: 'cashback', title: 'Cashback', blurb: 'Manage fee rebates & referrals' },
  { id: 'credit', title: 'Credits', blurb: 'Top up and track usage' },
  { id: 'profit', title: 'Analytics', blurb: 'Charts and trading reports' }
];

const profileSummary = {
  name: 'Alya Prananda',
  role: 'Pro Trader',
  avatar: 'https://i.pravatar.cc/100?img=32'
};

export default function Dashboard({ onNavigate }) {
  return (
    <PageLayout
      title="Dashboard"
      subtitle="Monitor and control your trading bots"
      actions={
        <button
          onClick={() => onNavigate('profile')}
          className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 pr-4 text-left text-sm hover:border-84F7F0/40"
        >
          <img
            src={profileSummary.avatar}
            alt={profileSummary.name}
            className="h-12 w-12 rounded-xl object-cover"
          />
          <div className="hidden md:flex flex-col">
            <span className="text-sm font-semibold text-white">{profileSummary.name}</span>
            <span className="text-xs text-white/50">{profileSummary.role}</span>
          </div>
        </button>
      }
      maxWidth="max-w-7xl"
      contentClassName="space-y-10"
    >
      {/* Balance Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-gradient-to-br from-000000 to-000000 p-8">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-white/80">Total Balance</p>
              <p className="mt-3 text-4xl font-bold text-white">$10,208.73</p>
              <p className="mt-4 text-xs text-white/70">Card Holder</p>
              <p className="text-sm font-medium text-white">Esther Howard</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <CreditCard className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-white/20 pt-4">
            <span className="text-xs text-white/70">Valid Thru</span>
            <span className="text-sm font-medium text-white">08/2023</span>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-000000 to-000000 p-8">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-white/80">Trading Balance</p>
              <p className="mt-3 text-4xl font-bold text-white">$15,223.21</p>
              <p className="mt-4 text-xs text-white/70">Card Holder</p>
              <p className="text-sm font-medium text-white">Stuart Alan</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Activity className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-white/20 pt-4">
            <span className="text-xs text-white/70">Valid Thru</span>
            <span className="text-sm font-medium text-white">03/2023</span>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-600 to-pink-600 p-8">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-white/80">Savings</p>
              <p className="mt-3 text-4xl font-bold text-white">$22,321.73</p>
              <p className="mt-4 text-xs text-white/70">Card Holder</p>
              <p className="text-sm font-medium text-white">Steven Howard</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-white/20 pt-4">
            <span className="text-xs text-white/70">Valid Thru</span>
            <span className="text-sm font-medium text-white">10/2023</span>
          </div>
        </Card>
      </div>

      {/* Market Preview Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  <Card className="">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10">
              <div className="text-2xl">₿</div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">BTC-USD</p>
              <p className="text-xs text-white/50">Bitcoin USD</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
              <span className="rounded-full bg-[#00E676]/10 px-3 py-1 text-xs font-bold text-[#00E676]">
              +1256.25%
            </span>
          </div>
          <p className="mt-3 text-2xl font-bold text-white">$12,208.73</p>
        </Card>

  <Card className="">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-84F7F0/10">
              <div className="text-2xl">B</div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">BNB-USD</p>
              <p className="text-xs text-white/50">Binance USD</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
              <span className="rounded-full bg-[#00E676]/10 px-3 py-1 text-xs font-bold text-[#00E676]">
              +453.25%
            </span>
          </div>
          <p className="mt-3 text-2xl font-bold text-white">$34,212.73</p>
        </Card>

  <Card className="">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10">
              <div className="text-2xl">Ξ</div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">ETH-USD</p>
              <p className="text-xs text-white/50">Ethereum USD</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
              <span className="rounded-full bg-[#FF5252]/10 px-3 py-1 text-xs font-bold text-[#FF5252]">
              -765.25%
            </span>
          </div>
          <p className="mt-3 text-2xl font-bold text-white">$22,143.71</p>
        </Card>

  <Card className="">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-500/10">
              <div className="text-2xl">X</div>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">XMR-USD</p>
              <p className="text-xs text-white/50">Monero USD</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
              <span className="rounded-full bg-[#00E676]/10 px-3 py-1 text-xs font-bold text-[#00E676]">
              +223.25%
            </span>
          </div>
          <p className="mt-3 text-2xl font-bold text-white">$21,212.73</p>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
  <Card className="">
          <SectionTitle title="Quick Actions" align="left" className="mb-6" />
          <div className="space-y-3">
            {quickShortcuts.map((shortcut) => (
              <button
                key={shortcut.id}
                onClick={() => onNavigate(shortcut.id)}
                className="flex w-full items-center gap-4 rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-left text-sm text-white/70 transition-colors hover:border-84F7F0/40 hover:text-white"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900/60 text-84F7F0">
                  {shortcut.icon}
                </span>
                <span className="font-medium">{shortcut.label}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2 p-8">
          <SectionTitle title="Available Bots" subtitle="Pre-configured strategies" align="left" className="mb-6" />
          <div className="space-y-4">
            {curatedBots.map((bot) => (
              <div
                key={bot.id}
                className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-base font-semibold text-white">{bot.name}</p>
                  <p className="text-xs text-white/50">{bot.exchange}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-84F7F0/15 px-3 py-1 text-xs font-medium text-84F7F0">
                    {bot.status}
                  </span>
                  <span className="text-sm text-white/60">{bot.performance}</span>
                  <Button size="sm" variant="secondary" onClick={() => onNavigate('bots')}>
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Additional spacing before CTA */}
      <div className="py-8"></div>

      {/* CTA */}
  <Card className="text-center">
        <h3 className="text-2xl font-semibold text-white">Ready to Start?</h3>
        <p className="mt-2 text-base text-white/60">Connect API → Activate bot → View trades</p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Button onClick={() => onNavigate('api-config')}>Connect API</Button>
          <Button variant="secondary" onClick={() => onNavigate('trade')}>
            Start Trading
          </Button>
        </div>
      </Card>
    </PageLayout>
  );
}
