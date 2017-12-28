import React from 'react'
import './CourseList.css'

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import Drawer from 'material-ui/Drawer'

import makeKey from '../makeKey'

const CourseList = ({ courses, setSelected, selectedCourses, term }) => {
  const filteredCourses = courses.filter(course => course.term.slice(0, 1) === term)

  const handleRowSelection = (selectedRows) => {
    if (selectedRows === 'all')
      return setSelected('all')

    setSelected(selectedRows.map(num => makeKey(filteredCourses[num])))
  }

  const tableData = filteredCourses.map(course => (
    <TableRow key={makeKey(course)} selected={!!~selectedCourses.indexOf(makeKey(course))}>
      <TableRowColumn width="10%">{ course.type }</TableRowColumn>
      <TableRowColumn width="10%">{ course.selection }</TableRowColumn>
      <TableRowColumn>{ course.title }</TableRowColumn>
      <TableRowColumn width="16%">{ course.tclass }</TableRowColumn>
      <TableRowColumn width="20%">{ course.instructor }</TableRowColumn>
    </TableRow>
  ))

  return (
    <div className="CourseList">
      <Table
        onRowSelection={handleRowSelection}
        multiSelectable={true}
        fixedHeader={true}
      >
        <TableHeader
          displaySelectAll={false}
          enableSelectAll={false}
        >
          <TableRow>
            <TableHeaderColumn width="10%">Course Type</TableHeaderColumn>
            <TableHeaderColumn width="10%">Selection</TableHeaderColumn>
            <TableHeaderColumn>Title</TableHeaderColumn>
            <TableHeaderColumn width="16%">Class Time</TableHeaderColumn>
            <TableHeaderColumn width="20%">Instructor</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          deselectOnClickaway={false}
          showRowHover={true}
        >
          { tableData }
        </TableBody>
      </Table>
    </div>
  )
}

export default CourseList
