import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, DollarSign, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';
import StatBox from '../components/StatBox';

export default function Profit({ onBack }) {
  const [timeRange, setTimeRange] = useState('7D');

  // Generate dummy daily profit data
  const generateProfitData = (days) => {
    const data = [];
    for (let i = 0; i < days; i++) {
      const profit = (Math.random() - 0.4) * 500 + (i * 10); // Slight upward trend
      data.push({
        day: i,
        profit: Math.round(profit),
        label: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i % 7],
      });
    }
    return data;
  };

  const chartData = useMemo(() => {
    switch (timeRange) {
      case '1D': return generateProfitData(24); // 24 hours
      case '7D': return generateProfitData(7); // 7 days
      case '30D': return generateProfitData(30); // 30 days
      default: return generateProfitData(7);
    }
  }, [timeRange]);

  // Calculate stats from chart data
  const totalProfit = chartData.reduce((sum, d) => sum + d.profit, 0);
  const maxProfit = Math.max(...chartData.map(d => d.profit));
  const minProfit = Math.min(...chartData.map(d => d.profit));
  const winRate = (chartData.filter(d => d.profit > 0).length / chartData.length) * 100;

  // Calculate chart dimensions
  const chartWidth = 800;
  const chartHeight = 200;
  const padding = 40;
  const innerWidth = chartWidth - padding * 2;
  const innerHeight = chartHeight - padding * 2;

  // Get min/max for scaling
  const dataMin = minProfit;
  const dataMax = maxProfit;
  const dataRange = dataMax - dataMin || 1;

  // Generate path for profit line
  const points = chartData.map((d, i) => {
    const x = (i / (chartData.length - 1)) * innerWidth + padding;
    const y = innerHeight - ((d.profit - dataMin) / dataRange) * innerHeight + padding;
    return { x, y, profit: d.profit };
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  // Recent trades dummy data
  const recentTrades = [
    { pair: 'BTC/USDT', type: 'buy', amount: 0.5, profit: 245.50, date: 'Today 14:32', status: 'closed' },
    { pair: 'ETH/USDT', type: 'sell', amount: 5.2, profit: -125.30, date: 'Today 11:15', status: 'closed' },
    { pair: 'BNB/USDT', type: 'buy', amount: 10, profit: 89.75, date: 'Yesterday 09:45', status: 'closed' },
    { pair: 'SOL/USDT', type: 'buy', amount: 25, profit: 156.20, date: 'Yesterday 16:20', status: 'closed' },
  ];

  const stats = [
    { label: 'Total Profit', value: `$${Math.abs(totalProfit).toLocaleString()}`, change: totalProfit >= 0 ? `+${(totalProfit).toFixed(2)}` : `${(totalProfit).toFixed(2)}`, color: 'text-000000', icon: <TrendingUp className="w-5 h-5" />, gradient: 'from-84F7F0 to-000000' },
    { label: 'Win Rate', value: `${winRate.toFixed(1)}%`, change: winRate > 50 ? 'Above avg' : 'Below avg', color: 'text-blue-600', icon: <DollarSign className="w-5 h-5" />, gradient: 'from-blue-500 to-cyan-500' },
    { label: 'Trades Count', value: chartData.filter(d => d.profit !== 0).length.toString(), change: 'This period', color: 'text-purple-600', icon: <BarChart3 className="w-5 h-5" />, gradient: 'from-purple-500 to-pink-500' },
    { label: 'Max Profit', value: `$${maxProfit.toLocaleString()}`, change: 'Peak', color: 'text-orange-600', icon: <TrendingUp className="w-5 h-5" />, gradient: 'from-orange-500 to-red-500' },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 pt-6 sm:pt-8 md:pt-10 lg:pt-12 py-6 space-y-6 sm:space-y-8">
        {/* Page Title - Simplified */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-white">Profit Analytics</h1>
          <p className="text-white/70 text-sm">Track your trading performance</p>
        </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, idx) => (
              <StatBox
                key={idx}
                title={stat.label}
                value={stat.value}
                change={stat.change}
                changeType={stat.change === '+0%' ? 'positive' : 'neutral'}
                icon={stat.icon}
                color={stat.gradient}
              />
            ))}
          </div>

          {/* Performance Chart */}
          <div>
            <Card>
              <div className="flex items-center justify-between mb-6">
                <SectionTitle
                  title="Performance Overview"
                  subtitle="Your trading performance over time"
                  className="mb-0 text-left"
                />
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant={timeRange === '1D' ? 'primary' : 'outline'} 
                    className="px-3 py-1 text-xs"
                    onClick={() => setTimeRange('1D')}
                  >
                    1D
                  </Button>
                  <Button 
                    size="sm" 
                    variant={timeRange === '7D' ? 'primary' : 'outline'} 
                    className="px-3 py-1 text-xs"
                    onClick={() => setTimeRange('7D')}
                  >
                    7D
                  </Button>
                  <Button 
                    size="sm" 
                    variant={timeRange === '30D' ? 'primary' : 'outline'} 
                    className="px-3 py-1 text-xs"
                    onClick={() => setTimeRange('30D')}
                  >
                    30D
                  </Button>
                </div>
              </div>

              {/* SVG Chart */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={timeRange}
                className="w-full overflow-x-auto"
              >
                <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full min-w-96 h-64">
                  {/* Grid lines */}
                  {[0, 0.25, 0.5, 0.75, 1].map((y, i) => (
                    <line
                      key={`grid-${i}`}
                      x1={padding}
                      y1={padding + y * innerHeight}
                      x2={padding + innerWidth}
                      y2={padding + y * innerHeight}
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Y-axis labels */}
                  {[0, 0.25, 0.5, 0.75, 1].map((y, i) => {
                    const value = dataMin + (1 - y) * dataRange;
                    return (
                      <text
                        key={`y-label-${i}`}
                        x={padding - 5}
                        y={padding + y * innerHeight + 4}
                        textAnchor="end"
                        fill="rgba(255,255,255,0.5)"
                        fontSize="12"
                      >
                        ${Math.round(value)}
                      </text>
                    );
                  })}

                  {/* X-axis */}
                  <line
                    x1={padding}
                    y1={padding + innerHeight}
                    x2={padding + innerWidth}
                    y2={padding + innerHeight}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="2"
                  />

                  {/* Profit area (gradient fill) */}
                  <defs>
                    <linearGradient id="profitGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(16, 185, 129, 0.3)" />
                      <stop offset="100%" stopColor="rgba(16, 185, 129, 0.05)" />
                    </linearGradient>
                  </defs>

                  {/* Area under curve */}
                  <path
                    d={`${pathD} L ${points[points.length - 1].x} ${padding + innerHeight} L ${padding} ${padding + innerHeight} Z`}
                    fill="url(#profitGradient)"
                  />

                  {/* Profit line */}
                  <path
                    d={pathD}
                    stroke="rgba(16, 185, 129, 1)"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Data points */}
                  {points.map((p, i) => (
                    <motion.circle
                      key={`point-${i}`}
                      cx={p.x}
                      cy={p.y}
                      r="4"
                      fill={p.profit >= 0 ? '#10b981' : '#ef4444'}
                      initial={{ r: 0 }}
                      animate={{ r: 4 }}
                      transition={{ delay: i * 0.02 }}
                    />
                  ))}

                  {/* X-axis labels */}
                  {chartData.map((d, i) => {
                    if (chartData.length <= 7 || i % Math.ceil(chartData.length / 7) === 0) {
                      const x = (i / (chartData.length - 1)) * innerWidth + padding;
                      return (
                        <text
                          key={`x-label-${i}`}
                          x={x}
                          y={padding + innerHeight + 20}
                          textAnchor="middle"
                          fill="rgba(255,255,255,0.5)"
                          fontSize="12"
                        >
                          {d.label}
                        </text>
                      );
                    }
                    return null;
                  })}
                </svg>
              </motion.div>

              {/* Chart info */}
              <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-white/60 text-xs">Avg Daily</p>
                    <p className="text-lg font-bold text-[#00E676]">${maxProfit.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-white/60 text-xs">Max Daily</p>
                    <p className="text-lg font-bold text-[#FF5252]">${minProfit.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-white/60 text-xs">Min Daily</p>
                    <p className="text-lg font-bold text-[#00E676]">{winRate.toFixed(1)}%</p>
                </div>
                <div className="text-center">
                  <p className="text-white/60 text-xs">Win Rate</p>
                  <p className="text-lg font-semibold text-84F7F0">{winRate.toFixed(1)}%</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Trades */}
          <div>
            <Card>
              <div className="flex items-center justify-between mb-6">
                <SectionTitle
                  title="Recent Trades"
                  subtitle="Your latest trading activity"
                  className="mb-0 text-left"
                />
                <Button variant="outline" size="sm">View All</Button>
              </div>

              {/* Trades List */}
              <div className="space-y-3">
                {recentTrades.map((trade, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 transition-all border border-white/5"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {/* Trade Icon */}
                      <div className={`flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center ${
                        trade.type === 'buy' ? 'bg-000000/20' : 'bg-red-500/20'
                      }`}>
                        {trade.type === 'buy' ? (
                            <ArrowDownRight className={`w-5 h-5 text-[#00C853]`} />
                        ) : (
                            <ArrowUpRight className={`w-5 h-5 text-[#FF1744]`} />
                        )}
                      </div>

                      {/* Trade Details */}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-white truncate">{trade.pair}</p>
                        <p className="text-xs text-white/60">{trade.date}</p>
                      </div>

                      {/* Amount */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-medium text-white">{trade.amount} {trade.pair.split('/')[0]}</p>
                        <p className="text-xs text-white/60">{trade.type.toUpperCase()}</p>
                      </div>
                    </div>

                    {/* Profit/Loss */}
                    <div className={`ml-4 text-right flex-shrink-0 font-semibold ${
                 trade.profit >= 0 ? 'text-[#00E676]' : 'text-[#FF5252]'
                    }`}>
                      {trade.profit >= 0 ? '+' : ''}{trade.profit.toFixed(2)} USDT
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>
      </div>
    </div>
  );
}
