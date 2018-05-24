import { css } from 'emotion'
import { titleStyle, timeStyle } from './Background'
import React from 'react'

const GREEN = '#2ECC71'
const RED = '#C0392B'

const statusStyle = css({
  display: 'flex'
})

const statusTextStyle = css(timeStyle, {
  marginBottom: 0,
  flex: 1
})

const statusCircleStyle = css({
  width: '1.5rem',
  height: '1.5rem',
  borderRadius: '100%',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
})

const cardStyle = css({
  background: 'white',
  borderRadius: '3px',
  boxShadow: '1px 1px 0.5rem 0 rgba(0,0,0,0.5)',
  padding: '1rem',
  marginBottom: '1rem'
})

const Status = ({ title, time, status }) => {
  const statusOptions = ({
    BEST: { color: GREEN, text: 'Best Option', image: 'icons/check.svg' },
    AVAILABLE: { color: GREEN, text: 'Available', image: 'icons/check.svg' },
    UNAVAILABLE: { color: RED, text: 'Unavailable', image: 'icons/x.svg' }
  })
  const computed = statusOptions[status]
  return (
    <section className={cardStyle}>
      <span className={titleStyle}>{title}</span>
      <span className={timeStyle}>{time}</span>
      <div className={statusStyle}>
        <span className={statusTextStyle} style={{ color: computed.color }}>
          {computed.text}
        </span>
        <span
          className={statusCircleStyle}
          style={{ backgroundColor: computed.color, backgroundImage: `url(${computed.image})` }} />
      </div>
    </section>
  )
}

 export { Status }