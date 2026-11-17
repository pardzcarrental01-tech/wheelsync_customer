export function idNumberRule(idType) {
  const type = String(idType || '').trim().toLowerCase()
  if (type === 'passport') return { maxLength: 9, inputMode: 'text', pattern: '[A-Za-z0-9]{9}', hint: 'Enter exactly 9 letters or digits.' }
  if (['national id', 'philippine national id', 'philsys id'].includes(type)) {
    return { maxLength: 12, inputMode: 'numeric', pattern: '[0-9]{12}', hint: 'Enter the 12-digit PhilSys Number (PSN).' }
  }
  return { maxLength: 100, inputMode: 'text', pattern: undefined, hint: '' }
}

export function normalizeIdNumber(idType, value) {
  const rule = idNumberRule(idType)
  if (String(idType || '').trim().toLowerCase() === 'passport') {
    return value.replace(/[^a-z0-9]/gi, '').slice(0, rule.maxLength).toUpperCase()
  }
  if (rule.inputMode === 'numeric') return value.replace(/\D/g, '').slice(0, rule.maxLength)
  return value.slice(0, rule.maxLength)
}

export function validIdNumber(idType, value) {
  const rule = idNumberRule(idType)
  return !rule.pattern || new RegExp(`^(?:${rule.pattern})$`).test(value)
}
