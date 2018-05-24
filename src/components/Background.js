import React from 'react'
import { injectGlobal, css } from 'emotion'
import { getStatus, formatDuration } from '../lib/core'
import moment from 'moment'

injectGlobal({
  '*': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    fontFamily: 'Custom'
  }
})

injectGlobal`
  @font-face {
    font-family: 'Custom';
    src: url(/fonts/ibm-plex/IBMPlexSans-Light.otf);
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'Custom';
    src: url(/fonts/ibm-plex/IBMPlexSans-SemiBold.otf);
    font-weight: 700;
    font-style: normal;
  }
  html {
    overflow: hidden;
  }
`


const containerStyle = css({
  minHeight: '100vh',
  backgroundImage: `
    linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0.9)),
    url(/background.jpg)
  `,
  backgroundSize: 'auto 125%',
  backgroundPosition: '25%',
  padding: '3rem 1rem'
})

const headingStyle = css({
  fontWeight: 300,
  color: 'white',
  fontSize: '2.25rem',
  marginBottom: '0.25rem'
})

const subheadingStyle = css(headingStyle, {
  fontSize: '1.333rem'
})

const headingsStyle = css({
  marginBottom: '2rem'
})

const cardStyle = css({
  background: 'white',
  borderRadius: '3px',
  boxShadow: '0 0 0.5rem 0 rgba(0,0,0,0.25)',
  padding: '1rem',
  marginBottom: '1rem'
})

const titleStyle = css({
  fontSize: '1.333rem',
  fontWeight: 'bold',
  display: 'block',
  color: '#333'
})

const timeStyle = css(titleStyle, {
  fontSize: '1rem',
  color: '#D7D7D7',
  marginBottom: '1.5rem'
})

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

const GREEN = '#2ECC71'
const RED = '#C0392B'

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

class Side extends React.Component {
  state = {}
  componentDidMount() {
    this.setNow()
    this.interval = setInterval(this.setNow, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  setNow = () => {
    this.setState({ now: Date.now() })
  }
  get now() {
    return moment(new Date(this.state.now)).add(-8, 'hours')
  }
  render() {
    if (this.now && this.now.isValid()) {
      return (
        <Status
          title={this.props.title}
          status={getStatus(this.now, this.props.isEven)}
          time={formatDuration(this.now, this.props.isEven)}
        />
      )
    }
    return null
  }
}

export const Background = ({ children }) => (
  <div className={containerStyle}>
    <div className={headingsStyle}>
      <h1 className={headingStyle}>Iowa City, IA</h1>
      <h2 className={subheadingStyle}>Where can I park?</h2>
    </div>
    <Side title='My Side' isEven={false} />
    <Side title='Other Side' isEven={true} />
  </div>
)