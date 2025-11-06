// Mock API service for demo data
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user data
const mockUser = {
  id: 'user_001',
  name: 'Wade Warren',
  email: 'wade.warren@strade.io',
  role: 'Trader',
  avatar: 'https://i.pravatar.cc/150?img=12',
  kycStatus: 'verified',
  kycLevel: 2,
  joinedDate: '2024-01-15',
  country: 'United States',
  phoneNumber: '+1 (555) 123-4567',
  twoFactorEnabled: true,
};

// Mock balance data
const mockBalances = {
  total: 47743.67,
  trading: 15223.21,
  savings: 22321.73,
  available: 10208.73,
  cards: [
    {
      id: 'card_001',
      type: 'Total Balance',
      balance: 10208.73,
      holder: 'Esther Howard',
      validThru: '08/2023',
      gradient: 'from-84F7F0 to-84F7F0',
    },
    {
      id: 'card_002',
      type: 'Trading Balance',
      balance: 15223.21,
      holder: 'Stuart Alan',
      validThru: '03/2023',
      gradient: 'from-84F7F0 to-84F7F0',
    },
    {
      id: 'card_003',
      type: 'Savings',
      balance: 22321.73,
      holder: 'Steven Howard',
      validThru: '10/2023',
      gradient: 'from-purple-600 to-pink-600',
    },
  ],
};

// Mock market data
const mockMarkets = [
  {
    id: 'btc_usd',
    symbol: 'BTC-USD',
    name: 'Bitcoin USD',
    price: 12208.73,
    change24h: 1256.25,
    changePercent: 1.24,
    icon: '₿',
    color: 'orange',
  },
  {
    id: 'bnb_usd',
    symbol: 'BNB-USD',
    name: 'Binance USD',
    price: 34212.73,
    change24h: 453.25,
    changePercent: 8.24,
    icon: 'B',
    color: '84F7F0',
  },
  {
    id: 'eth_usd',
    symbol: 'ETH-USD',
    name: 'Ethereum USD',
    price: 22143.71,
    change24h: -765.25,
    changePercent: -2.34,
    icon: 'Ξ',
    color: 'purple',
  },
  {
    id: 'xmr_usd',
    symbol: 'XMR-USD',
    name: 'Monero USD',
    price: 21212.73,
    change24h: 223.25,
    changePercent: 1.06,
    icon: 'X',
    color: 'pink',
  },
];

// Mock bots data
const mockBots = [
  {
    id: 'bot_001',
    name: 'Binance Spot',
    exchange: 'Binance',
    strategy: 'Grid Trading',
    status: 'active',
    performance: '+2.1%',
    profit24h: 125.43,
    trades24h: 47,
    createdAt: '2024-10-15',
    description: 'Automated grid trading bot for Binance spot market',
  },
  {
    id: 'bot_002',
    name: 'Bybit Futures',
    exchange: 'Bybit',
    strategy: 'DCA (Dollar Cost Average)',
    status: 'active',
    performance: '+5.3%',
    profit24h: 342.18,
    trades24h: 23,
    createdAt: '2024-09-20',
    description: 'DCA strategy for Bybit perpetual futures',
  },
  {
    id: 'bot_003',
    name: 'OKX Spot',
    exchange: 'OKX',
    strategy: 'Market Making',
    status: 'maintenance',
    performance: '+1.8%',
    profit24h: 0,
    trades24h: 0,
    createdAt: '2024-08-10',
    description: 'Market making bot for OKX spot trading',
  },
];

// Mock API keys
const mockApiKeys = [
  {
    id: 'api_001',
    exchange: 'Binance',
    label: 'Main Trading Account',
    status: 'connected',
    permissions: ['spot', 'futures', 'read', 'trade'],
    createdAt: '2024-01-20',
  },
  {
    id: 'api_002',
    exchange: 'Bybit',
    label: 'Futures Only',
    status: 'connected',
    permissions: ['futures', 'read', 'trade'],
    createdAt: '2024-02-15',
  },
];

// Mock trade history
const mockTrades = [
  {
    id: 'trade_001',
    symbol: 'BTC-USD',
    type: 'buy',
    amount: 0.125,
    price: 42150.00,
    total: 5268.75,
    timestamp: '2024-11-06 14:23:15',
    status: 'completed',
  },
  {
    id: 'trade_002',
    symbol: 'ETH-USD',
    type: 'sell',
    amount: 2.5,
    price: 2245.80,
    total: 5614.50,
    timestamp: '2024-11-06 13:45:22',
    status: 'completed',
  },
  {
    id: 'trade_003',
    symbol: 'BNB-USD',
    type: 'buy',
    amount: 15,
    price: 312.40,
    total: 4686.00,
    timestamp: '2024-11-06 12:10:33',
    status: 'completed',
  },
];

// API methods
export const mockApi = {
  // User endpoints
  async getUser() {
    await delay(300);
    return { success: true, data: mockUser };
  },

  async updateUser(updates) {
    await delay(500);
    return { success: true, data: { ...mockUser, ...updates } };
  },

  // Balance endpoints
  async getBalances() {
    await delay(400);
    return { success: true, data: mockBalances };
  },

  // Market endpoints
  async getMarkets() {
    await delay(300);
    return { success: true, data: mockMarkets };
  },

  async getMarketDetail(symbol) {
    await delay(400);
    const market = mockMarkets.find(m => m.symbol === symbol);
    return { success: true, data: market };
  },

  // Bots endpoints
  async getBots() {
    await delay(400);
    return { success: true, data: mockBots };
  },

  async getBotDetail(botId) {
    await delay(400);
    const bot = mockBots.find(b => b.id === botId);
    return { success: true, data: bot };
  },

  async createBot(botData) {
    await delay(600);
    const newBot = {
      id: `bot_${Date.now()}`,
      ...botData,
      status: 'inactive',
      performance: '0%',
      profit24h: 0,
      trades24h: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    return { success: true, data: newBot };
  },

  async updateBot(botId, updates) {
    await delay(500);
    const bot = mockBots.find(b => b.id === botId);
    return { success: true, data: { ...bot, ...updates } };
  },

  async deleteBot(botId) {
    await delay(400);
    return { success: true, message: 'Bot deleted successfully' };
  },

  // API Keys endpoints
  async getApiKeys() {
    await delay(400);
    return { success: true, data: mockApiKeys };
  },

  async addApiKey(keyData) {
    await delay(600);
    const newKey = {
      id: `api_${Date.now()}`,
      ...keyData,
      status: 'connected',
      createdAt: new Date().toISOString().split('T')[0],
    };
    return { success: true, data: newKey };
  },

  async deleteApiKey(keyId) {
    await delay(400);
    return { success: true, message: 'API key deleted successfully' };
  },

  // Trade endpoints
  async getTrades(limit = 20) {
    await delay(400);
    return { success: true, data: mockTrades.slice(0, limit) };
  },

  async executeTrade(tradeData) {
    await delay(800);
    const newTrade = {
      id: `trade_${Date.now()}`,
      ...tradeData,
      timestamp: new Date().toISOString(),
      status: 'pending',
    };
    return { success: true, data: newTrade };
  },
};

export default mockApi;
