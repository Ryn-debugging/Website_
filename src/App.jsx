import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useParams,
  useSearchParams,
} from 'react-router-dom'
import MainLayout from './components/layout/MainLayout.jsx'
import Home from './pages/Home.jsx'
import { DUMMY_RECENT_REPORTS, REPORT_CATEGORIES } from './utils/dummyLandingData.js'

/**
 * Penanda rute sementara di dalam MainLayout agar seluruh tombol & tautan
 * pada Landing Page, Navbar, dan Footer berfungsi penuh sebelum halaman terkait dibangun.
 */
function RouteSectionNotice({ eyebrow, title, description }) {
  const [searchParams] = useSearchParams()
  const { id } = useParams()

  const selectedCategorySlug = searchParams.get('kategori')
  const matchedCategory = REPORT_CATEGORIES.find(
    (cat) => cat.id === selectedCategorySlug,
  )
  const matchedDummyReport = DUMMY_RECENT_REPORTS.find(
    (report) => report.id === id,
  )

  return (
    <section className="lw-section flex-1 flex items-center">
      <div className="lw-container max-w-2xl">
        <div className="card p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <p className="text-eyebrow text-teal">{eyebrow}</p>
            <span className="badge badge-verified">
              <span className="badge-dot" aria-hidden="true" />
              Navigasi Aktif
            </span>
          </div>

          <h1 className="heading-1">{title}</h1>

          {matchedCategory && (
            <div className="p-3.5 rounded-md bg-surface-subtle border border-line text-body-sm">
              Filter Kategori Terpilih:{' '}
              <strong className="text-navy">{matchedCategory.name}</strong>
            </div>
          )}

          {matchedDummyReport && (
            <div className="p-3.5 rounded-md bg-surface-subtle border border-line space-y-1 text-body-sm">
              <p className="text-xs font-bold uppercase text-warning-ink">
                Data Dummy ({matchedDummyReport.code})
              </p>
              <p className="font-semibold text-ink">{matchedDummyReport.title}</p>
              <p className="text-muted">{matchedDummyReport.location}</p>
            </div>
          )}

          <p className="text-body text-muted">{description}</p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link id="notice-back-home" to="/" className="btn btn-primary">
              Kembali ke Beranda
            </Link>
            {id && (
              <Link id="notice-all-reports" to="/laporan" className="btn btn-outline">
                Ke Daftar Laporan
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
          <Route
            path="/laporan"
            element={
              <RouteSectionNotice
                eyebrow="Publik • Daftar Laporan"
                title="Jelajahi Laporan Masyarakat"
                description="Halaman daftar laporan siap diimplementasikan pada tahap berikutnya dengan fitur filter kategori, filter status, dan pencarian."
              />
            }
          />
          <Route
            path="/laporan/:id"
            element={
              <RouteSectionNotice
                eyebrow="Publik • Detail Laporan"
                title="Pratinjau Rute Detail Laporan"
                description="Halaman detail laporan lengkap dengan peta lokasi dan riwayat tindak lanjut akan diimplementasikan pada tahap berikutnya."
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
