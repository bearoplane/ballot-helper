import React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

import makeKey from '../makeKey'

const CourseList = ({ courses, setSelected, selectedCourses }) => {
  const handleRowSelection = (selectedRows) => {
    if (selectedRows === 'all')
      return setSelected('all')

    setSelected(selectedRows.map(num => makeKey(courses[num])))
  }

/*
<TableRowColumn>{ course.id }</TableRowColumn>
<TableRowColumn>{ course.section }</TableRowColumn>

<TableRowColumn>{ course.tclass }</TableRowColumn>
<TableRowColumn>{ course.texam }</TableRowColumn>

<TableRowColumn>{ course.exam }</TableRowColumn>
<TableRowColumn>{ course.paper }</TableRowColumn>
*/

  const tableData = courses.map(course => (
    <TableRow key={makeKey(course)} selected={!!~selectedCourses.indexOf(makeKey(course))}>
      <TableRowColumn width="10%">{ course.type }</TableRowColumn>
      <TableRowColumn width="10%">{ course.selection }</TableRowColumn>
      <TableRowColumn width="4%">{ course.term.slice(0, 1) }</TableRowColumn>
      <TableRowColumn>{ course.title }</TableRowColumn>
      <TableRowColumn width="16%">{ course.tclass }</TableRowColumn>
      <TableRowColumn width="20%">{ course.instructor }</TableRowColumn>
    </TableRow>
  ))

/*
<TableHeaderColumn>Course Type</TableHeaderColumn>
<TableHeaderColumn>Course #</TableHeaderColumn>
<TableHeaderColumn>Section</TableHeaderColumn>
<TableHeaderColumn>Selection</TableHeaderColumn>
<TableHeaderColumn>Exam</TableHeaderColumn>
<TableHeaderColumn>50% Paper</TableHeaderColumn>

<TableHeaderColumn>Exam Time</TableHeaderColumn>
*/

  return (
    <div className="CourseList" style={{ width: '65%' }}>
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
            <TableHeaderColumn width="13%">Course Type</TableHeaderColumn>
            <TableHeaderColumn width="13%">Selection</TableHeaderColumn>
            <TableHeaderColumn width="4%">Term</TableHeaderColumn>
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


// PropTypes:
// courses
// toggleCourse

export default CourseList
