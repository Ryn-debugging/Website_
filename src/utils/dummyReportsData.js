import reportDrainaseImg from '../assets/report-drainase.svg'
import reportFasumImg from '../assets/report-fasum.svg'
import reportJalanImg from '../assets/report-jalan-rusak.svg'
import reportLampuImg from '../assets/report-lampu-mati.svg'
import reportSampahImg from '../assets/report-sampah.svg'

/**
 * CATATAN KEJUJURAN & PRIVASI DATA:
 * 1. Seluruh item pada file ini adalah DATA DUMMY (SIMULASI UI) sebelum koneksi Supabase.
 * 2. Sesuai persyaratan keamanan PRD, TIDAK ADA informasi pribadi pelapor (nama, email,
 *    nomor telepon, atau identitas akun) yang disertakan pada data publik.
 */

export const DUMMY_LOCATIONS = [
  'Wilayah Blok A (Dummy)',
  'Wilayah Blok B (Dummy)',
  'Wilayah Blok C (Dummy)',
  'Area Taman Warga (Dummy)',
]

export const DUMMY_ALL_REPORTS = [
  {
    id: 'dummy-01',
    code: 'DUMMY-001',
    reportNumber: 'LW-DUMMY-2026-001',
    isDummy: true,
    isPublicModerated: true,
    title: 'Contoh: Permukaan Aspal Berlubang di Tikungan Jalan Melati',
    category: 'Jalan Rusak',
    categorySlug: 'jalan-rusak',
    area: 'Wilayah Blok A (Dummy)',
    location: 'Jl. Contoh Melati Blok A No. 4 (Lokasi Dummy)',
    date: '24 Nov 2026',
    reportedAt: '24 Nov 2026, 08:15 WIB',
    status: 'sedang_diproses',
    photo: reportJalanImg,
    photoAlt: 'Ilustrasi dummy jalan lingkungan berlubang',
    summary:
      'Data simulasi: terdapat lubang berdiameter sekitar satu meter yang memerlukan penambalan lapisan aspal.',
    description:
      'Data simulasi laporan warga: Permukaan aspal di tikungan Jalan Contoh Melati Blok A mengelupas dan membentuk lubang sedalam kurang lebih 8 cm dengan lebar sekitar 1 meter setelah curah hujan tinggi. Kondisi ini cukup membahayakan pengendara sepeda dan sepeda motor terutama saat sore maupun malam hari.',
    adminResponse: {
      responder: 'Pengelola Infrastruktur Lingkungan (Simulasi)',
      updatedAt: '25 Nov 2026, 09:30 WIB',
      message:
        'Laporan telah diverifikasi di lapangan. Petugas pemeliharaan jalan lingkungan telah memasang penanda pengaman sementara dan sedang melakukan penambalan lapisan aspal hari ini.',
    },
    rejectionReason: null,
    timeline: {
      menunggu_verifikasi: {
        time: '24 Nov 2026, 08:15 WIB',
        note: 'Laporan contoh diterima sistem dan masuk antrean pemeriksaan.',
      },
      diverifikasi: {
        time: '24 Nov 2026, 11:05 WIB',
        note: 'Bukti foto serta titik lokasi dinyatakan jelas dan valid oleh admin.',
      },
      sedang_diproses: {
        time: '25 Nov 2026, 09:30 WIB',
        note: 'Tim pemeliharaan sedang melakukan perbaikan permukaan jalan di lokasi.',
      },
      selesai: null,
    },
  },
  {
    id: 'dummy-02',
    code: 'DUMMY-002',
    reportNumber: 'LW-DUMMY-2026-002',
    isDummy: true,
    isPublicModerated: true,
    title: 'Contoh: Dua Titik Lampu Penerangan Jalan Padam di Gang Kenanga',
    category: 'Lampu Jalan',
    categorySlug: 'lampu-jalan',
    area: 'Wilayah Blok B (Dummy)',
    location: 'Gang Contoh Kenanga Blok B (Lokasi Dummy)',
    date: '23 Nov 2026',
    reportedAt: '23 Nov 2026, 19:40 WIB',
    status: 'diverifikasi',
    photo: reportLampuImg,
    photoAlt: 'Ilustrasi dummy lampu penerangan jalan padam',
    summary:
      'Data simulasi: lampu jalan umum tidak menyala saat malam hari sehingga jalan lingkungan menjadi gelap.',
    description:
      'Data simulasi laporan warga: Dua tiang lampu penerangan jalan umum secara berurutan di sepanjang Gang Contoh Kenanga Blok B padam total sejak dua malam terakhir. Jarak pandang warga yang melintas pada malam hari menjadi sangat terbatas.',
    adminResponse: {
      responder: 'Admin Layanan Fasilitas Umum (Simulasi)',
      updatedAt: '24 Nov 2026, 08:50 WIB',
      message:
        'Terima kasih atas laporannya. Data dan titik tiang lampu sudah kami verifikasi dan telah dimasukkan ke jadwal pemeriksaan teknisi kelistrikan minggu ini.',
    },
    rejectionReason: null,
    timeline: {
      menunggu_verifikasi: {
        time: '23 Nov 2026, 19:40 WIB',
        note: 'Laporan contoh tercatat pada sistem pengaduan warga.',
      },
      diverifikasi: {
        time: '24 Nov 2026, 08:50 WIB',
        note: 'Laporan telah diverifikasi admin dan diteruskan ke jadwal teknisi.',
      },
      sedang_diproses: null,
      selesai: null,
    },
  },
  {
    id: 'dummy-03',
    code: 'DUMMY-003',
    reportNumber: 'LW-DUMMY-2026-003',
    isDummy: true,
    isPublicModerated: true,
    title: 'Contoh: Saluran Drainase Tersumbat Ranting dan Daun Kering',
    category: 'Drainase',
    categorySlug: 'drainase',
    area: 'Wilayah Blok C (Dummy)',
    location: 'Jl. Contoh Cempaka Blok C No. 12 (Lokasi Dummy)',
    date: '22 Nov 2026',
    reportedAt: '22 Nov 2026, 07:20 WIB',
    status: 'selesai',
    photo: reportDrainaseImg,
    photoAlt: 'Ilustrasi dummy saluran drainase tersumbat',
    summary:
      'Data simulasi: aliran air selokan sempat terhambat tumpukan daun kering dan telah dibersihkan.',
    description:
      'Data simulasi laporan warga: Saluran drainase terbuka di tepi Jalan Contoh Cempaka Blok C tersumbat endapan daun kering dan patahan ranting pohon. Saat hujan turun, air selokan menggenang dan hampir meluap ke badan jalan.',
    adminResponse: {
      responder: 'Koordinator Kebersihan & Drainase (Simulasi)',
      updatedAt: '23 Nov 2026, 15:10 WIB',
      message:
        'Pembersihan endapan daun dan ranting sepanjang 15 meter pada saluran drainase telah selesai dilaksanakan. Aliran air kini kembali lancar.',
    },
    rejectionReason: null,
    timeline: {
      menunggu_verifikasi: {
        time: '22 Nov 2026, 07:20 WIB',
        note: 'Laporan contoh diterima oleh sistem.',
      },
      diverifikasi: {
        time: '22 Nov 2026, 09:00 WIB',
        note: 'Bukti foto saluran air terverifikasi oleh pengelola.',
      },
      sedang_diproses: {
        time: '23 Nov 2026, 08:30 WIB',
        note: 'Petugas kebersihan melakukan pengangkatan sumbatan di lapangan.',
      },
      selesai: {
        time: '23 Nov 2026, 15:10 WIB',
        note: 'Saluran drainase bersih kembali dan aliran air terpantau normal.',
      },
    },
  },
  {
    id: 'dummy-04',
    code: 'DUMMY-004',
    reportNumber: 'LW-DUMMY-2026-004',
    isDummy: true,
    isPublicModerated: true,
    title: 'Contoh: Bak Sampah Umum Penuh dan Menumpuk di Bahu Jalan',
    category: 'Sampah',
    categorySlug: 'sampah',
    area: 'Wilayah Blok A (Dummy)',
    location: 'Sudut Jl. Contoh Anggrek Blok A (Lokasi Dummy)',
    date: '21 Nov 2026',
    reportedAt: '21 Nov 2026, 10:05 WIB',
    status: 'sedang_diproses',
    photo: reportSampahImg,
    photoAlt: 'Ilustrasi dummy tempat sampah umum penuh',
    summary:
      'Data simulasi: kapasitas bak sampah sementara penuh sehingga kantong sampah meluber ke tepi jalan.',
    description:
      'Data simulasi laporan warga: Tempat penampungan sampah sementara di sudut Jalan Contoh Anggrek Blok A telah melebihi kapasitas sehingga beberapa kantong sampah diletakkan di bahu jalan dan menimbulkan bau kurang sedap.',
    adminResponse: {
      responder: 'Unit Kebersihan Lingkungan (Simulasi)',
      updatedAt: '21 Nov 2026, 14:20 WIB',
      message:
        'Armada pengangkut sampah sedang dikerahkan ke lokasi Blok A untuk pengangkutan tambahan sore ini.',
    },
    rejectionReason: null,
    timeline: {
      menunggu_verifikasi: {
        time: '21 Nov 2026, 10:05 WIB',
        note: 'Laporan contoh diterima sistem.',
      },
      diverifikasi: {
        time: '21 Nov 2026, 11:15 WIB',
        note: 'Kondisi penumpukan sampah telah diverifikasi.',
      },
      sedang_diproses: {
        time: '21 Nov 2026, 14:20 WIB',
        note: 'Pengangkutan sampah tambahan sedang berlangsung.',
      },
      selesai: null,
    },
  },
  {
    id: 'dummy-05',
    code: 'DUMMY-005',
    reportNumber: 'LW-DUMMY-2026-005',
    isDummy: true,
    isPublicModerated: true,
    title: 'Contoh: Sandaran Bangku Taman Lingkungan Patah Sebagian',
    category: 'Fasilitas Umum',
    categorySlug: 'fasilitas-umum',
    area: 'Area Taman Warga (Dummy)',
    location: 'Taman Contoh Terpadu Warga (Lokasi Dummy)',
    date: '20 Nov 2026',
    reportedAt: '20 Nov 2026, 16:30 WIB',
    status: 'diverifikasi',
    photo: reportFasumImg,
    photoAlt: 'Ilustrasi dummy kerusakan bangku taman warga',
    summary:
      'Data simulasi: bilah kayu sandaran bangku taman terlepas dan perlu perbaikan baut penyangga.',
    description:
      'Data simulasi laporan warga: Salah satu bangku taman di sisi timur Taman Contoh Terpadu mengalami kerusakan pada bagian papan sandaran tengah yang miring karena baut pengikatnya terlepas.',
    adminResponse: {
      responder: 'Pengelola Sarana Umum (Simulasi)',
      updatedAt: '21 Nov 2026, 08:40 WIB',
      message:
        'Laporan kerusakan bangku taman sudah diverifikasi. Penggantian bilah sandaran dan pengencangan rangka besi dijadwalkan pada pemeliharaan rutin pekan ini.',
    },
    rejectionReason: null,
    timeline: {
      menunggu_verifikasi: {
        time: '20 Nov 2026, 16:30 WIB',
        note: 'Laporan contoh tercatat pada sistem.',
      },
      diverifikasi: {
        time: '21 Nov 2026, 08:40 WIB',
        note: 'Kerusakan fasilitas taman telah diverifikasi pengelola.',
      },
      sedang_diproses: null,
      selesai: null,
    },
  },
  {
    id: 'dummy-06',
    code: 'DUMMY-006',
    reportNumber: 'LW-DUMMY-2026-006',
    isDummy: true,
    isPublicModerated: true,
    title: 'Contoh: Penutup Gorong-Gorong Beton Retak di Simpang Warga',
    category: 'Drainase',
    categorySlug: 'drainase',
    area: 'Wilayah Blok B (Dummy)',
    location: 'Simpang Contoh Dahlia Blok B (Lokasi Dummy)',
    date: '19 Nov 2026',
    reportedAt: '19 Nov 2026, 09:12 WIB',
    status: 'sedang_diproses',
    photo: reportDrainaseImg,
    photoAlt: 'Ilustrasi dummy gorong-gorong saluran air',
    summary:
      'Data simulasi: plat penutup saluran air retak dan sedang dijadwalkan penggantian oleh pengelola.',
    description:
      'Data simulasi laporan warga: Plat beton penutup gorong-gorong penyeberangan di Simpang Contoh Dahlia mengalami keretakan di bagian tengah sehingga berisiko amblas apabila dilalui kendaraan bermuatan berat.',
    adminResponse: {
      responder: 'Pengelola Infrastruktur Lingkungan (Simulasi)',
      updatedAt: '20 Nov 2026, 10:00 WIB',
      message:
        'Cetakan plat beton pengganti telah disiapkan dan area retakan diberi pembatas pengaman selama proses penggantian berlangsung.',
    },
    rejectionReason: null,
    timeline: {
      menunggu_verifikasi: {
        time: '19 Nov 2026, 09:12 WIB',
        note: 'Laporan contoh diterima sistem.',
      },
      diverifikasi: {
        time: '19 Nov 2026, 13:20 WIB',
        note: 'Pemeriksaan awal lokasi selesai dilakukan admin.',
      },
      sedang_diproses: {
        time: '20 Nov 2026, 10:00 WIB',
        note: 'Proses penggantian plat penutup gorong-gorong sedang dikerjakan.',
      },
      selesai: null,
    },
  },
  {
    id: 'dummy-07',
    code: 'DUMMY-007',
    reportNumber: 'LW-DUMMY-2026-007',
    isDummy: true,
    isPublicModerated: true,
    title: 'Contoh: Permukaan Paving Jalan Setapak Bergelombang',
    category: 'Jalan Rusak',
    categorySlug: 'jalan-rusak',
    area: 'Area Taman Warga (Dummy)',
    location: 'Jalur Pejalan Taman Contoh Warga (Lokasi Dummy)',
    date: '18 Nov 2026',
    reportedAt: '18 Nov 2026, 07:50 WIB',
    status: 'selesai',
    photo: reportJalanImg,
    photoAlt: 'Ilustrasi dummy perbaikan permukaan jalan lingkungan',
    summary:
      'Data simulasi: susunan paving yang turun setelah hujan deras telah diratakan kembali.',
    description:
      'Data simulasi laporan warga: Beberapa bagian paving block di jalur pejalan kaki menuju taman warga mengalami penurunan tanah dasar sehingga tidak rata bagi pejalan kaki dan lansia.',
    adminResponse: {
      responder: 'Pengelola Infrastruktur Lingkungan (Simulasi)',
      updatedAt: '19 Nov 2026, 16:00 WIB',
      message:
        'Pemadatan pasir alas dan pemasangan ulang paving block telah selesai dikerjakan. Jalur pejalan kaki sudah kembali rata dan aman dilalui.',
    },
    rejectionReason: null,
    timeline: {
      menunggu_verifikasi: {
        time: '18 Nov 2026, 07:50 WIB',
        note: 'Laporan contoh diterima sistem.',
      },
      diverifikasi: {
        time: '18 Nov 2026, 10:15 WIB',
        note: 'Lokasi jalur paving telah diverifikasi.',
      },
      sedang_diproses: {
        time: '19 Nov 2026, 08:00 WIB',
        note: 'Perataan ulang lapisan pasir dan paving block oleh petugas.',
      },
      selesai: {
        time: '19 Nov 2026, 16:00 WIB',
        note: 'Pekerjaan perbaikan selesai dan jalur dibuka normal.',
      },
    },
  },
  {
    id: 'dummy-08',
    code: 'DUMMY-008',
    reportNumber: 'LW-DUMMY-2026-008',
    isDummy: true,
    isPublicModerated: true,
    title: 'Contoh: Lampu Sorot Area Pos Lingkungan Berkedip Redup',
    category: 'Lampu Jalan',
    categorySlug: 'lampu-jalan',
    area: 'Wilayah Blok C (Dummy)',
    location: 'Pos Lingkungan Contoh Blok C (Lokasi Dummy)',
    date: '17 Nov 2026',
    reportedAt: '17 Nov 2026, 20:10 WIB',
    status: 'selesai',
    photo: reportLampuImg,
    photoAlt: 'Ilustrasi dummy lampu jalan sekitar pos lingkungan',
    summary:
      'Data simulasi: bohlam lampu penerangan utama sudah diganti dengan unit baru yang menyala normal.',
    description:
      'Data simulasi laporan warga: Lampu penerangan utama di depan Pos Lingkungan Blok C terus berkedip dan redup sejak pukul 18.30 WIB sehingga pencahayaan area jaga malam kurang memadai.',
    adminResponse: {
      responder: 'Admin Layanan Fasilitas Umum (Simulasi)',
      updatedAt: '18 Nov 2026, 15:45 WIB',
      message:
        'Unit lampu LED 30W dan konektor kabel yang longgar telah diganti baru. Lampu sudah diuji menyala stabil.',
    },
    rejectionReason: null,
    timeline: {
      menunggu_verifikasi: {
        time: '17 Nov 2026, 20:10 WIB',
        note: 'Laporan contoh diterima sistem.',
      },
      diverifikasi: {
        time: '18 Nov 2026, 08:15 WIB',
        note: 'Laporan terverifikasi oleh admin.',
      },
      sedang_diproses: {
        time: '18 Nov 2026, 13:30 WIB',
        note: 'Teknisi memeriksa jaringan kabel dan mengganti lampu.',
      },
      selesai: {
        time: '18 Nov 2026, 15:45 WIB',
        note: 'Penerangan kembali berfungsi normal.',
      },
    },
  },
  {
    id: 'dummy-09',
    code: 'DUMMY-009',
    reportNumber: 'LW-DUMMY-2026-009',
    isDummy: true,
    isPublicModerated: true,
    title: 'Contoh: Tumpukan Ranting Pohon Pemangkasan Belum Terangkut',
    category: 'Sampah',
    categorySlug: 'sampah',
    area: 'Wilayah Blok C (Dummy)',
    location: 'Tepi Jl. Contoh Flamboyan Blok C (Lokasi Dummy)',
    date: '16 Nov 2026',
    reportedAt: '16 Nov 2026, 11:25 WIB',
    status: 'diverifikasi',
    photo: reportSampahImg,
    photoAlt: 'Ilustrasi dummy tumpukan sampah ranting di tepi jalan',
    summary:
      'Data simulasi: sisa ranting pemangkasan di bahu jalan menunggu jadwal armada pengangkutan.',
    description:
      'Data simulasi laporan warga: Terdapat tumpukan potongan dahan dan ranting kering di tepi Jalan Contoh Flamboyan Blok C yang memakan sebagian lebar bahu jalan.',
    adminResponse: {
      responder: 'Unit Kebersihan Lingkungan (Simulasi)',
      updatedAt: '16 Nov 2026, 15:00 WIB',
      message:
        'Laporan sudah diverifikasi. Tumpukan ranting telah dicatat dalam rute pengangkutan kendaraan bak terbuka.',
    },
    rejectionReason: null,
    timeline: {
      menunggu_verifikasi: {
        time: '16 Nov 2026, 11:25 WIB',
        note: 'Laporan contoh diterima sistem.',
      },
      diverifikasi: {
        time: '16 Nov 2026, 15:00 WIB',
        note: 'Lokasi tumpukan ranting telah diverifikasi admin.',
      },
      sedang_diproses: null,
      selesai: null,
    },
  },
  // Contoh tambahan khusus pengujian status "Menunggu Verifikasi" & "Ditolak" pada Detail Laporan
  {
    id: 'dummy-10',
    code: 'DUMMY-010',
    reportNumber: 'LW-DUMMY-2026-010',
    isDummy: true,
    isPublicModerated: false,
    title: 'Contoh: Papan Penunjuk Arah Lingkungan Miring Tertiup Angin',
    category: 'Fasilitas Umum',
    categorySlug: 'fasilitas-umum',
    area: 'Area Taman Warga (Dummy)',
    location: 'Pintu Masuk Taman Contoh Warga (Lokasi Dummy)',
    date: '25 Nov 2026',
    reportedAt: '25 Nov 2026, 07:35 WIB',
    status: 'menunggu_verifikasi',
    photo: reportFasumImg,
    photoAlt: 'Ilustrasi dummy fasilitas umum menunggu verifikasi',
    summary:
      'Data simulasi: contoh laporan baru yang sedang menunggu pemeriksaan awal oleh admin.',
    description:
      'Data simulasi laporan warga: Tiang papan informasi dan penunjuk arah di dekat pintu masuk Taman Contoh Warga tampak miring setelah hujan disertai angin kencang tadi malam.',
    adminResponse: null,
    rejectionReason: null,
    timeline: {
      menunggu_verifikasi: {
        time: '25 Nov 2026, 07:35 WIB',
        note: 'Laporan baru diterima dan sedang menunggu pemeriksaan kelengkapan bukti oleh admin.',
      },
      diverifikasi: null,
      sedang_diproses: null,
      selesai: null,
    },
  },
  {
    id: 'dummy-11',
    code: 'DUMMY-011',
    reportNumber: 'LW-DUMMY-2026-011',
    isDummy: true,
    isPublicModerated: false,
    title: 'Contoh: Laporan Duplikat Lampu Jalan dengan Foto Tidak Sesuai Lokasi',
    category: 'Lampu Jalan',
    categorySlug: 'lampu-jalan',
    area: 'Wilayah Blok B (Dummy)',
    location: 'Gang Contoh Kenanga Blok B (Lokasi Dummy)',
    date: '24 Nov 2026',
    reportedAt: '24 Nov 2026, 13:10 WIB',
    status: 'ditolak',
    photo: reportLampuImg,
    photoAlt: 'Ilustrasi dummy laporan ditolak karena duplikasi',
    summary:
      'Data simulasi: contoh laporan berstatus ditolak lengkap dengan alasan penolakan dari admin.',
    description:
      'Data simulasi laporan warga: Pengiriman ulang laporan mengenai lampu jalan padam di wilayah Blok B namun titik koordinat dan foto bukti merujuk pada objek yang sudah tercatat sebelumnya.',
    adminResponse: {
      responder: 'Admin Moderasi LaporWarga (Simulasi)',
      updatedAt: '24 Nov 2026, 15:20 WIB',
      message:
        'Mohon maaf, laporan ini tidak dapat dilanjutkan ke antrean pengerjaan baru karena permasalahan pada titik lokasi yang sama sudah tercatat aktif pada nomor laporan #LW-DUMMY-2026-002.',
    },
    rejectionReason:
      'Laporan terdeteksi duplikat dengan laporan aktif #LW-DUMMY-2026-002 pada lokasi yang sama, serta foto bukti tidak menampilkan nomor tiang atau kondisi objek secara jelas.',
    timeline: {
      menunggu_verifikasi: {
        time: '24 Nov 2026, 13:10 WIB',
        note: 'Laporan contoh diterima sistem untuk diperiksa.',
      },
      ditolak: {
        time: '24 Nov 2026, 15:20 WIB',
        note: 'Admin menolak verifikasi laporan karena duplikasi data pada lokasi yang sama.',
      },
      diverifikasi: null,
      sedang_diproses: null,
      selesai: null,
    },
  },
]

