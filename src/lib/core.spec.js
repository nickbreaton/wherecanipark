import { canPark, canParkUntil, formatDuration, getStatus } from './core'
import moment from 'moment'

const at = (string) => moment(string, 'MMM DD, YYYY HH:mm A')

const IS_EVEN_SIDE = true

describe('canPark', () => {
  describe('on Sunday', () => {
    it('is within weekday restrictions', () => {
      expect(canPark(at('May 20, 2018 12:00 PM'), true)).toBe(true)
      expect(canPark(at('May 27, 2018 12:00 PM'), true)).toBe(true)
      expect(canPark(at('May 20, 2018 12:00 PM'), false)).toBe(true)
      expect(canPark(at('May 27, 2018 12:00 PM'), false)).toBe(true)
    })
    it('is before or after weekday restrictions', () => {
      expect(canPark(at('May 27, 2018 06:00 PM'), true)).toBe(true)
      expect(canPark(at('May 27, 2018 06:00 PM'), false)).toBe(true)
    })
  })

  describe('on even side', () => {
    it('is an even day', () => {
      expect(canPark(at('May 22, 2018 12:00 PM'), IS_EVEN_SIDE)).toBe(true)
      expect(canPark(at('May 22, 2018 06:00 PM'), IS_EVEN_SIDE)).toBe(true)
    })

    it('is an odd day within restriction', () => {
      expect(canPark(at('May 21, 2018 12:00 PM'), IS_EVEN_SIDE)).toBe(false)
    })

    it('is an odd day before or after restriction', () => {
      expect(canPark(at('May 21, 2018 07:00 AM'), IS_EVEN_SIDE)).toBe(true)
      expect(canPark(at('May 21, 2018 06:00 PM'), IS_EVEN_SIDE)).toBe(true)
    })
  })

  describe('on odd side', () => {
    it('is an odd day', () => {
      expect(canPark(at('May 21, 2018 12:00 PM'), !IS_EVEN_SIDE)).toBe(true)
      expect(canPark(at('May 21, 2018 06:00 PM'), !IS_EVEN_SIDE)).toBe(true)
    })

    it('is an even day within restriction', () => {
      expect(canPark(at('May 22, 2018 12:00 PM'), !IS_EVEN_SIDE)).toBe(false)
    })

    it('is an even day before or after restriction', () => {
      expect(canPark(at('May 22, 2018 07:00 AM'), !IS_EVEN_SIDE)).toBe(true)
      expect(canPark(at('May 22, 2018 06:00 PM'), !IS_EVEN_SIDE)).toBe(true)
    })
  })
})

describe('canParkUntil', () => {
  const expectCanParkUntil = (now, then, isEvenSide) => {
    const timestamp = canParkUntil(at(now), isEvenSide)
    if (timestamp === null) {
      expect(timestamp).toBe(then)
    } else {
      expect(timestamp.toString()).toBe(at(then).toString())
    }
  }

  it('is a restricted time', () => {
    expectCanParkUntil('May 08, 2018 4:00 PM', null, !IS_EVEN_SIDE)
  })

  it('is an even day', () => {
    expectCanParkUntil('May 08, 2018 04:00 PM', 'May 09, 2018 07:59 AM', IS_EVEN_SIDE)
    expectCanParkUntil('May 08, 2018 06:00 PM', 'May 10, 2018 07:59 AM', !IS_EVEN_SIDE)
  })

  it('is Saturday and Monday is an odd day', () => {
    expectCanParkUntil('May 19, 2018 06:00 PM', 'May 21, 2018 07:59 AM', IS_EVEN_SIDE)
    expectCanParkUntil('May 19, 2018 06:00 PM', 'May 22, 2018 07:59 AM', !IS_EVEN_SIDE)
  })

  it('is Saturday and Monday is an even day', () => {
    expectCanParkUntil('May 26, 2018 06:00 PM', 'May 29, 2018 07:59 AM', IS_EVEN_SIDE)
    expectCanParkUntil('May 26, 2018 06:00 PM', 'May 28, 2018 07:59 AM', !IS_EVEN_SIDE)
  })

  it('is Sunday and the next day is an even day', () => {
    expectCanParkUntil('May 20, 2018 06:00 PM', 'May 21, 2018 07:59 AM', IS_EVEN_SIDE)
    expectCanParkUntil('May 20, 2018 06:00 PM', 'May 22, 2018 07:59 AM', !IS_EVEN_SIDE)
  })

  it('is an odd day and the next day is also an odd day', () => {
    expectCanParkUntil('May 31, 2018 06:00 PM', 'June 01, 2018 07:59 AM', IS_EVEN_SIDE)
    expectCanParkUntil('May 31, 2018 06:00 PM', 'June 02, 2018 07:59 AM', !IS_EVEN_SIDE)
  })
})

describe('canParkAt', () => {
  // TODO
})

describe('getStatus', () => {
  it('best', () => {
    expect(getStatus(at('May 1, 2018 06:00 PM'), true)).toBe('BEST')
  })
  it('available', () => {
    expect(getStatus(at('May 2, 2018 04:00 PM'), true)).toBe('AVAILABLE')
  })
  it('unavailable', () => {
    expect(getStatus(at('May 3, 2018 04:00 PM'), true)).toBe('UNAVAILABLE')
  })
})

describe('formatDuration', () => {
  // TODO
})