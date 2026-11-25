/**
 * Reusable StepCard untuk menampilkan tahapan alur kerja LaporWarga
 */
function StepCard({ stepNumber, title, description }) {
  return (
    <article className="card p-6 flex flex-col justify-between gap-4">
      <div className="space-y-3">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-navy text-white text-sm font-bold tabular-nums">
          {stepNumber}
        </span>

        <div>
          <h3 className="heading-3">{title}</h3>
          <p className="text-body-sm text-muted mt-2">{description}</p>
        </div>
      </div>
    </article>
  )
}

export default StepCard
