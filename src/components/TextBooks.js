import React, { Component } from 'react'

import TextBookGetter from './TextBookGetter'

import makeKey from '../makeKey'

class TextBooks extends Component {
  constructor(props) {
    super(props)

    this.state = {
      courseBooks: {}
    }
  }

  onGotInfo = (course, info) => {
    this.setState({
      courseBooks: {
        ...this.state.courseBooks,
        [makeKey(course)]: info
      }
    })
  }

  render() {
    const { courses } = this.props

    const textBookGetters = courses.map((course, i) => <TextBookGetter ref={makeKey(course)} key={i} course={course} onGotInfo={this.onGotInfo} />)

    return (
      <div>{ textBookGetters }</div>
    )
  }
}

export default TextBooks
