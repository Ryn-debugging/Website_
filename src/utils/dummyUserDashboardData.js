import reportDrainaseImg from '../assets/report-drainase.svg'
import reportFasumImg from '../assets/report-fasum.svg'
import reportJalanImg from '../assets/report-jalan-rusak.svg'
import reportLampuImg from '../assets/report-lampu-mati.svg'
import reportSampahImg from '../assets/report-sampah.svg'

/**
 * DATA DUMMY TERPISAH KHUSUS DASHBOARD PENGGUNA (MODE PRATINJAU UI)
 * - Belum terhubung ke Supabase Auth / Database (tidak ada autentikasi palsu).
 * - Seluruh laporan pada DUMMY_USER_REPORTS memiliki ownerId yang sama persis
 *   dengan DUMMY_CURRENT_USER.id sehingga laporan warga lain TIDAK ditampilkan
 *   sebagai laporan milik pengguna ini.
 */

export const DUMMY_CURRENT_USER = {
  id: 'dummy-citizen-rina-01',
  fullName: 'Rina Kartika',
  initials: 'RK',
  email: 'rina.kartika@simulasi-warga.id',
  role: 'warga',
  roleLabel: 'Masyarakat (Warga)',
  joinedAt: '10 Nov 2026',
  neighborhood: 'RT 04 / RW 02 — Wilayah Blok A (Dummy)',
  isDummy: true,
}

