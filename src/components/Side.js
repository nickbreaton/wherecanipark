import { getStatus, formatDuration } from '../lib/core'
import { Status } from './Status'
import moment from 'moment'
import React from 'react'

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
    return moment(new Date(this.state.now))
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

export { Side }