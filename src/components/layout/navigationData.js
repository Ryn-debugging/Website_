/**
 * Konfigurasi rute navigasi dan informasi layanan resmi LaporWarga.
 * Hanya menggunakan rute internal aplikasi yang sah (tanpa link eksternal palsu).
 */

export const MAIN_NAV_LINKS = [
  { id: 'beranda', label: 'Beranda', to: '/', end: true },
  { id: 'jelajahi-laporan', label: 'Jelajahi Laporan', to: '/laporan' },
  { id: 'panduan', label: 'Panduan', to: '/panduan' },
  { id: 'tentang', label: 'Tentang', to: '/tentang' },
]

export const AUTH_ACTION_LINKS = {
  login: { id: 'masuk', label: 'Masuk', to: '/masuk' },
  register: { id: 'daftar', label: 'Daftar Akun', to: '/daftar' },
  createReport: { id: 'buat-laporan', label: 'Buat Laporan', to: '/buat-laporan' },
}

export const FOOTER_NAV_LINKS = [
  ...MAIN_NAV_LINKS,
  AUTH_ACTION_LINKS.login,
  AUTH_ACTION_LINKS.register,
  AUTH_ACTION_LINKS.createReport,
]

export const SERVICE_INFORMATION = [
  {
    label: 'Penerimaan Laporan Online',
    value: '24 Jam Setiap Hari',
  },
  {
    label: 'Jam Verifikasi Pengelola',
    value: 'Senin – Jumat, 08.00 – 16.00 WIB',
  },
  {
    label: 'Kebijakan Publikasi',
    value: 'Moderasi & verifikasi sebelum tayang publik',
  },
  {
    label: 'Cakupan Infrastruktur',
    value: 'Jalan, Lampu Jalan, Drainase, Sampah & Fasum',
  },
]

export const CONTACT_MANAGER_INFO = [
  {
    label: 'Unit Pengelola',
    value: 'Sekretariat Pengelola Lingkungan LaporWarga',
  },
  {
    label: 'Saluran Pengaduan Resmi',
    value: 'Formulir Pelaporan Digital Terpadu',
  },
  {
    label: 'Pos Elektronik Pengelola',
    value: 'pengelola@laporwarga.id',
  },
  {
    label: 'Layanan Tatap Muka',
    value: 'Hari Kerja, 08.00 – 15.00 WIB',
  },
]
