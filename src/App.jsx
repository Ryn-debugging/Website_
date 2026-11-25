import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import MainLayout from './components/layout/MainLayout.jsx'
import ExploreReports from './pages/ExploreReports.jsx'
import Home from './pages/Home.jsx'
import ReportDetail from './pages/ReportDetail.jsx'

/**
 * Penanda rute sementara di dalam MainLayout untuk halaman yang akan dibangun
 * pada tahap berikutnya.
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
              Rute Aktif
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
          <Route path="/laporan" element={<ExploreReports />} />
          <Route path="/laporan/:id" element={<ReportDetail />} />
          <Route
            path="/panduan"
            element={
              <RouteSectionNotice
                eyebrow="Publik • Informasi Warga"
                title="Panduan Penggunaan LaporWarga"
                description="Halaman panduan lengkap pelaporan serta ketentuan verifikasi bagi masyarakat siap dibangun pada tahap berikutnya."
              />
            }
          />
          <Route
            path="/tentang"
            element={
              <RouteSectionNotice
                eyebrow="Publik • Profil Layanan"
                title="Tentang Platform LaporWarga"
                description="Informasi mengenai tujuan layanan, transparansi tindak lanjut, dan peran pengelola lingkungan."
              />
            }
          />
          <Route
            path="/masuk"
            element={
              <RouteSectionNotice
                eyebrow="Autentikasi • Akun Warga & Admin"
                title="Masuk ke Akun LaporWarga"
                description="Halaman login dan registrasi pengguna akan diimplementasikan pada tahap pembuatan halaman autentikasi."
              />
            }
          />
          <Route
            path="/buat-laporan"
            element={
              <RouteSectionNotice
                eyebrow="Layanan Warga • Pengiriman Aduan"
                title="Buat Laporan Baru"
                description="Formulir pembuatan laporan beserta unggah foto bukti dan penentuan lokasi kejadian akan diimplementasikan pada tahap berikutnya."
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
