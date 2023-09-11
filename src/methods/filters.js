export function date (time) {
  const localDate = new Date(time * 1000)
  return localDate.toLocaleDateString()
}

export function currency (num = 0) {
  const str = num.toString().split('.')
  str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return str.join('.')
}

export function timeConvert (timestamp) {
  const localDate = new Date(timestamp * 1000)
  return localDate.toLocaleDateString()
}
