import { Link } from 'react-router-dom'

function CategoryIcon({ type }) {
  switch (type) {
    case 'road':
      return (
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19L8 5h8l4 14" />
          <path d="M12 5v3M12 11v3M12 17v2" />
        </svg>
      )
    case 'lamp':
      return (
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21h6M12 21V7a3 3 0 0 1 3-3h3" />
          <path d="M16 4h4l1 3h-6l1-3Z" />
          <path d="M18 10v2M15.5 9.5l-1 1.5M20.5 9.5l1 1.5" />
        </svg>
      )
    case 'drainage':
      return (
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="6" rx="1.5" />
          <path d="M7 4v6M12 4v6M17 4v6" />
          <path d="M3 15c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 3-2" />
          <path d="M3 19c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 3-2" />
        </svg>
      )
    case 'trash':
      return (
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6M14 11v6" />
        </svg>
      )
    default:
      return (
        <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 15h16M6 15v4M18 15v4M5 11h14v4H5z" />
          <path d="M12 4a3 3 0 0 0-3 3h6a3 3 0 0 0-3-3Z" />
        </svg>
      )
  }
}

/**
 * Reusable CategoryCard untuk memilih atau menelusuri kategori laporan warga
 */
function CategoryCard({ category }) {
  return (
    <Link
      id={`category-card-${category.id}`}
      to={`/laporan?kategori=${category.id}`}
      className="card card-interactive p-5 sm:p-6 flex flex-col justify-between gap-4 group no-underline"
    >
      <div className="space-y-3">
        <span className="w-11 h-11 rounded-md bg-teal-50 text-teal flex items-center justify-center transition-colors group-hover:bg-teal group-hover:text-white">
          <CategoryIcon type={category.iconType} />
        </span>

        <div>
          <h3 className="heading-3 group-hover:text-teal transition-colors">
            {category.name}
          </h3>
          <p className="text-body-sm text-muted mt-1.5">
            {category.description}
          </p>
        </div>
      </div>

      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy group-hover:text-teal transition-colors">
        <span>Telusuri kategori</span>
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
          &rarr;
        </span>
      </span>
    </Link>
  )
}

export default CategoryCard
