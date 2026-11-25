import { REPORT_STATUS } from '../../utils/designTokens.js'

/**
 * Reusable StatusBadge untuk menampilkan 5 status resmi laporan LaporWarga
 * @param {object} props
 * @param {string} props.status - Kunci status ('menunggu_verifikasi' | 'diverifikasi' | 'sedang_diproses' | 'selesai' | 'ditolak')
 */
function StatusBadge({ status }) {
  const config = REPORT_STATUS[status] || REPORT_STATUS.menunggu_verifikasi

  return (
    <span className={config.badgeClass}>
      <span className="badge-dot" aria-hidden="true" />
      <span>{config.label}</span>
    </span>
  )
}

export default StatusBadge
