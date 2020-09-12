export let currentKey = 'notedo[v1]'

export function set(value) {
  window.localStorage.setItem(currentKey, JSON.stringify(value))
}

export function get() {
  try {
    return JSON.parse(window.localStorage.getItem(currentKey)) || {}
  } catch (err) {
    return {}
  }
}
