import { Background } from './Background'
import { ScrollLock } from './ScrollLock'
import { Side } from './Side'
import React from 'react'

const App = () => (
  <ScrollLock>
    <Background>
      <Side title='My Side' />
      <Side title='Other Side' isEven />
    </Background>
  </ScrollLock>
)

export { App }