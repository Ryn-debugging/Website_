import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useParams,
} from 'react-router-dom'
import StatusBadge from './components/common/StatusBadge.jsx'
import MainLayout from './components/layout/MainLayout.jsx'
import ExploreReports from './pages/ExploreReports.jsx'
import Home from './pages/Home.jsx'
import { DUMMY_PUBLIC_REPORTS } from './utils/dummyReportsData.js'

/**
 * Penanda rute sementara di dalam MainLayout untuk halaman yang akan dibangun
 * pada tahap berikutnya (termasuk pratinjau klik kartu menuju /laporan/:id).
 */
function RouteSectionNotice({ eyebrow, title, description }) {
  const { id } = useParams()

  const matchedDummyReport = DUMMY_PUBLIC_REPORTS.find(
    (report) => report.id === id,
  )

  return (
    <section className="lw-section flex-1 flex items-center">
      <div className="lw-container max-w-2xl">
        <div className="card p-6 sm:p-8 space-y-5">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <p className="text-eyebrow text-teal">{eyebrow}</p>
            <span className="badge badge-pending">
              <span className="badge-dot" aria-hidden="true" />
              {matchedDummyReport ? 'Data Dummy' : 'Rute Aktif'}
            </span>
          </div>

          <h1 className="heading-1">
            {matchedDummyReport ? matchedDummyReport.title : title}
          </h1>

          {matchedDummyReport && (
            <div className="rounded-lg overflow-hidden border border-line bg-surface-subtle">
              <img
                src={matchedDummyReport.photo}
                alt={matchedDummyReport.photoAlt}
                className="w-full aspect-16/9 object-cover border-b border-line"
              />
              <div className="p-4 space-y-2.5 text-body-sm">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="badge badge-neutral">
                    {matchedDummyReport.category}
                  </span>
                  <StatusBadge status={matchedDummyReport.status} />
                </div>
                <p className="text-ink-secondary">{matchedDummyReport.summary}</p>
                <div className="pt-2 border-t border-line flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
                  <span>{matchedDummyReport.location}</span>
                  <span>{matchedDummyReport.date}</span>
                </div>
              </div>
            </div>
          )}

          <p className="text-body text-muted">{description}</p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            {id ? (
              <Link id="notice-back-reports" to="/laporan" className="btn btn-primary">
                &larr; Kembali ke Jelajahi Laporan
              </Link>
            ) : (
              <Link id="notice-back-home" to="/" className="btn btn-primary">
                Kembali ke Beranda
              </Link>
            )}
            {id && (
              <Link id="notice-home-secondary" to="/" className="btn btn-outline">
                Beranda
              </Link>
            )}
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
          <Route
            path="/laporan/:id"
            element={
              <RouteSectionNotice
                eyebrow="Publik • Detail Laporan (Pratinjau Rute)"
                title="Detail Laporan Masyarakat"
                description="Navigasi dari kartu laporan berhasil membuka rute detail laporan ini. Halaman detail penuh beserta riwayat pembaruan status dan peta akan disempurnakan pada tahap halaman detail laporan."
              />
            }
          />
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
