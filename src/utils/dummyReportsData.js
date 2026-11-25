import reportDrainaseImg from '../assets/report-drainase.svg'
import reportFasumImg from '../assets/report-fasum.svg'
import reportJalanImg from '../assets/report-jalan-rusak.svg'
import reportLampuImg from '../assets/report-lampu-mati.svg'
import reportSampahImg from '../assets/report-sampah.svg'

/**
 * CATATAN KEJUJURAN DATA:
 * Seluruh item di bawah ini adalah DATA DUMMY (CONTOH SIMULASI UI) yang digunakan
 * khusus untuk menguji fitur pencarian, filter kategori, filter status, filter lokasi,
 * dan pagination sebelum aplikasi dihubungkan ke database Supabase.
 * Data ini BUKAN laporan warga nyata.
 */

export const DUMMY_LOCATIONS = [
  'Wilayah Blok A (Dummy)',
  'Wilayah Blok B (Dummy)',
  'Wilayah Blok C (Dummy)',
  'Area Taman Warga (Dummy)',
]

export const DUMMY_PUBLIC_REPORTS = [
  {
    id: 'dummy-01',
    code: 'DUMMY-001',
    isDummy: true,
    title: 'Contoh: Permukaan Aspal Berlubang di Tikungan Jalan Melati',
    category: 'Jalan Rusak',
    categorySlug: 'jalan-rusak',
    area: 'Wilayah Blok A (Dummy)',
    location: 'Jl. Contoh Melati Blok A No. 4 (Lokasi Dummy)',
    date: '24 Nov 2026',
    status: 'sedang_diproses',
    photo: reportJalanImg,
    photoAlt: 'Ilustrasi dummy jalan lingkungan berlubang',
    summary:
      'Data simulasi: terdapat lubang berdiameter sekitar satu meter yang memerlukan penambalan lapisan aspal.',
  },
  {
    id: 'dummy-02',
    code: 'DUMMY-002',
    isDummy: true,
    title: 'Contoh: Dua Titik Lampu Penerangan Jalan Padam di Gang Kenanga',
    category: 'Lampu Jalan',
    categorySlug: 'lampu-jalan',
    area: 'Wilayah Blok B (Dummy)',
    location: 'Gang Contoh Kenanga Blok B (Lokasi Dummy)',
    date: '23 Nov 2026',
    status: 'diverifikasi',
    photo: reportLampuImg,
    photoAlt: 'Ilustrasi dummy lampu penerangan jalan padam',
    summary:
      'Data simulasi: lampu jalan umum tidak menyala saat malam hari sehingga jalan lingkungan menjadi gelap.',
  },
  {
    id: 'dummy-03',
    code: 'DUMMY-003',
    isDummy: true,
    title: 'Contoh: Saluran Drainase Tersumbat Ranting dan Daun Kering',
    category: 'Drainase',
    categorySlug: 'drainase',
    area: 'Wilayah Blok C (Dummy)',
    location: 'Jl. Contoh Cempaka Blok C No. 12 (Lokasi Dummy)',
    date: '22 Nov 2026',
    status: 'selesai',
    photo: reportDrainaseImg,
    photoAlt: 'Ilustrasi dummy saluran drainase tersumbat',
    summary:
      'Data simulasi: aliran air selokan sempat terhambat tumpukan daun kering dan telah dibersihkan.',
  },
  {
    id: 'dummy-04',
    code: 'DUMMY-004',
    isDummy: true,
    title: 'Contoh: Bak Sampah Umum Penuh dan Menumpuk di Bahu Jalan',
    category: 'Sampah',
    categorySlug: 'sampah',
    area: 'Wilayah Blok A (Dummy)',
    location: 'Sudut Jl. Contoh Anggrek Blok A (Lokasi Dummy)',
    date: '21 Nov 2026',
    status: 'sedang_diproses',
    photo: reportSampahImg,
    photoAlt: 'Ilustrasi dummy tempat sampah umum penuh',
    summary:
      'Data simulasi: kapasitas bak sampah sementara penuh sehingga kantong sampah meluber ke tepi jalan.',
  },
  {
    id: 'dummy-05',
    code: 'DUMMY-005',
    isDummy: true,
    title: 'Contoh: Sandaran Bangku Taman Lingkungan Patah Sebagian',
    category: 'Fasilitas Umum',
    categorySlug: 'fasilitas-umum',
    area: 'Area Taman Warga (Dummy)',
    location: 'Taman Contoh Terpadu Warga (Lokasi Dummy)',
    date: '20 Nov 2026',
    status: 'diverifikasi',
    photo: reportFasumImg,
    photoAlt: 'Ilustrasi dummy kerusakan bangku taman warga',
    summary:
      'Data simulasi: bilah kayu sandaran bangku taman terlepas dan perlu perbaikan baut penyangga.',
  },
  {
    id: 'dummy-06',
    code: 'DUMMY-006',
    isDummy: true,
    title: 'Contoh: Penutup Gorong-Gorong Beton Retak di Simpang Warga',
    category: 'Drainase',
    categorySlug: 'drainase',
    area: 'Wilayah Blok B (Dummy)',
    location: 'Simpang Contoh Dahlia Blok B (Lokasi Dummy)',
    date: '19 Nov 2026',
    status: 'sedang_diproses',
    photo: reportDrainaseImg,
    photoAlt: 'Ilustrasi dummy gorong-gorong saluran air',
    summary:
      'Data simulasi: plat penutup saluran air retak dan sedang dijadwalkan penggantian oleh pengelola.',
  },
  {
    id: 'dummy-07',
    code: 'DUMMY-007',
    isDummy: true,
    title: 'Contoh: Permukaan Paving Jalan Setapak Bergelombang',
    category: 'Jalan Rusak',
    categorySlug: 'jalan-rusak',
    area: 'Area Taman Warga (Dummy)',
    location: 'Jalur Pejalan Taman Contoh Warga (Lokasi Dummy)',
    date: '18 Nov 2026',
    status: 'selesai',
    photo: reportJalanImg,
    photoAlt: 'Ilustrasi dummy perbaikan permukaan jalan lingkungan',
    summary:
      'Data simulasi: susunan paving yang turun setelah hujan deras telah diratakan kembali.',
  },
  {
    id: 'dummy-08',
    code: 'DUMMY-008',
    isDummy: true,
    title: 'Contoh: Lampu Sorot Area Pos Lingkungan Berkedip Redup',
    category: 'Lampu Jalan',
    categorySlug: 'lampu-jalan',
    area: 'Wilayah Blok C (Dummy)',
    location: 'Pos Lingkungan Contoh Blok C (Lokasi Dummy)',
    date: '17 Nov 2026',
    status: 'selesai',
    photo: reportLampuImg,
    photoAlt: 'Ilustrasi dummy lampu jalan sekitar pos lingkungan',
    summary:
      'Data simulasi: bohlam lampu penerangan utama sudah diganti dengan unit baru yang menyala normal.',
  },
  {
    id: 'dummy-09',
    code: 'DUMMY-009',
    isDummy: true,
    title: 'Contoh: Tumpukan Ranting Pohon Pemangkasan Belum Terangkut',
    category: 'Sampah',
    categorySlug: 'sampah',
    area: 'Wilayah Blok C (Dummy)',
    location: 'Tepi Jl. Contoh Flamboyan Blok C (Lokasi Dummy)',
    date: '16 Nov 2026',
    status: 'diverifikasi',
    photo: reportSampahImg,
    photoAlt: 'Ilustrasi dummy tumpukan sampah ranting di tepi jalan',
    summary:
      'Data simulasi: sisa ranting pemangkasan di bahu jalan menunggu jadwal armada pengangkutan.',
  },
]

export const PUBLIC_STATUS_FILTERS = [
  { value: 'all', label: 'Semua Status' },
  { value: 'diverifikasi', label: 'Diverifikasi' },
  { value: 'sedang_diproses', label: 'Sedang Diproses' },
  { value: 'selesai', label: 'Selesai' },
  { value: 'menunggu_verifikasi', label: 'Menunggu Verifikasi' },
  { value: 'ditolak', label: 'Ditolak' },
]
