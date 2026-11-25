import {
  BREAKPOINTS,
  COLOR_PALETTE_DOCS,
  RADIUS_SCALE,
  REPORT_STATUS,
  SHADOW_SCALE,
} from '../utils/designTokens.js'

const STATUS_LIST = Object.values(REPORT_STATUS)

function Home() {
  return (
    <div className="flex flex-col">
      {/* Civic Hero Section — Navy #173B57 + Teal #168C83 */}
      <section className="bg-navy text-white py-12 sm:py-16 lg:py-20 border-b border-navy-900">
          <div className="lw-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-5">
                <p className="text-eyebrow text-teal-200">
                  LaporWarga Civic Design System v1.0
                </p>
                <h1 className="heading-hero text-white">
                  Sistem desain layanan warga yang bersih, terpercaya, dan ramah ponsel.
                </h1>
                <p className="text-body-lg text-white/80 max-w-2xl">
                  Dirancang dengan pendekatan <em>modern civic technology</em> agar
                  masyarakat awam dapat melaporkan kerusakan infrastruktur secara
                  mudah dari layar ponsel, sekaligus memudahkan pengelola memantau
                  tindak lanjut secara terstruktur.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a id="hero-btn-palet" href="#palet-warna" className="btn btn-primary">
                    Eksplorasi Design Tokens
                  </a>
                  <a
                    id="hero-btn-komponen"
                    href="#komponen-ui"
                    className="btn btn-outline-on-dark"
                  >
                    Uji Komponen Interaktif
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="card bg-surface text-ink p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-2 pb-4 border-b border-line">
                    <div>
                      <p className="text-eyebrow text-muted">Prinsip Utama</p>
                      <h2 className="heading-3 mt-0.5">Standar Ergonomi Publik</h2>
                    </div>
                    <span className="badge badge-verified">
                      <span className="badge-dot" aria-hidden="true" />
                      Mobile-First
                    </span>
                  </div>

                  <dl className="mt-4 space-y-3 text-body-sm">
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-muted">Target Sentuh Minimum</dt>
                      <dd className="font-semibold text-ink">44px (2.75rem)</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-muted">Ukuran Teks Input Mobile</dt>
                      <dd className="font-semibold text-ink">16px (Anti Auto-Zoom)</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-muted">Rasio Kontras Teks Utama</dt>
                      <dd className="font-semibold text-success-ink">14.2 : 1 (WCAG AAA)</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <dt className="text-muted">Tipografi Utama</dt>
                      <dd className="font-semibold text-ink">Plus Jakarta Sans</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 1. Color Palette Tokens */}
        <section id="palet-warna" className="lw-section border-b border-line">
          <div className="lw-container">
            <div className="max-w-2xl">
              <p className="text-eyebrow text-teal">01. Design Tokens — Warna</p>
              <h2 className="heading-1 mt-1">Palet Warna Resmi LaporWarga</h2>
              <p className="text-body text-muted mt-2">
                Seluruh warna terdaftar pada CSS Variables (<code>--lw-*</code>) dan
                utilitas Tailwind CSS v4 agar konsisten di seluruh antarmuka publik
                maupun dashboard admin.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-5">
              {COLOR_PALETTE_DOCS.map((color) => (
                <article key={color.name} className="card overflow-hidden flex flex-col">
                  <div
                    className="h-20 w-full border-b border-line"
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Sampel warna ${color.name} ${color.hex}`}
                  />
                  <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="heading-4">{color.name}</h3>
                        <span className="text-report-code text-navy bg-surface-subtle px-2 py-0.5 rounded-xs">
                          {color.hex}
                        </span>
                      </div>
                      <p className="text-body-sm text-muted mt-1.5">{color.role}</p>
                    </div>
                    <p className="text-xs font-mono text-ink-secondary pt-2 border-t border-line">
                      {color.token} &middot; {color.utility}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 2. Typography Scale */}
        <section id="tipografi" className="lw-section bg-surface border-b border-line">
          <div className="lw-container">
            <div className="max-w-2xl">
              <p className="text-eyebrow text-teal">02. Tipografi</p>
              <h2 className="heading-1 mt-1">Hierarki Teks Mudah Dibaca Warga</h2>
              <p className="text-body text-muted mt-2">
                Menggunakan <strong>Plus Jakarta Sans</strong> dengan ukuran dasar
                16px dan tinggi baris longgar agar tetap nyaman dibaca oleh seluruh
                kelompok usia.
              </p>
            </div>

            <div className="mt-8 card divide-y divide-line">
              <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-3 items-baseline">
                <span className="md:col-span-3 text-report-code text-muted">.heading-hero</span>
                <p className="md:col-span-9 heading-hero text-ink">
                  Layanan Pengaduan Infrastruktur
                </p>
              </div>
              <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-3 items-baseline">
                <span className="md:col-span-3 text-report-code text-muted">.heading-1</span>
                <p className="md:col-span-9 heading-1">Daftar Laporan Masyarakat</p>
              </div>
              <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-3 items-baseline">
                <span className="md:col-span-3 text-report-code text-muted">.heading-2</span>
                <p className="md:col-span-9 heading-2">Ringkasan Tindak Lanjut Lingkungan</p>
              </div>
              <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-3 items-baseline">
                <span className="md:col-span-3 text-report-code text-muted">.heading-3</span>
                <p className="md:col-span-9 heading-3">
                  Jalan Berlubang di Perempatan RT 04 / RW 02
                </p>
              </div>
              <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-3 items-baseline">
                <span className="md:col-span-3 text-report-code text-muted">.text-body</span>
                <p className="md:col-span-9 text-body text-ink-secondary">
                  Permukaan aspal mengelupas sepanjang dua meter setelah hujan deras
                  sehingga membahayakan pengendara roda dua pada malam hari.
                </p>
              </div>
              <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-3 items-baseline">
                <span className="md:col-span-3 text-report-code text-muted">
                  .text-body-sm / .text-report-code
                </span>
                <p className="md:col-span-9 text-body-sm text-muted">
                  Nomor Laporan:{' '}
                  <span className="text-report-code text-navy">#LW-2026-0108</span> &middot;
                  Diperbarui 2 jam lalu
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Buttons & Form Inputs */}
        <section id="komponen-ui" className="lw-section border-b border-line">
          <div className="lw-container space-y-12">
            <div>
              <p className="text-eyebrow text-teal">03. Komponen Interaktif</p>
              <h2 className="heading-1 mt-1">Varian Tombol &amp; Kolom Input Form</h2>
              <p className="text-body text-muted mt-2 max-w-2xl">
                Setiap kontrol memiliki tinggi sentuh minimum 44px, indikator fokus
                yang jelas untuk navigasi keyboard, serta status validasi yang tegas.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Button Variants Panel */}
              <div className="lg:col-span-6 card">
                <div className="card-header">
                  <h3 className="heading-3">Button Variants &amp; Sizes</h3>
                  <p className="text-body-sm text-muted mt-1">
                    Gunakan Teal untuk aksi utama warga dan Navy untuk aksi struktural.
                  </p>
                </div>
                <div className="card-body space-y-6">
                  <div>
                    <p className="text-eyebrow text-muted mb-3">Varian Warna</p>
                    <div className="flex flex-wrap gap-3">
                      <button id="demo-btn-primary" type="button" className="btn btn-primary">
                        Buat Laporan (Primary)
                      </button>
                      <button id="demo-btn-navy" type="button" className="btn btn-navy">
                        Dashboard (Navy)
                      </button>
                      <button id="demo-btn-outline" type="button" className="btn btn-outline">
                        Filter (Outline)
                      </button>
                      <button id="demo-btn-ghost" type="button" className="btn btn-ghost">
                        Batal (Ghost)
                      </button>
                      <button id="demo-btn-success" type="button" className="btn btn-success">
                        Selesaikan (Success)
                      </button>
                      <button id="demo-btn-danger" type="button" className="btn btn-danger">
                        Tolak (Danger)
                      </button>
                      <button
                        id="demo-btn-disabled"
                        type="button"
                        disabled
                        className="btn btn-primary"
                      >
                        Nonaktif
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-line">
                    <p className="text-eyebrow text-muted mb-3">Ukuran &amp; Lebar Penuh Mobile</p>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <button id="demo-btn-sm" type="button" className="btn btn-outline btn-sm">
                        Kecil (36px)
                      </button>
                      <button id="demo-btn-md" type="button" className="btn btn-primary">
                        Standar (44px)
                      </button>
                      <button id="demo-btn-lg" type="button" className="btn btn-navy btn-lg">
                        Besar (50px)
                      </button>
                    </div>
                    <button
                      id="demo-btn-block"
                      type="button"
                      className="btn btn-primary btn-block"
                    >
                      Tombol Lebar Penuh (.btn-block)
                    </button>
                  </div>
                </div>
              </div>

              {/* Input Styles Panel */}
              <div className="lg:col-span-6 card">
                <div className="card-header">
                  <h3 className="heading-3">Input &amp; Form Controls</h3>
                  <p className="text-body-sm text-muted mt-1">
                    Pratinjau gaya visual input (tanpa penyimpanan data laporan).
                  </p>
                </div>
                <div className="card-body space-y-4">
                  <div className="form-group">
                    <label htmlFor="demo-input-normal" className="form-label">
                      Contoh Input Standar <span className="form-required">*</span>
                    </label>
                    <input
                      id="demo-input-normal"
                      type="text"
                      className="input-field"
                      placeholder="Contoh: Lampu penerangan jalan padam..."
                    />
                    <span className="form-helper">
                      Klik kolom untuk melihat fokus cincin Teal yang ramah aksesibilitas.
                    </span>
                  </div>

                  <div className="form-group">
                    <label htmlFor="demo-select-kategori" className="form-label">
                      Pilihan Kategori (Select)
                    </label>
                    <select
                      id="demo-select-kategori"
                      className="select-field"
                      defaultValue="jalan"
                    >
                      <option value="jalan">Jalan &amp; Jembatan Lingkungan</option>
                      <option value="lampu">Lampu Penerangan Jalan</option>
                      <option value="drainase">Saluran Drainase</option>
                      <option value="sampah">Kebersihan &amp; Sampah</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="demo-input-error" className="form-label">
                      Contoh Status Validasi Error
                    </label>
                    <input
                      id="demo-input-error"
                      type="text"
                      defaultValue="Lokasi belum lengkap"
                      aria-invalid="true"
                      aria-describedby="demo-error-msg"
                      className="input-field input-error"
                    />
                    <span id="demo-error-msg" className="form-error">
                      Titik lokasi kejadian wajib dilengkapi agar petugas mudah menuju lokasi.
                    </span>
                  </div>

                  <div className="form-group">
                    <label htmlFor="demo-textarea" className="form-label">
                      Area Deskripsi (.textarea-field)
                    </label>
                    <textarea
                      id="demo-textarea"
                      rows={3}
                      className="textarea-field"
                      placeholder="Tuliskan keterangan kondisi di lapangan secara singkat dan jelas..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Card Styles & 5. Status Badges */}
        <section id="status-badge" className="lw-section bg-surface border-b border-line">
          <div className="lw-container space-y-12">
            {/* Status Badges */}
            <div>
              <p className="text-eyebrow text-teal">04. Badge Status Laporan</p>
              <h2 className="heading-1 mt-1">Lima Status Resmi Siklus Laporan</h2>
              <p className="text-body text-muted mt-2 max-w-2xl">
                Menggabungkan indikator titik warna, teks label tegas, dan kontras
                latar lembut agar status mudah dikenali oleh warga maupun admin.
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {STATUS_LIST.map((status) => (
                  <div key={status.key} className="card p-4 flex flex-col justify-between gap-3">
                    <div>
                      <span className={status.badgeClass}>
                        <span className="badge-dot" aria-hidden="true" />
                        {status.label}
                      </span>
                      <p className="text-body-sm text-muted mt-3">{status.description}</p>
                    </div>
                    <p className="text-xs font-mono text-ink-secondary pt-2 border-t border-line">
                      .{status.badgeClass.split(' ')[1]}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Styles Showcase */}
            <div className="pt-4">
              <p className="text-eyebrow text-teal">05. Varian Kartu (Card Styles)</p>
              <h2 className="heading-2 mt-1">Pola Kontainer Informasi</h2>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stat Card */}
                <article className="card-stat flex flex-col justify-between">
                  <div>
                    <p className="stat-value text-teal">100%</p>
                    <p className="stat-label">Transparansi Riwayat Status</p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-line flex items-center justify-between text-xs text-muted">
                    <span>Pola Kartu Statistik (.card-stat)</span>
                    <span className="badge badge-resolved">
                      <span className="badge-dot" aria-hidden="true" />
                      Aktif
                    </span>
                  </div>
                </article>

                {/* Interactive Card */}
                <article className="card card-interactive p-5 sm:p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="badge badge-neutral">Infrastruktur</span>
                      <span className="badge badge-processing">
                        <span className="badge-dot" aria-hidden="true" />
                        Sedang Diproses
                      </span>
                    </div>
                    <h3 className="heading-3 mt-3">Kartu Interaktif (.card-interactive)</h3>
                    <p className="text-body-sm text-muted mt-1.5">
                      Memberikan umpan balik angkat halus dan bayangan lembut saat
                      diarahkan kursor atau disentuh pengguna.
                    </p>
                  </div>
                  <p className="text-xs font-medium text-teal mt-4">
                    Elevasi: --lw-shadow-card-hover
                  </p>
                </article>

                {/* Institutional Navy Card */}
                <article className="card-navy p-5 sm:p-6 flex flex-col justify-between">
                  <div>
                    <p className="text-eyebrow text-teal-200">Kartu Sorotan (.card-navy)</p>
                    <h3 className="heading-3 text-white mt-2">
                      Panduan Singkat Pelaporan Warga
                    </h3>
                    <p className="text-body-sm text-white/80 mt-1.5">
                      Digunakan untuk blok informasi resmi, panduan layanan, atau
                      pengumuman penting pengelola lingkungan.
                    </p>
                  </div>
                  <p className="text-xs text-teal-200 font-medium mt-4">
                    Latar: Navy #173B57 &middot; Teks: #FFFFFF
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Spacing, Radius, Shadow & Responsive Breakpoints */}
        <section className="lw-section">
          <div className="lw-container grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 card">
              <div className="card-header">
                <h2 className="heading-3">Radius &amp; Shadow Tokens</h2>
                <p className="text-body-sm text-muted mt-1">
                  Sudut terukur (4px–16px) dan bayangan bernuansa Navy tipis.
                </p>
              </div>
              <div className="card-body space-y-5">
                <div>
                  <p className="text-eyebrow text-muted mb-2.5">Border Radius</p>
                  <div className="space-y-2">
                    {RADIUS_SCALE.map((r) => (
                      <div
                        key={r.token}
                        className="flex items-center justify-between gap-3 text-body-sm py-1.5 border-b border-line last:border-b-0"
                      >
                        <span className="font-mono text-xs text-navy">{r.utility}</span>
                        <span className="font-semibold text-ink">{r.value}</span>
                        <span className="text-muted text-right">{r.usage}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-eyebrow text-muted mb-2.5">Elevation Shadows</p>
                  <div className="space-y-2">
                    {SHADOW_SCALE.map((s) => (
                      <div
                        key={s.token}
                        className="flex items-center justify-between gap-3 text-body-sm py-1.5 border-b border-line last:border-b-0"
                      >
                        <span className="font-mono text-xs text-navy">{s.utility}</span>
                        <span className="text-muted text-right">{s.usage}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 card">
              <div className="card-header">
                <h2 className="heading-3">Spacing &amp; Responsive Breakpoints</h2>
                <p className="text-body-sm text-muted mt-1">
                  Sistem grid kelipatan 4px/8px dengan prioritas layar smartphone.
                </p>
              </div>
              <div className="card-body space-y-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-body-sm">
                    <thead>
                      <tr className="border-b border-line text-muted text-xs uppercase">
                        <th className="py-2 pr-3 font-semibold">Token</th>
                        <th className="py-2 pr-3 font-semibold">Min-Width</th>
                        <th className="py-2 font-semibold">Target Perangkat</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {BREAKPOINTS.map((bp) => (
                        <tr key={bp.name}>
                          <td className="py-2.5 pr-3 font-mono text-xs font-semibold text-navy">
                            {bp.prefix}
                          </td>
                          <td className="py-2.5 pr-3 text-ink whitespace-nowrap">
                            {bp.minWidth}
                          </td>
                          <td className="py-2.5 text-muted">{bp.target}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-3.5 rounded-md bg-surface-subtle text-body-sm text-ink-secondary">
                  <strong className="text-ink">Ritme Spacing Utama:</strong> Padding
                  kontainer otomatis menyesuaikan dari <code>16px</code> (mobile),{' '}
                  <code>24px</code> (tablet), hingga <code>32px</code> (desktop, lebar
                  maksimum <code>1200px</code>).
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
  )
}

export default Home
