import reportDrainaseImg from '../assets/report-drainase.svg'
import reportJalanImg from '../assets/report-jalan-rusak.svg'
import reportLampuImg from '../assets/report-lampu-mati.svg'

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

export const DUMMY_RECENT_REPORTS = [
  {
    id: 'dummy-01',
    code: 'DUMMY-001',
    isDummy: true,
    title: 'Contoh: Permukaan Aspal Berlubang di Tikungan Jalan Lingkungan',
    category: 'Jalan Rusak',
    categorySlug: 'jalan-rusak',
    location: 'Jl. Contoh Melati Blok A (Lokasi Dummy)',
    status: 'sedang_diproses',
    photo: reportJalanImg,
    photoAlt: 'Ilustrasi contoh laporan jalan berlubang di lingkungan warga',
  },
  {
    id: 'dummy-02',
    code: 'DUMMY-002',
    isDummy: true,
    title: 'Contoh: Dua Titik Lampu Penerangan Jalan Padam Sejak Kemarin',
    category: 'Lampu Jalan',
    categorySlug: 'lampu-jalan',
    location: 'Gang Contoh Kenanga RT 03 (Lokasi Dummy)',
    status: 'diverifikasi',
    photo: reportLampuImg,
    photoAlt: 'Ilustrasi contoh laporan lampu penerangan jalan padam saat malam',
  },
  {
    id: 'dummy-03',
    code: 'DUMMY-003',
    isDummy: true,
    title: 'Contoh: Saluran Drainase Tersumbat Ranting dan Daun Kering',
    category: 'Drainase',
    categorySlug: 'drainase',
    location: 'Jl. Contoh Cempaka No. 12 (Lokasi Dummy)',
    status: 'selesai',
    photo: reportDrainaseImg,
    photoAlt: 'Ilustrasi contoh laporan saluran drainase tersumbat daun kering',
  },
]

/**
 * Statistik dihitung langsung dari 3 item contoh dummy di atas (bukan angka klaim nyata)
 * agar tetap jujur sebelum integrasi database.
 */
const totalDummy = DUMMY_RECENT_REPORTS.length
const diprosesDummy = DUMMY_RECENT_REPORTS.filter(
  (item) => item.status === 'sedang_diproses',
).length
const selesaiDummy = DUMMY_RECENT_REPORTS.filter(
  (item) => item.status === 'selesai',
).length

export const DUMMY_SUMMARY_STATS = [
  {
    id: 'stat-total',
    label: 'Total Laporan (Contoh Dummy)',
    value: String(totalDummy),
    accentClass: 'text-navy',
    note: 'Simulasi dari daftar contoh laporan di halaman ini (belum terhubung database).',
  },
  {
    id: 'stat-diproses',
    label: 'Sedang Diproses (Contoh Dummy)',
    value: String(diprosesDummy),
    accentClass: 'text-teal',
    note: 'Contoh laporan yang sedang dalam tahap penanganan lapangan.',
  },
  {
    id: 'stat-selesai',
    label: 'Selesai (Contoh Dummy)',
    value: String(selesaiDummy),
    accentClass: 'text-success',
    note: 'Contoh laporan yang telah tuntas ditindaklanjuti pengelola.',
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
