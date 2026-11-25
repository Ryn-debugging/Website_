/**
 * Reusable StatCard untuk menampilkan ringkasan metrik laporan
 */
function StatCard({ label, value, note, accentClass = 'text-navy', isDummy = false }) {
  return (
    <article className="card-stat flex flex-col justify-between gap-4">
      <div>
        <div className="flex items-start justify-between gap-2">
          <p className={`stat-value ${accentClass}`}>{value}</p>
          {isDummy && (
            <span className="badge badge-neutral">Data Dummy</span>
          )}
        </div>
        <h3 className="stat-label mt-2">{label}</h3>
      </div>

      {note && (
        <p className="text-body-sm text-muted pt-3 border-t border-line">
          {note}
        </p>
      )}
    </article>
  )
}

export default StatCard
