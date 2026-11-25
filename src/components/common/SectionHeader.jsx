/**
 * Reusable SectionHeader untuk menjaga konsistensi tipografi antarbagian halaman
 */
function SectionHeader({
  headingId,
  eyebrow,
  title,
  description,
  dummyNotice,
  action,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div className="max-w-2xl space-y-2">
        <div className="flex flex-wrap items-center gap-2.5">
          {eyebrow && <p className="text-eyebrow text-teal">{eyebrow}</p>}
          {dummyNotice && (
            <span className="badge badge-pending" title="Data simulasi antarmuka sementara">
              <span className="badge-dot" aria-hidden="true" />
              {dummyNotice}
            </span>
          )}
        </div>
        <h2 id={headingId} className="heading-1">
          {title}
        </h2>
        {description && <p className="text-body text-muted">{description}</p>}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

export default SectionHeader
