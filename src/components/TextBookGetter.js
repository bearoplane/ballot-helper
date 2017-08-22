import React, { Component } from 'react'

const BASE_URL = 'http://www.bkstr.com/webapp/wcs/stores/servlet/CourseMaterialsResultsView'
const TERM_ID = '100046636' // TODO: Update with real value when bookstore updates
const PROGRAM_ID = '964'

const makeUrl = course =>
  `${ BASE_URL }?catalogId=10001&categoryId=9604&storeId=11010&programId=${ PROGRAM_ID }&termId=${ TERM_ID }&courseDisplayName=${ course.id.slice(3) }&sectionDisplayName=${ course.section }`

class TextBookGetter extends Component {
  shouldComponentUpdate = () => false

  getTextBookInfo = () => {
    const { onGotInfo } = this.props
  }

  render() {
    const { course } = this.props
console.log(makeUrl(course))
    return (
      <iframe style={{ height: 1, width: 1 }} ref="iframe" src={makeUrl(course)} />
    )
  }
}

export default TextBookGetter
