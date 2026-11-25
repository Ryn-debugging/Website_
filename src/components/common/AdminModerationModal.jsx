import { useEffect, useState } from 'react'
import { REPORT_STATUS } from '../../utils/designTokens.js'
import StatusBadge from './StatusBadge.jsx'

/**
 * AdminModerationModal memungkinkan admin memeriksa bukti laporan secara utuh
 * (foto, deskripsi, lokasi, informasi pelapor dummy) serta melakukan:
 * - Verifikasi
 * - Penolakan wajib disertai alasan
 * - Perubahan status menjadi Sedang Diproses atau Selesai
 * - Pemberian catatan tindak lanjut
 * Seluruh perubahan dilengkapi langkah Dialog Konfirmasi agar aman dari salah klik.
 */
function AdminModerationModal({ report, onClose, onApplyModeration }) {
  const [note, setNote] = useState(report?.adminNote || '')
  const [rejectionReason, setRejectionReason] = useState(
    report?.rejectionReason || '',
  )
  const [reasonError, setReasonError] = useState('')
  // pendingAction: null | { targetStatus: string, label: string }
  const [pendingAction, setPendingAction] = useState(null)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (pendingAction) {
          setPendingAction(null)
        } else {
          onClose()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [pendingAction, onClose])

  if (!report) return null

  const requestStatusChange = (targetStatus, label) => {
    setReasonError('')
    setPendingAction({ targetStatus, label })
  }

  const handleConfirmAction = () => {
    if (!pendingAction) return

    if (pendingAction.targetStatus === 'ditolak') {
      const trimmedReason = rejectionReason.trim()
      if (trimmedReason.length < 10) {
        setReasonError(
          'Alasan penolakan wajib diisi minimal 10 karakter agar warga memahami kekurangan laporannya.',
        )
        return
      }
    }

    onApplyModeration({
      reportId: report.id,
      nextStatus: pendingAction.targetStatus,
      adminNote: note.trim(),
      rejectionReason:
        pendingAction.targetStatus === 'ditolak'
          ? rejectionReason.trim()
          : '',
    })
  }

  const handleSaveNoteOnly = () => {
    onApplyModeration({
      reportId: report.id,
      nextStatus: report.status,
      adminNote: note.trim(),
      rejectionReason: report.rejectionReason,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-navy-950/55 backdrop-blur-[1px] overflow-y-auto">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="moderation-modal-title"
        className="card max-w-3xl w-full max-h-[92vh] flex flex-col shadow-modal overflow-hidden my-auto"
      >
        {/* Header Modal */}
        <div className="px-5 sm:px-6 py-4 bg-surface border-b border-line flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-report-code text-navy bg-surface-subtle px-2 py-0.5 rounded-xs border border-line">
              #{report.reportNumber}
            </span>
            <StatusBadge status={report.status} />
            <span className="badge badge-pending">Simulasi Moderasi UI</span>
          </div>

          <button
            id="moderation-close-btn"
            type="button"
            onClick={onClose}
            aria-label="Tutup panel moderasi"
            className="w-9 h-9 rounded-md text-muted hover:text-ink hover:bg-surface-subtle flex items-center justify-center cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Body Modal Scrollable */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Judul & Foto Bukti */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            <div className="md:col-span-5 rounded-lg overflow-hidden border border-line bg-surface-subtle aspect-16/10">
              <img
                src={report.photo}
                alt={report.photoAlt}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:col-span-7 space-y-3">
              <span className="badge badge-neutral">{report.category}</span>
              <h2 id="moderation-modal-title" className="heading-2">
                {report.title}
              </h2>
              <p className="text-body-sm text-ink-secondary leading-relaxed">
                {report.description}
              </p>
            </div>
          </div>

          {/* Informasi Lokasi & Informasi Pelapor (Khusus Akses Internal Admin) */}
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-body-sm">
            <div className="p-3.5 rounded-md bg-canvas border border-line">
              <dt className="text-xs font-semibold text-muted">
                Lokasi &amp; Koordinat Kejadian
              </dt>
              <dd className="font-medium text-ink mt-1">{report.location}</dd>
              <dd className="text-xs font-mono text-muted mt-0.5">
                Koordinat: {report.coordinates}
              </dd>
            </div>

            <div className="p-3.5 rounded-md bg-canvas border border-line">
              <dt className="text-xs font-semibold text-muted">
                Informasi Pelapor (Akses Internal Admin)
              </dt>
              <dd className="font-semibold text-ink mt-1">
                {report.reporterName}
              </dd>
              <dd className="text-xs text-muted mt-0.5">
                {report.reporterEmail} &middot; {report.reportedAt}
              </dd>
            </div>
          </dl>

          {/* Catatan Tindak Lanjut Admin */}
          <div className="form-group">
            <label htmlFor="admin-moderation-note" className="form-label">
              Catatan Tindak Lanjut / Tanggapan Resmi Admin
            </label>
            <textarea
              id="admin-moderation-note"
              rows={3}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Tuliskan tanggapan verifikasi, jadwal pengerjaan petugas, atau hasil penanganan lapangan..."
              className="textarea-field"
            />
            <span className="form-helper">
              Catatan ini akan ditampilkan pada kartu Tanggapan Admin di halaman
              detail laporan.
            </span>
          </div>

          {/* ================================================================
              DIALOG KONFIRMASI AKSI MODERASI / PENOLAKAN
             ================================================================ */}
          {pendingAction ? (
            <div
              role="alertdialog"
              aria-labelledby="confirm-action-heading"
              className={`p-4 sm:p-5 rounded-lg border space-y-4 ${
                pendingAction.targetStatus === 'ditolak'
                  ? 'bg-danger-soft border-danger/45'
                  : 'bg-teal-50 border-teal/40'
              }`}
            >
              <div className="space-y-1">
                <h3
                  id="confirm-action-heading"
                  className={`heading-4 ${
                    pendingAction.targetStatus === 'ditolak'
                      ? 'text-danger-ink'
                      : 'text-navy'
                  }`}
                >
                  Konfirmasi: {pendingAction.label}
                </h3>
                <p className="text-body-sm text-ink-secondary">
                  Status laporan <strong>#{report.reportNumber}</strong> akan
                  diubah dari{' '}
                  <strong>{REPORT_STATUS[report.status]?.label}</strong> menjadi{' '}
                  <strong>
                    {REPORT_STATUS[pendingAction.targetStatus]?.label}
                  </strong>{' '}
                  (tersimpan pada state memori sesi ini).
                </p>
              </div>

              {pendingAction.targetStatus === 'ditolak' && (
                <div className="form-group">
                  <label
                    htmlFor="admin-rejection-reason"
                    className="form-label text-danger-ink"
                  >
                    Alasan Penolakan Laporan{' '}
                    <span className="form-required">*</span>
                  </label>
                  <textarea
                    id="admin-rejection-reason"
                    rows={2}
                    value={rejectionReason}
                    onChange={(event) => {
                      setRejectionReason(event.target.value)
                      if (reasonError) setReasonError('')
                    }}
                    placeholder="Contoh: Foto bukti kabur atau laporan duplikat dengan tiket aktif lainnya..."
                    className={`textarea-field bg-surface ${
                      reasonError ? 'input-error' : ''
                    }`}
                  />
                  {reasonError && (
                    <p role="alert" className="form-error">
                      {reasonError}
                    </p>
                  )}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-end gap-2.5">
                <button
                  id="cancel-confirm-moderation-btn"
                  type="button"
                  onClick={() => {
                    setPendingAction(null)
                    setReasonError('')
                  }}
                  className="btn btn-outline btn-sm bg-surface"
                >
                  Batal
                </button>
                <button
                  id="execute-confirm-moderation-btn"
                  type="button"
                  onClick={handleConfirmAction}
                  className={`btn btn-sm ${
                    pendingAction.targetStatus === 'ditolak'
                      ? 'btn-danger'
                      : 'btn-primary'
                  }`}
                >
                  Ya, Konfirmasi Perubahan
                </button>
              </div>
            </div>
          ) : (
            /* Baris Tombol Pilihan Tindakan Moderasi */
            <div className="p-4 rounded-lg bg-surface-subtle border border-line space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-muted">
                Tindakan Moderasi &amp; Perubahan Status
              </p>

              <div className="flex flex-wrap items-center gap-2.5">
                {report.status !== 'diverifikasi' && (
                  <button
                    id="mod-action-verify"
                    type="button"
                    onClick={() =>
                      requestStatusChange(
                        'diverifikasi',
                        'Verifikasi & Publikasikan Laporan',
                      )
                    }
                    className="btn btn-navy btn-sm"
                  >
                    Verifikasi Laporan
                  </button>
                )}

                {report.status !== 'sedang_diproses' && (
                  <button
                    id="mod-action-process"
                    type="button"
                    onClick={() =>
                      requestStatusChange(
                        'sedang_diproses',
                        'Ubah Status ke Sedang Diproses',
                      )
                    }
                    className="btn btn-primary btn-sm"
                  >
                    Ubah ke Diproses
                  </button>
                )}

                {report.status !== 'selesai' && (
                  <button
                    id="mod-action-resolve"
                    type="button"
                    onClick={() =>
                      requestStatusChange(
                        'selesai',
                        'Tandai Laporan Selesai Ditangani',
                      )
                    }
                    className="btn btn-success btn-sm"
                  >
                    Tandai Selesai
                  </button>
                )}

                {report.status !== 'ditolak' && (
                  <button
                    id="mod-action-reject"
                    type="button"
                    onClick={() =>
                      requestStatusChange(
                        'ditolak',
                        'Tolak Laporan dengan Alasan',
                      )
                    }
                    className="btn btn-danger btn-sm"
                  >
                    Tolak dengan Alasan
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Modal */}
        <div className="px-5 sm:px-6 py-3.5 bg-canvas border-t border-line flex items-center justify-between gap-3 shrink-0">
          <button
            id="moderation-footer-close"
            type="button"
            onClick={onClose}
            className="btn btn-ghost btn-sm"
          >
            Tutup
          </button>

          {!pendingAction && (
            <button
              id="moderation-save-note-btn"
              type="button"
              onClick={handleSaveNoteOnly}
              className="btn btn-outline btn-sm"
            >
              Simpan Catatan Tindak Lanjut
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminModerationModal
