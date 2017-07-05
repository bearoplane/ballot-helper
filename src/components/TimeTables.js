import React, { PureComponent } from 'react'

import makeKey from '../makeKey'

import bg from '../ttbg.png'

const cellStyles = {
  position: 'absolute',
  width: '20%',
  background: '#d2393b',
  fontSize: '.5rem',
  textAlign: 'left',
  color: '#fff'
}
const testTime = "M 6-9"
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
console.log('one', 'start', start, 'end', end);
  // convert them to number of 30 minute intervals
  start *= 2
  end *= 2
console.log('two', 'start', start, 'end', end);
  return (
    <div style={{ ...cellStyles, height: `${(end - start) * 4}%`, top: `${start * 4}%`, left: `${dayPos[day] * 20}%` }}>
      <span>{ course.title }</span>
    </div>
  )
}

class TimeTables extends PureComponent {
  state = {
    open: true,
    showWinter: false
  }

  toggleOpen = () => this.setState({ open: !this.state.open })
  toggleTerm = () => this.setState({ showWinter: !this.state.showWinter })

  render() {
    const { courses } = this.props
    const { showWinter } = this.state

    const S = {
      height: 400,
      width: 300,
      margin: 10,
      top: 40,
      left: 60
    }

    let timeLabels = []
    for (let i = 0; i < 25; i++) {
      timeLabels.push(
        <div key={i} style={{
          position: 'absolute',
          width: S.left,
          height: '4%',
          top: `${(i * 4)}%`, fontSize: '0.7em', color: '#333'
        }}>
          { `${ Math.floor(8.5 + (i * 0.5)) }:${ i % 2 === 1 ? '00' : '30' }` }
        </div>
      )
    }
    const dayLabels = ['M', 'Tu', 'W', 'Th', 'F'].map((day, i) => (
      <div key={i} style={{
        position: 'absolute',
        left: `${(i * 20)}%`,
        width: '20%',
        height: S.top,
        top: S.margin,
        fontSize: '0.7em', color: '#333'
      }}>
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
      <div>
        <div className="TimeTables gradient-pattern" style={{ borderRadius: '0 0 0 10px',
          width: S.width + S.left + (S.margin * 2),
          height: S.height + S.top + (S.margin * 2),
          position: 'fixed', top: 0, right: S.width + S.left + (S.margin * 2)
        }}>
          <h3 style={{
            margin: 0,
            left: 10,
            top: 10,
            position: 'absolute',
            fontWeight: 300,
            color: '#333'
          }}>Fall</h3>
          <div style={{ position: 'absolute', height: S.height, left: S.margin, top: S.top }}>
            { timeLabels }
          </div>
          <div style={{ position: 'absolute', height: S.height, top: S.margin, left: S.left, width: S.width }}>
            { dayLabels }
          </div>
          <img style={{ position: 'absolute', height: S.height, width: S.width, top: S.top, left: S.left, zIndex: 0 }} src={bg} />
          <div className="cellWrap" style={{ position: 'absolute', width: S.width, height: S.height, top: S.top, left: S.left, zIndex: 100 }}>
            { fallCells }
          </div>
        </div>

        <div className="TimeTables gradient-pattern" style={{ borderRadius: '0 0 0 10px',
          width: S.width + S.left + (S.margin * 2),
          height: S.height + S.top + (S.margin * 2),
          position: 'fixed', top: 0, right: 0
        }}>
          <h3 style={{
            margin: 0,
            left: 10,
            top: 10,
            position: 'absolute',
            fontWeight: 300,
            color: '#333'
          }}>Winter</h3>
          <div style={{ position: 'absolute', height: S.height, left: S.margin, top: S.top }}>
            { timeLabels }
          </div>
          <div style={{ position: 'absolute', height: S.height, top: S.margin, left: S.left, width: S.width }}>
            { dayLabels }
          </div>
          <img style={{ position: 'absolute', height: S.height, width: S.width, top: S.top, left: S.left, zIndex: 0 }} src={bg} />
          <div className="cellWrap" style={{ position: 'absolute', width: S.width, height: S.height, top: S.top, left: S.left, zIndex: 100 }}>
            { winterCells }
          </div>
        </div>
      </div>
    )
  }
}

// PropTypes:
// courses

export default TimeTables
