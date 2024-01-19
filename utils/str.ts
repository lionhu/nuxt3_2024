// capitalize each word in a string
export function capitalize(str: string): string {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}
export function randomToken(len: number = 16): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''
  for (let i = 0; i < len; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return token
}

export function currencyJPY(_value: number | undefined): string {
  if (!_value) return '0'
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
  }).format(_value)
}

export function strLocalDateTime(_value: Date): string {
  if (!_value) return ''
  const utcDate = new Date(_value)
  return new Intl.DateTimeFormat('japanese', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Australia/Sydney',
  }).format(utcDate)

  // const utcDate = new Date(_value)
  // return utcDate.toLocaleString('en-US', {
  //   dateStyle: 'full',
  //   timeStyle: 'full',
  // })
}

export function japanDateTime(_value: Date): string {
  return new Intl.DateTimeFormat('japanese', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Australia/Sydney',
  }).format(_value)
}
