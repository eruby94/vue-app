const mutations = {
  addItem(state, listUpdate) {
    state.lists[listUpdate.destination].items.push(listUpdate.item)
  },
  extractItem(state, preparedItem) {
    let index = state.lists[preparedItem.name].items.indexOf(preparedItem.text)
    state.lists[preparedItem.name].items.splice(index, 1)
  },
  setListStore(state, lists) {
    state.lists = lists
  },
  setArchiveStore(state, archive) {
    state.archive = archive
  },
  toggleModal(state) {
    state.showModal = !state.showModal
  },
  archiveItem(state, item) {
    state.archive.push(item)
    state.showModal = false
  },
  deleteItem(state, item) {
    let index = state.archive.indexOf(item)
    state.archive.splice(index, 1)
    state.showModal = false
  }
}

export default mutations
