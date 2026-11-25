/**
 * Reusable Pagination Component dengan ukuran tombol ramah layar ponsel (min 44px)
 */
function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <nav
      aria-label="Navigasi Halaman Daftar Laporan"
      className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      <p className="text-body-sm text-muted">
        Halaman <strong className="text-ink">{currentPage}</strong> dari{' '}
        <strong className="text-ink">{totalPages}</strong>
      </p>

      <div className="flex items-center gap-2 flex-wrap justify-center">
        <button
          id="pagination-prev-btn"
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="btn btn-outline btn-sm min-h-11 px-3.5"
        >
          &larr; Sebelumnya
        </button>

        {pages.map((page) => {
          const isCurrent = page === currentPage
          return (
            <button
              key={page}
              id={`pagination-page-${page}`}
              type="button"
              aria-current={isCurrent ? 'page' : undefined}
              onClick={() => onPageChange(page)}
              className={`btn btn-sm min-h-11 min-w-11 px-3 ${
                isCurrent ? 'btn-navy' : 'btn-outline'
              }`}
            >
              {page}
            </button>
          )
        })}

        <button
          id="pagination-next-btn"
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="btn btn-outline btn-sm min-h-11 px-3.5"
        >
          Berikutnya &rarr;
        </button>
      </div>
    </nav>
  )
}

export default Pagination
