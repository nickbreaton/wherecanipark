import { Background } from './Background'
import { Side } from './Side'
import React from 'react'

export const App = () => (
  <Background>
    <Side title='My Side' />
    <Side title='Other Side' isEven />
  </Background>
)