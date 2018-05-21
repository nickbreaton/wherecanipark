import { App } from './components/App'
import { registerServiceWorker } from './vendor/registerServiceWorker'
import { render } from 'react-dom'
import React from 'react'

render(<App />, document.getElementById('root'))
registerServiceWorker()