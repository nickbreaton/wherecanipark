import moment from 'moment'

const HOUR_OF_8_AM = 8
const HOUR_OF_5_PM = 17

const isSunday = (timestamp) => timestamp.format('dddd') === 'Sunday'

const isEvenDate = (timestamp) => timestamp.date() % 2 === 0

const isOddDate = (timestamp) => !isEvenDate(timestamp)

const isOutsideTimeRestriction = (timestamp) => {
  return timestamp.hour() < HOUR_OF_8_AM || timestamp.hour() >= HOUR_OF_5_PM
}

const formatDifference = (seconds) => {
  return moment
    .duration(seconds, 'seconds')
    .format('d [days], h [hours], m [minutes], s [seconds]', { largest: 2 });
}

// EXPORTS

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

  for (let i = 0; i < 1000; i++) {
    if (target.isAfter(timestamp) && !canPark(target, isEvenSide)) {
      return target.clone().subtract(1, 'minute')
    }
    target.add(1, 'day')
  }

  console.error('[canParkUntil] Infinite loop detected.')
}

export const canParkAt = (timestamp, isEvenSide) => {
  if (canPark(timestamp, isEvenSide)) {
    return null
  }

  const target = timestamp.clone().hour(HOUR_OF_5_PM).minute(0)

  for (let i = 0; i < 1000; i++) {
    if (target.isAfter(timestamp) && canPark(target, isEvenSide)) {
      return target.clone()
    }
    target.add(1, 'day')
  }

  console.error('[canParkAt] Infinite loop detected.')
}

export const getStatus = (timestamp, isEvenSide) => {
  const canParkHereUntil = canParkUntil(timestamp, isEvenSide)
  const canParkOtherUntil = canParkUntil(timestamp, !isEvenSide)

  if (canParkHereUntil === null) {
    return 'UNAVAILABLE'
  }

  if (canParkOtherUntil !== null && canParkOtherUntil.isBefore(canParkHereUntil)) {
    return 'BEST'
  }

  return 'AVAILABLE'
}


export const formatDuration = (timestamp, isEvenSide) => {
  let diff = 0
  let message = ''

  if (canPark(timestamp, isEvenSide)) {
    diff = canParkUntil(timestamp, isEvenSide).diff(timestamp, 'seconds')
    message = '[diff] remaining'
  } else {
    diff = canParkAt(timestamp, isEvenSide).diff(timestamp, 'seconds')
    message = '[diff] until available'
  }

  return message.replace('[diff]', formatDifference(diff))
}
