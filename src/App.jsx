import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import MainLayout from './components/layout/MainLayout.jsx'
import UserDashboardLayout from './components/layout/UserDashboardLayout.jsx'
import CreateReport from './pages/CreateReport.jsx'
import ExploreReports from './pages/ExploreReports.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import ReportDetail from './pages/ReportDetail.jsx'
import UserDashboard from './pages/UserDashboard.jsx'

/**
 * Penanda rute sementara di dalam MainLayout untuk halaman informasi yang akan
 * dibangun pada tahap berikutnya.
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
        {/* Rute Publik & Utama */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/laporan" element={<ExploreReports />} />
          <Route path="/laporan/:id" element={<ReportDetail />} />
          <Route path="/buat-laporan" element={<CreateReport />} />
          <Route path="/masuk" element={<Login />} />
          <Route path="/daftar" element={<Register />} />
          <Route path="/login" element={<Navigate to="/masuk" replace />} />
          <Route path="/register" element={<Navigate to="/daftar" replace />} />
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
        </Route>

        {/* Rute Dashboard Pengguna (Sidebar Desktop & Navigasi Mobile) */}
        <Route path="/dashboard" element={<UserDashboardLayout />}>
          <Route index element={<UserDashboard section="overview" />} />
          <Route
            path="laporan-saya"
            element={<UserDashboard section="reports" />}
          />
          <Route
            path="profil"
            element={<UserDashboard section="profile" />}
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
