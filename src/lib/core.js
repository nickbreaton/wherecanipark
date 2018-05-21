import moment from 'moment'

const HOUR_OF_8_AM = 8
const HOUR_OF_5_PM = 17

const isSunday = (timestamp) => timestamp.format('dddd') === 'Sunday'
const isEvenDate = (timestamp) => timestamp.date() % 2 === 0
const isOddDate = (timestamp) => !isEvenDate(timestamp)
const isOutsideTimeRestriction = (timestamp) => timestamp.hour() < HOUR_OF_8_AM || timestamp.hour() >= HOUR_OF_5_PM

export const canPark = (timestamp, isEvenSide) => {
  return (
    isSunday(timestamp)
    || isOutsideTimeRestriction(timestamp)
    || (isEvenSide && isEvenDate(timestamp))
    || (!isEvenSide && isOddDate(timestamp))
  )
}

export const canParkUntil = (timestamp, isEvenSide) => {
  if (!canPark(timestamp, isEvenSide)) {
    return null
  }
  const target = timestamp.clone().hour(HOUR_OF_8_AM).minute(0)
  while (true) {
    if (target.isAfter(timestamp) && !canPark(target, isEvenSide)) {
      return target.clone().subtract(1, 'minute')
    }
    target.add(1, 'day')
  }
}
