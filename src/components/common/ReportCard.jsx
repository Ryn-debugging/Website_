import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge.jsx'

/**
 * Reusable ReportCard menampilkan foto, judul, kategori, lokasi, tanggal, dan status.
 * Seluruh permukaan kartu dapat diklik untuk membuka halaman detail laporan (/laporan/:id).
 */
function ReportCard({ report }) {
  return (
    <article className="card card-interactive relative overflow-hidden flex flex-col group focus-within:ring-2 focus-within:ring-teal">
      {/* 1. Foto Bukti Laporan */}
      <div className="relative aspect-16/9 bg-surface-subtle border-b border-line overflow-hidden">
        <img
          src={report.photo}
          alt={report.photoAlt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
        {report.isDummy && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-xs bg-navy/90 text-white text-[11px] font-bold uppercase tracking-wider">
            Data Dummy
          </span>
        )}
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-3">
          {/* 2. Kategori & 3. Status */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="badge badge-neutral">{report.category}</span>
            <StatusBadge status={report.status} />
          </div>

          {/* 4. Judul Laporan (Stretched Link membuat seluruh kartu dapat diklik secara aksesibel) */}
          <h3 className="heading-3 line-clamp-2 group-hover:text-teal transition-colors">
            <Link
              id={`report-card-link-${report.id}`}
              to={`/laporan/${report.id}`}
              className="no-underline text-inherit focus:outline-none after:content-[''] after:absolute after:inset-0 after:z-10"
            >
              {report.title}
            </Link>
          </h3>

          {/* 5. Lokasi Kejadian */}
          <div className="flex items-start gap-2 text-body-sm text-muted">
            <svg
              aria-hidden="true"
              width="16"
              height="16"
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
        </div>

        {/* 6. Tanggal Laporan & Indikator Buka Detail */}
        <div className="pt-3 border-t border-line flex items-center justify-between gap-3 text-xs text-muted">
          <div className="inline-flex items-center gap-1.5">
            <svg
              aria-hidden="true"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            <time>{report.date}</time>
          </div>

          <span className="inline-flex items-center gap-1 font-semibold text-navy group-hover:text-teal transition-colors">
            <span>Lihat Detail</span>
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5"
            >
              &rarr;
            </span>
          </span>
        </div>
      </div>
    </article>
  )
}

export default ReportCard
