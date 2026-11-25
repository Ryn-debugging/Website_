import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PasswordInput from '../components/common/PasswordInput.jsx'
import AuthShell from '../components/layout/AuthShell.jsx'
import { validateLoginForm } from '../utils/authValidator.js'

function Login() {
  const timerRef = useRef(null)

  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState('')
  const [uiPreviewNotice, setUiPreviewNotice] = useState('')

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

  const runLoginAttempt = (simulateCredentialError = false) => {
    setAuthError('')
    setUiPreviewNotice('')

    const validationErrors = validateLoginForm(values)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    setIsLoading(true)
    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
    }

    timerRef.current = window.setTimeout(() => {
      setIsLoading(false)
      // Kosongkan kata sandi dari state memori segera setelah percobaan (keamanan)
      setValues((prev) => ({ ...prev, password: '' }))

      if (simulateCredentialError) {
        setAuthError(
          'Email atau kata sandi yang Anda masukkan tidak sesuai. Silakan periksa kembali ejaan email dan kata sandi Anda.',
        )
        return
      }

      setUiPreviewNotice(
        'Format email dan kata sandi valid. Halaman masuk ini masih berupa UI Sementara (belum terhubung ke Supabase Auth pada Phase 5), sehingga tidak ada sesi login palsu atau kata sandi yang disimpan.',
      )
    }, 450)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    runLoginAttempt(false)
  }

  return (
    <AuthShell
      eyebrow="Autentikasi Pengguna"
      title="Masuk ke Akun LaporWarga"
      subtitle={
        <p>
          Belum memiliki akun warga?{' '}
          <Link
            id="login-to-register-link"
            to="/daftar"
            className="font-semibold text-teal hover:text-teal-800 underline underline-offset-2"
          >
            Daftar akun baru
          </Link>
        </p>
      }
    >
      <form
        id="login-form"
        noValidate
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Error State Banner */}
        {authError && (
          <div
            role="alert"
            className="p-4 rounded-md border border-danger/45 bg-danger-soft space-y-1"
          >
            <p className="text-sm font-bold text-danger-ink">Gagal Masuk</p>
            <p className="text-body-sm text-danger-ink">{authError}</p>
          </div>
        )}

        {/* Honest Temporary UI Feedback (Tanpa Autentikasi Palsu) */}
        {uiPreviewNotice && (
          <div
            role="status"
            aria-live="polite"
            className="p-4 rounded-md border border-teal-200 bg-teal-50 space-y-1"
          >
            <p className="text-sm font-bold text-teal-800">
              Mode Antarmuka Sementara
            </p>
            <p className="text-body-sm text-teal-900">{uiPreviewNotice}</p>
          </div>
        )}

        {/* Email */}
        <div className="form-group">
          <label htmlFor="login-email-input" className="form-label">
            Alamat Email <span className="form-required">*</span>
          </label>
          <input
            id="login-email-input"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            disabled={isLoading}
            value={values.email}
            onChange={(event) => updateField('email', event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'login-email-error' : undefined}
            placeholder="Contoh: nama.warga@email.com"
            className={`input-field ${errors.email ? 'input-error' : ''}`}
          />
          {errors.email && (
            <p id="login-email-error" role="alert" className="form-error">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password dengan Toggle Tampilkan/Sembunyikan */}
        <PasswordInput
          id="login-password-input"
          name="password"
          label="Kata Sandi"
          value={values.password}
          disabled={isLoading}
          onChange={(event) => updateField('password', event.target.value)}
          placeholder="Masukkan kata sandi Anda"
          autoComplete="current-password"
          error={errors.password}
        />

        {/* Tombol Masuk Utama + Loading State */}
        <div className="pt-1 space-y-3">
          <button
            id="login-submit-btn"
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
            <span>{isLoading ? 'Memproses...' : 'Masuk'}</span>
          </button>

          <button
            id="login-simulate-error-btn"
            type="button"
            disabled={isLoading}
            onClick={() => runLoginAttempt(true)}
            className="btn btn-outline btn-sm btn-block text-danger border-danger/35 hover:bg-danger-soft"
          >
            Uji Tampilan Error Kredensial
          </button>
        </div>

        {/* Informasi UI Sementara & Tautan Registrasi */}
        <div className="pt-4 border-t border-line space-y-2.5 text-xs text-muted">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span>Belum punya akun LaporWarga?</span>
            <Link
              id="login-bottom-register-link"
              to="/daftar"
              className="font-semibold text-navy hover:text-teal transition-colors"
            >
              Buat Akun Warga &rarr;
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-line/70">
            <span>Mode Pratinjau UI (Tanpa Sesi Login):</span>
            <Link
              id="login-preview-user-dashboard-link"
              to="/dashboard"
              className="font-semibold text-teal hover:text-teal-800 transition-colors"
            >
              Buka Pratinjau Dashboard Warga &rarr;
            </Link>
          </div>
        </div>
      </form>
    </AuthShell>
  )
}

export default Login
