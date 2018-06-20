import { css } from 'emotion'
import { getStatus, formatDuration } from '../lib/core'
import moment from 'moment'
import React from 'react'

const desktopBackground = css({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  width: '100vw',
  background: '#36454f',
  position: 'relative',
  ['&::before']: {
    content: '""',
    display: 'inline-block',
    position: 'absolute',
    background: 'url(/background.jpg)',
    backgroundSize: 'cover',
    filter: 'blur(1rem)',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    opacity: 0.25
  }
})

const containerStyle = css({
  minHeight: '100vh',
  backgroundImage: `
    linear-gradient(rgba(255,255,255,0.2), rgba(255,255,255,0.9)),
    url(/background.jpg)
  `,
  backgroundSize: 'auto 125%',
  backgroundPosition: '25%',
  padding: '3rem 1rem',
  width: '100%',
  zIndex: 2,
  ['@media screen and (min-width: 769px)']: {
    width: '375px',
    minHeight: '667px',
    borderRadius: '0.5rem',
    boxShadow: '0 0 1rem 0 rgba(0,0,0,0.333)'
  }
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

export const titleStyle = css({
  fontSize: '1.333rem',
  fontWeight: 'bold',
  display: 'block',
  color: '#333'
})

export const timeStyle = css(titleStyle, {
  fontSize: '1rem',
  color: '#D7D7D7',
  marginBottom: '1.5rem'
})

export const Background = ({ children }) => (
  <div className={desktopBackground}>
    <div className={containerStyle}>
      <div className={headingsStyle}>
        <h1 className={headingStyle}>Iowa City, IA</h1>
        <h2 className={subheadingStyle}>Where can I park?</h2>
      </div>
      {children}
    </div>
  </div>
)