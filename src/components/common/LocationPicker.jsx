import { useEffect, useRef, useState } from 'react'

// Batas area simulasi kanvas interaktif ketika dependensi Leaflet belum dipasang
const SIM_BOUNDS = {
  minLat: -6.22,
  maxLat: -6.2,
  minLng: 106.835,
  maxLng: 106.855,
}

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max)
}

/**
 * Reusable LocationPicker Component
 * - Mendukung alamat/patokan ramah masyarakat awam
 * - Mendeteksi otomatis Leaflet (window.L) apabila dependensi peta tersedia
 * - Menyediakan pemilih titik visual & input koordinat manual (Latitude/Longitude)
 * - TIDAK PERNAH meminta lokasi GPS otomatis tanpa klik persetujuan eksplisit pengguna
 */
function LocationPicker({
  address,
  latitude,
  longitude,
  addressError,
  coordinatesError,
  onAddressChange,
  onCoordinatesChange,
}) {
  const leafletContainerRef = useRef(null)
  const leafletInstanceRef = useRef(null)
  const leafletMarkerRef = useRef(null)
  const onCoordinatesChangeRef = useRef(onCoordinatesChange)

  const [geoStatus, setGeoStatus] = useState('')
  const [isLocating, setIsLocating] = useState(false)

  const hasLeaflet = typeof window !== 'undefined' && Boolean(window.L)

  useEffect(() => {
    onCoordinatesChangeRef.current = onCoordinatesChange
  }, [onCoordinatesChange])

  // Inisialisasi peta Leaflet hanya sekali apabila dependensi Leaflet tersedia
  useEffect(() => {
    if (!hasLeaflet || !leafletContainerRef.current || leafletInstanceRef.current) {
      return undefined
    }

    const L = window.L
    const map = L.map(leafletContainerRef.current).setView(
      [-6.2088, 106.8456],
      15,
    )

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map)

    map.on('click', (event) => {
      const nextLat = event.latlng.lat.toFixed(6)
      const nextLng = event.latlng.lng.toFixed(6)
      onCoordinatesChangeRef.current(nextLat, nextLng)
    })

    leafletInstanceRef.current = map

    return () => {
      map.remove()
      leafletInstanceRef.current = null
      leafletMarkerRef.current = null
    }
  }, [hasLeaflet])

  // Sinkronisasi posisi marker ketika koordinat diubah manual atau via tombol
  useEffect(() => {
    if (!hasLeaflet || !leafletInstanceRef.current) return
    const latNum = Number(latitude)
    const lngNum = Number(longitude)
    if (
      latitude === '' ||
      longitude === '' ||
      Number.isNaN(latNum) ||
      Number.isNaN(lngNum)
    ) {
      return
    }

    const L = window.L
    if (leafletMarkerRef.current) {
      leafletMarkerRef.current.setLatLng([latNum, lngNum])
    } else {
      leafletMarkerRef.current = L.marker([latNum, lngNum]).addTo(
        leafletInstanceRef.current,
      )
    }
    leafletInstanceRef.current.panTo([latNum, lngNum])
  }, [hasLeaflet, latitude, longitude])

  // Hanya dijalankan saat pengguna menekan tombol secara sadar (opt-in consent)
  const handleRequestDeviceLocation = () => {
    if (!navigator.geolocation) {
      setGeoStatus(
        'Perangkat atau browser ini tidak mendukung fitur lokasi GPS. Silakan isi koordinat secara manual.',
      )
      return
    }

    setIsLocating(true)
    setGeoStatus('Meminta izin lokasi dari browser Anda...')

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const nextLat = position.coords.latitude.toFixed(6)
        const nextLng = position.coords.longitude.toFixed(6)
        onCoordinatesChange(nextLat, nextLng)
        setIsLocating(false)
        setGeoStatus('Titik koordinat berhasil diisi dari lokasi perangkat Anda.')
      },
      () => {
        setIsLocating(false)
        setGeoStatus(
          'Izin lokasi ditolak atau tidak tersedia. Anda tetap dapat mengetik koordinat secara manual di bawah.',
        )
      },
      { enableHighAccuracy: true, timeout: 8000 },
    )
  }

  const handleUseSampleCoordinates = () => {
    onCoordinatesChange('-6.208800', '106.845600')
    setGeoStatus('Contoh koordinat simulasi berhasil diterapkan.')
  }

  const handleCanvasPadClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const xRatio = clamp((event.clientX - rect.left) / rect.width, 0, 1)
    const yRatio = clamp((event.clientY - rect.top) / rect.height, 0, 1)

    const pickedLat = (
      SIM_BOUNDS.maxLat -
      yRatio * (SIM_BOUNDS.maxLat - SIM_BOUNDS.minLat)
    ).toFixed(6)
    const pickedLng = (
      SIM_BOUNDS.minLng +
      xRatio * (SIM_BOUNDS.maxLng - SIM_BOUNDS.minLng)
    ).toFixed(6)

    onCoordinatesChange(pickedLat, pickedLng)
    setGeoStatus('Titik koordinat dipilih melalui kanvas simulasi.')
  }

  // Hitung posisi pin pada kanvas simulasi apabila koordinat valid
  const numericLat = Number(latitude)
  const numericLng = Number(longitude)
  const hasValidNumbers =
    latitude !== '' &&
    longitude !== '' &&
    !Number.isNaN(numericLat) &&
    !Number.isNaN(numericLng)

  const pinLeftPercent = hasValidNumbers
    ? clamp(
        ((numericLng - SIM_BOUNDS.minLng) /
          (SIM_BOUNDS.maxLng - SIM_BOUNDS.minLng)) *
          100,
        6,
        94,
      )
    : 50

  const pinTopPercent = hasValidNumbers
    ? clamp(
        ((SIM_BOUNDS.maxLat - numericLat) /
          (SIM_BOUNDS.maxLat - SIM_BOUNDS.minLat)) *
          100,
        10,
        90,
      )
    : 50

  return (
    <div className="space-y-5">
      {/* 1. Alamat / Patokan Kejadian */}
      <div className="form-group">
        <label htmlFor="report-address-input" className="form-label">
          Alamat atau Patokan Lokasi Kejadian{' '}
          <span className="form-required">*</span>
        </label>
        <input
          id="report-address-input"
          type="text"
          value={address}
          onChange={(event) => onAddressChange(event.target.value)}
          aria-invalid={Boolean(addressError)}
          aria-describedby={
            addressError ? 'report-address-error' : 'report-address-helper'
          }
          placeholder="Contoh: Jl. Melati Raya RT 04/RW 02, depan Balai Warga"
          className={`input-field ${addressError ? 'input-error' : ''}`}
        />
        {addressError ? (
          <p id="report-address-error" role="alert" className="form-error">
            {addressError}
          </p>
        ) : (
          <p id="report-address-helper" className="form-helper">
            Tuliskan nama jalan, RT/RW, atau patokan terdekat agar petugas mudah
            menemukan lokasi.
          </p>
        )}
      </div>

      {/* 2. Pemilihan Koordinat (Leaflet jika tersedia / Kanvas Alternatif + Input Manual) */}
      <div className="rounded-lg border border-line bg-canvas p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <h3 className="heading-4">
              Titik Koordinat Lokasi <span className="form-required">*</span>
            </h3>
            <p className="text-xs text-muted mt-0.5">
              {hasLeaflet
                ? 'Klik pada peta Leaflet atau masukkan angka koordinat secara manual.'
                : 'Dependensi Leaflet belum terpasang (Phase 8). Pilih titik pada area ilustrasi peta, gunakan tombol izin GPS, atau ketik koordinat manual.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              id="btn-optin-geolocation"
              type="button"
              onClick={handleRequestDeviceLocation}
              disabled={isLocating}
              className="btn btn-outline btn-sm"
            >
              <svg
                aria-hidden="true"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
                <circle cx="12" cy="12" r="7" />
              </svg>
              <span>
                {isLocating ? 'Meminta Izin...' : 'Gunakan Lokasi Saya (Izin GPS)'}
              </span>
            </button>

            <button
              id="btn-sample-coordinates"
              type="button"
              onClick={handleUseSampleCoordinates}
              className="btn btn-ghost btn-sm"
            >
              Isi Contoh Koordinat
            </button>
          </div>
        </div>

        {/* Peta Leaflet (jika window.L tersedia) atau Kanvas Titik Alternatif */}
        {hasLeaflet ? (
          <div
            ref={leafletContainerRef}
            className="w-full h-56 rounded-md border border-line overflow-hidden"
          />
        ) : (
          <div
            id="interactive-coordinate-pad"
            role="button"
            tabIndex={0}
            aria-label="Area pemilihan titik koordinat simulasi. Klik untuk menaruh penanda lokasi."
            onClick={handleCanvasPadClick}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                handleUseSampleCoordinates()
              }
            }}
            className="relative w-full h-48 sm:h-56 rounded-md border border-line-strong bg-[#EBF2F7] overflow-hidden cursor-crosshair select-none"
          >
            {/* Ilustrasi blok jalan lingkungan untuk membantu orientasi visual warga */}
            <svg
              aria-hidden="true"
              viewBox="0 0 600 240"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <rect width="600" height="240" fill="#EBF2F7" />
              <rect x="40" y="24" width="160" height="72" rx="6" fill="#DCE8F2" />
              <rect x="236" y="24" width="144" height="72" rx="6" fill="#D4E8E5" />
              <rect x="416" y="24" width="144" height="72" rx="6" fill="#DCE8F2" />
              <rect x="40" y="132" width="160" height="84" rx="6" fill="#DCE8F2" />
              <rect x="236" y="132" width="324" height="84" rx="6" fill="#DCE8F2" />
              <path
                d="M0 114H600M218 0V240M398 0V114"
                stroke="#FFFFFF"
                strokeWidth="16"
              />
              <path
                d="M0 114H600M218 0V240M398 0V114"
                stroke="#CBD5E1"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
            </svg>

            {hasValidNumbers ? (
              <div
                style={{ left: `${pinLeftPercent}%`, top: `${pinTopPercent}%` }}
                className="absolute -translate-x-1/2 -translate-y-full pointer-events-none transition-all duration-150"
              >
                <svg
                  width="30"
                  height="36"
                  viewBox="0 0 30 36"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M15 1C7.82 1 2 6.82 2 14C2 23.25 15 34.5 15 34.5C15 34.5 28 23.25 28 14C28 6.82 22.18 1 15 1Z"
                    fill="#168C83"
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                  />
                  <circle cx="15" cy="14" r="4.5" fill="#FFFFFF" />
                </svg>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
                <span className="px-3 py-1.5 rounded-md bg-surface/92 border border-line text-xs font-medium text-navy shadow-xs">
                  Ketuk di sini untuk memilih titik koordinat simulasi
                </span>
              </div>
            )}
          </div>
        )}

        {geoStatus && (
          <p className="text-xs font-medium text-teal-800 bg-teal-50 px-3 py-2 rounded-xs border border-teal-200">
            {geoStatus}
          </p>
        )}

        {/* Input Koordinat Manual (Alternatif Utama) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="report-latitude-input" className="form-label">
              Latitude (Garis Lintang) <span className="form-required">*</span>
            </label>
            <input
              id="report-latitude-input"
              type="text"
              inputMode="decimal"
              value={latitude}
              onChange={(event) =>
                onCoordinatesChange(event.target.value, longitude)
              }
              aria-invalid={Boolean(coordinatesError)}
              placeholder="Contoh: -6.208800"
              className={`input-field font-mono text-sm ${
                coordinatesError ? 'input-error' : ''
              }`}
            />
          </div>

          <div className="form-group">
            <label htmlFor="report-longitude-input" className="form-label">
              Longitude (Garis Bujur) <span className="form-required">*</span>
            </label>
            <input
              id="report-longitude-input"
              type="text"
              inputMode="decimal"
              value={longitude}
              onChange={(event) =>
                onCoordinatesChange(latitude, event.target.value)
              }
              aria-invalid={Boolean(coordinatesError)}
              placeholder="Contoh: 106.845600"
              className={`input-field font-mono text-sm ${
                coordinatesError ? 'input-error' : ''
              }`}
            />
          </div>
        </div>

        {coordinatesError ? (
          <p id="report-coordinates-error" role="alert" className="form-error">
            {coordinatesError}
          </p>
        ) : (
          <p className="form-helper">
            Rentang valid: Latitude <code>-90</code> s/d <code>90</code> dan
            Longitude <code>-180</code> s/d <code>180</code>. Privasi lokasi
            perangkat Anda aman karena tidak pernah diakses tanpa persetujuan.
          </p>
        )}
      </div>
    </div>
  )
}

export default LocationPicker
