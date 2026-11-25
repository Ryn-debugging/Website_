const TIMELINE_STAGES = [
  {
    key: 'menunggu_verifikasi',
    label: 'Menunggu verifikasi',
    upcomingText: 'Menunggu pemeriksaan awal oleh admin.',
  },
  {
    key: 'diverifikasi',
    label: 'Diverifikasi',
    upcomingText: 'Menunggu verifikasi kelengkapan bukti dan lokasi.',
  },
  {
    key: 'sedang_diproses',
    label: 'Sedang diproses',
    upcomingText: 'Menunggu penugasan dan pengerjaan petugas di lapangan.',
  },
  {
    key: 'selesai',
    label: 'Selesai',
    upcomingText: 'Menunggu konfirmasi penyelesaian perbaikan.',
  },
]

const STAGE_ORDER = {
  menunggu_verifikasi: 0,
  diverifikasi: 1,
  sedang_diproses: 2,
  selesai: 3,
}

function getStageVisualState(stageIndex, reportStatus) {
  if (reportStatus === 'ditolak') {
    if (stageIndex === 0) return 'completed'
    if (stageIndex === 1) return 'rejected'
    return 'stopped'
  }

  if (reportStatus === 'selesai') {
    return 'completed'
  }

  const activeIndex = STAGE_ORDER[reportStatus] ?? 0
  if (stageIndex < activeIndex) return 'completed'
  if (stageIndex === activeIndex) return 'current'
  return 'upcoming'
}

/**
 * Reusable ReportTimeline menampilkan progres 4 tahapan resmi status laporan
 * (Menunggu verifikasi -> Diverifikasi -> Sedang diproses -> Selesai) serta cabang Ditolak.
 */
function ReportTimeline({ status, timeline = {} }) {
  return (
    <ol aria-label="Riwayat Perkembangan Status Laporan" className="space-y-0">
      {TIMELINE_STAGES.map((stage, index) => {
        const isLast = index === TIMELINE_STAGES.length - 1
        const visualState = getStageVisualState(index, status)

        const entry =
          visualState === 'rejected'
            ? timeline.ditolak
            : timeline[stage.key]

        const isLineCompleted =
          visualState === 'completed' &&
          !(status === 'ditolak' && index === 0)

        return (
          <li key={stage.key} className="relative flex gap-4 pb-7 last:pb-0">
            {/* Garis penghubung vertikal */}
            {!isLast && (
              <span
                aria-hidden="true"
                className={`absolute left-[15px] top-8 bottom-0 w-0.5 ${
                  isLineCompleted
                    ? 'bg-success'
                    : status === 'ditolak' && index === 0
                      ? 'bg-danger/50'
                      : 'bg-line'
                }`}
              />
            )}

            {/* Lingkaran indikator tahap */}
            <span
              aria-hidden="true"
              className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                visualState === 'completed'
                  ? 'bg-success text-white'
                  : visualState === 'current'
                    ? 'bg-teal text-white ring-4 ring-teal-100'
                    : visualState === 'rejected'
                      ? 'bg-danger text-white ring-4 ring-danger-soft'
                      : 'bg-surface-subtle text-muted border border-line-strong'
              }`}
            >
              {visualState === 'completed' && (
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              )}

              {visualState === 'current' && (
                <span className="w-2.5 h-2.5 rounded-full bg-white" />
              )}

              {visualState === 'rejected' && (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              )}

              {(visualState === 'upcoming' || visualState === 'stopped') && (
                <span className="w-2 h-2 rounded-full bg-muted/45" />
              )}
            </span>

            {/* Konten teks tahap */}
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3
                    className={`text-sm font-semibold ${
                      visualState === 'upcoming' || visualState === 'stopped'
                        ? 'text-muted'
                        : visualState === 'rejected'
                          ? 'text-danger-ink font-bold'
                          : 'text-ink'
                    }`}
                  >
                    {visualState === 'rejected'
                      ? 'Diverifikasi (Ditolak)'
                      : stage.label}
                  </h3>

                  {visualState === 'current' && (
                    <span className="px-2 py-0.5 rounded-xs bg-teal-50 text-teal-800 text-[11px] font-semibold">
                      Tahap Saat Ini
                    </span>
                  )}

                  {visualState === 'rejected' && (
                    <span className="badge badge-rejected">
                      <span className="badge-dot" aria-hidden="true" />
                      Ditolak
                    </span>
                  )}
                </div>

                <time className="text-xs text-muted tabular-nums">
                  {entry?.time || '—'}
                </time>
              </div>

              <p
                className={`text-body-sm mt-1 ${
                  visualState === 'upcoming' || visualState === 'stopped'
                    ? 'text-muted/85'
                    : 'text-ink-secondary'
                }`}
              >
                {entry?.note ||
                  (visualState === 'stopped'
                    ? 'Tahap ini tidak dilanjutkan karena laporan ditolak pada tahap verifikasi.'
                    : stage.upcomingText)}
              </p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

export default ReportTimeline
