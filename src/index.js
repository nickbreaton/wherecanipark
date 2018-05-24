import './vendor/moment-duration-format'
import './vendor/register-service-worker'

import { App } from './components/App'
import { render } from 'react-dom'
import React from 'react'

render(<App />, document.getElementById('root'))