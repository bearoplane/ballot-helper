function createStore(data) {
  let store = data.reduce((ret, val) => ({
    ...ret,
    [`${val.id}${val.section}`]: val
  }), {})

  return {
    data: store,
    get: (id) => store[id]
  }
}

export default createStore
