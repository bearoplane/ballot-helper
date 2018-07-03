import React, { Component } from 'react'
import './App.css'

import classes from './data2'
import createStore from './createStore'

import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'

import CourseList from './components/CourseList'
import TimeTables from './components/TimeTables'
import TopMenu from './components/TopMenu'
import UnderMenu from './components/UnderMenu'
import Profile from './components/Profile'

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
  'texam',
  'year'
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
      dialogOpen: false,
      profileOpen: false,
      store: createStore(classes),
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
      profile: null,
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

      if (parsedCourses.hasOwnProperty('F')) {
        return parsedCourses
      }
    }

    return {F:[], W:[]}
  }
  getProfileFromStorage() {
    let profile = localStorage.getItem('BH:PROFILE')

    if (profile) {
      return JSON.parse(profile)
    }

    return {year:'2L'}
  }
  saveToStorage(key, selected) {
    localStorage.setItem(`BH:${key}`, JSON.stringify(selected))
  }

  componentWillMount() {
    this.setState({
      selected: this.getFromStorage(),
      profile: this.getProfileFromStorage()
    })
  }
  componentDidMount() {
    if (!this.state.profile) {
      this.setState({
        profileOpen: true
      })
    }
  }
  componentWillUnmount() {
    this.saveToStorage('CACHED_COURSES', this.state.selected)
    this.saveToStorage('PROFILE', this.state.profile)
  }

  _updateProfile = (profile) => {
    this.setState({
      profile
    })
    this.saveToStorage('PROFILE', profile)
  }
  _setSelected = (selected) => {
    const newSelected = {
      ...this.state.selected,
      [this.state.term]: selected
    }
    this.setState({
      selected: newSelected
    })
    this.saveToStorage('CACHED_COURSES', newSelected)
  }
  _updateFilters = (filter, prop, val) => {
    this.setState({
      [filter]: {
        ...this.state[filter],
        [prop]: !this.state[filter][prop]
      }
    })
  }

  _openDialog = () => {
    this.setState({
      dialogOpen: true
    })
  }
  _closeDialog = () => {
    this.setState({
      dialogOpen: false
    })
  }
  _openProfile = () => {
    this.setState({
      profileOpen: true
    })
  }
  _closeProfile = () => {
    this.setState({
      profileOpen: false
    })
  }

  _setTerm = (term) => {
    this.setState({
      term
    })
  }

  render() {
    const { selected, store, term, profile, profileOpen } = this.state

    const courses = Object.values(store.data).filter(course => {
      return true
    })

    return (
      <div className="App">
        <TopMenu openProfile={this._openProfile} selectedCourses={selected} term={term} setTerm={this._setTerm} openDialog={this._openDialog} />
        <div className="App__wrap">
          <div className="App__left App__side">
            <CourseList year={profile.year} selectedCourses={selected[term]} courses={courses} setSelected={this._setSelected} term={term} />
          </div>
          <div className="App__right App__side">
            <TimeTables term={term} courses={selected[term].map(key => store.get(key))} />
          </div>
        </div>

        <Profile
          open={profileOpen}
          onClose={this._closeProfile}
          profile={profile}
          updateProfile={(e, val) => this._updateProfile({ year: val })}
        />

        <Dialog
          onClose={this._closeDialog}
          fullWidth={true}
          maxWidth={false}
          open={this.state.dialogOpen}
        >
          <div className="Dialog__wrap">
            <div className="Dialog__left">
              <h3 className="Dialog__heading">Fall</h3>
              <TimeTables term="F" courses={selected["F"].map(key => store.get(key))} />
            </div>
            <div className="Dialog__right">
              <h3 className="Dialog__heading">Winter</h3>
              <TimeTables term="W" courses={selected["W"].map(key => store.get(key))} />
            </div>
          </div>
        </Dialog>
      </div>
    )
  }
}

export default App
