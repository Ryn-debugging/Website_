import { DUMMY_PUBLIC_REPORTS } from './dummyReportsData.js'

/**
 * CATATAN PENTING:
 * Seluruh data pada file ini adalah DATA SEMENTARA (DUMMY) khusus simulasi
 * tampilan antarmuka sebelum aplikasi dihubungkan ke database Supabase (Phase 4 & 6).
 * Tidak ada klaim statistik nyata yang dikarang.
 */

export const REPORT_CATEGORIES = [
  {
    id: 'jalan-rusak',
    name: 'Jalan Rusak',
    iconType: 'road',
    description:
      'Lubang pada aspal, permukaan jalan mengelupas, atau kerusakan akses jalan lingkungan.',
  },
  {
    id: 'lampu-jalan',
    name: 'Lampu Jalan',
    iconType: 'lamp',
    description:
      'Lampu penerangan jalan umum padam di malam hari, berkedip, atau tiang lampu miring.',
  },
  {
    id: 'drainase',
    name: 'Drainase',
    iconType: 'drainage',
    description:
      'Saluran air tersumbat endapan/sampah, genangan meluap, atau penutup selokan rusak.',
  },
  {
    id: 'sampah',
    name: 'Sampah',
    iconType: 'trash',
    description:
      'Tumpukan sampah liar di ruang terbuka atau wadah tempat sampah umum yang meluber.',
  },
  {
    id: 'fasilitas-umum',
    name: 'Fasilitas Umum',
    iconType: 'facility',
    description:
      'Kerusakan bangku taman warga, pos lingkungan, rambu jalan, maupun sarana bersama lainnya.',
  },
]

export const DUMMY_RECENT_REPORTS = DUMMY_PUBLIC_REPORTS.slice(0, 3)

/**
 * Statistik dihitung langsung dari daftar contoh laporan dummy (bukan angka klaim nyata)
 * agar konsisten antara Beranda dan halaman Jelajahi Laporan.
 */
const totalDummy = DUMMY_PUBLIC_REPORTS.length
const diprosesDummy = DUMMY_PUBLIC_REPORTS.filter(
  (item) => item.status === 'sedang_diproses',
).length
const selesaiDummy = DUMMY_PUBLIC_REPORTS.filter(
  (item) => item.status === 'selesai',
).length

export const DUMMY_SUMMARY_STATS = [
  {
    id: 'stat-total',
    label: 'Total Laporan (Contoh Dummy)',
    value: String(totalDummy),
    accentClass: 'text-navy',
    note: 'Jumlah seluruh item contoh simulasi UI (belum terhubung database).',
  },
  {
    id: 'stat-diproses',
    label: 'Sedang Diproses (Contoh Dummy)',
    value: String(diprosesDummy),
    accentClass: 'text-teal',
    note: 'Contoh laporan dummy yang sedang dalam tahap penanganan.',
  },
  {
    id: 'stat-selesai',
    label: 'Selesai (Contoh Dummy)',
    value: String(selesaiDummy),
    accentClass: 'text-success',
    note: 'Contoh laporan dummy yang berstatus selesai ditindaklanjuti.',
  },
]

export const HOW_IT_WORKS_STEPS = [
  {
    stepNumber: '01',
    title: 'Buat Laporan',
    description:
      'Ambil foto kondisi fasilitas yang bermasalah, pilih kategori yang sesuai, tuliskan deskripsi singkat, dan tandai lokasi kejadian.',
  },
  {
    stepNumber: '02',
    title: 'Verifikasi',
    description:
      'Admin pengelola memeriksa kelengkapan informasi dan bukti foto agar laporan terverifikasi sebelum ditampilkan ke daftar publik.',
  },
  {
    stepNumber: '03',
    title: 'Tindak Lanjut',
    description:
      'Pengelola memperbarui perkembangan status pengerjaan beserta catatan tanggapan secara transparan hingga masalah selesai.',
  },
]
