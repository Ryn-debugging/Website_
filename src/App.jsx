import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout.jsx'
import Home from './pages/Home.jsx'

/**
 * Penanda rute sementara di dalam MainLayout agar seluruh tautan Navbar & Footer
 * memiliki rute nyata yang berfungsi dan menampilkan active state dengan akurat
 * sebelum masing-masing halaman diimplementasikan pada tahap berikutnya.
 */
function RouteSectionNotice({ eyebrow, title, description }) {
  return (
    <section className="lw-section flex-1 flex items-center">
      <div className="lw-container max-w-2xl">
        <div className="card p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <p className="text-eyebrow text-teal">{eyebrow}</p>
            <span className="badge badge-verified">
              <span className="badge-dot" aria-hidden="true" />
              Rute Terdaftar
            </span>
          </div>

          <h1 className="heading-1">{title}</h1>
          <p className="text-body text-muted">{description}</p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link id="notice-back-home" to="/" className="btn btn-primary">
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/laporan"
            element={
              <RouteSectionNotice
                eyebrow="Publik • Daftar Laporan"
                title="Jelajahi Laporan Masyarakat"
                description="Rute /laporan telah aktif pada sistem navigasi dan siap diisi dengan tampilan daftar laporan terverifikasi pada tahap pengembangan halaman berikutnya."
              />
            }
          />
          <Route
            path="/panduan"
            element={
              <RouteSectionNotice
                eyebrow="Publik • Informasi Warga"
                title="Panduan Penggunaan LaporWarga"
                description="Rute /panduan telah aktif dan siap menampilkan langkah-langkah pelaporan serta ketentuan verifikasi bagi masyarakat."
              />
            }
          />
          <Route
            path="/tentang"
            element={
              <RouteSectionNotice
                eyebrow="Publik • Profil Layanan"
                title="Tentang Platform LaporWarga"
                description="Rute /tentang telah aktif untuk menyajikan tujuan layanan, transparansi tindak lanjut, dan peran pengelola lingkungan."
              />
            }
          />
          <Route
            path="/masuk"
            element={
              <RouteSectionNotice
                eyebrow="Autentikasi • Akun Warga & Admin"
                title="Masuk ke Akun LaporWarga"
                description="Rute /masuk telah terhubung dengan tombol Masuk pada Navbar serta Footer dan siap diimplementasikan pada tahap halaman autentikasi."
              />
            }
          />
          <Route
            path="/buat-laporan"
            element={
              <RouteSectionNotice
                eyebrow="Layanan Warga • Pengiriman Aduan"
                title="Buat Laporan Baru"
                description="Rute /buat-laporan telah terhubung dengan tombol aksi utama pada Navbar serta Footer dan siap diisi dengan formulir pelaporan warga."
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
