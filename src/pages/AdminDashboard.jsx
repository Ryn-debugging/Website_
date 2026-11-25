import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import {
  AdminCategoryChartCard,
  AdminRecentActivityCard,
  AdminStatusChartCard,
} from '../components/common/AdminCharts.jsx'
import AdminReportsTable from '../components/common/AdminReportsTable.jsx'
import DashboardStatCard from '../components/common/DashboardStatCard.jsx'

const VIEW_METADATA = {
  dashboard: {
    eyebrow: 'Ringkasan Eksekutif & Moderasi',
    title: 'Admin Dashboard LaporWarga',
    description:
      'Pantau statistik laporan masyarakat, distribusi kategori, riwayat moderasi terbaru, serta kelola tindak lanjut laporan masuk.',
    lockedStatus: null,
  },
  all: {
    eyebrow: 'Manajemen Data Aduan',
    title: 'Semua Laporan Masyarakat',
    description:
      'Kelola seluruh daftar laporan dummy lengkap dengan pencarian, filter kategori, filter status, dan panel moderasi.',
    lockedStatus: null,
  },
  pending: {
    eyebrow: 'Antrean Moderasi Awal',
    title: 'Laporan Menunggu Verifikasi',
    description:
      'Periksa kelengkapan foto bukti dan lokasi laporan baru sebelum dipublikasikan atau ditolak dengan alasan.',
    lockedStatus: 'menunggu_verifikasi',
  },
  processing: {
    eyebrow: 'Pemantauan Lapangan',
    title: 'Laporan Sedang Diproses',
    description:
      'Perbarui catatan tindak lanjut petugas atau tandai selesai apabila perbaikan infrastruktur telah tuntas.',
    lockedStatus: 'sedang_diproses',
  },
  resolved: {
    eyebrow: 'Dokumentasi Tuntas',
    title: 'Arsip Laporan Selesai',
    description:
      'Daftar laporan permasalahan lingkungan yang telah selesai ditindaklanjuti.',
    lockedStatus: 'selesai',
  },
}

/**
 * AdminDashboard merender seluruh tampilan panel pengelola berdasarkan rute aktif:
 * - dashboard   (/admin)
 * - all         (/admin/laporan)
 * - pending     (/admin/menunggu-verifikasi)
 * - processing  (/admin/sedang-diproses)
 * - resolved    (/admin/selesai)
 * - categories  (/admin/kategori)
 * - settings    (/admin/pengaturan)
 */
