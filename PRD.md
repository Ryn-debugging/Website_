# PRD — LAPORWARGA

**Product:** LaporWarga  
**Version:** 1.0  
**Platform:** Responsive Web Application  
**Status:** Planning

## 1. Ringkasan Produk

LaporWarga adalah platform pelaporan kerusakan infrastruktur dan fasilitas umum yang memungkinkan masyarakat melaporkan permasalahan lingkungan secara digital.

Contoh laporan:
- Jalan rusak atau berlubang.
- Lampu jalan mati.
- Drainase tersumbat.
- Sampah menumpuk.
- Fasilitas umum rusak.

Tujuan utama adalah memudahkan pelaporan, meningkatkan transparansi, dan membantu pengelola lingkungan memantau tindak lanjut laporan.

## 2. Target Pengguna

### Masyarakat
- Melihat laporan masyarakat.
- Membuat laporan baru.
- Mengunggah foto bukti.
- Menentukan lokasi kejadian.
- Melihat perkembangan laporan.
- Melihat riwayat laporan sendiri.

### Admin
- Login ke dashboard.
- Melihat seluruh laporan.
- Memverifikasi laporan.
- Mengubah status laporan.
- Memberikan tanggapan.
- Mengelola kategori laporan.
- Melihat statistik laporan.

## 3. Tujuan Produk

1. Mempermudah masyarakat menyampaikan keluhan.
2. Menyediakan informasi status laporan.
3. Menghindari laporan tercecer.
4. Mempermudah pengelola melakukan pendataan.
5. Menyediakan sistem dokumentasi permasalahan lingkungan.

## 4. Fitur Utama MVP

### A. Beranda
- Hero section.
- Penjelasan layanan.
- Tombol buat laporan.
- Statistik laporan.
- Daftar laporan terbaru.
- Panduan penggunaan.

### B. Autentikasi
- Registrasi pengguna.
- Login.
- Logout.
- Profil pengguna.

### C. Pembuatan Laporan
Form laporan terdiri dari:
- Judul laporan.
- Kategori.
- Deskripsi.
- Foto bukti.
- Lokasi kejadian.
- Waktu laporan.

Validasi:
- Judul wajib diisi.
- Deskripsi wajib diisi.
- Kategori wajib dipilih.
- Foto dibatasi tipe dan ukuran.
- Lokasi harus valid.

### D. Daftar Laporan
- Menampilkan laporan publik yang telah diverifikasi.
- Filter kategori.
- Pencarian laporan.
- Filter status.
- Halaman detail laporan.

### E. Status Laporan

Status yang digunakan:
1. Menunggu verifikasi.
2. Diverifikasi.
3. Sedang diproses.
4. Selesai.
5. Ditolak.

Setiap perubahan status dicatat dalam riwayat.

### F. Dashboard Admin
- Ringkasan jumlah laporan.
- Daftar laporan masuk.
- Detail laporan.
- Verifikasi atau penolakan.
- Perubahan status.
- Tanggapan admin.

## 5. User Flow

### Masyarakat
1. Membuka website.
2. Login atau registrasi.
3. Memilih buat laporan.
4. Mengisi formulir.
5. Mengirim laporan.
6. Mendapat nomor laporan.
7. Memantau status.
8. Melihat hasil tindak lanjut.

### Admin
1. Login.
2. Membuka dashboard.
3. Melihat laporan masuk.
4. Memeriksa informasi dan bukti.
5. Memverifikasi atau menolak laporan.
6. Memperbarui status.
7. Memberikan tanggapan.

## 6. Halaman Website

### Public
- Beranda
- Daftar laporan
- Detail laporan
- Login
- Registrasi
- Panduan

### User
- Dashboard pengguna
- Buat laporan
- Riwayat laporan
- Detail laporan
- Profil

### Admin
- Dashboard admin
- Manajemen laporan
- Detail laporan
- Manajemen kategori
- Statistik

## 7. Teknologi

Frontend:
- React
- Vite
- JavaScript
- Tailwind CSS

Backend:
- Supabase

Database:
- PostgreSQL

Authentication:
- Supabase Auth

Storage:
- Supabase Storage

Map:
- Leaflet
- OpenStreetMap

Deployment:
- Vercel

## 8. Database Awal

### profiles
- id
- full_name
- email
- role
- created_at

### reports
- id
- user_id
- title
- description
- category_id
- photo_url
- latitude
- longitude
- address
- status
- created_at
- updated_at

### categories
- id
- name
- description

### report_updates
- id
- report_id
- admin_id
- old_status
- new_status
- note
- created_at

## 9. Persyaratan Keamanan

- Pengguna hanya dapat mengubah laporan miliknya sesuai aturan sistem.
- Admin memiliki hak akses khusus.
- Role admin tidak boleh dapat ditentukan sendiri melalui registrasi publik.
- RLS wajib diterapkan pada tabel Supabase.
- Validasi file upload.
- Jangan mengekspos Supabase service role key di frontend.
- Data pribadi pelapor tidak ditampilkan secara publik.
- Laporan harus dimoderasi sebelum tampil ke publik.

## 10. Non-Functional Requirements

- Responsif di perangkat mobile dan desktop.
- Navigasi sederhana.
- Waktu loading wajar.
- Validasi input.
- Penanganan error.
- Aksesibilitas dasar.
- Tampilan konsisten.
- Database memiliki relasi dan integritas data.

## 11. Batasan MVP

Belum termasuk:
- Aplikasi Android native.
- Notifikasi WhatsApp otomatis.
- Integrasi resmi dengan pemerintah.
- AI untuk klasifikasi laporan.
- Pembayaran.
- Sistem eskalasi antarinstansi.

## 12. Kriteria Keberhasilan

MVP dianggap berhasil apabila:
1. Pengguna bisa mendaftar dan login.
2. Pengguna bisa membuat laporan.
3. Foto dan lokasi dapat disimpan.
4. Admin dapat memverifikasi laporan.
5. Status laporan dapat diperbarui.
6. Pengguna dapat memantau laporan.
7. Pengguna tidak dapat mengakses data privat pengguna lain.
8. Website berjalan baik di HP.
