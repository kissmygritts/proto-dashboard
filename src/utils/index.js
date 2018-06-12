import format from 'date-fns/format'

export function formatTimestamp (date, time) {
  if (!time) {
    time = '12:00:00'
  }
  if (!date) {
    date = format(new Date(), 'YYYY-MM-DD')
  }
  return format(new Date(`${date} ${time}`), 'YYYY-MM-DDTHH:mm:SSZ')
}
