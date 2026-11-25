import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from './Footer.jsx'
import Navbar from './Navbar.jsx'

/**
 * MainLayout membungkus seluruh halaman utama dengan aksesibilitas Skip-Link,
 * Navbar responsif, area konten utama, dan Footer institusional LaporWarga.
 */
function MainLayout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [pathname, hash])

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <a
        id="skip-to-main-link"
        href="#konten-utama"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 btn btn-primary btn-sm"
      >
        Lewati ke konten utama
      </a>

      <Navbar />

      <main id="konten-utama" className="flex-1 flex flex-col">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default MainLayout
