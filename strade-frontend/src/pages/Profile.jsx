import React, { useMemo, useState } from 'react';
import {
  CalendarDays,
  CheckCircle2,
  Mail,
  Phone,
  ShieldCheck,
  Key,
  MapPin,
  IdCard,
  Lock,
  Clock3,
  Image as ImageIcon,
  Edit3,
  Trash2,
  Save,
  User as UserIcon
} from 'lucide-react';
import Card from '../components/Card';
import SectionTitle from '../components/SectionTitle';
import Button from '../components/Button';
import PageLayout from '../components/PageLayout';

const initialProfile = {
  name: 'Alya Prananda',
  email: 'alya.prananda@bidbox.ai',
  phone: '+62 812-3456-7890',
  country: 'Indonesia',
  memberSince: '12 Februari 2024',
  activationStatus: 'Active',
  activationCode: 'INVITE-9XQ4',
  lastLogin: '06 November 2025, 08:15 WIB',
  avatarUrl: ''
};

const initialKyc = [
  { id: 'identity', label: 'Identitas Pribadi', status: 'Sudah terverifikasi', state: 'verified' },
  { id: 'face', label: 'Verifikasi Wajah', status: 'Sudah terverifikasi', state: 'verified' },
  { id: 'address', label: 'Alamat Domisili', status: 'Menunggu konfirmasi', state: 'pending' }
];

const initialContacts = [
  { id: 'email', type: 'Email', value: initialProfile.email, primary: true },
  { id: 'phone', type: 'Telepon', value: initialProfile.phone, primary: true }
];

