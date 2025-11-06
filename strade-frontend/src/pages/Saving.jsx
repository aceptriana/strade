import React, { useMemo, useState } from 'react';
import { TrendingUp, Percent, PiggyBank, Edit3, Trash2, Save } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';
import StatBox from '../components/StatBox';
import PageLayout from '../components/PageLayout';

const defaultPlans = [
  {
    id: 'basic',
    name: 'Basic Saving',
    rate: 5,
    minAmount: 10,
    lockPeriod: 7,
    description: 'Cocok untuk pemula'
  },
  {
    id: 'premium',
    name: 'Premium Saving',
    rate: 7,
    minAmount: 100,
    lockPeriod: 30,
    description: 'Untuk trader aktif'
  },
  {
    id: 'elite',
    name: 'Elite Saving',
    rate: 10,
    minAmount: 1000,
    lockPeriod: 90,
    description: 'Pengembalian maksimal'
  }
];

const defaultHoldings = [
  { id: 'demo-1', planId: 'basic', amount: 250, startDate: '2025-01-10', status: 'Locked' }
];

export default function Saving({ onBack }) {
  const [plans, setPlans] = useState(defaultPlans);
  const [holdings, setHoldings] = useState(defaultHoldings);
  const [planForm, setPlanForm] = useState({ name: '', rate: '', minAmount: '', lockPeriod: '', description: '' });
  const [editingPlanId, setEditingPlanId] = useState(null);
  const [holdingForm, setHoldingForm] = useState({ planId: defaultPlans[0]?.id || '', amount: '', startDate: '' });
  const [editingHoldingId, setEditingHoldingId] = useState(null);

  const totalSaved = useMemo(() => holdings.reduce((sum, item) => sum + Number(item.amount || 0), 0), [holdings]);
  const interestProjection = useMemo(() => {
    return holdings.reduce((acc, holding) => {
      const plan = plans.find((item) => item.id === holding.planId);
      if (!plan) return acc;
      return acc + (Number(holding.amount || 0) * plan.rate) / 100;
    }, 0);
  }, [holdings, plans]);

  const handlePlanChange = (event) => {
    const { name, value } = event.target;
    setPlanForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlanSubmit = (event) => {
    event.preventDefault();
    if (!planForm.name.trim()) return;

    const payload = {
      id: editingPlanId || planForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name: planForm.name,
      rate: Number(planForm.rate || 0),
      minAmount: Number(planForm.minAmount || 0),
      lockPeriod: Number(planForm.lockPeriod || 0),
      description: planForm.description
    };

    setPlans((prev) => {
      if (editingPlanId) {
        return prev.map((plan) => (plan.id === editingPlanId ? payload : plan));
      }
      return [...prev, payload];
    });

    resetPlanForm();
  };

  const resetPlanForm = () => {
    setPlanForm({ name: '', rate: '', minAmount: '', lockPeriod: '', description: '' });
    setEditingPlanId(null);
  };

  const handlePlanEdit = (plan) => {
    setEditingPlanId(plan.id);
    setPlanForm({
      name: plan.name,
      rate: plan.rate.toString(),
      minAmount: plan.minAmount.toString(),
      lockPeriod: plan.lockPeriod.toString(),
      description: plan.description
    });
  };

  const handlePlanDelete = (planId) => {
    setPlans((prev) => prev.filter((plan) => plan.id !== planId));
    setHoldings((prev) => prev.filter((holding) => holding.planId !== planId));
  };

  const handleHoldingChange = (event) => {
    const { name, value } = event.target;
    setHoldingForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleHoldingSubmit = (event) => {
    event.preventDefault();
    if (!holdingForm.planId) return;

    const payload = {
      id: editingHoldingId || `holding-${Date.now()}`,
      planId: holdingForm.planId,
      amount: Number(holdingForm.amount || 0),
      startDate: holdingForm.startDate || new Date().toISOString().slice(0, 10),
      status: 'Locked'
    };

    setHoldings((prev) => {
      if (editingHoldingId) {
        return prev.map((item) => (item.id === editingHoldingId ? payload : item));
      }
      return [...prev, payload];
    });

    resetHoldingForm();
  };

  const resetHoldingForm = () => {
    setHoldingForm({ planId: plans[0]?.id || '', amount: '', startDate: '' });
    setEditingHoldingId(null);
  };

  const handleHoldingEdit = (holding) => {
    setEditingHoldingId(holding.id);
    setHoldingForm({
      planId: holding.planId,
      amount: holding.amount.toString(),
      startDate: holding.startDate
    });
  };

  const handleHoldingDelete = (holdingId) => {
    setHoldings((prev) => prev.filter((item) => item.id !== holdingId));
  };

  return (
    <PageLayout
      title="Saving Plans"
      subtitle="Kelola produk tabungan kripto dan simulasi portofolio"
      onBack={onBack}
      maxWidth="max-w-6xl"
    >
  <Card className="">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-84F7F0/30 bg-84F7F0/20">
            <PiggyBank className="h-6 w-6 text-84F7F0" />
          </div>
          <SectionTitle
            title="Produk Tabungan STRADE"
            subtitle="Demo APY, minimum deposit, dan periode penguncian"
            align="left"
            className="mb-0"
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatBox
          title="Total Disimpan"
          value={`$${totalSaved.toFixed(2)}`}
          change="Saldo tabungan demo"
          changeType="neutral"
          icon={<PiggyBank className="h-5 w-5" />}
          color="from-84F7F0 to-000000"
        />
        <StatBox
          title="Proyeksi Bunga"
          value={`$${interestProjection.toFixed(2)}`}
          change="Perhitungan APY tahunan"
          changeType="neutral"
          icon={<TrendingUp className="h-5 w-5" />}
          color="from-blue-500 to-cyan-500"
        />
        <StatBox
          title="Rencana Aktif"
          value={holdings.length.toString()}
          change="Jumlah produk yang berjalan"
          changeType="neutral"
          icon={<Percent className="h-5 w-5" />}
          color="from-purple-500 to-pink-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
  <Card className="space-y-6">
          <SectionTitle
            title="Kelola Produk"
            subtitle="Tambah atau edit paket tabungan untuk demo"
            align="left"
            className="mb-0"
          />
          <form onSubmit={handlePlanSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Nama Paket</label>
              <input
                name="name"
                value={planForm.name}
                onChange={handlePlanChange}
                placeholder="Contoh: Flexi Lock"
                className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">APY (%)</label>
                <input
                  name="rate"
                  type="number"
                  step="0.1"
                  value={planForm.rate}
                  onChange={handlePlanChange}
                  placeholder="6.5"
                  className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Minimum (USDT)</label>
                <input
                  name="minAmount"
                  type="number"
                  value={planForm.minAmount}
                  onChange={handlePlanChange}
                  placeholder="100"
                  className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Lock (hari)</label>
                <input
                  name="lockPeriod"
                  type="number"
                  value={planForm.lockPeriod}
                  onChange={handlePlanChange}
                  placeholder="30"
                  className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Deskripsi Singkat</label>
              <textarea
                name="description"
                value={planForm.description}
                onChange={handlePlanChange}
                rows={3}
                className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                {editingPlanId ? 'Perbarui Paket' : 'Tambahkan Paket'}
              </Button>
              {editingPlanId && (
                <Button type="button" variant="secondary" onClick={resetPlanForm}>
                  Batalkan Edit
                </Button>
              )}
            </div>
          </form>
        </Card>

  <Card className="space-y-6">
          <SectionTitle
            title="Simulasi Portofolio"
            subtitle="Tambahkan saldo tabungan demo untuk presentasi"
            align="left"
            className="mb-0"
          />
          <form onSubmit={handleHoldingSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Pilih Paket</label>
              <select
                name="planId"
                value={holdingForm.planId}
                onChange={handleHoldingChange}
                className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
              >
                {plans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Nominal (USDT)</label>
                <input
                  name="amount"
                  type="number"
                  value={holdingForm.amount}
                  onChange={handleHoldingChange}
                  placeholder="500"
                  className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Tanggal Mulai</label>
                <input
                  name="startDate"
                  type="date"
                  value={holdingForm.startDate}
                  onChange={handleHoldingChange}
                  className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                {editingHoldingId ? 'Perbarui Tabungan' : 'Tambah Tabungan'}
              </Button>
              {editingHoldingId && (
                <Button type="button" variant="secondary" onClick={resetHoldingForm}>
                  Batalkan Edit
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>

  <Card className="space-y-4">
        <SectionTitle
          title="Daftar Paket"
          subtitle="CRUD produk tabungan untuk kebutuhan demo"
          align="left"
          className="mb-0"
        />
        {plans.length === 0 ? (
          <p className="text-sm text-white/60">Belum ada paket tabungan.</p>
        ) : (
          plans.map((plan) => (
            <div
              key={plan.id}
              className="flex flex-col gap-3 rounded-xl border border-white/10 bg-slate-800/40 px-4 py-4 text-sm text-white/80 md:flex-row md:items-center md:justify-between"
            >
              <div className="space-y-1">
                <p className="text-base font-semibold text-white">{plan.name}</p>
                <div className="flex flex-wrap gap-4 text-xs text-white/60 md:text-sm">
                  <span>APY: {plan.rate}%</span>
                  <span>Minimum: ${plan.minAmount}</span>
                  <span>Lock: {plan.lockPeriod} hari</span>
                  <span>{plan.description}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="secondary" onClick={() => handlePlanEdit(plan)}>
                  <Edit3 className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" onClick={() => handlePlanDelete(plan.id)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Hapus
                </Button>
              </div>
            </div>
          ))
        )}
      </Card>

  <Card className="space-y-4">
        <SectionTitle
          title="Portofolio Tabungan"
          subtitle="Edit atau hapus saldo tabungan yang tersimpan"
          align="left"
          className="mb-0"
        />
        {holdings.length === 0 ? (
          <p className="text-sm text-white/60">Belum ada tabungan aktif.</p>
        ) : (
          holdings.map((holding) => {
            const plan = plans.find((item) => item.id === holding.planId);
            return (
              <div
                key={holding.id}
                className="flex flex-col gap-3 rounded-xl border border-white/10 bg-slate-800/40 px-4 py-4 text-sm text-white/80 md:flex-row md:items-center md:justify-between"
              >
                <div className="space-y-1">
                  <p className="text-base font-semibold text-white">{plan?.name || 'Paket dihapus'}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-white/60 md:text-sm">
                    <span>Nominal: ${holding.amount}</span>
                    <span>Mulai: {holding.startDate}</span>
                    <span>Status: {holding.status}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="secondary" onClick={() => handleHoldingEdit(holding)}>
                    <Edit3 className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleHoldingDelete(holding.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Hapus
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </Card>
    </PageLayout>
  );
}
