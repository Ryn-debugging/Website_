import reportDrainaseImg from '../assets/report-drainase.svg'
import reportFasumImg from '../assets/report-fasum.svg'
import reportJalanImg from '../assets/report-jalan-rusak.svg'
import reportLampuImg from '../assets/report-lampu-mati.svg'
import reportSampahImg from '../assets/report-sampah.svg'

/**
 * DATA DUMMY TERPISAH KHUSUS ADMIN DASHBOARD LAPORWARGA (SIMULASI UI)
 * - Belum terhubung ke Supabase Auth / Database (tidak ada autentikasi admin palsu).
 * - Nama & email pelapor pada panel internal admin diberi label eksplisit "(Dummy)"
 *   dan tetap tidak ditampilkan di halaman publik sesuai PRD Bagian 9.
 */

export const DUMMY_ADMIN_PROFILE = {
  name: 'Budi Santoso',
  initials: 'BS',
  roleLabel: 'Admin Pengelola (Simulasi UI)',
  unit: 'Sekretariat Moderasi LaporWarga',
  isDummy: true,
}

export const INITIAL_ADMIN_CATEGORIES = [
  {
    id: 'jalan-rusak',
    name: 'Jalan Rusak',
    description:
      'Kerusakan perkerasan aspal, jalan lingkungan berlubang, atau jalur pejalan kaki bergelombang.',
  },
  {
    id: 'lampu-jalan',
    name: 'Lampu Jalan',
    description:
      'Gangguan lampu penerangan jalan umum (PJU) padam, redup berkedip, atau kerusakan tiang.',
  },
  {
    id: 'drainase',
    name: 'Drainase',
    description:
      'Saluran air tersumbat endapan/sampah, meluap saat hujan, atau penutup gorong-gorong rusak.',
  },
  {
    id: 'sampah',
    name: 'Sampah',
    description:
      'Penumpukan sampah liar di area publik atau bak penampungan sementara melebihi kapasitas.',
  },
  {
    id: 'fasilitas-umum',
    name: 'Fasilitas Umum',
    description:
      'Kerusakan sarana bersama seperti bangku taman, papan informasi warga, dan pos lingkungan.',
  },
]

