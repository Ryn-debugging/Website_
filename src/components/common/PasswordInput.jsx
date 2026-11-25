import { useState } from 'react'

/**
 * Reusable PasswordInput dengan tombol Toggle Tampilkan / Sembunyikan Kata Sandi
 * yang ramah aksesibilitas dan layar sentuh ponsel.
 */
function PasswordInput({
  id,
  name,
  label,
  value,
  onChange,
  placeholder = 'Masukkan kata sandi',
  autoComplete = 'current-password',
  disabled = false,
  error = '',
  helperText = '',
  required = true,
}) {
  const [showPassword, setShowPassword] = useState(false)

  const describedById = error
    ? `${id}-error`
    : helperText
      ? `${id}-helper`
      : undefined

  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label} {required && <span className="form-required">*</span>}
      </label>

      <div className="relative">
        <input
          id={id}
          name={name}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={describedById}
          className={`input-field pr-12 ${error ? 'input-error' : ''}`}
        />

        <button
          id={`${id}-toggle-visibility`}
          type="button"
          disabled={disabled}
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={
            showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'
          }
          aria-pressed={showPassword}
          className="absolute inset-y-0 right-1.5 my-auto w-9 h-9 rounded-xs text-muted hover:text-navy hover:bg-surface-subtle flex items-center justify-center transition-colors cursor-pointer"
        >
          {showPassword ? (
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
              <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
              <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>

      {error ? (
        <p id={`${id}-error`} role="alert" className="form-error">
          {error}
        </p>
      ) : (
        helperText && (
          <p id={`${id}-helper`} className="form-helper">
            {helperText}
          </p>
        )
      )}
    </div>
  )
}

export default PasswordInput
