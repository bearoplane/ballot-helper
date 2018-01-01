import React from 'react'
import './CourseList.css'

import Paper from 'material-ui/Paper'
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar'
import Chip from 'material-ui/Chip'

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
    <Paper className={boxClass} zDepth={1} onClick={() => setSelected(makeKey(course))}>
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
                <Chip className={ "Chip Chip__" + course.type }>{ termMap[course.type] }</Chip>
                <Chip className={ "Chip Chip__" + course.selection }>{ termMap[course.selection] }</Chip>
              </div>
            </td>
            <td>
              <div className="Chip_wrapper Chip_wrapper_right">
                <Chip className={ "Chip " + (course.exam === 'Yes' ? '' : 'Chip_faded') }>Exam</Chip>
                <Chip className={ "Chip " + (course.paper === 'Yes' ? '' : 'Chip_faded') }>Paper</Chip>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </Paper>
  )
}

const CourseList = ({ courses, setSelected, selectedCourses, term }) => {
  const filteredCourses = courses.filter(course => course.term.slice(0, 1) === term)

  const handleRowSelection = (key) => {
    let removed = false

    let newSelected = selectedCourses.filter(course => {
      if (course === key) removed = true

      return course !== key
    })

    if (!removed) newSelected.push(key)

    setSelected(newSelected)
  }

  const tableData = filteredCourses.map(course => (
    <CourseBox course={course} selected={!!~selectedCourses.indexOf(makeKey(course))} setSelected={handleRowSelection} />
  ))

  return (
    <div className="CourseList">
      <Toolbar className="CourseList__header">
        <ToolbarGroup firstChild={true}>
          <ToolbarTitle text="Courses" />
        </ToolbarGroup>
      </Toolbar>
      <div className="CourseList__list">
        { tableData }
      </div>
    </div>
  )
}

export default CourseList
