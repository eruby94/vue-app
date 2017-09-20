const actions = {
  moveItem({ commit }, payload) {
    if (payload.preparedItem.name) {
      commit('extractItem', payload.preparedItem)
    }
    let listUpdate = {
      destination: payload.destination,
      item: payload.preparedItem.text
    }
    commit('addItem', listUpdate)
    commit('toggleModal')
  }
}

export default actions
