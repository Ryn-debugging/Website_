import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import LocationPicker from '../components/common/LocationPicker.jsx'
import PhotoUploader from '../components/common/PhotoUploader.jsx'
import StatusBadge from '../components/common/StatusBadge.jsx'
import {
  CREATE_REPORT_CATEGORIES,
  formatFileSize,
  isValidCoordinatePair,
  validateReportForm,
} from '../utils/reportFormValidator.js'

const INITIAL_FORM_VALUES = {
  title: '',
  category: '',
  description: '',
  address: '',
  latitude: '',
  longitude: '',
  agreed: false,
}

function CreateReport() {
  const topSectionRef = useRef(null)
  const previewUrlRef = useRef('')

  const [values, setValues] = useState(INITIAL_FORM_VALUES)
  const [photoFile, setPhotoFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [errors, setErrors] = useState({})

  // Alur layar: 'form' -> 'preview' -> 'success'
  const [step, setStep] = useState('form')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [simulatedTicket, setSimulatedTicket] = useState(null)

  useEffect(() => {
    previewUrlRef.current = previewUrl
  }, [previewUrl])

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current)
      }
    }
  }, [])

  const scrollToPageTop = () => {
    if (topSectionRef.current) {
      topSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const updateField = (fieldName, nextValue) => {
    setValues((prev) => ({ ...prev, [fieldName]: nextValue }))
    if (errors[fieldName]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[fieldName]
        return next
      })
    }
  }

  const handlePhotoSelect = (file, validationMessage) => {
    if (validationMessage) {
      setErrors((prev) => ({ ...prev, photo: validationMessage }))
      return
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }

    const objectUrl = URL.createObjectURL(file)
    setPhotoFile(file)
    setPreviewUrl(objectUrl)
    setErrors((prev) => {
      const next = { ...prev }
      delete next.photo
      return next
    })
  }

  const handlePhotoRemove = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setPhotoFile(null)
    setPreviewUrl('')
  }

  const handleCoordinatesChange = (nextLat, nextLng) => {
    setValues((prev) => ({
      ...prev,
      latitude: nextLat,
      longitude: nextLng,
    }))

    if (errors.coordinates) {
      const check = isValidCoordinatePair(nextLat, nextLng)
      if (check.valid) {
        setErrors((prev) => {
          const next = { ...prev }
          delete next.coordinates
          return next
        })
      }
    }
  }

  const handleReviewSubmit = (event) => {
    event.preventDefault()
    setSubmitError('')

    const validationErrors = validateReportForm(values, photoFile)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      scrollToPageTop()
      return
    }

    setStep('preview')
    scrollToPageTop()
  }

  const handleConfirmSend = (forceSimulatedError = false) => {
    setSubmitError('')
    setIsSubmitting(true)

    window.setTimeout(() => {
      setIsSubmitting(false)

      if (forceSimulatedError) {
        setSubmitError(
          'Simulasi Error: Pengiriman laporan gagal diproses. Tenang, seluruh isian dan foto Anda tetap tersimpan aman. Silakan coba kirim ulang.',
        )
        return
      }

      const now = new Date()
      const suffix = String(now.getTime()).slice(-4)
      const formattedTime = now.toLocaleString('id-ID', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })

      setSimulatedTicket({
        number: `LW-SIM-${now.getFullYear()}-${suffix}`,
        submittedAt: `${formattedTime} WIB`,
      })
      setStep('success')
      scrollToPageTop()
    }, 350)
  }

  const handleResetNewReport = () => {
    handlePhotoRemove()
    setValues(INITIAL_FORM_VALUES)
    setErrors({})
    setSubmitError('')
    setSimulatedTicket(null)
    setStep('form')
    scrollToPageTop()
  }

  const selectedCategoryObj = CREATE_REPORT_CATEGORIES.find(
    (cat) => cat.value === values.category,
  )
  const errorCount = Object.keys(errors).length

  return (
    <div ref={topSectionRef} className="flex flex-col flex-1 bg-canvas">
      {/* Page Header */}
      <section className="bg-surface border-b border-line py-8">
        <div className="lw-container max-w-4xl space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <p className="text-eyebrow text-teal">Formulir Pengaduan Warga</p>
            <span className="badge badge-pending">
              <span className="badge-dot" aria-hidden="true" />
              Mode Frontend (Tidak Disimpan ke Database)
            </span>
          </div>

          <h1 className="heading-1">Buat Laporan Permasalahan Lingkungan</h1>
          <p className="text-body text-muted max-w-2xl">
            Lengkapi informasi kerusakan fasilitas umum di bawah ini secara
            jelas. Anda akan melihat pratinjau laporan terlebih dahulu sebelum
            mengirimkannya.
          </p>

          {/* Indikator Tahapan Ramah Masyarakat Awam */}
          <ol
            aria-label="Tahapan Pengisian Laporan"
            className="pt-3 grid grid-cols-3 gap-2 sm:gap-4"
          >
            {[
              { key: 'form', num: '1', label: 'Isi Formulir' },
              { key: 'preview', num: '2', label: 'Pratinjau Laporan' },
              { key: 'success', num: '3', label: 'Selesai' },
            ].map((item) => {
              const isActive = step === item.key
              const isPassed =
                (step === 'preview' && item.key === 'form') ||
                (step === 'success' && item.key !== 'success')

              return (
                <li
                  key={item.key}
                  className={`p-2.5 sm:px-3.5 rounded-md border flex items-center gap-2.5 text-xs sm:text-sm font-semibold ${
                    isActive
                      ? 'bg-teal-50 border-teal text-teal-800'
                      : isPassed
                        ? 'bg-success-soft border-success/30 text-success-ink'
                        : 'bg-canvas border-line text-muted'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      isActive
                        ? 'bg-teal text-white'
                        : isPassed
                          ? 'bg-success text-white'
                          : 'bg-surface-muted text-muted'
                    }`}
                  >
                    {isPassed ? '✓' : item.num}
                  </span>
                  <span className="truncate">{item.label}</span>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      {/* Main Content */}
      <section className="lw-section flex-1">
        <div className="lw-container max-w-4xl">
          {/* ==============================================================
              TAHAP 1: FORMULIR PENGISIAN LAPORAN
             ============================================================== */}
          {step === 'form' && (
            <form
              id="create-report-form"
              noValidate
              onSubmit={handleReviewSubmit}
              className="space-y-6"
            >
              {errorCount > 0 && (
                <div
                  role="alert"
                  className="card border-danger/45 bg-danger-soft p-4 sm:p-5 space-y-1.5"
                >
                  <p className="text-sm font-bold text-danger-ink">
                    Mohon periksa kembali isian formulir ({errorCount} bagian
                    perlu dilengkapi)
                  </p>
                  <p className="text-xs sm:text-sm text-danger-ink/90">
                    Pastikan seluruh kolom bertanda bintang (*) sudah diisi
                    dengan benar sebelum meninjau pratinjau laporan.
                  </p>
                </div>
              )}

              {/* Bagian A: Informasi Utama Laporan */}
              <div className="card">
                <div className="card-header">
                  <h2 className="heading-3">1. Informasi Kerusakan</h2>
                  <p className="text-body-sm text-muted mt-0.5">
                    Pilih kategori masalah dan tuliskan keterangan yang mudah
                    dipahami petugas.
                  </p>
                </div>

                <div className="card-body space-y-6">
                  {/* Judul Laporan */}
                  <div className="form-group">
                    <div className="flex items-center justify-between gap-2">
                      <label htmlFor="report-title-input" className="form-label">
                        Judul Laporan <span className="form-required">*</span>
                      </label>
                      <span className="text-xs text-muted tabular-nums">
                        {values.title.length}/120
                      </span>
                    </div>
                    <input
                      id="report-title-input"
                      type="text"
                      maxLength={120}
                      value={values.title}
                      onChange={(event) =>
                        updateField('title', event.target.value)
                      }
                      aria-invalid={Boolean(errors.title)}
                      aria-describedby={
                        errors.title ? 'report-title-error' : 'report-title-help'
                      }
                      placeholder="Contoh: Jalan berlubang cukup dalam di dekat pertigaan RT 04"
                      className={`input-field ${errors.title ? 'input-error' : ''}`}
                    />
                    {errors.title ? (
                      <p id="report-title-error" role="alert" className="form-error">
                        {errors.title}
                      </p>
                    ) : (
                      <p id="report-title-help" className="form-helper">
                        Gunakan judul singkat dan spesifik (minimal 10 karakter).
                      </p>
                    )}
                  </div>

                  {/* Kategori Laporan (6 Pilihan Radio Card Ramah Sentuh) */}
                  <fieldset className="space-y-2.5 border-0 p-0 m-0">
                    <legend className="form-label">
                      Kategori Permasalahan{' '}
                      <span className="form-required">*</span>
                    </legend>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
                      {CREATE_REPORT_CATEGORIES.map((category) => {
                        const isSelected = values.category === category.value
                        return (
                          <label
                            key={category.value}
                            htmlFor={`cat-option-${category.value}`}
                            className={`rounded-md border p-3.5 cursor-pointer transition-all flex items-start gap-3 ${
                              isSelected
                                ? 'border-teal bg-teal-50/75 ring-1 ring-teal'
                                : errors.category
                                  ? 'border-danger/60 bg-surface hover:bg-surface-subtle'
                                  : 'border-line-strong bg-surface hover:border-navy-600 hover:bg-canvas'
                            }`}
                          >
                            <input
                              id={`cat-option-${category.value}`}
                              type="radio"
                              name="report-category"
                              value={category.value}
                              checked={isSelected}
                              onChange={() =>
                                updateField('category', category.value)
                              }
                              className="mt-1 accent-[#168C83] w-4 h-4 shrink-0"
                            />
                            <span className="min-w-0">
                              <span className="block text-sm font-semibold text-ink">
                                {category.label}
                              </span>
                              <span className="block text-xs text-muted mt-0.5 leading-snug">
                                {category.hint}
                              </span>
                            </span>
                          </label>
                        )
                      })}
                    </div>

                    {errors.category && (
                      <p
                        id="report-category-error"
                        role="alert"
                        className="form-error"
                      >
                        {errors.category}
                      </p>
                    )}
                  </fieldset>

                  {/* Deskripsi */}
                  <div className="form-group">
                    <div className="flex items-center justify-between gap-2">
                      <label
                        htmlFor="report-description-input"
                        className="form-label"
                      >
                        Deskripsi Lengkap <span className="form-required">*</span>
                      </label>
                      <span className="text-xs text-muted tabular-nums">
                        {values.description.length}/1000
                      </span>
                    </div>
                    <textarea
                      id="report-description-input"
                      rows={4}
                      maxLength={1000}
                      value={values.description}
                      onChange={(event) =>
                        updateField('description', event.target.value)
                      }
                      aria-invalid={Boolean(errors.description)}
                      aria-describedby={
                        errors.description
                          ? 'report-description-error'
                          : 'report-description-help'
                      }
                      placeholder="Ceritakan kondisi kerusakan, perkiraan ukuran/tingkat keparahan, serta dampaknya bagi warga sekitar..."
                      className={`textarea-field ${
                        errors.description ? 'input-error' : ''
                      }`}
                    />
                    {errors.description ? (
                      <p
                        id="report-description-error"
                        role="alert"
                        className="form-error"
                      >
                        {errors.description}
                      </p>
                    ) : (
                      <p id="report-description-help" className="form-helper">
                        Minimal 20 karakter. Hindari mencantumkan data pribadi
                        sensitif seperti NIK atau nomor telepon di dalam deskripsi
                        publik.
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Bagian B: Foto Bukti */}
              <div className="card">
                <div className="card-header">
                  <h2 className="heading-3">2. Unggah Foto Bukti</h2>
                  <p className="text-body-sm text-muted mt-0.5">
                    Lampirkan satu foto kondisi objek secara jelas agar laporan
                    mudah diverifikasi admin.
                  </p>
                </div>

                <div className="card-body">
                  <PhotoUploader
                    photoFile={photoFile}
                    previewUrl={previewUrl}
                    error={errors.photo}
                    onFileSelect={handlePhotoSelect}
                    onFileRemove={handlePhotoRemove}
                  />
                </div>
              </div>

              {/* Bagian C: Lokasi Kejadian */}
              <div className="card">
                <div className="card-header">
                  <h2 className="heading-3">3. Lokasi Kejadian</h2>
                  <p className="text-body-sm text-muted mt-0.5">
                    Lengkapi alamat jalan beserta titik koordinat kejadian.
                  </p>
                </div>

                <div className="card-body">
                  <LocationPicker
                    address={values.address}
                    latitude={values.latitude}
                    longitude={values.longitude}
                    addressError={errors.address}
                    coordinatesError={errors.coordinates}
                    onAddressChange={(val) => updateField('address', val)}
                    onCoordinatesChange={handleCoordinatesChange}
                  />
                </div>
              </div>

              {/* Bagian D: Persetujuan & Tombol Lanjut ke Pratinjau */}
              <div className="card p-5 sm:p-6 space-y-5">
                <div className="space-y-2">
                  <label
                    htmlFor="report-agreement-checkbox"
                    className={`flex items-start gap-3 p-3.5 rounded-md border cursor-pointer transition-colors ${
                      errors.agreed
                        ? 'border-danger bg-danger-soft/45'
                        : 'border-line bg-canvas hover:border-navy-600'
                    }`}
                  >
                    <input
                      id="report-agreement-checkbox"
                      type="checkbox"
                      checked={values.agreed}
                      onChange={(event) =>
                        updateField('agreed', event.target.checked)
                      }
                      aria-invalid={Boolean(errors.agreed)}
                      className="mt-1 w-4 h-4 accent-[#168C83] shrink-0"
                    />
                    <span className="text-body-sm text-ink-secondary leading-relaxed">
                      Saya menyatakan bahwa laporan, lokasi, dan foto bukti yang
                      dilampirkan adalah benar sesuai kondisi di lapangan, serta
                      menyetujui proses verifikasi pengelola sebelum laporan
                      ditampilkan ke publik.{' '}
                      <span className="form-required">*</span>
                    </span>
                  </label>

                  {errors.agreed && (
                    <p
                      id="report-agreement-error"
                      role="alert"
                      className="form-error"
                    >
                      {errors.agreed}
                    </p>
                  )}
                </div>

                <div className="pt-2 border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <Link
                    id="form-cancel-link"
                    to="/laporan"
                    className="btn btn-ghost"
                  >
                    Batal
                  </Link>

                  <button
                    id="btn-review-report"
                    type="submit"
                    className="btn btn-primary btn-lg"
                  >
                    <span>Tinjau Pratinjau Laporan</span>
                    <span aria-hidden="true">&rarr;</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* ==============================================================
              TAHAP 2: PRATINJAU LAPORAN SEBELUM SUBMIT (+ ERROR STATE)
             ============================================================== */}
          {step === 'preview' && (
            <div className="space-y-6">
              <div className="card p-5 sm:p-6 bg-surface border-teal/40 space-y-2">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h2 className="heading-2">
                    Periksa Kembali Pratinjau Laporan Anda
                  </h2>
                  <StatusBadge status="menunggu_verifikasi" />
                </div>
                <p className="text-body-sm text-muted">
                  Pastikan judul, foto bukti, dan titik lokasi sudah tepat
                  sebelum dikirimkan. Ini adalah simulasi frontend sehingga data
                  tidak disimpan ke server atau database.
                </p>
              </div>

              {/* Error State pada saat pengiriman gagal */}
              {submitError && (
                <div
                  role="alert"
                  className="card border-danger/45 bg-danger-soft p-5 space-y-2"
                >
                  <h3 className="heading-4 text-danger-ink">
                    Gagal Mengirim Laporan
                  </h3>
                  <p className="text-body-sm text-danger-ink">{submitError}</p>
                </div>
              )}

              {/* Kartu Pratinjau Laporan */}
              <div className="card overflow-hidden">
                {previewUrl && (
                  <div className="aspect-16/9 bg-surface-subtle border-b border-line">
                    <img
                      src={previewUrl}
                      alt="Pratinjau foto bukti laporan sebelum dikirim"
                      className="w-full h-full object-contain bg-navy-950/5"
                    />
                  </div>
                )}

                <div className="p-5 sm:p-7 space-y-5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="badge badge-neutral">
                      {selectedCategoryObj?.label || values.category}
                    </span>
                    <span className="text-xs text-muted">
                      Lampiran: {photoFile?.name} ({formatFileSize(photoFile?.size)})
                    </span>
                  </div>

                  <div>
                    <h3 className="heading-2">{values.title}</h3>
                    <p className="text-body text-ink-secondary mt-2.5 whitespace-pre-line">
                      {values.description}
                    </p>
                  </div>

                  <dl className="pt-4 border-t border-line grid grid-cols-1 sm:grid-cols-2 gap-4 text-body-sm">
                    <div className="p-3.5 rounded-md bg-canvas border border-line">
                      <dt className="text-xs font-semibold text-muted">
                        Alamat / Patokan Kejadian
                      </dt>
                      <dd className="font-medium text-ink mt-1">
                        {values.address}
                      </dd>
                    </div>

                    <div className="p-3.5 rounded-md bg-canvas border border-line">
                      <dt className="text-xs font-semibold text-muted">
                        Koordinat Lokasi (Lat, Lng)
                      </dt>
                      <dd className="text-report-code text-navy mt-1">
                        {Number(values.latitude).toFixed(6)},{' '}
                        {Number(values.longitude).toFixed(6)}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="card-footer flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <button
                    id="btn-back-to-edit"
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => {
                      setSubmitError('')
                      setStep('form')
                      scrollToPageTop()
                    }}
                    className="btn btn-outline"
                  >
                    &larr; Ubah Data Laporan
                  </button>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      id="btn-simulate-submit-error"
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => handleConfirmSend(true)}
                      className="btn btn-outline btn-sm text-danger border-danger/40 hover:bg-danger-soft"
                    >
                      Uji Error State
                    </button>

                    <button
                      id="btn-confirm-submit"
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => handleConfirmSend(false)}
                      className="btn btn-primary btn-lg"
                    >
                      {isSubmitting
                        ? 'Memproses Simulasi...'
                        : 'Kirim Laporan (Simulasi)'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ==============================================================
              TAHAP 3: SUCCESS STATE
             ============================================================== */}
          {step === 'success' && (
            <div
              role="status"
              aria-live="polite"
              className="card p-6 sm:p-10 text-center max-w-2xl mx-auto space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-success-soft text-success mx-auto flex items-center justify-center">
                <svg
                  aria-hidden="true"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>

              <div className="space-y-2">
                <span className="badge badge-pending">
                  <span className="badge-dot" aria-hidden="true" />
                  Simulasi Frontend Berhasil (Tidak Disimpan ke Database)
                </span>
                <h2 className="heading-1 pt-1">Laporan Berhasil Disimulasikan!</h2>
                <p className="text-body text-muted max-w-lg mx-auto">
                  Pada sistem produksi nantinya, laporan Anda akan masuk ke
                  antrean <strong>Menunggu Verifikasi</strong> sebelum
                  ditampilkan ke daftar publik.
                </p>
              </div>

              <div className="p-4 sm:p-5 rounded-lg bg-canvas border border-line text-left space-y-2.5 text-body-sm">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-muted">Nomor Referensi Simulasi:</span>
                  <span className="text-report-code text-navy">
                    {simulatedTicket?.number}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-muted">Judul Laporan:</span>
                  <span className="font-semibold text-ink">{values.title}</span>
                </div>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-muted">Kategori:</span>
                  <span className="font-medium text-ink">
                    {selectedCategoryObj?.label}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-muted">Waktu Simulasi:</span>
                  <span className="text-ink-secondary">
                    {simulatedTicket?.submittedAt}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-col xs:flex-row items-stretch xs:items-center justify-center gap-3">
                <button
                  id="btn-create-another-report"
                  type="button"
                  onClick={handleResetNewReport}
                  className="btn btn-primary"
                >
                  Buat Laporan Lain
                </button>
                <Link
                  id="btn-success-explore"
                  to="/laporan"
                  className="btn btn-outline"
                >
                  Jelajahi Daftar Laporan
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default CreateReport
