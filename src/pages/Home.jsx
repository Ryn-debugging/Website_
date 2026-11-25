import { Link } from 'react-router-dom'

const WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Dokumentasikan Temuan',
    description:
      'Warga memotret kondisi fasilitas umum yang rusak beserta titik lokasi kejadian secara jelas.',
  },
  {
    step: '02',
    title: 'Verifikasi Pengelola',
    description:
      'Pengelola lingkungan memeriksa kelengkapan bukti agar setiap aduan valid dan tidak tercecer.',
  },
  {
    step: '03',
    title: 'Pantau Tindak Lanjut',
    description:
      'Perkembangan penanganan tercatat transparan mulai dari verifikasi, pengerjaan, hingga selesai.',
  },
]

const COVERAGE_AREAS = [
  'Jalan lingkungan berlubang atau rusak',
  'Lampu penerangan jalan umum padam',
  'Saluran drainase tersumbat atau meluap',
  'Tumpukan sampah liar di area publik',
  'Kerusakan fasilitas umum warga lainnya',
]

function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf8] text-slate-900">
      <header className="sticky top-0 z-20 bg-[#fafaf8]/90 backdrop-blur-md border-b border-stone-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            id="brand-home-link"
            to="/"
            className="inline-flex items-center gap-2.5 text-slate-900 font-bold text-lg tracking-tight hover:opacity-85 transition-opacity"
          >
            <span
              aria-hidden="true"
              className="w-8 h-8 rounded-lg bg-emerald-800 text-emerald-50 flex items-center justify-center text-sm font-bold shadow-xs"
            >
              LW
            </span>
            <span>LaporWarga</span>
          </Link>

          <nav aria-label="Navigasi Utama" className="flex items-center gap-6 text-sm font-medium text-slate-600">
            <a
              id="nav-cakupan-link"
              href="#cakupan-layanan"
              className="hover:text-slate-900 transition-colors"
            >
              Cakupan
            </a>
            <a
              id="nav-alur-link"
              href="#alur-pelaporan"
              className="hover:text-slate-900 transition-colors"
            >
              Cara Kerja
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-16 sm:py-24 lg:py-28">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
              <div className="lg:col-span-7 space-y-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-800">
                  Layanan Pengaduan Infrastruktur Lingkungan
                </p>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]">
                  Laporkan kerusakan fasilitas umum dengan jelas dan terpantau.
                </h1>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                  LaporWarga membantu masyarakat mendokumentasikan permasalahan
                  lingkungan secara digital agar pengelola dapat menindaklanjuti
                  setiap keluhan secara tertib, terukur, dan transparan.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3.5">
                  <a
                    id="hero-cta-alur"
                    href="#alur-pelaporan"
                    className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-emerald-800 text-white text-sm font-semibold shadow-xs hover:bg-emerald-900 active:translate-y-px transition-all"
                  >
                    Pelajari Alur Layanan
                  </a>
                  <a
                    id="hero-cta-cakupan"
                    href="#cakupan-layanan"
                    className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-white text-slate-700 text-sm font-semibold border border-stone-300 hover:bg-stone-100 hover:text-slate-900 transition-colors"
                  >
                    Lihat Cakupan Aduan
                  </a>
                </div>
              </div>

              <aside
                id="cakupan-layanan"
                aria-label="Cakupan Masalah Lingkungan"
                className="lg:col-span-5 bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-8 shadow-(--shadow-soft)"
              >
                <h2 className="text-base font-semibold text-slate-900 tracking-tight">
                  Cakupan Pelaporan Warga
                </h2>
                <p className="mt-1.5 text-sm text-slate-500 leading-relaxed">
                  Jenis permasalahan lingkungan yang difokuskan pada platform
                  LaporWarga:
                </p>

                <ul className="mt-5 divide-y divide-stone-100">
                  {COVERAGE_AREAS.map((item, index) => (
                    <li
                      key={item}
                      className="py-3 first:pt-0 last:pb-0 flex items-baseline gap-3 text-sm text-slate-700"
                    >
                      <span className="text-xs font-semibold tabular-nums text-emerald-800">
                        0{index + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </section>

        <section
          id="alur-pelaporan"
          className="py-16 sm:py-20 bg-stone-100/80 border-t border-stone-200/80"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Dirancang untuk kemudahan warga dan ketertiban pendataan
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                Halaman beranda sementara ini menandai bahwa fondasi aplikasi
                LaporWarga (Phase 1) telah aktif dan siap dikembangkan ke tahap
                antarmuka serta fitur pelaporan berikutnya.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {WORKFLOW_STEPS.map((item) => (
                <article
                  key={item.step}
                  className="bg-white rounded-xl border border-stone-200/90 p-6 shadow-xs transition-shadow hover:shadow-md"
                >
                  <span className="text-xs font-bold tracking-wider text-emerald-800 tabular-nums">
                    TAHAP {item.step}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-stone-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p className="font-medium text-slate-700">
            LaporWarga &mdash; Platform Pelaporan Infrastruktur &amp; Fasilitas Umum
          </p>
          <p>Status Pengembangan: Phase 1 (Fondasi Aplikasi Siap)</p>
        </div>
      </footer>
    </div>
  )
}

export default Home
