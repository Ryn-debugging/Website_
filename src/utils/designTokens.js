/**
 * LaporWarga Design System Tokens & Status Mapping
 * Sinkron 1:1 dengan CSS Variables dan Tailwind CSS v4 @theme pada src/index.css
 */

export const COLORS = {
  navy: '#173B57',
  teal: '#168C83',
  background: '#F7F9FC',
  surface: '#FFFFFF',
  text: '#202B38',
  muted: '#718096',
  success: '#16865B',
  warning: '#D99A2B',
  danger: '#D94B4B',
}

export const COLOR_PALETTE_DOCS = [
  {
    name: 'Navy',
    token: '--lw-navy',
    utility: 'bg-navy / text-navy',
    hex: '#173B57',
    role: 'Identitas institusional, header, navigasi utama, aksi sekunder',
  },
  {
    name: 'Teal',
    token: '--lw-teal',
    utility: 'bg-teal / text-teal',
    hex: '#168C83',
    role: 'Tombol aksi utama (CTA Buat Laporan), fokus input, aksen interaktif',
  },
  {
    name: 'Background',
    token: '--lw-bg',
    utility: 'bg-canvas',
    hex: '#F7F9FC',
    role: 'Latar halaman utama yang sejuk agar kartu putih tampak terpisah jelas',
  },
  {
    name: 'Surface',
    token: '--lw-surface',
    utility: 'bg-surface',
    hex: '#FFFFFF',
    role: 'Permukaan kartu laporan, kolom input form, modal, dan panel konten',
  },
  {
    name: 'Text',
    token: '--lw-text',
    utility: 'text-ink',
    hex: '#202B38',
    role: 'Teks utama dan judul dengan kontras tinggi (WCAG AAA 14.2:1)',
  },
  {
    name: 'Muted',
    token: '--lw-muted',
    utility: 'text-muted',
    hex: '#718096',
    role: 'Teks pendukung, waktu laporan, keterangan bantuan form, label sekunder',
  },
  {
    name: 'Success',
    token: '--lw-success',
    utility: 'bg-success / text-success',
    hex: '#16865B',
    role: 'Status laporan selesai ditangani dan pesan keberhasilan',
  },
  {
    name: 'Warning',
    token: '--lw-warning',
    utility: 'bg-warning / text-warning',
    hex: '#D99A2B',
    role: 'Status menunggu verifikasi dan peringatan perhatian',
  },
  {
    name: 'Danger',
    token: '--lw-danger',
    utility: 'bg-danger / text-danger',
    hex: '#D94B4B',
    role: 'Status laporan ditolak, validasi error form, dan aksi penghapusan',
  },
]

/**
 * Konfigurasi resmi 5 Status Laporan sesuai PRD Bagian 4.E
 */
export const REPORT_STATUS = {
  menunggu_verifikasi: {
    key: 'menunggu_verifikasi',
    label: 'Menunggu Verifikasi',
    badgeClass: 'badge badge-pending',
    dotColor: '#D99A2B',
    description: 'Laporan baru diterima dan menunggu pemeriksaan kelengkapan oleh admin.',
  },
  diverifikasi: {
    key: 'diverifikasi',
    label: 'Diverifikasi',
    badgeClass: 'badge badge-verified',
    dotColor: '#173B57',
    description: 'Bukti dan lokasi valid; laporan telah dipublikasikan ke daftar warga.',
  },
  sedang_diproses: {
    key: 'sedang_diproses',
    label: 'Sedang Diproses',
    badgeClass: 'badge badge-processing',
    dotColor: '#168C83',
    description: 'Petugas atau pengelola lingkungan sedang melakukan penanganan di lapangan.',
  },
  selesai: {
    key: 'selesai',
    label: 'Selesai',
    badgeClass: 'badge badge-resolved',
    dotColor: '#16865B',
    description: 'Perbaikan fasilitas umum telah tuntas dilaksanakan dan terdokumentasi.',
  },
  ditolak: {
    key: 'ditolak',
    label: 'Ditolak',
    badgeClass: 'badge badge-rejected',
    dotColor: '#D94B4B',
    description: 'Laporan tidak memenuhi syarat verifikasi disertai catatan alasan admin.',
  },
}

export const BREAKPOINTS = [
  { name: 'Base', prefix: '(default)', minWidth: '0px', target: 'Layar ponsel kecil (mobile-first)' },
  { name: 'xs', prefix: 'xs:', minWidth: '360px (22.5rem)', target: 'Mayoritas ponsel Android masyarakat' },
  { name: 'sm', prefix: 'sm:', minWidth: '640px (40rem)', target: 'Ponsel layar lebar / phablet' },
  { name: 'md', prefix: 'md:', minWidth: '768px (48rem)', target: 'Tablet (tata letak 2 kolom)' },
  { name: 'lg', prefix: 'lg:', minWidth: '1024px (64rem)', target: 'Laptop & navigasi penuh desktop' },
  { name: 'xl', prefix: 'xl:', minWidth: '1280px (80rem)', target: 'Desktop lebar (batas kontainer 1200px)' },
  { name: '2xl', prefix: '2xl:', minWidth: '1536px (96rem)', target: 'Monitor eksternal besar' },
]

export const RADIUS_SCALE = [
  { token: '--lw-radius-xs', utility: 'rounded-xs', value: '4px', usage: 'Elemen kode inline kecil' },
  { token: '--lw-radius-sm', utility: 'rounded-sm', value: '6px', usage: 'Badge status laporan & tombol kecil' },
  { token: '--lw-radius-md', utility: 'rounded-md', value: '8px', usage: 'Tombol standar, input, select, textarea' },
  { token: '--lw-radius-lg', utility: 'rounded-lg', value: '12px', usage: 'Kartu laporan, panel ringkasan, alert' },
  { token: '--lw-radius-xl', utility: 'rounded-xl', value: '16px', usage: 'Dialog modal & kontainer sorotan utama' },
]

export const SHADOW_SCALE = [
  { token: '--lw-shadow-xs', utility: 'shadow-xs', usage: 'Kedalaman halus pada tombol utama' },
  { token: '--lw-shadow-card', utility: 'shadow-card', usage: 'Elevasi standar kartu putih di atas #F7F9FC' },
  { token: '--lw-shadow-card-hover', utility: 'shadow-card-hover', usage: 'Efek angkat saat kartu interaktif disentuh/hover' },
  { token: '--lw-shadow-dropdown', utility: 'shadow-dropdown', usage: 'Menu dropdown navigasi dan daftar filter' },
  { token: '--lw-shadow-modal', utility: 'shadow-modal', usage: 'Dialog konfirmasi verifikasi atau penolakan' },
]