export const INITIAL_ADMIN_REPORTS = [
  {
    id: 'adm-01',
    reportNumber: 'LW-2026-0415',
    title: 'Contoh: Penutup Saluran Air Depan Gang Melati 3 Bergeser',
    category: 'Drainase',
    categorySlug: 'drainase',
    reporterName: 'Rina Kartika (Dummy)',
    reporterEmail: 'rina.dummy@simulasi-warga.id',
    date: '25 Nov 2026',
    reportedAt: '25 Nov 2026, 08:20 WIB',
    location: 'Depan Gang Contoh Melati 3 RT 04 (Lokasi Dummy)',
    coordinates: '-6.208812, 106.845621',
    status: 'menunggu_verifikasi',
    photo: reportDrainaseImg,
    photoAlt: 'Ilustrasi dummy saluran air menunggu verifikasi',
    description:
      'Data simulasi: Penutup beton saluran air di mulut Gang Contoh Melati 3 bergeser sekitar 15 cm sehingga menimbulkan celah terbuka yang membahayakan pejalan kaki.',
    adminNote: '',
    rejectionReason: '',
  },
  {
    id: 'adm-02',
    reportNumber: 'LW-2026-0414',
    title: 'Contoh: Papan Penunjuk Arah Taman Warga Miring Tertiup Angin',
    category: 'Fasilitas Umum',
    categorySlug: 'fasilitas-umum',
    reporterName: 'Hendra Wijaya (Dummy)',
    reporterEmail: 'hendra.dummy@simulasi-warga.id',
    date: '25 Nov 2026',
    reportedAt: '25 Nov 2026, 07:35 WIB',
    location: 'Pintu Masuk Taman Contoh Warga (Lokasi Dummy)',
    coordinates: '-6.209410, 106.847105',
    status: 'menunggu_verifikasi',
    photo: reportFasumImg,
    photoAlt: 'Ilustrasi dummy papan penunjuk arah taman',
    description:
      'Data simulasi: Tiang papan informasi dan penunjuk arah di dekat pintu masuk taman miring setelah hujan deras disertai angin kencang semalam.',
    adminNote: '',
    rejectionReason: '',
  },
  {
    id: 'adm-03',
    reportNumber: 'LW-2026-0413',
    title: 'Contoh: Tiga Kantong Sampah Liar di Tepi Lapangan Warga',
    category: 'Sampah',
    categorySlug: 'sampah',
    reporterName: 'Dewi Lestari (Dummy)',
    reporterEmail: 'dewi.dummy@simulasi-warga.id',
    date: '24 Nov 2026',
    reportedAt: '24 Nov 2026, 17:10 WIB',
    location: 'Sisi Utara Lapangan Contoh Blok B (Lokasi Dummy)',
    coordinates: '-6.211045, 106.843980',
    status: 'menunggu_verifikasi',
    photo: reportSampahImg,
    photoAlt: 'Ilustrasi dummy kantong sampah di tepi lapangan',
    description:
      'Data simulasi: Terdapat tiga kantong plastik besar sampah rumah tangga yang diletakkan sembarangan di luar jam pengangkutan resmi.',
    adminNote: '',
    rejectionReason: '',
  },
  {
    id: 'adm-04',
    reportNumber: 'LW-2026-0410',
    title: 'Contoh: Permukaan Aspal Berlubang di Tikungan Jalan Melati',
    category: 'Jalan Rusak',
    categorySlug: 'jalan-rusak',
    reporterName: 'Agus Setiawan (Dummy)',
    reporterEmail: 'agus.dummy@simulasi-warga.id',
    date: '24 Nov 2026',
    reportedAt: '24 Nov 2026, 08:15 WIB',
    location: 'Jl. Contoh Melati Blok A No. 4 (Lokasi Dummy)',
    coordinates: '-6.207915, 106.846210',
    status: 'sedang_diproses',
    photo: reportJalanImg,
    photoAlt: 'Ilustrasi dummy jalan berlubang',
    description:
      'Data simulasi: Permukaan aspal di tikungan Jalan Contoh Melati Blok A mengelupas dan membentuk lubang sedalam kurang lebih 8 cm dengan diameter 1 meter.',
    adminNote:
      'Petugas pemeliharaan jalan telah memasang rambu kerucut pengaman dan sedang menyiapkan penambalan aspal.',
    rejectionReason: '',
  },
  {
    id: 'adm-05',
    reportNumber: 'LW-2026-0408',
    title: 'Contoh: Dua Titik Lampu Penerangan Jalan Padam di Gang Kenanga',
    category: 'Lampu Jalan',
    categorySlug: 'lampu-jalan',
    reporterName: 'Nadia Putri (Dummy)',
    reporterEmail: 'nadia.dummy@simulasi-warga.id',
    date: '23 Nov 2026',
    reportedAt: '23 Nov 2026, 19:40 WIB',
    location: 'Gang Contoh Kenanga Blok B (Lokasi Dummy)',
    coordinates: '-6.210220, 106.848900',
    status: 'diverifikasi',
    photo: reportLampuImg,
    photoAlt: 'Ilustrasi dummy lampu jalan padam',
    description:
      'Data simulasi: Dua tiang lampu penerangan jalan umum di Gang Contoh Kenanga padam total sejak dua malam terakhir.',
    adminNote:
      'Bukti dan titik tiang sudah diverifikasi; dijadwalkan pemeriksaan teknisi kelistrikan.',
    rejectionReason: '',
  },
  {
    id: 'adm-06',
    reportNumber: 'LW-2026-0405',
    title: 'Contoh: Penutup Gorong-Gorong Beton Retak di Simpang Warga',
    category: 'Drainase',
    categorySlug: 'drainase',
    reporterName: 'Rizky Ramadhan (Dummy)',
    reporterEmail: 'rizky.dummy@simulasi-warga.id',
    date: '22 Nov 2026',
    reportedAt: '22 Nov 2026, 09:12 WIB',
    location: 'Simpang Contoh Dahlia Blok B (Lokasi Dummy)',
    coordinates: '-6.212100, 106.844320',
    status: 'sedang_diproses',
    photo: reportDrainaseImg,
    photoAlt: 'Ilustrasi dummy gorong-gorong retak',
    description:
      'Data simulasi: Plat beton penutup saluran penyeberangan mengalami keretakan di bagian tengah dan berisiko amblas.',
    adminNote:
      'Cetakan plat beton pengganti sedang dipasang oleh tim teknis lapangan.',
    rejectionReason: '',
  },
  {
    id: 'adm-07',
    reportNumber: 'LW-2026-0401',
    title: 'Contoh: Sandaran Bangku Taman Lingkungan Patah Sebagian',
    category: 'Fasilitas Umum',
    categorySlug: 'fasilitas-umum',
    reporterName: 'Fajar Nugroho (Dummy)',
    reporterEmail: 'fajar.dummy@simulasi-warga.id',
    date: '21 Nov 2026',
    reportedAt: '21 Nov 2026, 16:30 WIB',
    location: 'Taman Contoh Terpadu Warga (Lokasi Dummy)',
    coordinates: '-6.209800, 106.847500',
    status: 'diverifikasi',
    photo: reportFasumImg,
    photoAlt: 'Ilustrasi dummy kerusakan bangku taman',
    description:
      'Data simulasi: Bilah kayu sandaran bangku taman di sisi timur terlepas dari baut penyangga.',
    adminNote:
      'Sudah diverifikasi pengelola sarana taman untuk jadwal perbaikan pekan ini.',
    rejectionReason: '',
  },
  {
    id: 'adm-08',
    reportNumber: 'LW-2026-0396',
    title: 'Contoh: Saluran Drainase Tersumbat Ranting dan Daun Kering',
    category: 'Drainase',
    categorySlug: 'drainase',
    reporterName: 'Lestari Wulandari (Dummy)',
    reporterEmail: 'lestari.dummy@simulasi-warga.id',
    date: '20 Nov 2026',
    reportedAt: '20 Nov 2026, 07:20 WIB',
    location: 'Jl. Contoh Cempaka Blok C No. 12 (Lokasi Dummy)',
    coordinates: '-6.213400, 106.849100',
    status: 'selesai',
    photo: reportDrainaseImg,
    photoAlt: 'Ilustrasi dummy saluran drainase selesai dibersihkan',
    description:
      'Data simulasi: Aliran selokan sempat terhambat endapan daun kering sepanjang 15 meter.',
    adminNote:
      'Pembersihan endapan daun dan ranting telah selesai dikerjakan; aliran air kembali lancar.',
    rejectionReason: '',
  },
  {
    id: 'adm-09',
    reportNumber: 'LW-2026-0390',
    title: 'Contoh: Permukaan Paving Jalan Setapak Bergelombang',
    category: 'Jalan Rusak',
    categorySlug: 'jalan-rusak',
    reporterName: 'Arif Budiman (Dummy)',
    reporterEmail: 'arif.dummy@simulasi-warga.id',
    date: '18 Nov 2026',
    reportedAt: '18 Nov 2026, 07:50 WIB',
    location: 'Jalur Pejalan Taman Contoh Warga (Lokasi Dummy)',
    coordinates: '-6.209610, 106.847890',
    status: 'selesai',
    photo: reportJalanImg,
    photoAlt: 'Ilustrasi dummy perbaikan paving jalan setapak',
    description:
      'Data simulasi: Susunan paving block turun setelah hujan lebat sehingga permukaan tidak rata.',
    adminNote:
      'Pemadatan pasir alas dan perataan ulang paving block telah selesai dilaksanakan.',
    rejectionReason: '',
  },
  {
    id: 'adm-10',
    reportNumber: 'LW-2026-0385',
    title: 'Contoh: Laporan Duplikat Lampu Jalan Tanpa Nomor Tiang Jelas',
    category: 'Lampu Jalan',
    categorySlug: 'lampu-jalan',
    reporterName: 'Dimas Saputra (Dummy)',
    reporterEmail: 'dimas.dummy@simulasi-warga.id',
    date: '17 Nov 2026',
    reportedAt: '17 Nov 2026, 13:10 WIB',
    location: 'Gang Contoh Kenanga Blok B (Lokasi Dummy)',
    coordinates: '-6.210225, 106.848905',
    status: 'ditolak',
    photo: reportLampuImg,
    photoAlt: 'Ilustrasi dummy laporan duplikat ditolak',
    description:
      'Data simulasi: Pengiriman laporan ulang pada objek tiang lampu yang sudah tercatat aktif sebelumnya.',
    adminNote:
      'Diarahkan untuk memantau nomor tiket utama pada lokasi yang sama.',
    rejectionReason:
      'Laporan terdeteksi duplikat dengan tiket aktif #LW-2026-0408 pada titik lokasi yang sama.',
  },
]

