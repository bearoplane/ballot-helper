import React from 'react'
import './CourseList.css'

import Paper from '@material-ui/core/Paper'
import Chip from '@material-ui/core/Chip'

import { FallExamDates, WinterExamDates } from '../constants'

import makeKey from '../makeKey'

const termMap = {
  Compulsory: 'Compulsory',
  Seminar: 'Seminar',
  Special: 'Special Application',
  Approval: 'Instructor Approval',
  Other: 'Other',

  Ballot: 'Ballot',
  Application: 'Application',
  Instructor: 'Instructor Approval',
  eServices: 'eServices'
}

const convertClass = (tclass) => tclass
  .replace(',', ', ')
  .replace('-', ' – ')
  .replace('M', 'Monday')
  .replace('Tu', 'Tuesday')
  .replace('W', 'Wednesday')
  .replace('Th', 'Thursday')
  .replace('F', 'Friday')

const convertExam = (texam, term) => {
  let parts = texam.split(' ')

  let dates = term === 'FALL' ? FallExamDates : WinterExamDates;

  return dates[parts[0] - 1] + ' @ ' + ( parts[1] === 'Aft' ? '2pm' : '9am' )
}

const CourseBox = ({ course, selected, setSelected }) => {
  let boxClass = "CourseList__box"

  if (selected) boxClass += ' CourseList__box_selected'

  return (
    <Paper className={boxClass} elevation={1} onClick={() => setSelected(makeKey(course))}>
      <table>
        <tbody>
          <tr>
            <td className="CourseList__box_title">{ course.id } { course.title }</td>
            <td>{ course.instructor }</td>
          </tr>
          <tr>
            <td>{ course.tclass !== 'N/A' && convertClass(course.tclass) }</td>
          </tr>
          <tr>
            <td>{ course.texam !== 'N/A' && 'Exam: ' + convertExam(course.texam, course.term) }</td>
          </tr>
          <tr>
            <td>
              <div className="Chip_wrapper">
                <Chip className={`Chip Chip__${course.type}`} label={ termMap[course.type] } />
                <Chip className={`Chip Chip__${course.selection}`} label={ termMap[course.selection] } />
              </div>
            </td>
            <td>
              <div className="Chip_wrapper Chip_wrapper_right">
                <Chip className={course.exam === 'Yes' ? 'Chip Chip_active' : 'Chip Chip_disabled'} label="Exam" />
                <Chip className={course.paper === 'Yes' ? 'Chip Chip_active' : 'Chip Chip_disabled'} label="Paper" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </Paper>
  )
}

const CourseList = ({ courses, setSelected, selectedCourses, term, year }) => {
  const filteredCourses = courses.filter(course => {
    if (course.term.slice(0, 1) !== term) return false

    if (course.type === 'Compulsory' && course.id.slice(4,5) !== year.slice(0,1)) return false

    return true
  })

  const handleRowSelection = (key) => {
    let removed = false

    let newSelected = selectedCourses.filter(course => {
      if (course === key) removed = true

      return course !== key
    })

    if (!removed) newSelected.push(key)

    setSelected(newSelected)
  }

  const tableData = filteredCourses.map((course, i) => (
    <CourseBox key={i} course={course} selected={!!~selectedCourses.indexOf(makeKey(course))} setSelected={handleRowSelection} />
  ))

  return (
    <div className="CourseList">
      <div className="CourseList__list">
        { tableData }
      </div>
    </div>
  )
}

export default CourseList
