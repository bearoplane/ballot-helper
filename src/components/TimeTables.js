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
  if (end >= 1 && end < 10)
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

const FallExamDates = [
  'Dec 8',
  'Dec 11',
  'Dec 12',
  'Dec 13',
  'Dec 14',
  'Dec 15',
  'Dec 18',
  'Dec 19'
]
const WinterExamDates = [
  'Apr 13',
  'Apr 16',
  'Apr 17',
  'Apr 18',
  'Apr 19',
  'Apr 20',
  'Apr 23',
  'Apr 24'
]

const ExamTable = ({ courses, dates }) => {
  const E = courses.reduce((ret, val) => ({
    ...ret,
    [val.texam]: val
  }), {})

  return (
    <table className="exam__table">
      <thead>
        <tr>
          <th></th>
          <th>{ dates[0] }</th>
          <th>{ dates[1] }</th>
          <th>{ dates[2] }</th>
          <th>{ dates[3] }</th>
          <th>{ dates[4] }</th>
          <th>{ dates[5] }</th>
          <th>{ dates[6] }</th>
          <th>{ dates[7] }</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>9-12</td>
          <td>{ E['1 Morn'] ? E['1 Morn'].title : null }</td>
          <td>{ E['2 Morn'] ? E['2 Morn'].title : null }</td>
          <td>{ E['3 Morn'] ? E['3 Morn'].title : null }</td>
          <td>{ E['4 Morn'] ? E['4 Morn'].title : null }</td>
          <td>{ E['5 Morn'] ? E['5 Morn'].title : null }</td>
          <td>{ E['6 Morn'] ? E['6 Morn'].title : null }</td>
          <td>{ E['7 Morn'] ? E['7 Morn'].title : null }</td>
          <td>{ E['8 Morn'] ? E['8 Morn'].title : null }</td>
        </tr>
        <tr>
          <td>2-5</td>
          <td>{ E['1 Aft'] ? E['1 Aft'].title : null }</td>
          <td>{ E['2 Aft'] ? E['2 Aft'].title : null }</td>
          <td>{ E['3 Aft'] ? E['3 Aft'].title : null }</td>
          <td>{ E['4 Aft'] ? E['4 Aft'].title : null }</td>
          <td>{ E['5 Aft'] ? E['5 Aft'].title : null }</td>
          <td>{ E['6 Aft'] ? E['6 Aft'].title : null }</td>
          <td>{ E['7 Aft'] ? E['7 Aft'].title : null }</td>
          <td>{ E['8 Aft'] ? E['8 Aft'].title : null }</td>
        </tr>
      </tbody>
    </table>
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

    return (
      <Drawer openSecondary={true} width="40%">
        <h4>Fall</h4>
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
        <div className="examtable__wrap">
          <ExamTable courses={fallCourses} dates={FallExamDates} />
        </div>

        <h4>Winter</h4>
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
        <div className="examtable__wrap">
          <ExamTable courses={winterCourses} dates={WinterExamDates} />
        </div>

      </Drawer>
    )
  }
}

// PropTypes:
// courses

export default TimeTables
