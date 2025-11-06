import React, { useState } from 'react';
import { CreditCard, Wallet, DollarSign, Shield, Star } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import Card from '../components/Card';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';

export default function Recharge({ onBack }) {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');

  const packages = [
    { amount: 10, bonus: 0, popular: false },
    { amount: 50, bonus: 5, popular: false },
    { amount: 100, bonus: 15, popular: true },
    { amount: 500, bonus: 100, popular: false },
  ];

  return (
    <PageLayout
      title="Add Credit"
      subtitle="Recharge your account balance"
      onBack={onBack}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6"
>

          {/* Current Balance */}
          <div>
            <Card className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-84F7F0 to-000000 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <SectionTitle
                title="Current Balance"
                subtitle="Add credit to start trading"
                className="mb-4"
              />
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-4xl md:text-5xl font-black text-white">$0</span>
                <span className="text-lg md:text-xl text-white/70">USD</span>
              </div>
            </Card>
          </div>

          {/* Package Options */}
          <div>
            <Card>
              <SectionTitle
                title="Quick Packages"
                subtitle="Choose from our popular recharge packages"
                className="mb-6"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {packages.map((pkg, idx) => (
                  <button
                    key={idx}
                    onClick={() => setAmount(pkg.amount.toString())}
                    className={`relative p-6 rounded-2xl transition-all duration-300 text-center ${
                      pkg.popular
                        ? 'bg-gradient-to-br from-000000 to-000000 text-white shadow-2xl scale-105 border border-84F7F0/30'
                        : amount === pkg.amount.toString()
                        ? 'bg-slate-800/50 backdrop-blur-xl text-white border-2 border-84F7F0'
                        : 'bg-slate-800/50 backdrop-blur-xl text-white hover:bg-slate-700/50 border border-white/10'
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          POPULAR
                        </span>
                      </div>
                    )}
                    <p className={`text-3xl md:text-4xl font-black mb-2 ${pkg.popular ? 'text-white' : 'text-84F7F0'}`}>
                      ${pkg.amount}
                    </p>
                    {pkg.bonus > 0 && (
                      <p className={`text-sm md:text-base font-semibold ${pkg.popular ? 'text-yellow-200' : 'text-84F7F0'}`}>
                        +${pkg.bonus} bonus
                      </p>
                    )}
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Custom Amount */}
          <div>
            <Card>
              <SectionTitle
                title="Custom Amount"
                subtitle="Enter your desired recharge amount"
                className="mb-6"
              />
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-slate-700/50 border border-white/20 rounded-xl pl-12 pr-4 py-4 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-84F7F0 text-white placeholder-white/50"
                    placeholder="Enter amount"
                  />
                </div>
                <Button>Add Amount</Button>
              </div>
            </Card>
          </div>

          {/* Payment Method */}
          <div>
            <Card>
              <SectionTitle
                title="Payment Method"
                subtitle="Choose your preferred payment method"
                className="mb-6"
              />
              <div className="space-y-4">
                <label className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-xl border border-white/5 cursor-pointer hover:bg-slate-600/30 transition-all">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 accent-84F7F0"
                  />
                  <CreditCard className="w-6 h-6 text-84F7F0 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-white text-sm md:text-base">Credit/Debit Card</p>
                    <p className="text-xs md:text-sm text-white/60">Visa, Mastercard, American Express</p>
                  </div>
                </label>

                <label className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-xl border border-white/5 cursor-pointer hover:bg-slate-600/30 transition-all">
                  <input
                    type="radio"
                    name="payment"
                    value="wallet"
                    checked={paymentMethod === 'wallet'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-5 h-5 accent-84F7F0"
                  />
                  <Wallet className="w-6 h-6 text-84F7F0 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-white text-sm md:text-base">Crypto Wallet</p>
                    <p className="text-xs md:text-sm text-white/60">Direct transfer from your crypto wallet</p>
                  </div>
                </label>
              </div>
            </Card>
          </div>

          {/* Charge Summary */}
          {amount && (
            <div>
              <Card>
                <SectionTitle
                  title="Order Summary"
                  subtitle="Review your recharge details"
                  className="mb-6"
                />
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 text-sm md:text-base">Amount</span>
                    <span className="font-semibold text-white text-sm md:text-base">${amount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 text-sm md:text-base">Bonus (10%)</span>
                    <span className="font-semibold text-84F7F0 text-sm md:text-base">+${(parseInt(amount) * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-white/20"></div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-white text-sm md:text-base">Total Credit</span>
                    <span className="text-2xl md:text-3xl font-black text-84F7F0">${(parseInt(amount) * 1.1).toFixed(2)}</span>
                  </div>
                </div>

                <Button className="w-full mt-6">Proceed to Payment</Button>
              </Card>
            </div>
          )}

          {/* Security Info */}
          <div>
            <Card>
              <div className="flex gap-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-84F7F0 to-000000 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <div className="flex-1">
                  <SectionTitle
                    title="🔒 Secure & Safe"
                    subtitle="Your payments are protected with industry-standard security"
                    className="mb-4 text-left"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm md:text-base">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-84F7F0 rounded-full"></div>
                      <span className="text-white/70">256-bit SSL encryption</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-84F7F0 rounded-full"></div>
                      <span className="text-white/70">PCI DSS compliant</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-84F7F0 rounded-full"></div>
                      <span className="text-white/70">Data never shared</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </PageLayout>
  );
}
