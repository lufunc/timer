export const zeroNum = (n) => {
  const str = n.toString()
  return str[1] ? n : '0' + str
}

export const getClock = () => {
  const t = new Date()
  const h = t.getHours()
  const m = t.getMinutes()
  const s = t.getSeconds()
  return { h, m, s }
}