export const INITIAL_ADMIN_ACTIVITIES = [
  {
    id: 'act-01',
    reportId: 'adm-04',
    reportNumber: 'LW-2026-0410',
    actionLabel: 'Status diubah menjadi Sedang Diproses',
    note: 'Petugas pemeliharaan jalan memasang rambu pengaman sementara.',
    timestamp: '25 Nov 2026, 09:30 WIB',
    badgeStatus: 'sedang_diproses',
  },
  {
    id: 'act-02',
    reportId: 'adm-05',
    reportNumber: 'LW-2026-0408',
    actionLabel: 'Laporan Diverifikasi Admin',
    note: 'Titik lokasi tiang lampu valid dan dimasukkan ke antrean teknisi.',
    timestamp: '24 Nov 2026, 08:50 WIB',
    badgeStatus: 'diverifikasi',
  },
  {
    id: 'act-03',
    reportId: 'adm-08',
    reportNumber: 'LW-2026-0396',
    actionLabel: 'Laporan Ditandai Selesai',
    note: 'Pembersihan endapan saluran drainase 15 meter tuntas.',
    timestamp: '23 Nov 2026, 15:10 WIB',
    badgeStatus: 'selesai',
  },
  {
    id: 'act-04',
    reportId: 'adm-10',
    reportNumber: 'LW-2026-0385',
    actionLabel: 'Laporan Ditolak dengan Alasan',
    note: 'Duplikat dengan laporan aktif pada lokasi Gang Kenanga Blok B.',
    timestamp: '17 Nov 2026, 15:20 WIB',
    badgeStatus: 'ditolak',
  },
]

export const ADMIN_STATUS_FILTER_OPTIONS = [
  { value: 'all', label: 'Semua Status' },
  { value: 'menunggu_verifikasi', label: 'Menunggu Verifikasi' },
  { value: 'diverifikasi', label: 'Diverifikasi' },
  { value: 'sedang_diproses', label: 'Sedang Diproses' },
  { value: 'selesai', label: 'Selesai' },
  { value: 'ditolak', label: 'Ditolak' },
]
