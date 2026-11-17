export function nationalPhoneDigits(value = '') {
  let digits = String(value).replace(/\D/g, '')
  if (digits.startsWith('63') && digits.length === 12) digits = digits.slice(2)
  else if (digits.startsWith('0') && digits.length === 11) digits = digits.slice(1)
  return digits.slice(0, 10)
}

export function internationalPhone(value) {
  const digits = nationalPhoneDigits(value)
  return digits ? `+63${digits}` : null
}
