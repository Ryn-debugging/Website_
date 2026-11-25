import { useRef } from 'react'
import {
  formatFileSize,
  validatePhotoFile,
} from '../../utils/reportFormValidator.js'

/**
 * Reusable PhotoUploader Component
 * Mendukung pemilihan foto dari kamera/galeri HP maupun komputer,
 * validasi tipe (JPG/PNG/WEBP) & ukuran (maks 5 MB), serta pratinjau gambar langsung.
 */
function PhotoUploader({
  photoFile,
  previewUrl,
  error,
  onFileSelect,
  onFileRemove,
}) {
  const fileInputRef = useRef(null)

  const handleInputChange = (event) => {
    const selected = event.target.files?.[0]
    if (!selected) return

    const validationMessage = validatePhotoFile(selected)
    onFileSelect(selected, validationMessage)
    // Reset input value agar memilih ulang file yang sama tetap memicu onChange
    event.target.value = ''
  }

  const triggerFileBrowser = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="form-group">
      <label htmlFor="report-photo-input" className="form-label">
        Foto Bukti Kerusakan <span className="form-required">*</span>
      </label>

      <input
        ref={fileInputRef}
        id="report-photo-input"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleInputChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? 'report-photo-error' : 'report-photo-helper'}
        className="sr-only"
      />

      {!previewUrl ? (
        <div
          onClick={triggerFileBrowser}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              triggerFileBrowser()
            }
          }}
          role="button"
          tabIndex={0}
          id="photo-upload-dropzone"
          className={`rounded-lg border-2 border-dashed p-6 sm:p-8 text-center transition-colors cursor-pointer ${
            error
              ? 'border-danger bg-danger-soft/45'
              : 'border-line-strong bg-canvas hover:border-teal hover:bg-teal-50/40'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-surface border border-line text-teal mx-auto flex items-center justify-center shadow-xs">
            <svg
              aria-hidden="true"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" />
              <circle cx="12" cy="13" r="3" />
            </svg>
          </div>

          <p className="text-sm font-semibold text-ink mt-3">
            Ketuk untuk memilih atau mengambil foto bukti
          </p>
          <p id="report-photo-helper" className="form-helper mt-1">
            Format didukung: <strong>JPG, PNG, WEBP</strong> &middot; Ukuran
            maksimal <strong>5 MB</strong>
          </p>
        </div>
      ) : (
        <div className="card overflow-hidden border-line-strong">
          <div className="relative aspect-16/9 bg-surface-subtle border-b border-line">
            <img
              src={previewUrl}
              alt="Pratinjau foto bukti laporan yang dipilih"
              className="w-full h-full object-contain bg-navy-950/5"
            />
          </div>

          <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink truncate">
                {photoFile?.name}
              </p>
              <p className="text-xs text-muted">
                Ukuran: {formatFileSize(photoFile?.size)} &middot; Siap dilampirkan
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                id="photo-replace-btn"
                type="button"
                onClick={triggerFileBrowser}
                className="btn btn-outline btn-sm"
              >
                Ganti Foto
              </button>
              <button
                id="photo-remove-btn"
                type="button"
                onClick={onFileRemove}
                className="btn btn-danger btn-sm"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <p id="report-photo-error" role="alert" className="form-error">
          {error}
        </p>
      )}
    </div>
  )
}

export default PhotoUploader