// Daftar publik terverifikasi yang ditampilkan pada halaman Jelajahi Laporan & Beranda
export const DUMMY_PUBLIC_REPORTS = DUMMY_ALL_REPORTS.filter(
  (report) => report.isPublicModerated,
)

// Helper pencarian berdasarkan ID laporan untuk halaman Detail Laporan (/laporan/:id)
export function getDummyReportById(reportId) {
  return DUMMY_ALL_REPORTS.find((report) => report.id === reportId) || null
}

// Sampel cepat 5 variasi status untuk memudahkan pengujian seluruh cabang UI pada Detail Laporan
export const DUMMY_STATUS_SHOWCASE_LINKS = [
  { id: 'dummy-10', label: 'Menunggu Verifikasi' },
  { id: 'dummy-02', label: 'Diverifikasi' },
  { id: 'dummy-01', label: 'Sedang Diproses' },
  { id: 'dummy-03', label: 'Selesai' },
  { id: 'dummy-11', label: 'Ditolak (Alasan Penolakan)' },
]

export const PUBLIC_STATUS_FILTERS = [
  { value: 'all', label: 'Semua Status Publik' },
  { value: 'diverifikasi', label: 'Diverifikasi' },
  { value: 'sedang_diproses', label: 'Sedang Diproses' },
  { value: 'selesai', label: 'Selesai' },
]
