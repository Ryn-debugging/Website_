/**
 * Konstanta kategori dan fungsi validasi murni untuk Formulir Buat Laporan LaporWarga.
 */

export const CREATE_REPORT_CATEGORIES = [
  {
    value: 'jalan-rusak',
    label: 'Jalan Rusak',
    hint: 'Jalan berlubang, aspal mengelupas, paving amblas',
  },
  {
    value: 'lampu-jalan-mati',
    label: 'Lampu Jalan Mati',
    hint: 'Lampu PJU padam, berkedip, atau tiang bermasalah',
  },
  {
    value: 'drainase-tersumbat',
    label: 'Drainase Tersumbat',
    hint: 'Selokan mampet, air meluap, penutup gorong-gorong rusak',
  },
  {
    value: 'sampah-menumpuk',
    label: 'Sampah Menumpuk',
    hint: 'Tumpukan sampah liar atau bak sampah umum meluber',
  },
  {
    value: 'fasilitas-umum-rusak',
    label: 'Fasilitas Umum Rusak',
    hint: 'Bangku taman, pos warga, rambu lingkungan rusak',
  },
  {
    value: 'lainnya',
    label: 'Lainnya',
    hint: 'Permasalahan sarana lingkungan warga lainnya',
  },
]

export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024 // 5 MB

export function formatFileSize(bytes) {
  if (typeof bytes !== 'number' || Number.isNaN(bytes)) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export function validatePhotoFile(file) {
  if (!file) {
    return 'Foto bukti kerusakan wajib diunggah.'
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return 'Format file tidak didukung. Harap unggah foto berformat JPG, PNG, atau WEBP.'
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return `Ukuran foto terlalu besar (${formatFileSize(file.size)}). Ukuran maksimal adalah 5 MB.`
  }

  return ''
}

export function isValidCoordinatePair(latStr, lngStr) {
  const trimmedLat = String(latStr ?? '').trim()
  const trimmedLng = String(lngStr ?? '').trim()

  if (trimmedLat === '' || trimmedLng === '') {
    return {
      valid: false,
      message: 'Koordinat Latitude dan Longitude wajib diisi.',
    }
  }

  const lat = Number(trimmedLat)
  const lng = Number(trimmedLng)

  if (Number.isNaN(lat) || Number.isNaN(lng)) {
    return {
      valid: false,
      message: 'Koordinat harus berupa angka desimal yang valid (contoh: -6.2088 dan 106.8456).',
    }
  }

  if (lat < -90 || lat > 90) {
    return {
      valid: false,
      message: 'Nilai Latitude harus berada di antara -90 hingga 90.',
    }
  }

  if (lng < -180 || lng > 180) {
    return {
      valid: false,
      message: 'Nilai Longitude harus berada di antara -180 hingga 180.',
    }
  }

  return { valid: true, message: '' }
}

export function validateReportForm(values, photoFile) {
  const errors = {}

  const trimmedTitle = values.title.trim()
  if (!trimmedTitle) {
    errors.title = 'Judul laporan wajib diisi.'
  } else if (trimmedTitle.length < 10) {
    errors.title = 'Judul laporan minimal 10 karakter agar masalah jelas dipahami.'
  } else if (trimmedTitle.length > 120) {
    errors.title = 'Judul laporan maksimal 120 karakter.'
  }

  if (!values.category) {
    errors.category = 'Silakan pilih salah satu kategori laporan.'
  }

  const trimmedDescription = values.description.trim()
  if (!trimmedDescription) {
    errors.description = 'Deskripsi permasalahan wajib diisi.'
  } else if (trimmedDescription.length < 20) {
    errors.description =
      'Deskripsi minimal 20 karakter. Jelaskan kondisi kerusakan secara singkat.'
  }

  const photoError = validatePhotoFile(photoFile)
  if (photoError) {
    errors.photo = photoError
  }

  const trimmedAddress = values.address.trim()
  if (!trimmedAddress) {
    errors.address = 'Alamat atau patokan lokasi kejadian wajib diisi.'
  } else if (trimmedAddress.length < 8) {
    errors.address = 'Tuliskan nama jalan atau patokan lokasi yang lebih jelas (minimal 8 karakter).'
  }

  const coordCheck = isValidCoordinatePair(values.latitude, values.longitude)
  if (!coordCheck.valid) {
    errors.coordinates = coordCheck.message
  }

  if (!values.agreed) {
    errors.agreed =
      'Anda wajib mencentang pernyataan persetujuan kebenaran laporan sebelum melanjutkan.'
  }

  return errors
}
