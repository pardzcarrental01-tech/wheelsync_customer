import { idNumberRule, normalizeIdNumber } from '../lib/identifiers'

export default function IdNumberInput({ label = 'ID number', idType, value, onChange, required = false, className = '' }) {
  const rule = idNumberRule(idType)
  return (
    <label className={`flex flex-col gap-1.5 text-sm ${className}`}>
      {label}
      <input
        required={required}
        maxLength={rule.maxLength}
        inputMode={rule.inputMode}
        pattern={rule.pattern}
        title={rule.hint || undefined}
        value={value}
        onChange={(event) => onChange(normalizeIdNumber(idType, event.target.value))}
        className="px-3 py-2.5"
      />
      {rule.hint && <span className="text-xs" style={{ color: 'var(--text-faint)' }}>{rule.hint}</span>}
    </label>
  )
}
