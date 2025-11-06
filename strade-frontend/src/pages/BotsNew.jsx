import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, TrendingUp } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import CustomDropdown from '../components/CustomDropdown';

const BINANCE_API = 'https://api.binance.com/api/v3/ticker/24hr';

export default function Bots({ onNavigate }) {
  const [pairs, setPairs] = useState([]);
  const [pair, setPair] = useState('BTCUSDT');
  const [maFast, setMaFast] = useState('10');
  const [maSlow, setMaSlow] = useState('30');
  const [targetProfit, setTargetProfit] = useState('1.0');
  const [stopLoss, setStopLoss] = useState('0.5');
  const [capital, setCapital] = useState('1000');
  const [isTesting, setIsTesting] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [testResults, setTestResults] = useState([
    { label: 'Win Rate', value: 68.5, max: 100 },
    { label: 'Total Return', value: 18.3, max: 30 },
    { label: 'Avg Profit', value: 22.42, max: 50 },
    { label: 'Max Drawdown', value: 3.2, max: 10 },
    { label: 'Sharpe Ratio', value: 1.85, max: 3 },
  ]);

  // Fetch pairs from Binance API
  useEffect(() => {
    const fetchPairs = async () => {
      try {
        const response = await fetch(BINANCE_API);
        const data = await response.json();
        
        // Filter only USDT pairs and get top 50 by volume
        const usdtPairs = data
          .filter(item => item.symbol.endsWith('USDT'))
          .sort((a, b) => parseFloat(b.quoteVolume) - parseFloat(a.quoteVolume))
          .slice(0, 50)
          .map(item => ({
            symbol: item.symbol,
            name: item.symbol.replace('USDT', ''),
            price: parseFloat(item.lastPrice).toFixed(2),
            change: parseFloat(item.priceChangePercent).toFixed(2),
            volume: parseFloat(item.quoteVolume).toFixed(0)
          }));

        setPairs(usdtPairs);
        if (usdtPairs.length > 0) {
          setPair(usdtPairs[0].symbol);
        }
      } catch (error) {
        console.error('Error fetching pairs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPairs();
  }, []);

  const handleTesting = () => {
    setIsTesting(true);
    setTimeout(() => {
      setIsTesting(false);
      // Random test results for demo
      setTestResults([
        { label: 'Win Rate', value: (Math.random() * 30 + 50).toFixed(1), max: 100 },
        { label: 'Total Return', value: (Math.random() * 15 + 10).toFixed(1), max: 30 },
        { label: 'Avg Profit', value: (Math.random() * 20 + 15).toFixed(2), max: 50 },
        { label: 'Max Drawdown', value: (Math.random() * 5 + 1).toFixed(1), max: 10 },
        { label: 'Sharpe Ratio', value: (Math.random() * 1.5 + 1).toFixed(2), max: 3 },
      ]);
    }, 2000);
  };

  const handleActivate = () => {
    setIsActivated(!isActivated);
  };



  return (
    <PageLayout
      title="Expert Advisor"
      subtitle="Configure & Test Your Trading Strategy"
      maxWidth="max-w-2xl"
    >
      <div className="flex justify-center">
        <Card padding="p-6 sm:p-8 md:p-10" className="w-full max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5 sm:space-y-6"
          >
            {/* Title */}
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">Expert Advisor</h2>
            </div>

            {/* Pair Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-white/80">Pair</label>
              <CustomDropdown
                options={pairs.map(p => ({
                  value: p.symbol,
                  label: `${p.name}/USDT`,
                  price: p.price,
                  change: p.change
                }))}
                value={pair}
                onChange={setPair}
                placeholder="Select trading pair"
                disabled={loading}
              />
              {loading && (
                <div className="text-xs text-white/60 mt-1">Loading pairs...</div>
              )}
            </div>

            {/* Strategy Settings */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-white/80">Strategy</label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  value={maFast}
                  onChange={(e) => setMaFast(e.target.value)}
                  placeholder="10"
                  className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-2.5 text-center text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#84F7F0]"
                />
                <input
                  type="number"
                  value={maSlow}
                  onChange={(e) => setMaSlow(e.target.value)}
                  placeholder="30"
                  className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-2.5 text-center text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#84F7F0]"
                />
              </div>
            </div>

            {/* Risk & Reward */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-white/80">Risk & Reward</label>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={targetProfit}
                    onChange={(e) => setTargetProfit(e.target.value)}
                    placeholder="1.0"
                    className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-2.5 pr-8 text-center text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#84F7F0]"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40">%</span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={stopLoss}
                    onChange={(e) => setStopLoss(e.target.value)}
                    placeholder="0.5"
                    className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-2.5 pr-8 text-center text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#84F7F0]"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40">%</span>
                </div>
              </div>
            </div>

            {/* Capital */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-white/80">Capital</label>
              <div className="relative">
                <input
                  type="number"
                  step="100"
                  value={capital}
                  onChange={(e) => setCapital(e.target.value)}
                  placeholder="1000"
                  className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-2.5 pr-8 text-center text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#84F7F0]"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40">$</span>
              </div>
            </div>

            {/* Testing Button */}
            <Button
              onClick={handleTesting}
              disabled={isTesting}
              className="w-full bg-gradient-to-r from-[#84F7F0] to-[#000000] hover:from-[#84F7F0] hover:to-[#000000] text-white font-semibold py-3 text-sm"
            >
              {isTesting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="inline-block"
                >
                  ⏳
                </motion.div>
              ) : (
                'Testing'
              )}
            </Button>

            {/* Results */}
            <div className="space-y-2">
              <label className="block text-xs font-medium text-white/80 mb-3">Result</label>
              <div className="rounded-xl border border-white/10 bg-slate-800/40 p-4 space-y-2">
                {testResults.map((result, index) => (
                  <motion.div
                    key={result.label}
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: '100%', opacity: 1 }}
                    transition={{ delay: isTesting ? 0 : index * 0.1, duration: 0.5 }}
                    className="space-y-1"
                  >
                    <div className="flex justify-between text-xs text-white/60">
                      <span>{result.label}</span>
                      <span>{result.value}{result.label === 'Sharpe Ratio' ? '' : '%'}</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-slate-900/60 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(parseFloat(result.value) / result.max) * 100}%` }}
                        transition={{ delay: isTesting ? 0 : index * 0.1 + 0.2, duration: 0.8, ease: 'easeOut' }}
                        className="h-full rounded-full bg-gradient-to-r from-[#84F7F0] via-[#84F7F0] to-[#000000]"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Activated Button */}
            <Button
              onClick={handleActivate}
              className={`w-full font-semibold py-3 text-sm transition-all ${
                isActivated
                  ? 'bg-gradient-to-r from-[#84F7F0] to-[#000000] hover:from-[#84F7F0] hover:to-[#000000]'
                  : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
              }`}
            >
              {isActivated ? (
                <span className="flex items-center justify-center gap-2">
                  <Play className="h-4 w-4" />
                  Activated ✓
                </span>
              ) : (
                'Activated'
              )}
            </Button>

            {/* Info Text */}
            {isActivated && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <p className="text-xs text-[#84F7F0] flex items-center justify-center gap-2">
                  <TrendingUp className="h-3 w-3" />
                  Bot is running on {pair} with MA{maFast}/{maSlow} • Capital: ${parseFloat(capital).toLocaleString()}
                </p>
              </motion.div>
            )}
          </motion.div>
        </Card>
      </div>
    </PageLayout>
  );
}
