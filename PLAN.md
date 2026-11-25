# PLAN — LAPORWARGA

## Development Roadmap

Target: MVP siap diuji pengguna nyata.

## Phase 1 — Project Setup
- [ ] Membuat project React + Vite.
- [ ] Mengatur JavaScript.
- [ ] Memasang Tailwind CSS.
- [ ] Membuat struktur folder.
- [ ] Menyiapkan Git repository.
- [ ] Memastikan project berjalan.

Output: Fondasi aplikasi siap.

## Phase 2 — UI/UX Design
- [ ] Menentukan design system.
- [ ] Menentukan warna dan typography.
- [ ] Membuat layout responsive.
- [ ] Membuat navbar.
- [ ] Membuat footer.
- [ ] Membuat halaman beranda.
- [ ] Membuat halaman daftar laporan.
- [ ] Membuat halaman detail laporan.
- [ ] Membuat halaman login dan registrasi.
- [ ] Membuat dashboard pengguna.
- [ ] Membuat dashboard admin.

Output: Seluruh halaman utama memiliki tampilan.

## Phase 3 — Frontend Development
- [ ] Membuat reusable components.
- [ ] Membuat routing.
- [ ] Membuat form laporan.
- [ ] Membuat validasi form.
- [ ] Membuat komponen upload foto.
- [ ] Membuat filter laporan.
- [ ] Membuat status badge.
- [ ] Membuat tampilan loading dan error.
- [ ] Memastikan responsive.

Output: Frontend siap diintegrasikan.

## Phase 4 — Supabase Setup
- [ ] Membuat project Supabase.
- [ ] Membuat tabel profiles.
- [ ] Membuat tabel categories.
- [ ] Membuat tabel reports.
- [ ] Membuat tabel report_updates.
- [ ] Membuat foreign key.
- [ ] Membuat indeks database.
- [ ] Mengatur Row Level Security.
- [ ] Membuat policies.
- [ ] Menyiapkan Supabase Storage.
- [ ] Membuat bucket foto laporan.
- [ ] Mengatur environment variables.

Output: Database dan penyimpanan siap.

## Phase 5 — Authentication
- [ ] Registrasi pengguna.
- [ ] Login pengguna.
- [ ] Logout.
- [ ] Session management.
- [ ] Profil pengguna.
- [ ] Proteksi halaman.
- [ ] Hak akses admin.
- [ ] Pengujian akses tanpa izin.

Output: Sistem autentikasi bekerja.

## Phase 6 — Report Management
- [ ] Membuat laporan.
- [ ] Upload foto.
- [ ] Menyimpan lokasi.
- [ ] Menyimpan data ke database.
- [ ] Menampilkan laporan publik.
- [ ] Menampilkan detail laporan.
- [ ] Membuat riwayat laporan.
- [ ] Membuat filter kategori.
- [ ] Membuat pencarian.
- [ ] Membuat nomor laporan unik.

Output: Alur pelaporan bekerja.

## Phase 7 — Admin Dashboard
- [ ] Menampilkan statistik.
- [ ] Menampilkan laporan masuk.
- [ ] Verifikasi laporan.
- [ ] Menolak laporan dengan alasan.
- [ ] Memperbarui status.
- [ ] Menambahkan tanggapan.
- [ ] Menyimpan riwayat perubahan.
- [ ] Memastikan hanya admin berwenang yang dapat mengelola.

Output: Pengelolaan laporan berjalan.

## Phase 8 — Map Integration
- [ ] Memasang Leaflet.
- [ ] Menampilkan peta.
- [ ] Memilih koordinat laporan.
- [ ] Menampilkan marker.
- [ ] Menampilkan lokasi di detail laporan.

Output: Lokasi laporan dapat dilihat.

## Phase 9 — Testing & Security
- [ ] Menguji registrasi.
- [ ] Menguji login.
- [ ] Menguji pengiriman laporan.
- [ ] Menguji upload foto.
- [ ] Menguji perubahan status.
- [ ] Menguji RLS.
- [ ] Menguji hak akses admin.
- [ ] Menguji validasi input.
- [ ] Menguji responsive mobile.
- [ ] Memperbaiki bug.
- [ ] Memeriksa error console.

Output: MVP lolos pengujian dasar.

## Phase 10 — Deployment
- [ ] Menyiapkan repository GitHub.
- [ ] Mengatur environment variables production.
- [ ] Menghubungkan repository ke Vercel.
- [ ] Deploy website.
- [ ] Mengatur URL.
- [ ] Menguji website production.
- [ ] Menyiapkan dokumentasi pengguna.

Output: LaporWarga dapat diakses secara online.

## Aturan Development

1. Kerjakan satu phase pada satu waktu.
2. Jangan lanjut sebelum phase saat ini lolos pengujian.
3. Jangan mengubah banyak file sekaligus tanpa memahami dampaknya.
4. Gunakan Git commit setelah fitur selesai.
5. Jangan menyimpan secret key di frontend.
6. Jangan menganggap fitur selesai sebelum diuji.
7. Dokumentasikan perubahan penting.

## Definition of Done

Fitur dianggap selesai apabila:
- Berfungsi sesuai PRD.
- Tidak memiliki error kritis.
- Sudah diuji.
- Aman sesuai hak akses.
- Responsive.
- Perubahan sudah disimpan di Git.