const RAW_USER_REPORTS_POOL = [
  {
    id: 'my-dummy-101',
    ownerId: 'dummy-citizen-rina-01',
    code: 'MY-DUMMY-101',
    reportNumber: 'LW-2026-0412',
    isDummy: true,
    title: 'Contoh: Penutup Saluran Air Depan Gang Melati 3 Bergeser',
    category: 'Drainase',
    categorySlug: 'drainase',
    area: 'Wilayah Blok A (Dummy)',
    location: 'Depan Gang Contoh Melati 3 RT 04 (Lokasi Dummy)',
    date: '25 Nov 2026',
    reportedAt: '25 Nov 2026, 08:20 WIB',
    status: 'menunggu_verifikasi',
    photo: reportDrainaseImg,
    photoAlt: 'Ilustrasi dummy penutup saluran air bergeser',
    description:
      'Data simulasi laporan milik pengguna: Penutup beton saluran air di mulut Gang Contoh Melati 3 bergeser sekitar 15 cm sehingga menimbulkan celah terbuka di tepi jalan.',
    adminResponse: null,
    rejectionReason: null,
    timeline: {
      menunggu_verifikasi: {
        time: '25 Nov 2026, 08:20 WIB',
        note: 'Laporan Anda telah diterima sistem dan menunggu verifikasi admin.',
      },
      diverifikasi: null,
      sedang_diproses: null,
      selesai: null,
    },
  },
  {
    id: 'my-dummy-102',
    ownerId: 'dummy-citizen-rina-01',
    code: 'MY-DUMMY-102',
    reportNumber: 'LW-2026-0389',
    isDummy: true,
    title: 'Contoh: Lubang Jalan Aspal Dekat Pos Ronda RT 04',
    category: 'Jalan Rusak',
    categorySlug: 'jalan-rusak',
    area: 'Wilayah Blok A (Dummy)',
    location: 'Jl. Contoh Melati Barat No. 9 (Lokasi Dummy)',
    date: '22 Nov 2026',
    reportedAt: '22 Nov 2026, 16:45 WIB',
    status: 'sedang_diproses',
    photo: reportJalanImg,
    photoAlt: 'Ilustrasi dummy lubang jalan dekat pos ronda',
    description:
      'Data simulasi laporan milik pengguna: Terdapat lubang jalan selebar kurang lebih 60 cm tepat di depan Pos Ronda RT 04 yang sering tergenang air saat hujan.',
    adminResponse: {
      responder: 'Pengelola Infrastruktur Lingkungan (Simulasi)',
      updatedAt: '24 Nov 2026, 10:15 WIB',
      message:
        'Material tambal sulam aspal dingin telah tiba di lokasi dan petugas sedang melakukan perataan permukaan jalan.',
    },
    rejectionReason: null,
    timeline: {
      menunggu_verifikasi: {
        time: '22 Nov 2026, 16:45 WIB',
        note: 'Laporan diterima oleh sistem.',
      },
      diverifikasi: {
        time: '23 Nov 2026, 09:10 WIB',
        note: 'Bukti foto dan lokasi dinyatakan valid oleh admin.',
      },
      sedang_diproses: {
        time: '24 Nov 2026, 10:15 WIB',
        note: 'Pengerjaan penambalan lubang jalan sedang berlangsung.',
      },
      selesai: null,
    },
  },
  {
    id: 'my-dummy-103',
    ownerId: 'dummy-citizen-rina-01',
    code: 'MY-DUMMY-103',
    reportNumber: 'LW-2026-0354',
    isDummy: true,
    title: 'Contoh: Lampu Jalan Tiang Nomor A-07 Mati Total',
    category: 'Lampu Jalan',
    categorySlug: 'lampu-jalan',
    area: 'Wilayah Blok A (Dummy)',
    location: 'Jl. Contoh Melati Utara Tiang A-07 (Lokasi Dummy)',
    date: '19 Nov 2026',
    reportedAt: '19 Nov 2026, 19:05 WIB',
    status: 'selesai',
    photo: reportLampuImg,
    photoAlt: 'Ilustrasi dummy lampu jalan tiang A-07',
    description:
      'Data simulasi laporan milik pengguna: Lampu penerangan jalan umum pada tiang bernomor A-07 padam total sehingga area belokan jalan gelap saat malam.',
    adminResponse: {
      responder: 'Admin Layanan Fasilitas Umum (Simulasi)',
      updatedAt: '21 Nov 2026, 14:30 WIB',
      message:
        'Komponen lampu LED pada tiang A-07 telah diganti oleh teknisi dan dipastikan kembali menyala normal pada malam hari.',
    },
    rejectionReason: null,
    timeline: {
      menunggu_verifikasi: {
        time: '19 Nov 2026, 19:05 WIB',
        note: 'Laporan diterima oleh sistem.',
      },
      diverifikasi: {
        time: '20 Nov 2026, 08:30 WIB',
        note: 'Nomor tiang dan lokasi terverifikasi oleh admin.',
      },
      sedang_diproses: {
        time: '21 Nov 2026, 11:00 WIB',
        note: 'Teknisi melakukan penggantian lampu di lokasi.',
      },
      selesai: {
        time: '21 Nov 2026, 14:30 WIB',
        note: 'Perbaikan lampu jalan selesai dilaksanakan.',
      },
    },
  },
  {
    id: 'my-dummy-104',
    ownerId: 'dummy-citizen-rina-01',
    code: 'MY-DUMMY-104',
    reportNumber: 'LW-2026-0318',
    isDummy: true,
    title: 'Contoh: Tempat Sampah Terpilah di Taman Kecil Rusak Engselnya',
    category: 'Fasilitas Umum',
    categorySlug: 'fasilitas-umum',
    area: 'Area Taman Warga (Dummy)',
    location: 'Sudut Barat Taman Contoh Warga (Lokasi Dummy)',
    date: '14 Nov 2026',
    reportedAt: '14 Nov 2026, 07:40 WIB',
    status: 'selesai',
    photo: reportFasumImg,
    photoAlt: 'Ilustrasi dummy fasilitas tempat sampah taman',
    description:
      'Data simulasi laporan milik pengguna: Penutup bak sampah terpilah warna hijau di sudut barat taman terlepas engselnya sehingga mudah dimasuki air hujan.',
    adminResponse: {
      responder: 'Pengelola Sarana Umum (Simulasi)',
      updatedAt: '16 Nov 2026, 15:20 WIB',
      message:
        'Engsel penutup tempat sampah telah dilas dan dipasang kembali dengan kuat. Terima kasih atas kepedulian Anda.',
    },
    rejectionReason: null,
    timeline: {
      menunggu_verifikasi: {
        time: '14 Nov 2026, 07:40 WIB',
        note: 'Laporan diterima oleh sistem.',
      },
      diverifikasi: {
        time: '14 Nov 2026, 10:25 WIB',
        note: 'Laporan kerusakan fasilitas taman diverifikasi.',
      },
      sedang_diproses: {
        time: '16 Nov 2026, 09:30 WIB',
        note: 'Petugas bengkel sarana memperbaiki engsel penutup.',
      },
      selesai: {
        time: '16 Nov 2026, 15:20 WIB',
        note: 'Fasilitas kembali berfungsi dengan baik.',
      },
    },
  },
  {
    id: 'my-dummy-105',
    ownerId: 'dummy-citizen-rina-01',
    code: 'MY-DUMMY-105',
    reportNumber: 'LW-2026-0401',
    isDummy: true,
    title: 'Contoh: Kantong Sampah Daun Menumpuk di Samping Balai Warga',
    category: 'Sampah',
    categorySlug: 'sampah',
    area: 'Wilayah Blok A (Dummy)',
    location: 'Samping Balai Warga Contoh Blok A (Lokasi Dummy)',
    date: '24 Nov 2026',
    reportedAt: '24 Nov 2026, 15:10 WIB',
    status: 'diverifikasi',
    photo: reportSampahImg,
    photoAlt: 'Ilustrasi dummy kantong sampah daun samping balai warga',
    description:
      'Data simulasi laporan milik pengguna: Empat kantong besar berisi sapuan daun kering kerja bakti akhir pekan belum terangkut dari samping Balai Warga.',
    adminResponse: {
      responder: 'Unit Kebersihan Lingkungan (Simulasi)',
      updatedAt: '25 Nov 2026, 08:05 WIB',
      message:
        'Laporan Anda telah diverifikasi dan dimasukkan ke rute pengangkutan gerobak motor kebersihan besok pagi.',
    },
    rejectionReason: null,
    timeline: {
      menunggu_verifikasi: {
        time: '24 Nov 2026, 15:10 WIB',
        note: 'Laporan diterima oleh sistem.',
      },
      diverifikasi: {
        time: '25 Nov 2026, 08:05 WIB',
        note: 'Terverifikasi oleh admin kebersihan lingkungan.',
      },
      sedang_diproses: null,
      selesai: null,
    },
  },
  // Contoh data milik pengguna lain — sengaja disertakan pada pool simulasi
  // untuk memastikan filter kepemilikan (ownerId === user.id) bekerja ketat
  // dan TIDAK PERNAH bocor ke daftar "Laporan Saya".
  {
    id: 'other-user-999',
    ownerId: 'dummy-other-citizen-99',
    code: 'OTHER-999',
    reportNumber: 'LW-2026-0999',
    isDummy: true,
    title: 'Laporan Milik Warga Lain (Tidak Boleh Tampil di Dashboard Rina)',
    category: 'Jalan Rusak',
    categorySlug: 'jalan-rusak',
    area: 'Wilayah Blok C (Dummy)',
    location: 'Jl. Contoh Blok C (Lokasi Dummy)',
    date: '20 Nov 2026',
    reportedAt: '20 Nov 2026, 10:00 WIB',
    status: 'diverifikasi',
    photo: reportJalanImg,
    photoAlt: 'Ilustrasi dummy milik warga lain',
    description: 'Data uji isolasi kepemilikan laporan.',
    adminResponse: null,
    rejectionReason: null,
    timeline: {},
  },
]

/**
 * Mengambil HANYA laporan yang dimiliki oleh userId terkait (prinsip isolasi data pengguna).
 */
export function getDummyReportsForUser(userId) {
  if (!userId) return []
  return RAW_USER_REPORTS_POOL.filter((report) => report.ownerId === userId)
}

export const DUMMY_CURRENT_USER_REPORTS = getDummyReportsForUser(
  DUMMY_CURRENT_USER.id,
)

export const USER_REPORT_STATUS_FILTERS = [
  { value: 'all', label: 'Semua Status' },
  { value: 'menunggu_verifikasi', label: 'Menunggu Verifikasi' },
  { value: 'diverifikasi', label: 'Diverifikasi' },
  { value: 'sedang_diproses', label: 'Sedang Diproses' },
  { value: 'selesai', label: 'Selesai' },
  { value: 'ditolak', label: 'Ditolak' },
]
