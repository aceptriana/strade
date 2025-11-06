import React, { useMemo, useState } from 'react';
import { Edit3, Trash2, Save } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';
import PageLayout from '../components/PageLayout';

const defaultProfiles = [
  { id: 'bnb-discount', label: 'BNB Discount', rate: 0.1, discount: 25, payWithBNB: true },
  { id: 'standard-usdt', label: 'Standard Fee', rate: 0.1, discount: 0, payWithBNB: false }
];

const defaultSavings = [
  { id: 'jan', month: 'Januari 2025', totalFees: 42, savings: 10.5 },
  { id: 'feb', month: 'Februari 2025', totalFees: 18, savings: 4.5 }
];

export default function BNBFeeSetting({ onBack }) {
  const [profiles, setProfiles] = useState(defaultProfiles);
  const [selectedProfileId, setSelectedProfileId] = useState(defaultProfiles[0].id);
  const [formState, setFormState] = useState({ label: '', rate: '', discount: '', payWithBNB: false });
  const [editingId, setEditingId] = useState(null);
  const [savings, setSavings] = useState(defaultSavings);
  const [bnbBalance, setBnbBalance] = useState(0);

  const currentProfile = useMemo(() => profiles.find((item) => item.id === selectedProfileId) || profiles[0], [profiles, selectedProfileId]);

  const totalSavings = useMemo(() => savings.reduce((acc, item) => acc + Number(item.savings || 0), 0), [savings]);

  const handleFormChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormState((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formState.label.trim()) return;

    const payload = {
      id: editingId || formState.label.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      label: formState.label,
      rate: Number(formState.rate || 0),
      discount: Number(formState.discount || 0),
      payWithBNB: formState.payWithBNB
    };

    setProfiles((prev) => {
      if (editingId) {
        return prev.map((profile) => (profile.id === editingId ? payload : profile));
      }
      return [...prev, payload];
    });

    if (!editingId) {
      setSelectedProfileId(payload.id);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormState({ label: '', rate: '', discount: '', payWithBNB: false });
    setEditingId(null);
  };

  const handleEdit = (profile) => {
    setEditingId(profile.id);
    setFormState({
      label: profile.label,
      rate: profile.rate.toString(),
      discount: profile.discount.toString(),
      payWithBNB: profile.payWithBNB
    });
  };

  const handleDelete = (id) => {
    setProfiles((prev) => prev.filter((profile) => profile.id !== id));
    if (selectedProfileId === id && profiles.length > 1) {
      const fallback = profiles.find((profile) => profile.id !== id);
      setSelectedProfileId(fallback?.id || '');
    }
  };

  const handleSavingsChange = (event, id, field) => {
    const value = Number(event.target.value || 0);
    setSavings((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  return (
    <PageLayout
      title="BNB Fee Setting"
      subtitle="Simulasikan diskon fee berbasis BNB untuk kebutuhan demo"
      onBack={onBack}
      maxWidth="max-w-4xl"
    >
      {currentProfile && (
  <Card className="space-y-2">
          <p className="text-sm font-semibold text-white/70">Fee Rate Aktif</p>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-black text-white md:text-5xl">{currentProfile.rate}%</span>
            {currentProfile.payWithBNB && (
              <span className="rounded-full border border-84F7F0/30 bg-84F7F0/10 px-3 py-1 text-xs font-semibold text-84F7F0">
                Diskon {currentProfile.discount}%
              </span>
            )}
          </div>
          <p className="text-sm text-white/60">
            {currentProfile.payWithBNB ? 'Pembayaran menggunakan BNB akan menurunkan biaya trading.' : 'Menggunakan stablecoin standar tanpa diskon tambahan.'}
          </p>
        </Card>
      )}

  <Card className="space-y-6">
        <SectionTitle
          title="Pilihan Fee"
          subtitle="Kelola opsi pembayaran fee untuk presentasi"
          align="left"
          className="mb-0"
        />
        <div className="space-y-3">
          {profiles.map((profile) => (
            <label
              key={profile.id}
              className={`flex cursor-pointer flex-col gap-2 rounded-xl border px-4 py-4 text-sm text-white/80 transition-colors ${
                selectedProfileId === profile.id
                  ? 'border-84F7F0/40 bg-84F7F0/10'
                  : 'border-white/10 bg-slate-800/40 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="fee-profile"
                    checked={selectedProfileId === profile.id}
                    onChange={() => setSelectedProfileId(profile.id)}
                    className="h-4 w-4 accent-84F7F0"
                  />
                  <span className="text-base font-semibold text-white">{profile.label}</span>
                </div>
                <span className="text-xs text-white/60">{profile.payWithBNB ? 'Bayar dengan BNB' : 'Bayar dengan USDT'}</span>
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-white/60 md:text-sm">
                <span>Rate: {profile.rate}%</span>
                <span>Diskon: {profile.discount}%</span>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="secondary" onClick={() => handleEdit(profile)}>
                  <Edit3 className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(profile.id)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Hapus
                </Button>
              </div>
            </label>
          ))}
        </div>
      </Card>

  <Card className="space-y-6">
        <SectionTitle
          title="Tambah Profil Fee"
          subtitle="CRUD opsi fee tanpa koneksi backend"
          align="left"
          className="mb-0"
        />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Nama Profil</label>
              <input
                name="label"
                value={formState.label}
                onChange={handleFormChange}
                placeholder="Mis. High Volume"
                className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Tarif Fee (%)</label>
              <input
                name="rate"
                type="number"
                step="0.01"
                value={formState.rate}
                onChange={handleFormChange}
                placeholder="0.1"
                className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Diskon (%)</label>
              <input
                name="discount"
                type="number"
                step="0.1"
                value={formState.discount}
                onChange={handleFormChange}
                placeholder="25"
                className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Metode Pembayaran</label>
              <label className="flex items-center gap-3 rounded-xl border border-white/15 bg-slate-800/40 px-3 py-3 text-sm text-white/70">
                <input
                  type="checkbox"
                  name="payWithBNB"
                  checked={formState.payWithBNB}
                  onChange={handleFormChange}
                  className="h-4 w-4 accent-84F7F0"
                />
                Bayar menggunakan BNB
              </label>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              {editingId ? 'Perbarui Profil' : 'Tambahkan Profil'}
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
          title="Saldo BNB"
          subtitle="Edit saldo demo untuk menyesuaikan simulasi"
          align="left"
          className="mb-0"
        />
        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-800/40 p-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-white/60">Saldo Tersedia</p>
            <p className="text-2xl font-semibold text-white">{bnbBalance.toFixed(2)} BNB</p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" onClick={() => setBnbBalance((value) => value + 0.5)}>
              Tambah 0.5 BNB
            </Button>
            <Button size="sm" variant="outline" onClick={() => setBnbBalance(0)}>
              Reset
            </Button>
          </div>
        </div>
      </Card>

  <Card className="space-y-4">
        <SectionTitle
          title="Penghematan Fee"
          subtitle="Kustomisasi data untuk demo laporan biaya"
          align="left"
          className="mb-0"
        />
        {savings.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-3 rounded-xl border border-white/10 bg-slate-800/40 px-4 py-4 text-sm text-white/80 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <p className="text-base font-semibold text-white">{item.month}</p>
              <div className="flex flex-wrap gap-4 text-xs text-white/60 md:text-sm">
                <label className="flex items-center gap-2">
                  <span>Total Fee:</span>
                  <input
                    type="number"
                    value={item.totalFees}
                    onChange={(event) => handleSavingsChange(event, item.id, 'totalFees')}
                    className="w-24 rounded-lg border border-white/15 bg-slate-900/60 px-2 py-1 text-xs text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
                  />
                </label>
                <label className="flex items-center gap-2">
                  <span>Saving:</span>
                  <input
                    type="number"
                    value={item.savings}
                    onChange={(event) => handleSavingsChange(event, item.id, 'savings')}
                    className="w-24 rounded-lg border border-white/15 bg-slate-900/60 px-2 py-1 text-xs text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
                  />
                </label>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-white/60">Efektivitas Diskon</p>
              <p className="text-lg font-semibold text-84F7F0">{item.totalFees ? ((item.savings / item.totalFees) * 100).toFixed(1) : 0}%</p>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-800/40 px-4 py-3 text-sm text-white/70">
          <span>Total penghematan demo</span>
          <strong className="text-white">${totalSavings.toFixed(2)}</strong>
        </div>
      </Card>
    </PageLayout>
  );
}
