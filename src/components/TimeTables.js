import React, { PureComponent } from 'react'

import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'

import ExamTable from './ExamTable'

import './TimeTables.css'

// import makeKey from '../makeKey'

import { FallExamDates, WinterExamDates, dayPos } from '../constants'

const TimeTableCell = ({ course, day }) => {
  const [ days, time ] = course.tclass.split(' ')
  let [ start, end ] = time.split('-').map(v => !!~v.indexOf(':') ? +v.split(':')[0] + .5 : +v)

  if (start >= 1 && start < 8.5)
    start += 12
  if (end >= 1 && end < 10)
    end += 12

  // use 8:30am as zero
  start -= 8.5
  end -= 8.5

  // convert them to number of 30 minute intervals
  start *= 2
  end *= 2

  return (
    <div className={`table__grid-cell ${day}`} style={{ height: `${((end - start) * 4) - 1}%`, top: `${start * 4}%` }}>
      <span>{ course.title }</span>
    </div>
  )
}

let timeLabels = []
for (let i = 0; i < 25; i += 3) {
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

class TimeTables extends PureComponent {
  state = {
    open: true
  }

  toggleOpen = () => this.setState({ open: !this.state.open })

  render() {
    const { courses, term } = this.props

    const fallCourses = courses.reduce((ret, course, i) => {
      if (course.term === 'FALL')
        ret.push(course)

      return ret
    }, [])
    const winterCourses = courses.reduce((ret, course, i) => {
      if (course.term === 'WINTER')
        ret.push(course)

      return ret
    }, [])

    const fallCells = fallCourses.reduce((ret, course, i) => {
      if (course.tclass !== 'N/A') {
        const [ days, time ] = course.tclass.split(' ')
        days.split(',').forEach(day => ret.push(
          <TimeTableCell key={`${day}${i}`} course={course} day={day} />
        ))
      }
      return ret
    }, [])

    const winterCells = winterCourses.reduce((ret, course, i) => {
      if (course.tclass !== 'N/A') {
        const [ days, time ] = course.tclass.split(' ')
        days.split(',').forEach(day => ret.push(
          <TimeTableCell key={`${day}${i}`} course={course} day={day} />
        ))
      }

      return ret
    }, [])

// <Drawer openSecondary={true} width="35%" className="timetables__wrap">

    return (
      <div className="page__wrap">
        <div className="table__wrap">
          <div className="table__time">
            { timeLabels }
          </div>
          <div className="table__days">
            { dayLabels }
          </div>
          <div className="table__grid">
            { term === 'F' ? fallCells : winterCells }
          </div>
        </div>

        <div className="examtable__wrap">
          <h3>Exams</h3>
          <ExamTable
            courses={ term === 'F' ? fallCourses : winterCourses }
            dates={ term === 'F' ? FallExamDates : WinterExamDates }
          />
        </div>
      </div>
    )
  }
}

export default TimeTables
