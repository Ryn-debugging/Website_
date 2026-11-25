/**
 * Fungsi validasi formulir Login dan Registrasi LaporWarga.
 * Dirancang dengan pesan bahasa Indonesia yang jelas dan mudah dipahami masyarakat awam.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function isValidEmail(email) {
  return EMAIL_PATTERN.test(String(email ?? '').trim())
}

export function getPasswordChecks(password = '') {
  const value = String(password)
  return {
    minLength: value.length >= 8,
    hasLetter: /[a-zA-Z]/.test(value),
    hasNumber: /\d/.test(value),
  }
}

export function validateLoginForm({ email, password }) {
  const errors = {}
  const trimmedEmail = String(email ?? '').trim()

  if (!trimmedEmail) {
    errors.email = 'Alamat email wajib diisi.'
  } else if (!isValidEmail(trimmedEmail)) {
    errors.email =
      'Format email belum sesuai. Gunakan contoh seperti nama@email.com.'
  }

  if (!password) {
    errors.password = 'Kata sandi wajib diisi.'
  } else if (password.length < 6) {
    errors.password = 'Kata sandi minimal terdiri dari 6 karakter.'
  }

  return errors
}

export function validateRegisterForm({
  fullName,
  email,
  password,
  confirmPassword,
  agreedToTerms,
}) {
  const errors = {}
  const trimmedName = String(fullName ?? '').trim()
  const trimmedEmail = String(email ?? '').trim()

  if (!trimmedName) {
    errors.fullName = 'Nama lengkap wajib diisi.'
  } else if (trimmedName.length < 3) {
    errors.fullName = 'Nama lengkap minimal terdiri dari 3 karakter.'
  } else if (trimmedName.length > 80) {
    errors.fullName = 'Nama lengkap maksimal 80 karakter.'
  }

  if (!trimmedEmail) {
    errors.email = 'Alamat email wajib diisi.'
  } else if (!isValidEmail(trimmedEmail)) {
    errors.email =
      'Format email belum sesuai. Gunakan contoh seperti warga@email.com.'
  }

  const pwdChecks = getPasswordChecks(password)
  if (!password) {
    errors.password = 'Kata sandi wajib dibuat.'
  } else if (!pwdChecks.minLength || !pwdChecks.hasLetter || !pwdChecks.hasNumber) {
    errors.password =
      'Gunakan minimal 8 karakter dengan kombinasi huruf dan angka agar akun lebih aman.'
  }

  if (!confirmPassword) {
    errors.confirmPassword = 'Konfirmasi kata sandi wajib diisi.'
  } else if (password !== confirmPassword) {
    errors.confirmPassword =
      'Konfirmasi kata sandi belum sama dengan kata sandi yang Anda ketik.'
  }

  if (!agreedToTerms) {
    errors.agreedToTerms =
      'Anda perlu menyetujui ketentuan penggunaan layanan LaporWarga untuk mendaftar.'
  }

  return errors
}
