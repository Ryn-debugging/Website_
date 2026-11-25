import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import EmptyState from '../components/common/EmptyState.jsx'
import ReportTimeline from '../components/common/ReportTimeline.jsx'
import StatusBadge from '../components/common/StatusBadge.jsx'
import {
  DUMMY_STATUS_SHOWCASE_LINKS,
  getDummyReportById,
} from '../utils/dummyReportsData.js'

function ReportDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [copiedId, setCopiedId] = useState(null)

  const report = getDummyReportById(id)
  const isCopied = copiedId === report?.reportNumber

  const handleBackClick = () => {
    if (window.history.length > 2) {
      navigate(-1)
    } else {
      navigate('/laporan')
    }
  }

  const handleCopyReportNumber = async () => {
    if (!report?.reportNumber || !navigator.clipboard) return
    try {
      await navigator.clipboard.writeText(report.reportNumber)
      setCopiedId(report.reportNumber)
      window.setTimeout(() => {
        setCopiedId((current) =>
          current === report.reportNumber ? null : current,
        )
      }, 2000)
    } catch {
      // Abaikan jika izin clipboard dibatasi browser
    }
  }

  if (!report) {
    return (
      <div className="lw-section flex-1 flex items-center bg-canvas">
        <div className="lw-container">
          <EmptyState
            title="Laporan Tidak Ditemukan"
            description={`Contoh laporan dengan ID "${id}" tidak tersedia pada data simulasi. Silakan kembali ke halaman daftar laporan masyarakat.`}
          />
          <div className="mt-6 text-center">
            <Link
              id="detail-notfound-back-btn"
              to="/laporan"
              className="btn btn-primary"
            >
              &larr; Kembali ke Jelajahi Laporan
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const isRejected = report.status === 'ditolak'

  return (
    <div className="flex flex-col flex-1 bg-canvas">
      {/* Top Navigation & Dummy Status Switcher Bar */}
      <section className="bg-surface border-b border-line py-4">
        <div className="lw-container flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <button
              id="detail-back-btn"
              type="button"
              onClick={handleBackClick}
              className="btn btn-outline btn-sm"
            >
              <span aria-hidden="true">&larr;</span>
              <span>Kembali</span>
            </button>

            <Link
              id="detail-all-reports-link"
              to="/laporan"
              className="text-body-sm font-medium text-muted hover:text-navy transition-colors"
            >
              Daftar Laporan
            </Link>

            <span aria-hidden="true" className="text-line-strong">
              /
            </span>

            <span className="text-report-code text-navy">
              #{report.reportNumber}
            </span>
          </div>

          <span className="badge badge-pending self-start md:self-auto">
            <span className="badge-dot" aria-hidden="true" />
            Data Dummy (Simulasi UI — Bukan Laporan Nyata)
          </span>
        </div>
      </section>

      {/* Main Content Responsive Grid */}
      <section className="lw-section flex-1">
        <div className="lw-container space-y-6">
          {/* Quick Sample Switcher untuk menguji 5 cabang status termasuk Ditolak */}
          <div
            aria-label="Contoh Variasi Status Laporan Dummy"
            className="card p-3.5 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface"
          >
            <span className="text-xs font-semibold text-muted">
              Uji Variasi Status Dummy:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {DUMMY_STATUS_SHOWCASE_LINKS.map((sample) => {
                const isActiveSample = sample.id === report.id
                return (
                  <Link
                    key={sample.id}
                    id={`sample-status-link-${sample.id}`}
                    to={`/laporan/${sample.id}`}
                    replace
                    className={`btn btn-sm min-h-8 px-2.5 text-xs ${
                      isActiveSample ? 'btn-navy' : 'btn-outline'
                    }`}
                  >
                    {sample.label}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* KOLOM UTAMA (Kiri di Desktop, Atas di Mobile): Judul, Foto, Deskripsi, Info Lokasi */}
            <div className="lg:col-span-7 space-y-6">
              {/* 1. Header Laporan: Kategori, Status, Nomor Laporan, Judul, Tanggal & Lokasi */}
              <div className="card p-5 sm:p-7 space-y-4">
                <div className="flex items-center justify-between gap-2.5 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="badge badge-neutral">{report.category}</span>
                    <StatusBadge status={report.status} />
                  </div>

                  <div className="inline-flex items-center gap-2 bg-surface-subtle px-2.5 py-1 rounded-xs border border-line">
                    <span className="text-xs text-muted">No. Laporan:</span>
                    <span className="text-report-code text-navy">
                      {report.reportNumber}
                    </span>
                    <button
                      id="copy-report-number-btn"
                      type="button"
                      onClick={handleCopyReportNumber}
                      className="text-[11px] font-semibold text-teal hover:text-teal-800 cursor-pointer ml-1"
                    >
                      {isCopied ? 'Tersalin' : 'Salin'}
                    </button>
                  </div>
                </div>

                <h1 className="heading-1">{report.title}</h1>

                <div className="pt-3 border-t border-line grid grid-cols-1 sm:grid-cols-2 gap-3 text-body-sm text-muted">
                  <div className="flex items-start gap-2">
                    <svg
                      aria-hidden="true"
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0 mt-0.5 text-teal"
                    >
                      <path d="M12 21s-7-5.686-7-11a7 7 0 1 1 14 0c0 5.314-7 11-7 11Z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                    <span>{report.location}</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <svg
                      aria-hidden="true"
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0 mt-0.5 text-teal"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                    <time>{report.reportedAt || report.date}</time>
                  </div>
                </div>
              </div>

              {/* 2. Foto Bukti Laporan */}
              <figure className="card overflow-hidden m-0">
                <div className="relative aspect-16/9 bg-surface-subtle border-b border-line">
                  <img
                    src={report.photo}
                    alt={report.photoAlt}
                    className="w-full h-full object-cover"
                  />
                  {report.isDummy && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-xs bg-navy/90 text-white text-[11px] font-bold uppercase tracking-wider">
                      Ilustrasi Bukti (Data Dummy)
                    </span>
                  )}
                </div>
                <figcaption className="px-5 py-3 text-xs text-muted bg-surface flex items-center justify-between gap-2 flex-wrap">
                  <span>Dokumentasi visual kondisi fasilitas umum</span>
                  <span>Wilayah: {report.area}</span>
                </figcaption>
              </figure>

              {/* 3. Deskripsi Lengkap & Rincian Informasi (Tanpa Data Pribadi Pelapor) */}
              <div className="card">
                <div className="card-header">
                  <h2 className="heading-3">Deskripsi Permasalahan</h2>
                </div>
                <div className="card-body space-y-6">
                  <p className="text-body text-ink-secondary leading-relaxed">
                    {report.description}
                  </p>

                  <div className="pt-4 border-t border-line">
                    <h3 className="heading-4 mb-3">Rincian Informasi Laporan</h3>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-body-sm">
                      <div className="p-3.5 rounded-md bg-canvas border border-line">
                        <dt className="text-xs font-semibold text-muted">
                          Nomor Tiket Laporan
                        </dt>
                        <dd className="text-report-code text-navy mt-1">
                          {report.reportNumber}
                        </dd>
                      </div>

                      <div className="p-3.5 rounded-md bg-canvas border border-line">
                        <dt className="text-xs font-semibold text-muted">
                          Kategori Fasilitas
                        </dt>
                        <dd className="font-semibold text-ink mt-1">
                          {report.category}
                        </dd>
                      </div>

                      <div className="p-3.5 rounded-md bg-canvas border border-line">
                        <dt className="text-xs font-semibold text-muted">
                          Lokasi Kejadian
                        </dt>
                        <dd className="font-medium text-ink mt-1">
                          {report.location}
                        </dd>
                      </div>

                      <div className="p-3.5 rounded-md bg-canvas border border-line">
                        <dt className="text-xs font-semibold text-muted">
                          Identitas Pelapor
                        </dt>
                        <dd className="font-medium text-ink-secondary mt-1">
                          Dirahasiakan (Privasi Warga Terlindungi)
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* KOLOM TINDAK LANJUT (Kanan di Desktop, Bawah di Mobile): Alasan Penolakan, Tanggapan Admin & Timeline */}
            <div className="lg:col-span-5 space-y-6">
              {/* 4. Alasan Penolakan (Khusus apabila status === 'ditolak') */}
              {isRejected && report.rejectionReason && (
                <div
                  role="alert"
                  className="card border-danger/45 bg-danger-soft p-5 sm:p-6 space-y-2.5"
                >
                  <div className="flex items-center gap-2 text-danger-ink">
                    <svg
                      aria-hidden="true"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path d="M15 9l-6 6M9 9l6 6" />
                    </svg>
                    <h2 className="heading-3 text-danger-ink">
                      Alasan Penolakan Laporan
                    </h2>
                  </div>

                  <p className="text-body-sm text-danger-ink leading-relaxed">
                    {report.rejectionReason}
                  </p>
                </div>
              )}

              {/* 5. Tanggapan Admin / Pengelola */}
              <div className="card">
                <div className="card-header flex items-center justify-between gap-2">
                  <h2 className="heading-3">Tanggapan Admin</h2>
                  <span className="text-xs font-medium text-muted">
                    Tindak Lanjut Resmi
                  </span>
                </div>

                <div className="card-body">
                  {report.adminResponse ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
                        <span className="font-semibold text-navy">
                          {report.adminResponse.responder}
                        </span>
                        <time className="text-muted">
                          {report.adminResponse.updatedAt}
                        </time>
                      </div>

                      <p className="text-body-sm text-ink-secondary leading-relaxed p-3.5 rounded-md bg-surface-subtle border border-line">
                        {report.adminResponse.message}
                      </p>
                    </div>
                  ) : (
                    <div className="p-4 rounded-md bg-canvas border border-line text-body-sm text-muted">
                      Belum ada tanggapan tindak lanjut karena laporan ini masih
                      berada pada antrean <strong>Menunggu Verifikasi</strong>{' '}
                      oleh admin pengelola.
                    </div>
                  )}
                </div>
              </div>

              {/* 6. Timeline Perkembangan Status */}
              <div className="card">
                <div className="card-header">
                  <h2 className="heading-3">Timeline Status Laporan</h2>
                  <p className="text-body-sm text-muted mt-0.5">
                    Riwayat tahapan penanganan dari awal pelaporan hingga selesai.
                  </p>
                </div>

                <div className="card-body">
                  <ReportTimeline
                    status={report.status}
                    timeline={report.timeline}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ReportDetail
