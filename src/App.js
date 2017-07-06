import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

// import classes from './data'
import classes from './otherdata'
import createStore from './createStore'

import CourseList from './components/CourseList'
import TimeTables from './components/TimeTables'
import TopMenu from './components/TopMenu'

/*
const schema = [
  'type',
  'term',
  'id',
  'section',
  'title',
  'selection',
  'instructor',
  'exam',
  'paper',
  'tclass',
  'texam'
]
*/
const schema = [
  'num',
  'term',
  'id',
  'section',
  'title',
  'instructor',
  'tclass'
]

// These must match the values in the data
const Compulsory = 'Compulsory'
const Seminar = 'Seminar'
const Special = 'Special Application'
const Approval = 'Instructor Approval'
const Other = 'Other'

const Ballot = 'Ballot'
const Application = 'Application'
const Instructor = 'Instructor Approval'
const eServices = 'eServices'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      store: createStore(classes, schema, { cell: '|', row: ';' }),
      type: {
        [Compulsory]: true,
        [Seminar]: true,
        [Special]: true,
        [Approval]: true,
        [Other]: true
      },
      selection: {
        [Ballot]: true,
        [Application]: true,
        [Instructor]: true,
        [eServices]: true
      }
    }
  }

  getFromStorage() {
    let selectedCourses = localStorage.getItem('BH:CACHED_COURSES')

    if (selectedCourses) {
      return JSON.parse(selectedCourses)
    }

    return []
  }
  saveToStorage(selected) {
    localStorage.setItem('BH:CACHED_COURSES', JSON.stringify(selected))
  }

  componentWillMount() {
    this.setState({
      selected: this.getFromStorage()
    })
  }
  componentWillUnmount() {
    this.saveToStorage(this.state.selected)
  }

  _setSelected = (selected) => {
    this.setState({
      selected
    })
    this.saveToStorage(selected)
  }
  _updateFilters = (filter, prop, val) => {
    this.setState({
      [filter]: {
        ...this.state[filter],
        [prop]: !this.state[filter][prop]
      }
    })
  }

  render() {
    const { selected, store, type, selection } = this.state

/*
    const courses = Object.values(store.data).filter(course => {
      return type[course.type] && selection[course.selection]
    })
*/
// <TopMenu filters={{ type, selection }} updateFilters={this._updateFilters} />
    return (
      <div className="App">
        <CourseList selectedCourses={selected} courses={Object.values(store.data)} setSelected={this._setSelected} />
        <TimeTables courses={selected.map(key => store.get(key))} />
      </div>
    )
  }
}

export default App
