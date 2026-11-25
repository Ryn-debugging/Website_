import BrandLogo from './BrandLogo.jsx'

const CIVIC_TRUST_POINTS = [
  {
    title: 'Pelaporan Mudah & Terstruktur',
    description:
      'Sampaikan keluhan jalan rusak, lampu padam, hingga drainase dengan bukti foto dan lokasi yang jelas.',
  },
  {
    title: 'Pantau Riwayat Status Laporan',
    description:
      'Setiap perkembangan verifikasi dan penanganan pengelola tercatat rapi secara kronologis.',
  },
  {
    title: 'Privasi Identitas Warga Dijaga',
    description:
      'Informasi pribadi pelapor tidak pernah ditampilkan pada halaman daftar maupun detail laporan publik.',
  },
]

/**
 * Reusable AuthShell Layout untuk halaman Login (/masuk) dan Registrasi (/daftar).
 * Menampilkan panel institusional Navy di sisi kiri (desktop) dan kartu formulir di sisi kanan.
 */
function AuthShell({ eyebrow, title, subtitle, children }) {
  return (
    <section className="lw-section flex-1 flex items-center bg-canvas">
      <div className="lw-container max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Panel Informasi Institusional (Desktop Kiri / Mobile Ringkas di Bawah) */}
          <aside className="lg:col-span-5 card-navy p-6 sm:p-8 flex flex-col justify-between gap-8 order-2 lg:order-1">
            <div className="space-y-6">
              <BrandLogo id="auth-panel-brand" theme="dark" />

              <div className="space-y-2">
                <p className="text-eyebrow text-teal-200">
                  Layanan Warga Terpadu
                </p>
                <h2 className="heading-2 text-white">
                  Lapor. Pantau. Wujudkan Lingkungan Lebih Terawat.
                </h2>
              </div>

              <ul className="space-y-4 pt-2 border-t border-white/12">
                {CIVIC_TRUST_POINTS.map((point) => (
                  <li key={point.title} className="space-y-1">
                    <p className="text-sm font-semibold text-white">
                      {point.title}
                    </p>
                    <p className="text-xs text-white/75 leading-relaxed">
                      {point.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-md bg-white/8 border border-white/15 text-xs text-white/80 leading-relaxed">
              <strong className="text-teal-200 block mb-0.5">
                Catatan Keamanan Sistem:
              </strong>
              Kata sandi tidak pernah disimpan di penyimpanan lokal browser
              (localStorage), dan pendaftaran publik hanya diperuntukkan bagi
              akun warga masyarakat.
            </div>
          </aside>

          {/* Kartu Formulir Utama */}
          <div className="lg:col-span-7 card p-6 sm:p-8 lg:p-9 flex flex-col justify-center order-1 lg:order-2">
            <div className="space-y-2 pb-6 border-b border-line">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <p className="text-eyebrow text-teal">{eyebrow}</p>
                <span className="badge badge-pending">
                  <span className="badge-dot" aria-hidden="true" />
                  UI Sementara (Belum Terhubung Supabase)
                </span>
              </div>

              <h1 className="heading-1">{title}</h1>
              {subtitle && (
                <div className="text-body-sm text-muted">{subtitle}</div>
              )}
            </div>

            <div className="pt-6">{children}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AuthShell
