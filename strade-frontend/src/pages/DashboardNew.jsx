import React, { useState, useEffect } from 'react';
import { TrendingUp, Activity, CreditCard, Zap, Settings, HelpCircle, BarChart3, Send, Key, Cpu, FileText } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import mockApi from '../services/mockApi';

export default function Dashboard({ onNavigate }) {
  const [balances, setBalances] = useState(null);
  const [markets, setMarkets] = useState([]);
  const [bots, setBots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [balanceRes, marketsRes, botsRes] = await Promise.all([
          mockApi.getBalances(),
          mockApi.getMarkets(),
          mockApi.getBots(),
        ]);
        
        setBalances(balanceRes.data);
        setMarkets(marketsRes.data);
        setBots(botsRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  // Safe derived values to avoid runtime errors when mock data is missing
  const cards = balances?.cards ?? [];
  const total = balances && (typeof balances.total !== 'undefined' ? balances.total : cards.reduce((s, c) => s + (c.balance || 0), 0));
  const available = typeof balances?.available !== 'undefined' ? balances.available : 0;
  const invested = typeof balances?.invested !== 'undefined' ? balances.invested : 0;
  const marketsList = markets ?? [];
  const botsList = bots ?? [];

  if (loading) {
    return (
      <PageLayout title="Dashboard" subtitle="Loading your trading data...">
        <div className="flex items-center justify-center py-20">
          <div
            className="h-12 w-12 rounded-full border-4 border-84F7F0 border-t-transparent animate-spin"
          />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      maxWidth="max-w-7xl"
    >
      <div
        className="space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-14"
      >
        {/* Hero / Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start">
          <Card className="lg:col-span-2 bg-gradient-to-br from-[#0a1f1d]/80 via-[#041C1A]/60 to-black/80 border-2 border-[#84F7F0]/40 glow-primary backdrop-blur-sm">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6">
              <div className="min-w-0">
                <p className="text-xs text-[#84F7F0] uppercase tracking-wide font-semibold">Total Balance</p>
                <div className="mt-2 flex items-baseline gap-3">
                  <h2 className="text-3xl md:text-4xl font-bold text-white truncate">${total.toLocaleString()}</h2>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#84F7F0]/20 text-[#84F7F0] border border-[#84F7F0]/50">+4.2% 24h</span>
                </div>
                <p className="mt-4 text-sm text-white/80">
                  Available: <span className="font-semibold text-[#84F7F0]">${available.toLocaleString()}</span> 
                  <span className="mx-2 text-white/40">•</span> 
                  Invested: <span className="font-semibold text-[#84F7F0]">${invested.toLocaleString()}</span>
                </p>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <Button onClick={() => onNavigate('recharge')} className="rounded-full shadow-lg" aria-label="Top up">Top Up</Button>
                <Button variant="secondary" onClick={() => onNavigate('trade')} className="rounded-full shadow-lg" aria-label="Go to trade">Trade</Button>
              </div>
            </div>
          </Card>

          {/* Small KPI cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
            {cards.slice(0,3).map((c, i) => (
              <Card key={c.id} className="bg-gradient-to-br from-[#0a1f1d]/60 via-[#041C1A]/40 to-black/60 border border-[#84F7F0]/30 hover:border-[#84F7F0]/60 transition-all">
                <div className="flex items-start justify-between">
                  <div className="min-w-0">
                    <p className="text-xs text-[#84F7F0] uppercase font-semibold truncate">{c.type}</p>
                    <p className="mt-2 text-xl font-bold text-white">${c.balance.toLocaleString()}</p>
                    <p className="mt-1 text-xs text-white/60">{c.holder}</p>
                  </div>
                  <div className="flex-shrink-0 flex items-center justify-center rounded-lg bg-[#84F7F0]/20 h-10 w-10 border border-[#84F7F0]/40">
                    {i===0 && <CreditCard className="h-5 w-5 text-[#84F7F0]"/>}
                    {i===1 && <Activity className="h-5 w-5 text-[#84F7F0]"/>}
                    {i===2 && <TrendingUp className="h-5 w-5 text-[#84F7F0]"/>}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional spacing before Quick Actions */}
        <div className="py-6"></div>

        {/* Quick Actions - Individual Cards */}
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* New Order */}
            <button
              onClick={() => onNavigate('trade')}
              className="group transform transition-transform hover:scale-105 active:scale-95"
            >
              <Card className="h-full flex flex-col items-center justify-center text-center cursor-pointer border border-[#84F7F0]/30 hover:border-[#84F7F0]/60 hover:shadow-lg hover:shadow-[#84F7F0]/20 transition-all bg-gradient-to-br from-[#0a1f1d]/60 to-black/80 backdrop-blur-sm">
                <div className="flex items-center justify-center rounded-full bg-[#84F7F0]/20 h-14 w-14 mb-3 group-hover:bg-[#84F7F0]/30 transition-all border border-[#84F7F0]/50">
                  <Send className="h-6 w-6 text-[#84F7F0]" />
                </div>
                <h4 className="text-sm font-bold text-white">New Order</h4>
                <p className="text-xs text-[#84F7F0]/70 mt-1">Start trading</p>
              </Card>
            </button>

            {/* API Keys */}
            <button
              onClick={() => onNavigate('api-config')}
              className="group transform transition-transform hover:scale-105 active:scale-95"
            >
              <Card className="h-full flex flex-col items-center justify-center text-center cursor-pointer border border-[#84F7F0]/30 hover:border-[#84F7F0]/60 hover:shadow-lg hover:shadow-[#84F7F0]/20 transition-all bg-gradient-to-br from-[#0a1f1d]/60 to-black/80 backdrop-blur-sm">
                <div className="flex items-center justify-center rounded-full bg-[#84F7F0]/20 h-14 w-14 mb-3 group-hover:bg-[#84F7F0]/30 transition-all border border-[#84F7F0]/50">
                  <Key className="h-6 w-6 text-[#84F7F0]" />
                </div>
                <h4 className="text-sm font-bold text-white">API Keys</h4>
                <p className="text-xs text-[#84F7F0]/70 mt-1">Configure</p>
              </Card>
            </button>

            {/* Manage Bots */}
            <button
              onClick={() => onNavigate('bots')}
              className="group transform transition-transform hover:scale-105 active:scale-95"
            >
              <Card className="h-full flex flex-col items-center justify-center text-center cursor-pointer border border-[#84F7F0]/30 hover:border-[#84F7F0]/60 hover:shadow-lg hover:shadow-[#84F7F0]/20 transition-all bg-gradient-to-br from-[#0a1f1d]/60 to-black/80 backdrop-blur-sm">
                <div className="flex items-center justify-center rounded-full bg-[#84F7F0]/20 h-14 w-14 mb-3 group-hover:bg-[#84F7F0]/30 transition-all border border-[#84F7F0]/50">
                  <Cpu className="h-6 w-6 text-[#84F7F0]" />
                </div>
                <h4 className="text-sm font-bold text-white">Manage Bots</h4>
                <p className="text-xs text-[#84F7F0]/70 mt-1">Control</p>
              </Card>
            </button>

            {/* Reports */}
            <button
              onClick={() => onNavigate('profit')}
              className="group transform transition-transform hover:scale-105 active:scale-95"
            >
              <Card className="h-full flex flex-col items-center justify-center text-center cursor-pointer border border-[#84F7F0]/30 hover:border-[#84F7F0]/60 hover:shadow-lg hover:shadow-[#84F7F0]/20 transition-all bg-gradient-to-br from-[#0a1f1d]/60 to-black/80 backdrop-blur-sm">
                <div className="flex items-center justify-center rounded-full bg-[#84F7F0]/20 h-14 w-14 mb-3 group-hover:bg-[#84F7F0]/30 transition-all border border-[#84F7F0]/50">
                  <FileText className="h-6 w-6 text-[#84F7F0]" />
                </div>
                <h4 className="text-sm font-bold text-white">Reports</h4>
                <p className="text-xs text-[#84F7F0]/70 mt-1">Analytics</p>
              </Card>
            </button>
          </div>
        </div>

        {/* Additional spacing after Savings section */}
        <div className="py-6"></div>
      </div>
    </PageLayout>
  );
}
