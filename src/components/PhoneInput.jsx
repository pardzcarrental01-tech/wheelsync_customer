import { nationalPhoneDigits } from '../lib/phone'

export default function PhoneInput({ label = 'Phone', value, onChange, required = false, className = '' }) {
  return (
    <label className={`flex flex-col gap-1.5 text-sm ${className}`}>
      {label}
      <span className="flex items-center rounded-lg border" style={{ borderColor: 'var(--border-soft)', background: 'var(--bg-surface-2)' }}>
        <span className="px-3 text-sm font-medium" style={{ color: 'var(--text-muted)' }}>+63</span>
        <input
          required={required}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          maxLength={10}
          pattern="9[0-9]{9}"
          title="Enter 10 digits after +63, starting with 9."
          value={nationalPhoneDigits(value)}
          onChange={(event) => onChange(event.target.value.replace(/\D/g, '').slice(0, 10))}
          className="min-w-0 flex-1 border-0 px-3 py-2.5"
          placeholder="9XX XXX XXXX"
        />
      </span>
      <span className="text-xs" style={{ color: 'var(--text-faint)' }}>Enter 10 digits after +63.</span>
    </label>
  )
}
