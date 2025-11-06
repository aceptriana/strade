import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Search, Filter, RefreshCw } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import Button from '../components/Button';

const BINANCE_API = 'https://api.binance.com/api/v3/ticker/24hr';

export default function Trade({ onNavigate }) {
  const [markets, setMarkets] = useState([]);
  const [filteredMarkets, setFilteredMarkets] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, gainers, losers
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [orderType, setOrderType] = useState('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchMarkets = async () => {
    setLoading(true);
    try {
      const response = await fetch(BINANCE_API);
      const data = await response.json();
      
      // Filter only USDT pairs and add mock positions
      const usdtPairs = data
        .filter(item => item.symbol.endsWith('USDT'))
        .map(item => ({
          symbol: item.symbol,
          name: item.symbol.replace('USDT', ''),
          price: parseFloat(item.lastPrice),
          change24h: parseFloat(item.priceChangePercent),
          volume: parseFloat(item.volume),
          quoteVolume: parseFloat(item.quoteVolume),
          highPrice: parseFloat(item.highPrice),
          lowPrice: parseFloat(item.lowPrice),
          // Mock position data
          qty: Math.random() > 0.7 ? (Math.random() * 10).toFixed(4) : 0,
          avgPrice: parseFloat(item.lastPrice) * (0.95 + Math.random() * 0.1),
        }))
        .map(item => ({
          ...item,
          profit: item.qty > 0 ? ((item.price - item.avgPrice) * item.qty) : 0,
          profitPercent: item.qty > 0 ? (((item.price - item.avgPrice) / item.avgPrice) * 100) : 0,
        }))
        .sort((a, b) => b.quoteVolume - a.quoteVolume)
        .slice(0, 100); // Top 100 by volume

      setMarkets(usdtPairs);
      setFilteredMarkets(usdtPairs);
      setLastUpdate(new Date());
      
      if (!selectedMarket && usdtPairs.length > 0) {
        setSelectedMarket(usdtPairs[0]);
        setPrice(usdtPairs[0].price.toString());
      }
    } catch (error) {
      console.error('Error fetching markets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarkets();
    const interval = setInterval(fetchMarkets, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Search and filter
  useEffect(() => {
    let filtered = [...markets];

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(market =>
        market.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        market.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filter
    if (filterType === 'gainers') {
      filtered = filtered.filter(m => m.change24h > 0).sort((a, b) => b.change24h - a.change24h);
    } else if (filterType === 'losers') {
      filtered = filtered.filter(m => m.change24h < 0).sort((a, b) => a.change24h - b.change24h);
    } else if (filterType === 'positions') {
      filtered = filtered.filter(m => m.qty > 0);
    }

    setFilteredMarkets(filtered);
  }, [searchQuery, filterType, markets]);

  const handleTrade = async () => {
    if (!amount || !price || !selectedMarket) return;
    
    alert(`${orderType.toUpperCase()} ${amount} ${selectedMarket.name} @ $${price}\nTotal: $${(parseFloat(amount) * parseFloat(price)).toFixed(2)}\n\nDemo mode - No real trade executed`);
    setAmount('');
  };

  if (loading) {
    return (
      <PageLayout title="Trade" subtitle="Loading markets...">
        <div className="flex items-center justify-center py-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="h-12 w-12 rounded-full border-4 border-84F7F0 border-t-transparent"
          />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout
      title="Trading"
      subtitle={`Live market data from Binance • ${filteredMarkets.length} pairs`}
      maxWidth="max-w-7xl"
    >
      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 lg:grid-cols-3">
        {/* Market List */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-5">
          <Card padding="p-4 sm:p-5 md:p-6">
            {/* Header with Search & Filters */}
            <div className="mb-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-bold text-white">Markets</h3>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={fetchMarkets}
                  disabled={loading}
                  aria-label="Refresh markets"
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                </Button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search pairs (e.g. BTC, ETH)..."
                  className="w-full rounded-xl border border-white/10 bg-slate-800/60 py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/40 focus:border-84F7F0/50 focus:outline-none focus:ring-2 focus:ring-84F7F0/20"
                  aria-label="Search markets"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                <button
                  onClick={() => setFilterType('all')}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all whitespace-nowrap ${
                    filterType === 'all'
                      ? 'bg-84F7F0 text-black shadow'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterType('gainers')}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all whitespace-nowrap ${
                    filterType === 'gainers'
                      ? 'bg-[#00E676] text-black shadow'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  🚀 Gainers
                </button>
                <button
                  onClick={() => setFilterType('losers')}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all whitespace-nowrap ${
                    filterType === 'losers'
                      ? 'bg-[#FF1744] text-white shadow'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  📉 Losers
                </button>
                <button
                  onClick={() => setFilterType('positions')}
                  className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all whitespace-nowrap ${
                    filterType === 'positions'
                      ? 'bg-84F7F0 text-black shadow'
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  💼 Positions
                </button>
              </div>

              {lastUpdate && (
                <p className="text-xs text-white/40">
                  Last update: {lastUpdate.toLocaleTimeString()}
                </p>
              )}
            </div>

            {/* Market Table */}
            <div className="overflow-x-auto">
              <div className="min-w-[600px]">
                {/* Table Header */}
                <div className="mb-2 grid grid-cols-12 gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white/50">
                  <div className="col-span-3">Name / Qty</div>
                  <div className="col-span-3 text-right">Price / 24h Change</div>
                  <div className="col-span-3 text-right">Profit / Float</div>
                  <div className="col-span-3 text-right">Action</div>
                </div>

                {/* Table Body */}
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {loading ? (
                    <div className="flex items-center justify-center py-12">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="h-8 w-8 rounded-full border-4 border-84F7F0 border-t-transparent"
                      />
                    </div>
                  ) : filteredMarkets.length === 0 ? (
                    <div className="py-12 text-center">
                      <p className="text-white/40">No markets found</p>
                    </div>
                  ) : (
                    filteredMarkets.map((market) => (
                      <motion.div
                        key={market.symbol}
                        whileHover={{ scale: 1.01 }}
                        onClick={() => {
                          setSelectedMarket(market);
                          setPrice(market.price.toString());
                        }}
                        className={`grid grid-cols-12 gap-2 items-center rounded-xl border p-3 cursor-pointer transition-all ${
                          selectedMarket?.symbol === market.symbol
                            ? 'border-84F7F0/50 bg-84F7F0/10'
                            : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                        }`}
                      >
                        {/* Name / Qty */}
                        <div className="col-span-3">
                          <p className="font-bold text-white text-sm">{market.name}</p>
                          <p className="text-xs text-white/50">
                            {market.qty > 0 ? `Qty: ${parseFloat(market.qty).toFixed(4)}` : 'No position'}
                          </p>
                        </div>

                        {/* Price / 24h Change */}
                        <div className="col-span-3 text-right">
                          <p className="font-semibold text-white text-sm">
                            ${market.price >= 1 ? market.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : market.price.toFixed(6)}
                          </p>
                          <div className="flex items-center justify-end gap-1">
                            {market.change24h > 0 ? (
                      <ArrowUpRight className="h-3 w-3 text-[#00E676]" />
                            ) : (
                      <ArrowDownRight className="h-3 w-3 text-[#FF5252]" />
                            )}
                            <span
                              className={`text-xs font-semibold ${
                        market.change24h > 0 ? 'text-[#00E676]' : 'text-[#FF5252]'
                              }`}
                            >
                              {market.change24h > 0 ? '+' : ''}
                              {market.change24h.toFixed(2)}%
                            </span>
                          </div>
                        </div>

                        {/* Profit / Float */}
                        <div className="col-span-3 text-right">
                          {market.qty > 0 ? (
                            <>
                                <p className={`font-bold text-sm ${market.profit >= 0 ? 'text-[#00E676]' : 'text-[#FF5252]'}`}>
                                {market.profit >= 0 ? '+' : ''}${market.profit.toFixed(2)}
                              </p>
                                <p className={`text-xs ${market.profitPercent >= 0 ? 'text-[#00E676]/70' : 'text-[#FF5252]/70'}`}>
                                {market.profitPercent >= 0 ? '+' : ''}{market.profitPercent.toFixed(2)}%
                              </p>
                            </>
                          ) : (
                            <p className="text-xs text-white/40">—</p>
                          )}
                        </div>

                        {/* Action */}
                        <div className="col-span-3 text-right">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedMarket(market);
                              setPrice(market.price.toString());
                            }}
                          >
                            Trade
                          </Button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </Card>

        </div>

        {/* Trading Form */}
        <div className="space-y-4 sm:space-y-5">
          <Card padding="p-4 sm:p-5 md:p-6">
            <h3 className="mb-4 text-xl sm:text-2xl font-bold text-white">
              {selectedMarket ? selectedMarket.name : 'Select Market'}
            </h3>
            
            {selectedMarket && (
              <div className="mb-4 rounded-xl bg-slate-900/60 border border-white/10 p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white/60">Current Price</span>
                  <span className="text-lg font-bold text-white">
                    ${selectedMarket.price >= 1 ? selectedMarket.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : selectedMarket.price.toFixed(6)}
                  </span>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-sm text-white/60">24h Change</span>
                  <span className={`text-sm font-bold flex items-center gap-1 ${selectedMarket.change24h >= 0 ? 'text-[#00E676]' : 'text-[#FF5252]'}`}>
                    {selectedMarket.change24h >= 0 ? '↑' : '↓'}
                    {selectedMarket.change24h >= 0 ? '+' : ''}{selectedMarket.change24h.toFixed(2)}%
                  </span>
                </div>
              </div>
            )}
            
            {/* Order Type */}
            <div className="mb-4 flex gap-2">
              <button
                onClick={() => setOrderType('buy')}
                className={`flex-1 rounded-xl px-4 py-3 font-bold transition-all ${
                  orderType === 'buy'
                    ? 'bg-[#00C853] text-white shadow-lg'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 border border-[#00C853]/30'
                }`}
                style={orderType === 'buy' ? { boxShadow: '0 4px 15px rgba(0, 200, 83, 0.4)' } : {}}
                aria-label="Buy order"
              >
                BUY ↑
              </button>
              <button
                onClick={() => setOrderType('sell')}
                className={`flex-1 rounded-xl px-4 py-3 font-bold transition-all ${
                  orderType === 'sell'
                    ? 'bg-[#FF1744] text-white shadow-lg'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 border border-[#FF1744]/30'
                }`}
                style={orderType === 'sell' ? { boxShadow: '0 4px 15px rgba(255, 23, 68, 0.4)' } : {}}
                aria-label="Sell order"
              >
                SELL ↓
              </button>
            </div>

            {/* Price */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-white/80">
                Price (USDT)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-800/60 px-4 py-3 text-white placeholder-white/40 focus:border-84F7F0/50 focus:outline-none focus:ring-2 focus:ring-84F7F0/20"
                placeholder="0.00"
                aria-label="Order price"
              />
            </div>

            {/* Amount */}
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-white/80">
                Amount ({selectedMarket?.name || 'Asset'})
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-800/60 px-4 py-3 text-white placeholder-white/40 focus:border-84F7F0/50 focus:outline-none focus:ring-2 focus:ring-84F7F0/20"
                placeholder="0.00"
                aria-label="Order amount"
              />
            </div>

            {/* Total */}
            <div className="mb-6 rounded-xl bg-slate-900/60 border border-white/10 p-4">
              <div className="flex justify-between">
                <span className="text-sm text-white/60">Total (USDT)</span>
                <span className="text-lg font-bold text-white">
                  ${amount && price ? (parseFloat(amount) * parseFloat(price)).toLocaleString('en-US', { minimumFractionDigits: 2 }) : '0.00'}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              className="w-full"
              onClick={handleTrade}
              disabled={!amount || !price || !selectedMarket}
              aria-label={`Submit ${orderType} order`}
            >
              {orderType === 'buy' ? '🚀 Buy' : '📉 Sell'} {selectedMarket?.name || 'Asset'}
            </Button>

            <p className="mt-3 text-center text-xs text-white/40">
              Demo mode - No real trades executed
            </p>
          </Card>

          {/* Balance Card */}
          <Card padding="p-5 sm:p-6">
            <h3 className="mb-4 text-lg sm:text-xl font-bold text-white">Available Balance</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-white/60">USDT</span>
                <span className="font-semibold text-white">10,208.73</span>
              </div>
              {selectedMarket && selectedMarket.qty > 0 && (
                <div className="flex justify-between">
                  <span className="text-sm text-white/60">{selectedMarket.name}</span>
                  <span className="font-semibold text-white">{parseFloat(selectedMarket.qty).toFixed(4)}</span>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
