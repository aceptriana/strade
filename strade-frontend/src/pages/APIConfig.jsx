import React, { useState } from 'react';
import { Zap, Shield, BookOpen, Edit3, Trash2, Save } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';
import PageLayout from '../components/PageLayout';

const defaultConnections = [
  {
    id: 'binance-primary',
    exchange: 'Binance',
    label: 'Primary Trading',
    apiKey: 'BINANCE-***-1234',
    status: 'Active'
  },
  {
    id: 'kucoin-backup',
    exchange: 'KuCoin',
    label: 'Backup Liquidity',
    apiKey: 'KUCOIN-***-9876',
    status: 'Inactive'
  }
];

export default function APIConfig({ onBack }) {
  const [connections, setConnections] = useState(defaultConnections);
  const [formState, setFormState] = useState({
    exchange: 'Binance',
    label: '',
    apiKey: '',
    secretKey: '',
    status: 'Active'
  });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormState({ exchange: 'Binance', label: '', apiKey: '', secretKey: '', status: 'Active' });
    setEditingId(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formState.apiKey.trim() || !formState.label.trim()) {
      return;
    }

    if (editingId) {
      setConnections((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                exchange: formState.exchange,
                label: formState.label,
                apiKey: maskKey(formState.apiKey),
                status: formState.status
              }
            : item
        )
      );
    } else {
      const newConnection = {
        id: `${formState.exchange.toLowerCase()}-${Date.now()}`,
        exchange: formState.exchange,
        label: formState.label,
        apiKey: maskKey(formState.apiKey),
        status: formState.status
      };

      setConnections((prev) => [...prev, newConnection]);
    }

    resetForm();
  };

  const maskKey = (key) => {
    if (!key) return '';
    const visible = key.slice(-4);
    return `${key.slice(0, 3).toUpperCase()}-***-${visible}`;
  };

  const handleEdit = (connection) => {
    setEditingId(connection.id);
    setFormState({
      exchange: connection.exchange,
      label: connection.label,
      apiKey: '',
      secretKey: '',
      status: connection.status
    });
  };

  const handleDelete = (id) => {
    setConnections((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleStatus = (id) => {
    setConnections((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: item.status === 'Active' ? 'Inactive' : 'Active' }
          : item
      )
    );
  };

  return (
    <PageLayout
      title="API Configuration"
      subtitle="Kelola koneksi exchange untuk kebutuhan demo"
      onBack={onBack}
      maxWidth="max-w-5xl"
    >
  <Card className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-84F7F0/30 bg-84F7F0/20">
            <Zap className="h-6 w-6 text-84F7F0" />
          </div>
          <SectionTitle
            title="Exchange API Keys"
            subtitle="Simulasikan penyimpanan kredensial trading untuk presentasi"
            align="left"
            className="mb-0"
          />
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Exchange</label>
              <select
                name="exchange"
                value={formState.exchange}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
              >
                <option>Binance</option>
                <option>KuCoin</option>
                <option>Huobi</option>
                <option>Bybit</option>
                {/* OKX removed per request */}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Label Koneksi</label>
              <input
                name="label"
                value={formState.label}
                onChange={handleChange}
                placeholder="Mis. Primary Trading"
                className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">API Key (Dummy)</label>
              <input
                name="apiKey"
                value={formState.apiKey}
                onChange={handleChange}
                placeholder="Masukkan key untuk demo"
                className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Secret Key (Dummy)</label>
              <input
                name="secretKey"
                type="password"
                value={formState.secretKey}
                onChange={handleChange}
                placeholder="Opsional untuk simulasi"
                className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Status</label>
              <select
                name="status"
                value={formState.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              {editingId ? 'Perbarui Koneksi' : 'Tambahkan Koneksi'}
            </Button>
            {editingId && (
              <Button type="button" variant="secondary" onClick={resetForm}>
                Batalkan Edit
              </Button>
            )}
          </div>
        </form>
        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4 text-xs text-white/70 md:text-sm">
          <div className="flex items-start gap-3">
            <Shield className="mt-0.5 h-5 w-5 text-blue-300" />
            <p>Kredensial yang dimasukkan hanya disimpan di state lokal untuk keperluan demo. Tidak ada data yang dikirim ke server.</p>
          </div>
        </div>
      </Card>

  <Card className="space-y-6">
        <SectionTitle
          title="Daftar Koneksi"
          subtitle="Aktifkan, ubah, atau hapus koneksi exchange demo"
          align="left"
          className="mb-0"
        />
        <div className="space-y-3">
          {connections.length === 0 ? (
            <p className="text-sm text-white/60">Belum ada koneksi yang tercatat.</p>
          ) : (
            connections.map((connection) => (
              <div
                key={connection.id}
                className="flex flex-col gap-3 rounded-xl border border-white/10 bg-slate-800/40 px-4 py-4 text-sm text-white/80 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="text-base font-semibold text-white">{connection.exchange}</p>
                  <p className="text-sm text-white/60">{connection.label}</p>
                  <p className="text-xs text-white/50">API Key: {connection.apiKey}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      connection.status === 'Active'
                        ? 'border border-84F7F0/40 bg-84F7F0/10 text-84F7F0'
                        : 'border border-yellow-400/30 bg-yellow-400/10 text-yellow-100'
                    }`}
                  >
                    {connection.status}
                  </span>
                  <Button size="sm" variant="secondary" onClick={() => toggleStatus(connection.id)}>
                    {connection.status === 'Active' ? 'Nonaktifkan' : 'Aktifkan'}
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => handleEdit(connection)}>
                    <Edit3 className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDelete(connection.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Hapus
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

  <Card className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-orange-400/30 bg-orange-500/20">
            <BookOpen className="h-6 w-6 text-orange-300" />
          </div>
          <SectionTitle
            title="Langkah Mendapatkan API"
            subtitle="Gunakan panduan ini saat demo onboarding"
            align="left"
            className="mb-0"
          />
        </div>
        <div className="space-y-4">
          {[
            'Masuk ke akun exchange dan buka menu API Management.',
            'Buat API key baru dan pilih izin Trading (Read/Write).',
            'Aktifkan whitelist IP bila tersedia untuk keamanan tambahan.',
            'Salin API Key dan Secret Key ke formulir STRADE.'
          ].map((step, index) => (
            <div key={index} className="flex gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-84F7F0/30 bg-84F7F0/20">
                <span className="text-sm font-bold text-84F7F0">{index + 1}</span>
              </div>
              <p className="text-sm text-white/70 md:text-base">{step}</p>
            </div>
          ))}
        </div>
      </Card>
    </PageLayout>
  );
}
