export function nextDateKey(value) {
  const date = new Date(`${value}T00:00:00`)
  date.setDate(date.getDate() + 1)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export function dateTimeKey(date, time = '00:00') {
  return `${date}T${time.slice(0, 5)}`
}

export function blocksWholeDay(range, date) {
  return range.start_at.slice(0, 16) <= dateTimeKey(date)
    && range.end_at.slice(0, 16) >= dateTimeKey(nextDateKey(date))
}

export function intervalsOverlap(firstStart, firstEnd, secondStart, secondEnd) {
  return firstStart < secondEnd && secondStart < firstEnd
}
