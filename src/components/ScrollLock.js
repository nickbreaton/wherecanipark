import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock'
import React, { createRef, Component } from 'react'

class ScrollLock extends Component {
  element = createRef()
  componentDidMount() {
    disableBodyScroll(this.element.current)
  }
  componentWillUnmount() {
    enableBodyScroll(this.element.current)
  }
  render() {
    return (
      <div ref={this.element}>
        {this.props.children}
      </div>
    )
  }
}

export { ScrollLock }