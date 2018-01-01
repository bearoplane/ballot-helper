import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import classes from './data'
import createStore from './createStore'

import Paper from 'material-ui/Paper'

import CourseList from './components/CourseList'
import TimeTables from './components/TimeTables'
import TopMenu from './components/TopMenu'

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
      },
      term: 'F',
      selected: {
        F: [],
        W: []
      }
    }
  }

  getFromStorage() {
    let selectedCourses = localStorage.getItem('BH:CACHED_COURSES')
    let parsedCourses

    if (selectedCourses) {
      parsedCourses = JSON.parse(selectedCourses)
    // } && selectedCourses.hasOwnProperty('F')) {
      // return
    }

    if (parsedCourses.hasOwnProperty('F')) {
      return parsedCourses
    }

    return {F:[], W:[]}
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
    const newSelected = {
      ...this.state.selected,
      [this.state.term]: selected
    }
    this.setState({
      selected: newSelected
    })
    this.saveToStorage(newSelected)
  }
  _updateFilters = (filter, prop, val) => {
    this.setState({
      [filter]: {
        ...this.state[filter],
        [prop]: !this.state[filter][prop]
      }
    })
  }

  _setTerm = (term) => {
    this.setState({
      term
    })
  }

  render() {
    const { selected, store, type, selection, term } = this.state

    const courses = Object.values(store.data).filter(course => {
      return true
    })

    return (
      <div className="App">
        <TopMenu term={term} setTerm={this._setTerm} />
        <div className="App__wrap">
          <div className="App__left App__side">
            <CourseList selectedCourses={selected[term]} courses={courses} setSelected={this._setSelected} term={term} />
          </div>
          <div className="App__right App__side">
            <TimeTables term={term} courses={selected[term].map(key => store.get(key))} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
