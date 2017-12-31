import React, { PureComponent } from 'react'

import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'

import './ExamTable.css'

const ExamTable = ({ courses, dates }) => {
  const E = courses.reduce((ret, val) => ({
    ...ret,
    [val.texam]: val
  }), {})

  return (
    <table className="Exam__table">
      <thead>
        <tr>
          <th></th>
          <th>{ dates[0] }</th>
          <th>{ dates[1] }</th>
          <th>{ dates[2] }</th>
          <th>{ dates[3] }</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>9am</td>
          <td>{ E['1 Morn'] ? E['1 Morn'].title : null }</td>
          <td>{ E['2 Morn'] ? E['2 Morn'].title : null }</td>
          <td>{ E['3 Morn'] ? E['3 Morn'].title : null }</td>
          <td>{ E['4 Morn'] ? E['4 Morn'].title : null }</td>
        </tr>
        <tr>
          <td>2pm</td>
          <td>{ E['1 Aft'] ? E['1 Aft'].title : null }</td>
          <td>{ E['2 Aft'] ? E['2 Aft'].title : null }</td>
          <td>{ E['3 Aft'] ? E['3 Aft'].title : null }</td>
          <td>{ E['4 Aft'] ? E['4 Aft'].title : null }</td>
        </tr>
      </tbody>
      <thead>
        <tr>
          <th></th>
          <th>{ dates[4] }</th>
          <th>{ dates[5] }</th>
          <th>{ dates[6] }</th>
          <th>{ dates[7] }</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>9am</td>
          <td>{ E['5 Morn'] ? E['5 Morn'].title : null }</td>
          <td>{ E['6 Morn'] ? E['6 Morn'].title : null }</td>
          <td>{ E['7 Morn'] ? E['7 Morn'].title : null }</td>
          <td>{ E['8 Morn'] ? E['8 Morn'].title : null }</td>
        </tr>
        <tr>
          <td>2pm</td>
          <td>{ E['5 Aft'] ? E['5 Aft'].title : null }</td>
          <td>{ E['6 Aft'] ? E['6 Aft'].title : null }</td>
          <td>{ E['7 Aft'] ? E['7 Aft'].title : null }</td>
          <td>{ E['8 Aft'] ? E['8 Aft'].title : null }</td>
        </tr>
      </tbody>
    </table>
  )
}

export default ExamTable
