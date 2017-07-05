import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import classes from './data'
import createStore from './createStore'

import CourseList from './components/CourseList'
import TimeTables from './components/TimeTables'

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

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      store: createStore(classes, schema, { cell: '|', row: ';' })
    }

    this._setSelected
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
    let selectedCourses = selected === 'all' ? Object.keys(this.state.store.data) : selected

    this.setState({
      selected: selectedCourses
    })
    this.saveToStorage(selectedCourses)
  }

  render() {
    const { selected, store } = this.state

    return (
      <div className="App">
        <CourseList selectedCourses={selected} courses={Object.values(store.data)} setSelected={this._setSelected} />
        <TimeTables courses={selected.map(key => store.get(key))} />
      </div>
    )
  }
}

export default App
