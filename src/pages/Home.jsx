import { Link } from 'react-router-dom'
import heroIllustration from '../assets/hero-neighborhood.svg'
import CategoryCard from '../components/common/CategoryCard.jsx'
import ReportCard from '../components/common/ReportCard.jsx'
import SectionHeader from '../components/common/SectionHeader.jsx'
import StatCard from '../components/common/StatCard.jsx'
import StepCard from '../components/common/StepCard.jsx'
import {
  DUMMY_RECENT_REPORTS,
  DUMMY_SUMMARY_STATS,
  HOW_IT_WORKS_STEPS,
  REPORT_CATEGORIES,
} from '../utils/dummyLandingData.js'

function Home() {
  return (
    <div className="flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="bg-navy text-white py-12 sm:py-16 lg:py-20 border-b border-navy-900">
        <div className="lw-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <p className="text-eyebrow text-teal-200">
                Platform Pengaduan Infrastruktur &amp; Fasilitas Umum
              </p>

              <h1 className="heading-hero text-white">
                Lingkungan Lebih Baik Dimulai dari Laporanmu.
              </h1>

              <p className="text-body-lg text-white/82 max-w-xl">
                Sampaikan keluhan jalan rusak, lampu jalan padam, drainase
                tersumbat, hingga tumpukan sampah secara digital dilengkapi foto
                bukti dan lokasi agar ditindaklanjuti secara transparan.
              </p>

              <div className="pt-2 flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center gap-3">
                <Link
                  id="hero-cta-buat-laporan"
                  to="/buat-laporan"
                  className="btn btn-primary btn-lg"
                >
                  <svg
                    aria-hidden="true"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  <span>Buat Laporan</span>
                </Link>

                <Link
                  id="hero-cta-jelajahi-laporan"
                  to="/laporan"
                  className="btn btn-outline-on-dark btn-lg"
                >
                  Jelajahi Laporan
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-xl overflow-hidden bg-surface p-2 sm:p-3 shadow-modal border border-white/15">
                <img
                  src={heroIllustration}
                  alt="Ilustrasi lingkungan masyarakat yang bersih dengan jalan terawat, lampu penerangan jalan aktif, dan fasilitas umum tertata"
                  className="w-full h-auto rounded-lg block"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATISTIK LAPORAN (DATA DUMMY / SIMULASI UI) */}
      <section
        id="statistik-laporan"
        aria-labelledby="heading-statistik"
        className="lw-section border-b border-line bg-canvas"
      >
        <div className="lw-container space-y-8">
          <div className="max-w-2xl space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <p className="text-eyebrow text-teal">Ringkasan Pantauan</p>
              <span className="badge badge-pending">
                <span className="badge-dot" aria-hidden="true" />
                Data Dummy (Belum Terhubung Database)
              </span>
            </div>
            <h2 id="heading-statistik" className="heading-1">
              Statistik Penanganan Laporan
            </h2>
            <p className="text-body text-muted">
              Angka di bawah ini merupakan data simulasi antarmuka dari 3 contoh
              laporan sementara dan bukan klaim statistik operasional nyata.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {DUMMY_SUMMARY_STATS.map((stat) => (
              <StatCard
                key={stat.id}
                label={stat.label}
                value={stat.value}
                note={stat.note}
                accentClass={stat.accentClass}
                isDummy
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. KATEGORI LAPORAN */}
      <section
        id="kategori-laporan"
        aria-labelledby="heading-kategori"
        className="lw-section bg-surface border-b border-line"
      >
        <div className="lw-container space-y-8">
          <SectionHeader
            headingId="heading-kategori"
            eyebrow="Cakupan Layanan"
            title="Kategori Permasalahan Lingkungan"
            description="Pilih jenis kendala fasilitas umum yang dapat dilaporkan warga agar pengelola lingkungan lebih mudah mendata dan menindaklanjuti."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {REPORT_CATEGORIES.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. LAPORAN TERBARU (CONTOH DATA DUMMY) */}
      <section
        id="laporan-terbaru"
        aria-labelledby="heading-laporan-terbaru"
        className="lw-section bg-canvas border-b border-line"
      >
        <div className="lw-container space-y-8">
          <SectionHeader
            headingId="heading-laporan-terbaru"
            eyebrow="Transparansi Publik"
            title="Laporan Terbaru Masyarakat"
            dummyNotice="Contoh Data Dummy"
            description="Pratinjau tampilan kartu laporan warga yang telah diverifikasi, lengkap dengan foto bukti, kategori, lokasi, dan status penanganan."
            action={
              <Link
                id="recent-reports-view-all"
                to="/laporan"
                className="btn btn-outline"
              >
                Lihat Semua Laporan
              </Link>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DUMMY_RECENT_REPORTS.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. CARA KERJA */}
      <section
        id="cara-kerja"
        aria-labelledby="heading-cara-kerja"
        className="lw-section bg-surface border-b border-line"
      >
        <div className="lw-container space-y-8">
          <SectionHeader
            headingId="heading-cara-kerja"
            eyebrow="Panduan Singkat"
            title="Cara Kerja LaporWarga"
            description="Tiga tahapan sederhana agar setiap laporan masyarakat terdokumentasi rapi dan tidak tercecer."
            action={
              <Link
                id="how-it-works-guide-btn"
                to="/panduan"
                className="btn btn-ghost"
              >
                Baca Panduan Lengkap &rarr;
              </Link>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_IT_WORKS_STEPS.map((step) => (
              <StepCard
                key={step.stepNumber}
                stepNumber={step.stepNumber}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION (CTA PENUTUP) */}
      <section aria-labelledby="heading-bottom-cta" className="lw-section bg-canvas">
        <div className="lw-container">
          <div className="card-navy p-8 sm:p-10 lg:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <p className="text-eyebrow text-teal-200">Partisipasi Warga</p>
              <h2 id="heading-bottom-cta" className="heading-1 text-white">
                Temukan kerusakan fasilitas umum di sekitar Anda?
              </h2>
              <p className="text-body text-white/80">
                Dokumentasikan sekarang melalui LaporWarga agar pengelola
                lingkungan dapat segera memeriksa dan menjadwalkan tindak lanjut
                secara terukur.
              </p>
            </div>

            <div className="flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center gap-3 shrink-0">
              <Link
                id="bottom-cta-buat-laporan"
                to="/buat-laporan"
                className="btn btn-primary btn-lg"
              >
                Buat Laporan Sekarang
              </Link>
              <Link
                id="bottom-cta-jelajahi"
                to="/laporan"
                className="btn btn-outline-on-dark btn-lg"
              >
                Jelajahi Laporan
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* 7. FOOTER dirender otomatis secara konsisten melalui MainLayout */}
    </div>
  )
}

export default Home
