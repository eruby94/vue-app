const actions = {
  moveItem({ commit }, payload) {
    commit('extractItem', payload.preparedItem)
    let listUpdate = {
      newIndex: payload.newIndex,
      item: payload.preparedItem.text
    }
    commit('addItem', listUpdate)
    commit('toggleModal')
  }
}

export default actions
