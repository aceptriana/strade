import React, { useMemo, useState } from 'react';
import { Gift, Users, TrendingUp, Edit3, Trash2, Save } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';
import StatBox from '../components/StatBox';
import PageLayout from '../components/PageLayout';

const defaultCampaigns = [
  { id: 'trading-volume', name: 'Trading Volume', reward: 0, rate: 0.1, description: '0.1% per trade' },
  { id: 'referral', name: 'Referral Bonus', reward: 0, rate: 10, description: '10% commission' },
  { id: 'daily-login', name: 'Daily Login', reward: 0, rate: 0.1, description: '+$0.10/day' },
  { id: 'milestone', name: 'Milestone Reward', reward: 0, rate: 50, description: 'Unlocked at $1000 volume' }
];

export default function Cashback({ onBack }) {
  const [campaigns, setCampaigns] = useState(defaultCampaigns);
  const [formState, setFormState] = useState({ name: '', rate: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [referralCode, setReferralCode] = useState('STRADE-INVITE-2025');

  const totalReward = useMemo(
    () => campaigns.reduce((sum, item) => sum + Number(item.reward || 0), 0),
    [campaigns]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formState.name.trim()) return;

    const payload = {
      id: editingId || `${formState.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`,
      name: formState.name,
      reward: 0,
      rate: Number(formState.rate || 0),
      description: formState.description
    };

    setCampaigns((prev) => {
      if (editingId) {
        return prev.map((item) => (item.id === editingId ? { ...item, ...payload } : item));
      }
      return [...prev, payload];
    });

    resetForm();
  };

  const resetForm = () => {
    setFormState({ name: '', rate: '', description: '' });
    setEditingId(null);
  };

  const handleEdit = (campaign) => {
    setEditingId(campaign.id);
    setFormState({ name: campaign.name, rate: campaign.rate.toString(), description: campaign.description });
  };

  const handleDelete = (id) => {
    setCampaigns((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <PageLayout
      title="Cashback & Rewards"
      subtitle="Atur struktur cashback demo dan kelola kampanye promosi"
      onBack={onBack}
      maxWidth="max-w-6xl"
    >
  <Card className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-84F7F0 to-000000">
          <Gift className="h-8 w-8 text-white" />
        </div>
        <SectionTitle
          title="Total Cashback Terkumpul"
          subtitle="Nilai otomatis berdasarkan data kampanye demo"
          align="center"
          className="mb-4 mt-6"
        />
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-4xl font-black text-white md:text-5xl">${totalReward.toFixed(2)}</span>
          <span className="text-lg text-white/70 md:text-xl">USD</span>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatBox
          title="Trading Rewards"
          value={`$${campaigns[0]?.reward.toFixed(2) ?? '0.00'}`}
          change={`${campaigns[0]?.rate ?? 0}% rate`}
          changeType="neutral"
          icon={<TrendingUp className="h-5 w-5" />}
          color="from-84F7F0 to-000000"
        />
        <StatBox
          title="Referral Bonus"
          value={`$${campaigns[1]?.reward.toFixed(2) ?? '0.00'}`}
          change={`${campaigns[1]?.rate ?? 0}% commission`}
          changeType="neutral"
          icon={<Users className="h-5 w-5" />}
          color="from-blue-500 to-cyan-500"
        />
        <StatBox
          title="Daily Login"
          value={`$${campaigns[2]?.reward.toFixed(2) ?? '0.00'}`}
          change={`+$${(campaigns[2]?.rate ?? 0).toFixed(2)}/day`}
          changeType="neutral"
          icon={<Gift className="h-5 w-5" />}
          color="from-purple-500 to-pink-500"
        />
        <StatBox
          title="Milestones"
          value={`$${campaigns[3]?.reward.toFixed(2) ?? '0.00'}`}
          change={`Target: $1000 volume`}
          changeType="neutral"
          icon={<TrendingUp className="h-5 w-5" />}
          color="from-orange-500 to-red-500"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
  <Card className="space-y-6">
          <SectionTitle
            title="Kelola Kampanye"
            subtitle="Tambah, perbarui, atau hapus skema cashback untuk demo"
            align="left"
            className="mb-0"
          />
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Nama Kampanye</label>
              <input
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="Contoh: VIP Cashback"
                className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Rate (%)</label>
                <input
                  name="rate"
                  type="number"
                  step="0.01"
                  value={formState.rate}
                  onChange={handleChange}
                  placeholder="0.50"
                  className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Deskripsi</label>
                <input
                  name="description"
                  value={formState.description}
                  onChange={handleChange}
                  placeholder="Contoh: Berlaku untuk tier Gold"
                  className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                {editingId ? 'Perbarui Kampanye' : 'Tambahkan Kampanye'}
              </Button>
              {editingId && (
                <Button type="button" variant="secondary" onClick={resetForm}>
                  Batalkan Edit
                </Button>
              )}
            </div>
          </form>
        </Card>

  <Card className="space-y-6">
          <SectionTitle
            title="Program Referral"
            subtitle="Atur kode referral untuk presentasi demo"
            align="left"
            className="mb-0"
          />
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Users className="h-5 w-5 text-84F7F0" />
              <span className="text-sm text-white/70 md:text-base">Kode Referral Saat Ini</span>
            </div>
            <div className="flex flex-col gap-3 md:flex-row">
              <input
                value={referralCode}
                onChange={(event) => setReferralCode(event.target.value)}
                className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
              />
              <Button variant="secondary" className="md:w-40">
                Salin Kode
              </Button>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-800/40 p-4 text-sm text-white/70">
              Bagikan kode ini untuk simulasi komisi 10% dari biaya trading referral Anda.
            </div>
          </div>
        </Card>
      </div>

  <Card className="space-y-4">
        <SectionTitle
          title="Daftar Kampanye"
          subtitle="Data dummy untuk kebutuhan CRUD demo"
          align="left"
          className="mb-0"
        />
        {campaigns.length === 0 ? (
          <p className="text-sm text-white/60">Belum ada kampanye terdaftar.</p>
        ) : (
          campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="flex flex-col gap-3 rounded-xl border border-white/10 bg-slate-800/40 px-4 py-4 text-sm text-white/80 md:flex-row md:items-center md:justify-between"
            >
              <div className="space-y-1">
                <p className="text-base font-semibold text-white">{campaign.name}</p>
                <div className="flex flex-wrap gap-3 text-xs text-white/60 md:text-sm">
                  <span>Rate: {campaign.rate}%</span>
                  <span>Reward: ${campaign.reward.toFixed(2)}</span>
                  <span>{campaign.description}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="secondary" onClick={() => handleEdit(campaign)}>
                  <Edit3 className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(campaign.id)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Hapus
                </Button>
              </div>
            </div>
          ))
        )}
      </Card>

  <Card className="space-y-6">
        <SectionTitle
          title="Penarikan Cashback"
          subtitle="Simulasi proses withdraw untuk presentasi"
          align="left"
          className="mb-0"
        />
        <Button className="w-full" disabled>
          Withdraw ${totalReward.toFixed(2)}
        </Button>
        <p className="text-center text-xs text-white/60 md:text-sm">Minimum withdraw $10. Tambahkan saldo demo untuk mengaktifkan tombol.</p>
      </Card>
    </PageLayout>
  );
}
