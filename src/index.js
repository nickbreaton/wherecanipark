import './vendor/moment-duration-format'
import './vendor/register-service-worker'

import { App } from './components/App'
import { injectGlobal } from 'emotion'
import { render } from 'react-dom'
import React from 'react'

render(<App />, document.getElementById('root'))

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
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Custom';
  }
  html {
    overflow: hidden;
  }
`