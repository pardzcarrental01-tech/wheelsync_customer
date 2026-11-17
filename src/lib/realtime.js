// Reloads each open page automatically, without a click.
// Pauses while someone is typing, has a dialog open, or just clicked or scrolled,
// then loads the held update as soon as they stop. Same API as before.
const REFRESH_MS = 3000   // reload at most this often while idle
const CHECK_MS = 1000     // how often to check whether the page is idle
const IDLE_MS = 3000      // quiet time after the last click, key press, or scroll

const listeners = new Set()
let lastRefresh = 0
let lastActivity = 0
let pending = false

function isBusy() {
  const el = document.activeElement
  const typing = !!el && (['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName) || el.isContentEditable)
  const dialog = !!document.querySelector('[aria-modal="true"]')
    || [...document.querySelectorAll('.fixed.inset-0')].some((node) => node.children.length > 0 && node.offsetParent !== null)
  return typing || dialog || Date.now() - lastActivity < IDLE_MS
}

function check() {
  if (document.visibilityState !== 'visible') return
  if (isBusy()) { pending = true; return }
  if (pending || Date.now() - lastRefresh >= REFRESH_MS) {
    pending = false
    lastRefresh = Date.now()
    listeners.forEach((callback) => {
      try { callback({ table: '*' }) } catch { /* ignore a failing page */ }
    })
  }
}

;['pointerdown', 'keydown', 'input', 'scroll', 'touchstart'].forEach((type) =>
  document.addEventListener(type, () => { lastActivity = Date.now() }, { capture: true, passive: true }))

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') { pending = true; check() }
})

setInterval(check, CHECK_MS)

export function subscribe(_tables, callback) {
  listeners.add(callback)
  return () => { listeners.delete(callback) }
}

// Kept so AuthContext.jsx works without changes.
export function resetRealtime() {}
