import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PasswordInput from '../components/common/PasswordInput.jsx'
import AuthShell from '../components/layout/AuthShell.jsx'
import {
  getPasswordChecks,
  validateRegisterForm,
} from '../utils/authValidator.js'

const INITIAL_REGISTER_VALUES = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreedToTerms: false,
}

function Register() {
  const timerRef = useRef(null)

  const [values, setValues] = useState(INITIAL_REGISTER_VALUES)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [registerError, setRegisterError] = useState('')
  const [registeredPreview, setRegisteredPreview] = useState(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
      }
    }
  }, [])

  const updateField = (field, nextValue) => {
    setValues((prev) => ({ ...prev, [field]: nextValue }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const runRegistrationAttempt = (simulateServerError = false) => {
    setRegisterError('')

    const validationErrors = validateRegisterForm(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setIsLoading(true)
    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
    }

    const cleanName = values.fullName.trim()
    const cleanEmail = values.email.trim()

    timerRef.current = window.setTimeout(() => {
      setIsLoading(false)
      // Bersihkan seluruh kolom kata sandi dari state memori (tidak pernah disimpan manual / localStorage)
      setValues((prev) => ({
        ...prev,
        password: '',
        confirmPassword: '',
      }))

      if (simulateServerError) {
        setRegisterError(
          'Pendaftaran belum dapat diselesaikan karena alamat email sudah terdaftar atau layanan sedang sibuk. Silakan periksa kembali.',
        )
        return
      }

      setRegisteredPreview({
        fullName: cleanName,
        email: cleanEmail,
      })
    }, 500)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    runRegistrationAttempt(false)
  }

  const handleResetForm = () => {
    setValues(INITIAL_REGISTER_VALUES)
    setErrors({})
    setRegisterError('')
    setRegisteredPreview(null)
  }

  const pwdChecks = getPasswordChecks(values.password)

  return (
    <AuthShell
      eyebrow="Pendaftaran Akun Warga"
      title="Buat Akun Masyarakat"
      subtitle={
        <p>
          Sudah memiliki akun?{' '}
          <Link
            id="register-to-login-link"
            to="/masuk"
            className="font-semibold text-teal hover:text-teal-800 underline underline-offset-2"
          >
            Masuk di sini
          </Link>
        </p>
      }
    >
      {/* SUCCESS STATE (UI Sementara — Tanpa Menyimpan Password / Akun Palsu) */}
      {registeredPreview ? (
        <div
          role="status"
          aria-live="polite"
          className="space-y-5 text-center py-2"
        >
          <div className="w-14 h-14 rounded-full bg-success-soft text-success mx-auto flex items-center justify-center">
            <svg
              aria-hidden="true"
              width="28"
              height="28"
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
              UI Sementara — Belum Terhubung Supabase Auth
            </span>
            <h2 className="heading-2 pt-1">
              Validasi Pendaftaran Warga Berhasil!
            </h2>
            <p className="text-body-sm text-muted max-w-md mx-auto">
              Formulir registrasi telah tervalidasi dengan benar. Pada tahap
              integrasi Supabase Auth (Phase 5) nantinya, tautan verifikasi akan
              dikirimkan ke email Anda.
            </p>
          </div>

          <dl className="p-4 rounded-md bg-canvas border border-line text-left space-y-2 text-body-sm">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <dt className="text-muted">Nama Lengkap:</dt>
              <dd className="font-semibold text-ink">
                {registeredPreview.fullName}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <dt className="text-muted">Email:</dt>
              <dd className="font-medium text-ink">
                {registeredPreview.email}
              </dd>
            </div>
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <dt className="text-muted">Peran Akun:</dt>
              <dd className="badge badge-verified">Masyarakat (Warga)</dd>
            </div>
          </dl>

          <div className="pt-2 flex flex-col xs:flex-row items-stretch xs:items-center justify-center gap-3">
            <Link id="register-success-login-btn" to="/masuk" className="btn btn-primary">
              Ke Halaman Masuk
            </Link>
            <button
              id="register-reset-btn"
              type="button"
              onClick={handleResetForm}
              className="btn btn-outline"
            >
              Ulangi Pratinjau Form
            </button>
          </div>
        </div>
      ) : (
        <form
          id="register-form"
          noValidate
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* Catatan Keamanan Role Publik */}
          <div className="p-3 rounded-md bg-surface-subtle border border-line text-xs text-ink-secondary">
            Pendaftaran ini khusus untuk <strong>Akun Warga Masyarakat</strong>.
            Hak akses pengelola/admin tidak dapat dipilih melalui registrasi
            publik.
          </div>

          {/* Error State Banner */}
          {registerError && (
            <div
              role="alert"
              className="p-4 rounded-md border border-danger/45 bg-danger-soft space-y-1"
            >
              <p className="text-sm font-bold text-danger-ink">
                Pendaftaran Belum Berhasil
              </p>
              <p className="text-body-sm text-danger-ink">{registerError}</p>
            </div>
          )}

          {/* 1. Nama Lengkap */}
          <div className="form-group">
            <label htmlFor="register-fullname-input" className="form-label">
              Nama Lengkap <span className="form-required">*</span>
            </label>
            <input
              id="register-fullname-input"
              name="fullName"
              type="text"
              autoComplete="name"
              disabled={isLoading}
              value={values.fullName}
              onChange={(event) => updateField('fullName', event.target.value)}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={
                errors.fullName ? 'register-fullname-error' : undefined
              }
              placeholder="Contoh: Siti Rahmawati"
              className={`input-field ${errors.fullName ? 'input-error' : ''}`}
            />
            {errors.fullName && (
              <p
                id="register-fullname-error"
                role="alert"
                className="form-error"
              >
                {errors.fullName}
              </p>
            )}
          </div>

          {/* 2. Email */}
          <div className="form-group">
            <label htmlFor="register-email-input" className="form-label">
              Alamat Email <span className="form-required">*</span>
            </label>
            <input
              id="register-email-input"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              disabled={isLoading}
              value={values.email}
              onChange={(event) => updateField('email', event.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? 'register-email-error' : undefined
              }
              placeholder="Contoh: siti.warga@email.com"
              className={`input-field ${errors.email ? 'input-error' : ''}`}
            />
            {errors.email && (
              <p id="register-email-error" role="alert" className="form-error">
                {errors.email}
              </p>
            )}
          </div>

          {/* 3. Password + Indikator Kriteria Keamanan */}
          <div className="space-y-2">
            <PasswordInput
              id="register-password-input"
              name="password"
              label="Kata Sandi"
              value={values.password}
              disabled={isLoading}
              onChange={(event) => updateField('password', event.target.value)}
              placeholder="Minimal 8 karakter (huruf & angka)"
              autoComplete="new-password"
              error={errors.password}
            />

            <ul
              aria-label="Syarat kekuatan kata sandi"
              className="flex flex-wrap items-center gap-2 text-xs"
            >
              {[
                { ok: pwdChecks.minLength, text: 'Min. 8 karakter' },
                { ok: pwdChecks.hasLetter, text: 'Mengandung huruf' },
                { ok: pwdChecks.hasNumber, text: 'Mengandung angka' },
              ].map((rule) => (
                <li
                  key={rule.text}
                  className={`px-2 py-0.5 rounded-xs border font-medium ${
                    rule.ok
                      ? 'bg-success-soft border-success/30 text-success-ink'
                      : 'bg-canvas border-line text-muted'
                  }`}
                >
                  {rule.ok ? '✓ ' : '• '}
                  {rule.text}
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Konfirmasi Password */}
          <PasswordInput
            id="register-confirm-password-input"
            name="confirmPassword"
            label="Konfirmasi Kata Sandi"
            value={values.confirmPassword}
            disabled={isLoading}
            onChange={(event) =>
              updateField('confirmPassword', event.target.value)
            }
            placeholder="Ketik ulang kata sandi yang sama"
            autoComplete="new-password"
            error={errors.confirmPassword}
          />

          {/* 5. Persetujuan Syarat Layanan */}
          <div className="space-y-1.5 pt-1">
            <label
              htmlFor="register-terms-checkbox"
              className={`flex items-start gap-3 p-3.5 rounded-md border cursor-pointer transition-colors ${
                errors.agreedToTerms
                  ? 'border-danger bg-danger-soft/45'
                  : 'border-line bg-canvas hover:border-navy-600'
              }`}
            >
              <input
                id="register-terms-checkbox"
                type="checkbox"
                disabled={isLoading}
                checked={values.agreedToTerms}
                onChange={(event) =>
                  updateField('agreedToTerms', event.target.checked)
                }
                aria-invalid={Boolean(errors.agreedToTerms)}
                className="mt-0.5 w-4 h-4 accent-[#168C83] shrink-0"
              />
              <span className="text-body-sm text-ink-secondary leading-snug">
                Saya menyetujui ketentuan layanan penggunaan LaporWarga serta
                berkomitmen menyampaikan laporan warga secara jujur dan
                bertanggung jawab. <span className="form-required">*</span>
              </span>
            </label>

            {errors.agreedToTerms && (
              <p id="register-terms-error" role="alert" className="form-error">
                {errors.agreedToTerms}
              </p>
            )}
          </div>

          {/* Tombol Daftar + Loading State + Uji Error */}
          <div className="pt-2 space-y-3">
            <button
              id="register-submit-btn"
              type="submit"
              disabled={isLoading}
              className="btn btn-primary btn-lg btn-block"
            >
              {isLoading && (
                <span
                  aria-hidden="true"
                  className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"
                />
              )}
              <span>
                {isLoading ? 'Memvalidasi Pendaftaran...' : 'Daftar Akun Warga'}
              </span>
            </button>

            <button
              id="register-simulate-error-btn"
              type="button"
              disabled={isLoading}
              onClick={() => runRegistrationAttempt(true)}
              className="btn btn-outline btn-sm btn-block text-danger border-danger/35 hover:bg-danger-soft"
            >
              Uji Tampilan Error Registrasi
            </button>
          </div>
        </form>
      )}
    </AuthShell>
  )
}

export default Register
