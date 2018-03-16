// Returns intelligent array of buckets (size will be buckets + 1)
// For example, input (1010,1980,4) returns [1000, 1250, 1500, 1750, 2000]
const normalize = (min, max, buckets) => {
  if (min >= max) {
    console.log('max must be greater than min')
    return []
  }
  if (min < 0) {
    console.log('min must be 0 or greater')
    return []
  }
  if (buckets <= 0) {
    console.log('buckets must be 1 or greater')
    return []
  }

  let step = ((max - min) / buckets).toPrecision(2)
  let divisor = 10 ** Math.floor(Math.log10(max - min))
  let remainder = step % divisor
  let highDigit = step - remainder
  let lowDigit = Math.ceil(remainder / (divisor / 2)) * (divisor / 2)

  let normalizedStep = highDigit + lowDigit
  let normalizedMin = Math.floor(min / normalizedStep) * normalizedStep

  let error = (max - (normalizedMin + normalizedStep * buckets)).toPrecision(2)
  normalizedStep += Math.ceil(Math.max(0, error) / (divisor / 2)) * (divisor / 2)

  let normalizedBuckets = []
  for (let i = 0; i < buckets + 1; i++) {
    normalizedBuckets[i] = parseFloat((normalizedMin + (normalizedStep * i)).toPrecision(2))
  }
  return normalizedBuckets
}

export default normalize