function AdminDashboard({ view = 'dashboard' }) {
  const {
    reports,
    categories,
    activities,
    counts,
    onInspectReport,
    onSelectReportId,
    onQuickVerifyRequest,
    onAddCategory,
    onDeleteCategory,
  } = useOutletContext()

  // State khusus halaman Manajemen Kategori
  const [catName, setCatName] = useState('')
  const [catDesc, setCatDesc] = useState('')
  const [catError, setCatError] = useState('')
  const [confirmDeleteCat, setConfirmDeleteCat] = useState(null)

  /* ========================================================================
     VIEW 6: MANAJEMEN KATEGORI (/admin/kategori)
     ======================================================================== */
  if (view === 'categories') {
    const handleCreateCategory = (event) => {
      event.preventDefault()
      if (catName.trim().length < 3) {
        setCatError('Nama kategori wajib diisi minimal 3 karakter.')
        return
      }
      if (catDesc.trim().length < 10) {
        setCatError('Deskripsi kategori minimal 10 karakter.')
        return
      }

      onAddCategory({ name: catName, description: catDesc })
      setCatName('')
      setCatDesc('')
      setCatError('')
    }

    return (
      <div className="space-y-6">
        <div>
          <p className="text-eyebrow text-teal">Master Data Pengaduan</p>
          <h1 className="heading-1 mt-0.5">Manajemen Kategori Laporan</h1>
          <p className="text-body text-muted mt-1 max-w-2xl">
            Kelola daftar kategori permasalahan fasilitas umum pada sesi simulasi
            UI sebelum dihubungkan ke tabel <code>categories</code> Supabase.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Form Tambah Kategori */}
          <form
            id="admin-add-category-form"
            noValidate
            onSubmit={handleCreateCategory}
            className="lg:col-span-5 card p-5 sm:p-6 space-y-4"
          >
            <h2 className="heading-3">Tambah Kategori Baru (Simulasi)</h2>

            {catError && (
              <p role="alert" className="form-error">
                {catError}
              </p>
            )}

            <div className="form-group">
              <label htmlFor="admin-cat-name" className="form-label">
                Nama Kategori <span className="form-required">*</span>
              </label>
              <input
                id="admin-cat-name"
                type="text"
                value={catName}
                onChange={(e) => {
                  setCatName(e.target.value)
                  if (catError) setCatError('')
                }}
                placeholder="Contoh: Rambu & Marka Jalan"
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label htmlFor="admin-cat-desc" className="form-label">
                Deskripsi Cakupan <span className="form-required">*</span>
              </label>
              <textarea
                id="admin-cat-desc"
                rows={3}
                value={catDesc}
                onChange={(e) => {
                  setCatDesc(e.target.value)
                  if (catError) setCatError('')
                }}
                placeholder="Jelaskan contoh permasalahan yang termasuk dalam kategori ini..."
                className="textarea-field"
              />
            </div>

            <button
              id="admin-submit-category-btn"
              type="submit"
              className="btn btn-primary btn-block"
            >
              + Simpan Kategori
            </button>
          </form>

          {/* Daftar Kategori */}
          <div className="lg:col-span-7 card divide-y divide-line">
            {categories.map((cat) => {
              const usedCount = reports.filter(
                (r) => r.categorySlug === cat.id,
              ).length

              return (
                <div
                  key={cat.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h3 className="heading-4">{cat.name}</h3>
                      <span className="badge badge-neutral">
                        {usedCount} laporan
                      </span>
                    </div>
                    <p className="text-body-sm text-muted">{cat.description}</p>
                  </div>

                  {usedCount === 0 && (
                    <button
                      id={`delete-cat-btn-${cat.id}`}
                      type="button"
                      onClick={() => setConfirmDeleteCat(cat)}
                      className="btn btn-outline btn-sm text-danger border-danger/35 hover:bg-danger-soft shrink-0 self-start sm:self-center"
                    >
                      Hapus
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Dialog Konfirmasi Hapus Kategori */}
        {confirmDeleteCat && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/50">
            <div
              role="alertdialog"
              aria-modal="true"
              className="card p-6 max-w-md w-full shadow-modal space-y-4"
            >
              <h2 className="heading-3">Hapus Kategori?</h2>
              <p className="text-body-sm text-muted">
                Kategori <strong>{confirmDeleteCat.name}</strong> akan dihapus
                dari sesi pratinjau ini.
              </p>
              <div className="flex justify-end gap-2.5">
                <button
                  id="cancel-del-cat-btn"
                  type="button"
                  onClick={() => setConfirmDeleteCat(null)}
                  className="btn btn-outline btn-sm"
                >
                  Batal
                </button>
                <button
                  id="confirm-del-cat-btn"
                  type="button"
                  onClick={() => {
                    onDeleteCategory(confirmDeleteCat.id)
                    setConfirmDeleteCat(null)
                  }}
                  className="btn btn-danger btn-sm"
                >
                  Ya, Hapus
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  /* ========================================================================
     VIEW 7: PENGATURAN (/admin/pengaturan)
     ======================================================================== */
  if (view === 'settings') {
    return (
      <div className="space-y-6">
        <div>
          <p className="text-eyebrow text-teal">Konfigurasi Sistem</p>
          <h1 className="heading-1 mt-0.5">Pengaturan &amp; Kebijakan Moderasi</h1>
          <p className="text-body text-muted mt-1 max-w-2xl">
            Ringkasan aturan operasional dan keamanan sesuai spesifikasi PRD
            LaporWarga (Mode Pratinjau UI).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <article className="card p-6 space-y-3">
            <span className="badge badge-verified">
              <span className="badge-dot" aria-hidden="true" />
              Aturan Publikasi
            </span>
            <h2 className="heading-3">Moderasi Sebelum Tayang Publik</h2>
            <p className="text-body-sm text-muted leading-relaxed">
              Setiap laporan warga yang baru masuk berstatus awal{' '}
              <strong>Menunggu Verifikasi</strong> dan wajib diperiksa admin
              sebelum tampil pada halaman daftar laporan publik.
            </p>
          </article>

          <article className="card p-6 space-y-3">
            <span className="badge badge-resolved">
              <span className="badge-dot" aria-hidden="true" />
              Keamanan &amp; Privasi
            </span>
            <h2 className="heading-3">Perlindungan Data Pribadi &amp; RLS</h2>
            <p className="text-body-sm text-muted leading-relaxed">
              Nama dan email pelapor hanya dapat diakses oleh pengelola resmi
              untuk keperluan verifikasi. Pada Phase 4–5, otorisasi admin akan
              dikunci melalui <em>Row Level Security (RLS)</em> Supabase tanpa
              mengekspos <em>service role key</em> di frontend.
            </p>
          </article>
        </div>
      </div>
    )
  }

  /* ========================================================================
     VIEW 1–5: DASHBOARD OVERVIEW & TABEL MANAJEMEN LAPORAN
     ======================================================================== */
  const meta = VIEW_METADATA[view] || VIEW_METADATA.dashboard
  const isMainDashboard = view === 'dashboard'

  return (
    <div className="space-y-8">
      {/* Header Bagian */}
      <section className="space-y-1.5">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-eyebrow text-teal">{meta.eyebrow}</p>
          <span className="badge badge-neutral">Data Dummy Terpisah</span>
        </div>
        <h1 className="heading-1">{meta.title}</h1>
        <p className="text-body text-muted max-w-3xl">{meta.description}</p>
      </section>

      {/* 1. OVERVIEW METRICS (Total, Menunggu Verifikasi, Diproses, Selesai, Ditolak) */}
      {isMainDashboard && (
        <section aria-label="Ringkasan Statistik Laporan Admin">
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-5 gap-4">
            <DashboardStatCard
              label="Total Laporan"
              value={counts.total}
              subtitle="Seluruh data dummy"
              variant="total"
            />
            <DashboardStatCard
              label="Menunggu Verifikasi"
              value={counts.pending}
              subtitle="Perlu pemeriksaan admin"
              variant="pending"
            />
            <DashboardStatCard
              label="Sedang Diproses"
              value={counts.processing}
              subtitle="Penanganan lapangan"
              variant="processing"
            />
            <DashboardStatCard
              label="Selesai"
              value={counts.resolved}
              subtitle="Tuntas ditindaklanjuti"
              variant="resolved"
            />
            <DashboardStatCard
              label="Ditolak"
              value={counts.rejected}
              subtitle="Disertai catatan alasan"
              variant="rejected"
            />
          </div>
        </section>
      )}

      {/* 2. VISUALISASI: GRAFIK STATUS, GRAFIK KATEGORI & AKTIVITAS TERBARU */}
      {isMainDashboard && (
        <section
          aria-label="Visualisasi Data dan Aktivitas Moderasi"
          className="space-y-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6">
              <AdminStatusChartCard reports={reports} />
            </div>
            <div className="lg:col-span-6">
              <AdminCategoryChartCard
                reports={reports}
                categories={categories}
              />
            </div>
          </div>

          <AdminRecentActivityCard
            activities={activities}
            onSelectReportId={onSelectReportId}
          />
        </section>
      )}

      {/* 3. TABEL MANAJEMEN LAPORAN */}
      <section aria-labelledby="admin-table-section-heading" className="space-y-4">
        {isMainDashboard && (
          <div>
            <h2 id="admin-table-section-heading" className="heading-2">
              Manajemen &amp; Moderasi Laporan
            </h2>
            <p className="text-body-sm text-muted mt-0.5">
              Klik tombol <strong>Detail &amp; Moderasi</strong> pada baris mana
              pun untuk memeriksa bukti, memverifikasi, menolak dengan alasan,
              mengubah status, atau menulis catatan tindak lanjut.
            </p>
          </div>
        )}

        <AdminReportsTable
          key={view}
          reports={reports}
          categories={categories}
          lockedStatus={meta.lockedStatus}
          onInspectReport={onInspectReport}
          onQuickVerifyRequest={onQuickVerifyRequest}
        />
      </section>
    </div>
  )
}

export default AdminDashboard
