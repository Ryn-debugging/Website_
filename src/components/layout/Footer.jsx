import { Link, NavLink } from 'react-router-dom'
import BrandLogo from './BrandLogo.jsx'
import {
  CONTACT_MANAGER_INFO,
  FOOTER_NAV_LINKS,
  SERVICE_INFORMATION,
} from './navigationData.js'

/**
 * Reusable Footer Navigation Link with Hover & Active Route State
 */
function FooterNavItem({ id, to, label, end }) {
  return (
    <li>
      <NavLink
        id={`footer-nav-${id}`}
        to={to}
        end={end}
        className={({ isActive }) =>
          `footer-link ${isActive ? 'footer-link-active' : ''}`
        }
      >
        {({ isActive }) => (
          <>
            <span
              aria-hidden="true"
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                isActive ? 'bg-teal-200' : 'bg-white/35'
              }`}
            />
            <span>{label}</span>
          </>
        )}
      </NavLink>
    </li>
  )
}

/**
 * Reusable Metadata List Item for Service Info & Contact Info
 */
function FooterInfoItem({ label, value }) {
  return (
    <div className="space-y-0.5">
      <dt className="text-xs font-semibold text-white/60">{label}</dt>
      <dd className="text-sm text-white/90 leading-snug">{value}</dd>
    </div>
  )
}

const CURRENT_YEAR = new Date().getFullYear()

function Footer() {

  return (
    <footer className="bg-navy-900 text-white border-t border-navy">
      <div className="lw-container py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* 1. Deskripsi Layanan */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4">
            <BrandLogo id="footer-brand-link" theme="dark" />

            <p className="text-body-sm text-white/78 leading-relaxed max-w-sm">
              Platform pelaporan kerusakan infrastruktur dan fasilitas umum yang
              memudahkan masyarakat menyampaikan keluhan lingkungan secara
              digital, tertib, dan terpantau tindak lanjutnya.
            </p>

            <div className="pt-1">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/8 border border-white/14 text-xs font-medium text-teal-200">
                <span
                  aria-hidden="true"
                  className="w-2 h-2 rounded-full bg-teal"
                />
                Transparan &amp; Termoderasi
              </span>
            </div>
          </div>

          {/* 2. Navigasi Aplikasi */}
          <div className="lg:col-span-2 space-y-3.5">
            <h2 className="text-eyebrow text-teal-200">Navigasi</h2>
            <nav aria-label="Navigasi Footer">
              <ul className="space-y-1.5">
                {FOOTER_NAV_LINKS.map((item) => (
                  <FooterNavItem
                    key={item.id}
                    id={item.id}
                    to={item.to}
                    label={item.label}
                    end={item.end}
                  />
                ))}
              </ul>
            </nav>
          </div>

          {/* 3. Informasi Layanan */}
          <div className="lg:col-span-3 space-y-3.5">
            <h2 className="text-eyebrow text-teal-200">Informasi Layanan</h2>
            <dl className="space-y-3">
              {SERVICE_INFORMATION.map((info) => (
                <FooterInfoItem
                  key={info.label}
                  label={info.label}
                  value={info.value}
                />
              ))}
            </dl>
          </div>

          {/* 4. Kontak Pengelola */}
          <div className="lg:col-span-3 space-y-3.5">
            <h2 className="text-eyebrow text-teal-200">Kontak Pengelola</h2>
            <dl className="space-y-3">
              {CONTACT_MANAGER_INFO.map((contact) => (
                <FooterInfoItem
                  key={contact.label}
                  label={contact.label}
                  value={contact.value}
                />
              ))}
            </dl>

            <div className="pt-2">
              <Link
                id="footer-cta-panduan"
                to="/panduan"
                className="btn btn-outline-on-dark btn-sm"
              >
                Pelajari Alur Pelaporan
              </Link>
            </div>
          </div>
        </div>

        {/* 5. Copyright */}
        <div className="mt-12 pt-6 border-t border-white/12 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/65">
          <p>
            &copy; {CURRENT_YEAR} <strong className="text-white font-semibold">LaporWarga</strong>.
            Seluruh hak cipta dilindungi.
          </p>
          <p className="text-center sm:text-right">
            Layanan Pengaduan Infrastruktur &amp; Fasilitas Umum Lingkungan
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
