export function formatIndianNumber(value: number) {
  return new Intl.NumberFormat('en-IN').format(value)
}

export function formatCrore(value: number) {
  return `₹${value.toFixed(2)} Cr`
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}