export default function Profile({ onBack }) {
  const [profile, setProfile] = useState(initialProfile);
  const [basicForm, setBasicForm] = useState(initialProfile);
  const [contacts, setContacts] = useState(initialContacts);
  const [contactForm, setContactForm] = useState({ type: 'Email', value: '' });
  const [editingContactId, setEditingContactId] = useState(null);
  const [kycChecklist, setKycChecklist] = useState(initialKyc);
  const [passwordForm, setPasswordForm] = useState({ current: '', newPassword: '', confirm: '' });
  const [lastPasswordUpdate, setLastPasswordUpdate] = useState('Belum pernah diperbarui');

  // Edit mode states
  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false);

  const initials = useMemo(() => profile.name.split(' ').map((part) => part[0]).join('').slice(0, 2), [profile.name]);

  const handleBasicChange = (event) => {
    const { name, value } = event.target;
    setBasicForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBasicSubmit = (event) => {
    event.preventDefault();
    setProfile((prev) => ({ ...prev, ...basicForm }));
    setContacts((prev) =>
      prev.map((item) => {
        if (item.id === 'email') {
          return { ...item, value: basicForm.email };
        }
        if (item.id === 'phone') {
          return { ...item, value: basicForm.phone };
        }
        return item;
      })
    );
  };

  const resetBasicForm = () => {
    setBasicForm(profile);
  };

  const handleAvatarSubmit = (event) => {
    event.preventDefault();
    setProfile((prev) => ({ ...prev, avatarUrl: basicForm.avatarUrl || '' }));
  };

  const handleContactChange = (event) => {
    const { name, value } = event.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();
    if (!contactForm.value.trim()) return;

    if (editingContactId) {
      setContacts((prev) =>
        prev.map((item) => (item.id === editingContactId ? { ...item, ...contactForm } : item))
      );
      setEditingContactId(null);
    } else {
      const newContact = {
        id: `${contactForm.type.toLowerCase()}-${Date.now()}`,
        ...contactForm,
        primary: false
      };
      setContacts((prev) => [...prev, newContact]);
    }

    setContactForm({ type: 'Email', value: '' });
  };

  const handleEditContact = (contact) => {
    setEditingContactId(contact.id);
    setContactForm({ type: contact.type, value: contact.value });
  };

  const handleDeleteContact = (contactId) => {
    setContacts((prev) => prev.filter((item) => item.id !== contactId));
  };

  const handleKycStateChange = (id, nextState) => {
    setKycChecklist((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              state: nextState,
              status:
                nextState === 'verified'
                  ? 'Sudah terverifikasi'
                  : nextState === 'pending'
                  ? 'Menunggu konfirmasi'
                  : 'Ditolak'
            }
          : item
      )
    );
  };

  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    if (!passwordForm.newPassword || passwordForm.newPassword !== passwordForm.confirm) {
      return;
    }

    const timestamp = new Intl.DateTimeFormat('id-ID', {
      dateStyle: 'long',
      timeStyle: 'short'
    }).format(new Date());

    setLastPasswordUpdate(timestamp);
    setPasswordForm({ current: '', newPassword: '', confirm: '' });
  };

  return (
    <PageLayout
      title="Profil Pengguna"
      subtitle="Kelola identitas, kontak, dan kredensial akun BIDBOX"
      onBack={onBack}
      actions={<Button variant="secondary" size="sm" className="hidden sm:inline-flex">Unduh Laporan Profil</Button>}
      maxWidth="max-w-6xl"
      contentClassName="space-y-6 sm:space-y-8"
    >
  <Card className="">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <div className="relative h-24 w-24 overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-84F7F0 to-000000">
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt={profile.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-white">
                  {initials}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <UserIcon className="h-5 w-5 text-84F7F0" />
                <h2 className="text-2xl font-semibold text-white">{profile.name}</h2>
              </div>
              <p className="text-sm text-white/60 md:text-base">Anggota sejak {profile.memberSince}</p>
              <div className="inline-flex items-center gap-2 rounded-full border border-84F7F0/40 bg-84F7F0/10 px-3 py-1 text-xs text-84F7F0 md:text-sm">
                <CheckCircle2 className="h-4 w-4" />
                {kycChecklist.every((item) => item.state === 'verified') ? 'KYC Lengkap' : 'KYC Proses' }
              </div>
            </div>
          </div>
          <div className="space-y-2 text-sm text-white/70 md:text-base">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-84F7F0" />
              <span>{profile.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-84F7F0" />
              <span>{profile.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-84F7F0" />
              <span>Login terakhir: {profile.lastLogin}</span>
            </div>
          </div>
        </div>
      </Card>

  <Card className="">
        <SectionTitle
          title="Informasi Dasar"
          subtitle="Perbarui nama, kontak utama, dan negara domisili"
          align="left"
          className="mb-6"
        />
        <form onSubmit={handleBasicSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Nama Lengkap</label>
              <input
                name="name"
                value={basicForm.name}
                onChange={handleBasicChange}
                className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Email</label>
              <input
                type="email"
                name="email"
                value={basicForm.email}
                onChange={handleBasicChange}
                className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Nomor Telepon</label>
              <input
                name="phone"
                value={basicForm.phone}
                onChange={handleBasicChange}
                className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Negara</label>
              <input
                name="country"
                value={basicForm.country}
                onChange={handleBasicChange}
                className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
              />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" />
              Simpan Profil
            </Button>
            <Button type="button" variant="secondary" onClick={resetBasicForm}>
              Reset Perubahan
            </Button>
          </div>
        </form>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
  <Card className="space-y-6">
          <SectionTitle
            title="Foto & Avatar"
            subtitle="Gunakan URL gambar untuk mengatur foto demo"
            align="left"
            className="mb-0"
          />
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/15 bg-slate-900/60">
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt="Avatar" className="h-full w-full rounded-2xl object-cover" />
              ) : (
                <ImageIcon className="h-8 w-8 text-white/40" />
              )}
            </div>
            <p className="text-sm text-white/60 md:text-base">
              Untuk keperluan demo, tempel URL gambar (mis. dari CDN) untuk mengganti foto profil tanpa upload.
            </p>
          </div>
          <form onSubmit={handleAvatarSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Avatar URL</label>
              <input
                name="avatarUrl"
                value={basicForm.avatarUrl || ''}
                onChange={handleBasicChange}
                placeholder="https://.../avatar.png"
                className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit">
                Perbarui Foto
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setBasicForm((prev) => ({ ...prev, avatarUrl: '' }))}
              >
                Gunakan Inisial
              </Button>
            </div>
          </form>
        </Card>

  <Card className="space-y-6">
          <SectionTitle
            title="Kata Sandi"
            subtitle="Permbarui password akun demo"
            align="left"
            className="mb-0"
          />
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/70">Password Saat Ini</label>
              <input
                type="password"
                name="current"
                value={passwordForm.current}
                onChange={handlePasswordChange}
                className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Password Baru</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Konfirmasi Password</label>
                <input
                  type="password"
                  name="confirm"
                  value={passwordForm.confirm}
                  onChange={handlePasswordChange}
                  className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit">Perbarui Password</Button>
              <span className="text-sm text-white/50">Terakhir diperbarui: {lastPasswordUpdate}</span>
            </div>
          </form>
        </Card>
      </div>

  <Card className="space-y-6">
        <SectionTitle
          title="Kontak Tambahan"
          subtitle="Tambahkan alamat email cadangan atau kontak darurat"
          align="left"
          className="mb-0"
        />
        <form onSubmit={handleContactSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-4 md:items-end">
          <div className="space-y-2 md:col-span-1">
            <label className="text-sm font-medium text-white/70">Tipe</label>
            <select
              name="type"
              value={contactForm.type}
              onChange={handleContactChange}
              className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
            >
              <option>Email</option>
              <option>Telepon</option>
              <option>Telegram</option>
              <option>WhatsApp</option>
            </select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium text-white/70">Detail Kontak</label>
            <input
              name="value"
              value={contactForm.value}
              onChange={handleContactChange}
              placeholder="Masukkan detail kontak"
              className="w-full rounded-xl border border-white/15 bg-slate-800/60 px-3 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
            />
          </div>
          <div className="md:col-span-1">
            <Button type="submit" className="w-full">
              {editingContactId ? 'Perbarui' : 'Tambahkan'}
            </Button>
          </div>
        </form>
        <div className="space-y-3">
          {contacts.length === 0 ? (
            <p className="text-sm text-white/60">Belum ada kontak tambahan.</p>
          ) : (
            contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex flex-col gap-3 rounded-xl border border-white/10 bg-slate-800/40 px-4 py-4 text-sm text-white/80 md:flex-row md:items-center md:justify-between"
              >
                <div className="space-y-1">
                  <p className="font-semibold text-white">{contact.type}</p>
                  <p>{contact.value}</p>
                  {contact.primary && <span className="text-xs text-84F7F0">Kontak utama</span>}
                </div>
                {!contact.primary && (
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="secondary" onClick={() => handleEditContact(contact)}>
                      <Edit3 className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDeleteContact(contact.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Hapus
                    </Button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </Card>

  <Card className="space-y-6">
        <SectionTitle
          title="Status KYC"
          subtitle="Atur status verifikasi untuk kebutuhan demo onboarding"
          align="left"
          className="mb-0"
        />
        <div className="space-y-4">
          {kycChecklist.map((item) => {
            const isVerified = item.state === 'verified';
            return (
              <div
                key={item.id}
                className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-800/40 px-4 py-4 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-slate-900/60">
                    {item.id === 'identity' && <IdCard className="h-5 w-5 text-84F7F0" />}
                    {item.id === 'face' && <ShieldCheck className="h-5 w-5 text-84F7F0" />}
                    {item.id === 'address' && <MapPin className="h-5 w-5 text-amber-300" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white md:text-base">{item.label}</p>
                    <p className={`text-xs md:text-sm ${isVerified ? 'text-84F7F0' : 'text-amber-200'}`}>{item.status}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={item.state}
                    onChange={(event) => handleKycStateChange(item.id, event.target.value)}
                    className="rounded-xl border border-white/15 bg-slate-800/60 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-84F7F0"
                  >
                    <option value="verified">Verified</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <div className={`flex items-center gap-2 text-xs md:text-sm ${isVerified ? 'text-84F7F0' : 'text-amber-200'}`}>
                    {isVerified ? <CheckCircle2 className="h-5 w-5" /> : <Clock3 className="h-5 w-5" />}
                    <span>{isVerified ? 'Selesai' : 'Proses'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
  <Card className="space-y-6">
          <SectionTitle
            title="Aktivasi Akun"
            subtitle="Hanya pengguna dengan kode aktivasi resmi yang dapat login"
            align="left"
            className="mb-0"
          />
          <div className="space-y-4">
            <div className="rounded-2xl border border-84F7F0/40 bg-84F7F0/10 px-4 py-3">
              <p className="text-sm font-semibold text-white md:text-base">Status Aktivasi</p>
              <p className="mt-1 flex items-center gap-2 text-xs text-white/70 md:text-sm">
                <Key className="h-4 w-4 text-84F7F0" />
                {profile.activationStatus} dengan kode {profile.activationCode}
              </p>
            </div>
            <ul className="list-disc space-y-2 pl-5 text-xs text-white/70 md:text-sm">
              <li>Akun hanya dapat dibuat menggunakan kode aktivasi resmi BIDBOX.</li>
              <li>Kode aktivasi dikirim setelah onboarding manual selesai.</li>
              <li>Login tersedia bagi pengguna terverifikasi dengan kode aktif.</li>
            </ul>
          </div>
        </Card>

  <Card className="space-y-6">
          <SectionTitle
            title="Preferensi Keamanan"
            subtitle="Catat perubahan untuk kebutuhan demo audit"
            align="left"
            className="mb-0"
          />
          <div className="space-y-4 text-sm text-white/70 md:text-base">
            <div className="flex items-start gap-3">
              <Lock className="mt-1 h-5 w-5 text-84F7F0" />
              <div>
                <p className="font-semibold text-white">Multi-factor Login</p>
                <p>Pengguna wajib memasukkan OTP ke nomor terverifikasi.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-1 h-5 w-5 text-84F7F0" />
              <div>
                <p className="font-semibold text-white">Kontrol Akses</p>
                <p>Tim BIDBOX memvalidasi ulang KYC sebelum mengaktifkan sesi baru.</p>
              </div>
            </div>
            <Button variant="secondary" className="w-full">
              Kelola Preferensi Keamanan
            </Button>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
}
