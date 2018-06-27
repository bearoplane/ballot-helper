function createStore(data, schema, { cell, row }) {
  function createCourseObject(C) {
    const dataObj = C.split(cell).reduce((ret, val, i) => {
      return {
        ...ret,
        [schema[i]]: val.trim()
      }
    }, {})

    return { [`${dataObj.id}${dataObj.section}`]: dataObj }
  }

  function processData(D) {
    return D.split(row).reduce((ret, val) => ({
      ...ret,
      ...createCourseObject(val, schema, cell)
    }), {})
  }

  let store = processData(data)

  return {
    data: store,
    get: (id) => store[id]
  }
}

export default createStore
