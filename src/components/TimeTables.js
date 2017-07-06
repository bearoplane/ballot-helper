import React, { PureComponent } from 'react'
import Drawer from 'material-ui/Drawer';

import './TimeTables.css'

// import makeKey from '../makeKey'

const dayPos = {
  M: 0,
  Tu: 1,
  W: 2,
  Th: 3,
  F: 4
}
const TimeTableCell = ({ course, day }) => {
  const [ days, time ] = course.tclass.split(' ')
  let [ start, end ] = time.split('-').map(v => !!~v.indexOf(':') ? +v.split(':')[0] + .5 : +v)

  if (start >= 1 && start < 8.5)
    start += 12
  if (end >= 1 && end < 9.5)
    end += 12

  // use 8:30am as zero
  start -= 8.5
  end -= 8.5

  // convert them to number of 30 minute intervals
  start *= 2
  end *= 2

  return (
    <div className={`table__grid-cell ${day}`} style={{ height: `${(end - start) * 4}%`, top: `${start * 4}%` }}>
      <span>{ course.title }</span>
    </div>
  )
}

class TimeTables extends PureComponent {
  state = {
    open: true
  }

  toggleOpen = () => this.setState({ open: !this.state.open })

  render() {
    const { courses } = this.props
    let timeLabels = []
    for (let i = 0; i < 25; i += 2) {
      timeLabels.push(
        <div className="table__time-label" key={i} style={{ top: `${(i * 4)}%` }}>
          { `${ Math.floor(8.5 + (i * 0.5)) }:${ i % 2 === 1 ? '00' : '30' }` }
        </div>
      )
    }
    const dayLabels = ['M', 'Tu', 'W', 'Th', 'F'].map((day, i) => (
      <div key={i} className={`table__days-label ${day}`}>
        { day }
      </div>
    ))
    const fallCells = courses.reduce((ret, course, i) => {
      if (course.tclass !== 'N/A' && course.term === 'FALL') {
        const [ days, time ] = course.tclass.split(' ')
        days.split(',').forEach(day => ret.push(
          <TimeTableCell key={`${day}${i}`} course={course} day={day} />
        ))
      }

      return ret
    }, [])

    const winterCells = courses.reduce((ret, course, i) => {
      if (course.tclass !== 'N/A' && course.term === 'WINTER') {
        const [ days, time ] = course.tclass.split(' ')
        days.split(',').forEach(day => ret.push(
          <TimeTableCell key={`${day}${i}`} course={course} day={day} />
        ))
      }

      return ret
    }, [])

    return (
      <Drawer openSecondary={true} width="35%">
        <h3>Fall</h3>
        <div className="table__wrap">
          <div className="table__time">
            { timeLabels }
          </div>
          <div className="table__days">
            { dayLabels }
          </div>
          <div className="table__grid">
            { fallCells }
          </div>
        </div>

        <h3>Winter</h3>
        <div className="table__wrap">
          <div className="table__time">
            { timeLabels }
          </div>
          <div className="table__days">
            { dayLabels }
          </div>
          <div className="table__grid">
            { winterCells }
          </div>
        </div>
      </Drawer>
    )
  }
}

// PropTypes:
// courses

export default TimeTables
