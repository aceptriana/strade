import React, { useMemo, useState } from 'react';
import { Plus, CreditCard, TrendingDown, History, Edit3, Trash2, Save } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import SectionTitle from '../components/SectionTitle';
import StatBox from '../components/StatBox';
import PageLayout from '../components/PageLayout';

const defaultTransactions = [
  { id: 'tx-1', type: 'Top Up', amount: 500, note: 'Initial funding', date: '2025-01-01' },
  { id: 'tx-2', type: 'Usage', amount: -120, note: 'Monthly subscription', date: '2025-02-01' }
];

export default function Credit({ onBack }) {
  const [transactions, setTransactions] = useState(defaultTransactions);
  const [transactionForm, setTransactionForm] = useState({ type: 'Top Up', amount: '', note: '', date: '' });
  const [editingId, setEditingId] = useState(null);

  const balance = useMemo(
    () => transactions.reduce((sum, tx) => sum + Number(tx.amount || 0), 0),
    [transactions]
  );

  const monthlyUsage = useMemo(
    () => transactions.filter((tx) => tx.type === 'Usage').reduce((sum, tx) => sum + Math.abs(Number(tx.amount || 0)), 0),
    [transactions]
  );

  const topUps = useMemo(
    () => transactions.filter((tx) => tx.type === 'Top Up').reduce((sum, tx) => sum + Number(tx.amount || 0), 0),
    [transactions]
  );

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setTransactionForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setTransactionForm({ type: 'Top Up', amount: '', note: '', date: '' });
    setEditingId(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!transactionForm.amount) return;

    const amountValue = Number(transactionForm.amount || 0);
    const signedAmount = transactionForm.type === 'Usage' ? -Math.abs(amountValue) : Math.abs(amountValue);

    const payload = {
      id: editingId || `tx-${Date.now()}`,
      type: transactionForm.type,
      amount: signedAmount,
      note: transactionForm.note,
      date: transactionForm.date || new Date().toISOString().slice(0, 10)
    };

    setTransactions((prev) => {
      if (editingId) {
        return prev.map((tx) => (tx.id === editingId ? payload : tx));
      }
      return [payload, ...prev];
    });

    resetForm();
  };

  const handleEdit = (transaction) => {
    setEditingId(transaction.id);
    setTransactionForm({
      type: transaction.type,
      amount: Math.abs(transaction.amount).toString(),
      note: transaction.note,
      date: transaction.date
    });
  };

  const handleDelete = (id) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  };

  return (
    <PageLayout
      title="Credit Management"
      subtitle="Kelola saldo kredit dan riwayat transaksi"
      onBack={onBack}
      maxWidth="max-w-6xl"
    >
  <Card className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-84F7F0 to-000000">
          <CreditCard className="h-8 w-8 text-white" />
        </div>
        <SectionTitle
          title="Saldo Kredit"
          subtitle="Digunakan untuk biaya trading dan langganan bot"
          align="center"
          className="mb-4 mt-6"
        />
        <div className="flex items-baseline justify-center gap-2">
          <span className="text-4xl font-black text-white md:text-5xl">${balance.toFixed(2)}</span>
          <span className="text-lg text-white/70 md:text-xl">USD</span>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatBox
          title="Total Top Up"
          value={`$${topUps.toFixed(2)}`}
          change="Seluruh tambahan kredit"
          changeType="neutral"
          icon={<Plus className="h-5 w-5" />}
          color="from-84F7F0 to-000000"
        />
        <StatBox
          title="Penggunaan"
          value={`$${monthlyUsage.toFixed(2)}`}
          change="Biaya langganan & fee"
          changeType="neutral"
          icon={<TrendingDown className="h-5 w-5" />}
          color="from-red-500 to-pink-500"
        />
        <StatBox
          title="Transaksi"
          value={transactions.length.toString()}
          change="Riwayat bulan berjalan"
          changeType="neutral"
          icon={<History className="h-5 w-5" />}
          color="from-blue-500 to-cyan-500"
        />
      </div>

  <Card className="space-y-6">
        <SectionTitle
          title="Tambah Transaksi"
          subtitle="Simulasi top up atau penggunaan kredit"
          align="left"
          className="mb-0"
        />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Tipe Transaksi</label>
              <select
                name="type"
                value={transactionForm.type}
                onChange={handleFormChange}
                className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
              >
                <option>Top Up</option>
                <option>Usage</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Nominal (USD)</label>
              <input
                name="amount"
                type="number"
                value={transactionForm.amount}
                onChange={handleFormChange}
                placeholder="100"
                className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Tanggal</label>
              <input
                name="date"
                type="date"
                value={transactionForm.date}
                onChange={handleFormChange}
                className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Catatan</label>
              <input
                name="note"
                value={transactionForm.note}
                onChange={handleFormChange}
                placeholder="Mis. biaya langganan"
                className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              {editingId ? 'Perbarui Transaksi' : 'Tambah Transaksi'}
            </Button>
            {editingId && (
              <Button type="button" variant="secondary" onClick={resetForm}>
                Batalkan Edit
              </Button>
            )}
          </div>
        </form>
      </Card>

  <Card className="space-y-4">
        <SectionTitle
          title="Riwayat Transaksi"
          subtitle="Data CRUD disimpan di state lokal"
          align="left"
          className="mb-0"
        />
        {transactions.length === 0 ? (
          <p className="text-sm text-white/60">Belum ada transaksi tercatat.</p>
        ) : (
          transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex flex-col gap-3 rounded-xl border border-white/10 bg-slate-800/40 px-4 py-4 text-sm text-white/80 md:flex-row md:items-center md:justify-between"
            >
              <div className="space-y-1">
                <p className="text-base font-semibold text-white">{tx.type}</p>
                <div className="flex flex-wrap gap-4 text-xs text-white/60 md:text-sm">
                  <span>Tanggal: {tx.date}</span>
                  <span>Nominal: ${Math.abs(tx.amount).toFixed(2)}</span>
                  <span>Catatan: {tx.note || '-'}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="secondary" onClick={() => handleEdit(tx)}>
                  <Edit3 className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleDelete(tx.id)}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Hapus
                </Button>
              </div>
            </div>
          ))
        )}
      </Card>
    </PageLayout>
  );
}
