import { Background } from './Background'
import { Side } from './Side'
import React from 'react'

export const App = () => (
  <Background>
    <Side title='My Side' isEven={false} />
    <Side title='Other Side' isEven={true} />
  </Background>
)