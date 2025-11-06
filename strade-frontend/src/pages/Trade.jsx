import React, { useMemo, useState } from 'react';
import { TrendingUp, Zap, BarChart3, DollarSign, Edit3, Trash2, PlusCircle } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';
import PageLayout from '../components/PageLayout';

export default function Trade({ onNavigate, onBack }) {
  const [tokens, setTokens] = useState([
    { id: 'btc-usdt', name: 'BTC/USDT', price: 43250.21, profit: 2.4, floating: 612.44 },
    { id: 'eth-usdt', name: 'ETH/USDT', price: 2650.11, profit: 1.8, floating: 142.32 },
    { id: 'bnb-usdt', name: 'BNB/USDT', price: 315.4, profit: -0.5, floating: -24.5 },
    { id: 'sol-usdt', name: 'SOL/USDT', price: 98.14, profit: 5.2, floating: 58.92 }
  ]);
  const [selectedTokenId, setSelectedTokenId] = useState('btc-usdt');
  const [tradeAmount, setTradeAmount] = useState('');
  const [formState, setFormState] = useState({ name: '', price: '', profit: '', floating: '' });
  const [editingId, setEditingId] = useState(null);

  const selectedToken = useMemo(
    () => tokens.find((token) => token.id === selectedTokenId) || tokens[0],
    [selectedTokenId, tokens]
  );

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(value || 0));

  const formatPercent = (value) => {
    const numeric = Number(value || 0);
    const prefix = numeric > 0 ? '+' : numeric < 0 ? '' : ''; // ensure + for positives
    return `${prefix}${numeric.toFixed(2)}%`;
  };

  const handleSelectToken = (tokenId) => {
    setSelectedTokenId(tokenId);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormState({ name: '', price: '', profit: '', floating: '' });
    setEditingId(null);
  };

  const handleEditToken = (token) => {
    setEditingId(token.id);
    setFormState({
      name: token.name,
      price: token.price.toString(),
      profit: token.profit.toString(),
      floating: token.floating.toString()
    });
  };

  const handleDeleteToken = (tokenId) => {
    setTokens((prev) => {
      const filtered = prev.filter((token) => token.id !== tokenId);
      if (selectedTokenId === tokenId) {
        setSelectedTokenId(filtered[0]?.id || '');
      }
      return filtered;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formState.name.trim()) {
      return;
    }

    const payload = {
      id: formState.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: formState.name.trim().toUpperCase(),
      price: Number(formState.price || 0),
      profit: Number(formState.profit || 0),
      floating: Number(formState.floating || 0)
    };

    setTokens((prev) => {
      if (editingId) {
        return prev.map((token) => (token.id === editingId ? { ...payload, id: editingId } : token));
      }
      return [...prev, payload];
    });

    if (!editingId) {
      setSelectedTokenId(payload.id);
    }

    resetForm();
  };

  return (
    <PageLayout
      title="Trade"
      subtitle="Kelola portofolio dan jalankan simulasi trading"
      onBack={onBack}
      actions={
        <Button size="sm" variant="secondary" onClick={() => onNavigate('bots')}>
          Kelola Bot
        </Button>
      }
    >
      {selectedToken && (
  <Card className="">
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:justify-between md:text-left">
            <div className="flex flex-1 flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/60 text-2xl">
                  {selectedToken.name.split('/')[0][0]}
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-white md:text-3xl">{selectedToken.name}</h2>
                  <p className="text-sm text-white/60 md:text-base">Spot market · USDT pair</p>
                </div>
              </div>
              <div className="flex flex-wrap items-baseline gap-4">
                <span className="text-3xl font-semibold text-white md:text-4xl">{formatCurrency(selectedToken.price)}</span>
                <span
                    className={`text-lg font-bold ${selectedToken.profit >= 0 ? 'text-[#00E676]' : 'text-[#FF5252]'}`}
                >
                  {formatPercent(selectedToken.profit)}
                </span>
                <span className="text-sm text-white/60 md:text-base">
                  Floating PnL: <strong>{formatCurrency(selectedToken.floating)}</strong>
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button size="sm" variant="outline" className="px-4">
                <BarChart3 className="mr-2 h-4 w-4" />
                Chart
              </Button>
              <Button size="sm" variant="outline" className="px-4">
                <TrendingUp className="mr-2 h-4 w-4" />
                Analysis
              </Button>
            </div>
          </div>
        </Card>
      )}

  <Card className="">
        <SectionTitle
          title="Trading Pairs"
          subtitle="Pilih aset untuk simulasi trading"
          align="left"
          className="mb-6"
        />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {tokens.map((token) => (
            <button
              key={token.id}
              onClick={() => handleSelectToken(token.id)}
              className={`rounded-xl border px-4 py-4 text-left transition-colors ${
                selectedTokenId === token.id
                  ? 'border-84F7F0 bg-84F7F0/20 text-white'
                  : 'border-white/10 bg-slate-800/40 text-white/80 hover:bg-slate-800/60'
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xl font-semibold">{token.name.split('/')[0]}</span>
                <span
              className={`text-xs font-bold ${token.profit >= 0 ? 'text-[#00E676]' : 'text-[#FF5252]'}`}
                >
                  {formatPercent(token.profit)}
                </span>
              </div>
              <p className="text-sm font-medium text-white/70">/{token.name.split('/')[1]}</p>
              <p className="text-sm text-white/50">{formatCurrency(token.price)}</p>
            </button>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
  <Card className="space-y-6">
          <SectionTitle
            title="Quick Trade"
            subtitle="Eksekusi market order demo"
            align="left"
            className="mb-0"
          />
          <div>
            <label className="mb-2 block text-sm font-medium text-white/70">Amount (USDT)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="number"
                min="0"
                value={tradeAmount}
                onChange={(event) => setTradeAmount(event.target.value)}
                className="w-full rounded-xl border border-white/15 bg-slate-800/60 py-3 pl-9 pr-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
                placeholder="0.00"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button className="bg-000000 text-white hover:bg-000000">Buy</Button>
            <Button className="bg-red-600 text-white hover:bg-red-700">Sell</Button>
          </div>
          <p className="text-xs text-white/50">
            Order ini bersifat demo dan tidak akan dikirimkan ke bursa. Gunakan untuk mempresentasikan alur transaksi.
          </p>
        </Card>

  <Card className="space-y-6">
          <SectionTitle
            title="Manajemen Pasangan"
            subtitle="Tambah, ubah, atau hapus token untuk presentasi demo"
            align="left"
            className="mb-0"
          />
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/70">Token Pair</label>
                <input
                  name="name"
                  value={formState.name}
                  onChange={handleFormChange}
                  placeholder="e.g. BTC/USDT"
                  className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/70">Last Price (USD)</label>
                <input
                  type="number"
                  step="0.01"
                  name="price"
                  value={formState.price}
                  onChange={handleFormChange}
                  placeholder="43250.00"
                  className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/70">24h %</label>
                <input
                  type="number"
                  step="0.01"
                  name="profit"
                  value={formState.profit}
                  onChange={handleFormChange}
                  placeholder="2.40"
                  className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/70">Floating PnL (USD)</label>
                <input
                  type="number"
                  step="0.01"
                  name="floating"
                  value={formState.floating}
                  onChange={handleFormChange}
                  placeholder="125.12"
                  className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit">
                {editingId ? 'Update Token' : 'Add Token'}
              </Button>
              {editingId && (
                <Button type="button" variant="secondary" onClick={resetForm}>
                  Batalkan Edit
                </Button>
              )}
            </div>
          </form>

          <div className="space-y-3">
            {tokens.length === 0 ? (
              <p className="text-sm text-white/60">Belum ada pasangan yang ditambahkan.</p>
            ) : (
              tokens.map((token) => (
                <div
                  key={token.id}
                  className="flex flex-col gap-3 rounded-xl border border-white/10 bg-slate-800/40 px-4 py-4 text-sm text-white/80 md:flex-row md:items-center md:justify-between"
                >
                  <div className="space-y-1 md:space-y-0">
                    <p className="font-semibold text-white">{token.name}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-white/60 md:text-sm">
                      <span>Price: {formatCurrency(token.price)}</span>
                      <span>
                  24h: <strong className={token.profit >= 0 ? 'text-[#00E676]' : 'text-[#FF5252]'}>{formatPercent(token.profit)}</strong>
                      </span>
                      <span>Floating: {formatCurrency(token.floating)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="secondary" onClick={() => handleEditToken(token)}>
                      <Edit3 className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDeleteToken(token.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>

  <Card className="">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-84F7F0/30 bg-84F7F0/20">
              <Zap className="h-5 w-5 text-84F7F0" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Auto Trading</h3>
              <p className="text-sm text-white/60">Konfigurasikan strategi bot Anda sebelum presentasi.</p>
            </div>
          </div>
          <Button size="sm" onClick={() => onNavigate('bots')}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Strategi Baru
          </Button>
        </div>
      </Card>
    </PageLayout>
  );
}
