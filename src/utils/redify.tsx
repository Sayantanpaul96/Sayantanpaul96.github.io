const RED_GAP = [4, 5, 4, 4, 5, 4, 5, 4, 4, 5]

/** Colors every ~4-5th non-space character red using a fixed rhythm. */
export function redify(text: string) {
  let n = 0
  let patIdx = 0
  let nextRed = RED_GAP[0]
  return Array.from(text).map((ch, i) => {
    if (ch === ' ') return <span key={i}> </span>
    n++
    if (n === nextRed) {
      patIdx = (patIdx + 1) % RED_GAP.length
      nextRed = n + RED_GAP[patIdx]
      return <span key={i} style={{ color: '#00e574' }}>{ch}</span>
    }
    return <span key={i}>{ch}</span>
  })
}
