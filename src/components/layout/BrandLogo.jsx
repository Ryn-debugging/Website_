import { Link } from 'react-router-dom'

/**
 * Reusable LaporWarga Brand Logo Component
 * @param {object} props
 * @param {string} [props.id] - Unique HTML id for interactive link testing
 * @param {'light' | 'dark'} [props.theme='light'] - 'light' for white surfaces, 'dark' for Navy surfaces
 */
function BrandLogo({ id = 'brand-logo', theme = 'light' }) {
  const isDarkSurface = theme === 'dark'

  return (
    <Link
      id={id}
      to="/"
      aria-label="LaporWarga — Kembali ke Beranda"
      className="inline-flex items-center gap-2.5 group focus-visible:rounded-md"
    >
      <span
        aria-hidden="true"
        className={`w-9 h-9 rounded-md flex items-center justify-center shrink-0 transition-transform duration-150 group-hover:scale-[1.03] ${
          isDarkSurface ? 'bg-teal text-white' : 'bg-navy text-white shadow-xs'
        }`}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2.75C7.99594 2.75 4.75 5.99594 4.75 10C4.75 15.25 12 21.25 12 21.25C12 21.25 19.25 15.25 19.25 10C19.25 5.99594 16.0041 2.75 12 2.75Z"
            fill={isDarkSurface ? '#FFFFFF' : '#168C83'}
          />
          <circle
            cx="12"
            cy="10"
            r="2.75"
            fill={isDarkSurface ? '#173B57' : '#FFFFFF'}
          />
        </svg>
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={`text-lg font-extrabold tracking-tight transition-colors ${
            isDarkSurface
              ? 'text-white group-hover:text-teal-200'
              : 'text-navy group-hover:text-teal-700'
          }`}
        >
          LaporWarga
        </span>
        <span
          className={`text-[11px] font-medium mt-0.5 ${
            isDarkSurface ? 'text-white/70' : 'text-muted'
          }`}
        >
          Layanan Pengaduan Warga
        </span>
      </span>
    </Link>
  )
}

export default BrandLogo
