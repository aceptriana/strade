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
      maxWidth="max-w-4xl"
    >
      <div className="flex justify-center mb-20">
        <Card padding="p-6 sm:p-8" className="w-full max-w-2xl border-[#84F7F0]/20 backdrop-blur-md">
          <div className="space-y-6">
            {/* Title Section */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-[#84F7F0] mb-2">Strategy Configuration</h2>
              <p className="text-sm text-white/70">Set up your automated trading parameters</p>
            </div>

            {/* Pair Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-white/90">Trading Pair</label>
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
                <div className="text-xs text-[#84F7F0]/60 mt-1">Loading pairs from Binance...</div>
              )}
            </div>

            {/* Strategy Settings - 2 Columns */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-white/90">Moving Average Strategy</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-white/60">Fast MA Period</label>
                  <input
                    type="number"
                    value={maFast}
                    onChange={(e) => setMaFast(e.target.value)}
                    placeholder="10"
                    className="w-full rounded-lg border border-[#84F7F0]/40 bg-[#041C1A] px-4 py-3 text-center text-sm text-[#84F7F0] placeholder-[#84F7F0]/40 focus:outline-none focus:ring-2 focus:ring-[#84F7F0]/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-white/60">Slow MA Period</label>
                  <input
                    type="number"
                    value={maSlow}
                    onChange={(e) => setMaSlow(e.target.value)}
                    placeholder="30"
                    className="w-full rounded-lg border border-[#84F7F0]/40 bg-[#041C1A] px-4 py-3 text-center text-sm text-[#84F7F0] placeholder-[#84F7F0]/40 focus:outline-none focus:ring-2 focus:ring-[#84F7F0]/50 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Risk & Reward - 2 Columns */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-white/90">Risk & Reward Parameters</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs text-white/60">Target Profit (%)</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={targetProfit}
                      onChange={(e) => setTargetProfit(e.target.value)}
                      placeholder="1.0"
                      className="w-full rounded-lg border border-[#84F7F0]/40 bg-[#041C1A] px-4 py-3 pr-10 text-center text-sm text-[#84F7F0] placeholder-[#84F7F0]/40 focus:outline-none focus:ring-2 focus:ring-[#84F7F0]/50 transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#84F7F0]/60">%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-white/60">Stop Loss (%)</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={stopLoss}
                      onChange={(e) => setStopLoss(e.target.value)}
                      placeholder="0.5"
                      className="w-full rounded-lg border border-[#84F7F0]/40 bg-[#041C1A] px-4 py-3 pr-10 text-center text-sm text-[#84F7F0] placeholder-[#84F7F0]/40 focus:outline-none focus:ring-2 focus:ring-[#84F7F0]/50 transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#84F7F0]/60">%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Capital */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-white/90">Trading Capital</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#84F7F0]/60">$</span>
                <input
                  type="number"
                  step="100"
                  value={capital}
                  onChange={(e) => setCapital(e.target.value)}
                  placeholder="1000"
                  className="w-full rounded-lg border border-[#84F7F0]/40 bg-[#041C1A] px-4 py-3 pl-10 text-center text-sm text-[#84F7F0] placeholder-[#84F7F0]/40 focus:outline-none focus:ring-2 focus:ring-[#84F7F0]/50 transition-all"
                />
              </div>
            </div>

            {/* Testing Button */}
            <div className="pt-2">
              <Button
                onClick={handleTesting}
                disabled={isTesting}
                className="w-full bg-[#84F7F0] hover:bg-[#6dd9d3] text-black font-bold py-3.5 text-sm shadow-lg shadow-[#84F7F0]/30 transition-all"
              >
                {isTesting ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="inline-block"
                    >
                      ⏳
                    </motion.div>
                    Testing Strategy...
                  </span>
                ) : (
                  'Run Backtest'
                )}
              </Button>
            </div>

            {/* Results */}
            <div className="space-y-3 pt-4">
              <label className="block text-sm font-semibold text-white/90 mb-4">Backtest Results</label>
              <div className="rounded-xl border border-[#84F7F0]/20 bg-[#041C1A]/60 backdrop-blur-sm p-5 space-y-4">
                {testResults.map((result, index) => {
                  const isNegative = result.label === 'Max Drawdown';
                  const barColor = isNegative ? '#FF4D4D' : '#00FF7F';
                  const textColor = isNegative ? '#FF4D4D' : '#00FF7F';
                  
                  return (
                    <motion.div
                      key={result.label}
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: '100%', opacity: 1 }}
                      transition={{ delay: isTesting ? 0 : index * 0.1, duration: 0.5 }}
                      className="space-y-2"
                    >
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-white/80 font-medium">{result.label}</span>
                        <span className="font-bold" style={{ color: textColor }}>
                          {result.value}{result.label === 'Sharpe Ratio' ? '' : '%'}
                        </span>
                      </div>
                      <div className="h-3 rounded-full bg-slate-900/60 overflow-hidden border border-white/5">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(parseFloat(result.value) / result.max) * 100}%` }}
                          transition={{ delay: isTesting ? 0 : index * 0.1 + 0.2, duration: 0.8, ease: 'easeOut' }}
                          className="h-full rounded-full"
                          style={{ 
                            background: `linear-gradient(to right, ${barColor}, ${barColor}dd)`,
                            boxShadow: `0 0 8px ${barColor}40`
                          }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Activated Button */}
            <div className="pt-2">
              <Button
                onClick={handleActivate}
                className={`w-full font-bold py-3.5 text-sm transition-all shadow-lg ${
                  isActivated
                    ? 'bg-gradient-to-r from-[#06ac3a] to-[#028f69] text-white shadow-green-500/30'
                    : 'bg-gradient-to-r from-[#84F7F0] to-[#6dd9d3] text-black shadow-[#84F7F0]/30'
                }`}
              >
                {isActivated ? (
                  <span className="flex items-center justify-center gap-2">
                    <Play className="h-4 w-4" />
                    Bot Active ✓
                  </span>
                ) : (
                  'Activate Bot'
                )}
              </Button>
            </div>

            {/* Info Text */}
            {isActivated && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center pt-2"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#06ac3a]/10 border border-[#06ac3a]/30">
                  <TrendingUp className="h-4 w-4 text-[#06ac3a]" />
                  <p className="text-xs text-[#06ac3a] font-semibold">
                    Running on {pair} • MA{maFast}/{maSlow} • ${parseFloat(capital).toLocaleString()} Capital
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </Card>
      </div>
    </PageLayout>
  );
}
