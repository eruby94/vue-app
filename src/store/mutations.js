const mutations = {
  addItem(state, listUpdate) {
    state.lists[listUpdate.newIndex].items.push(listUpdate.item)
  },
  extractItem(state, preparedItem) {
    let itemIndex = state.lists[preparedItem.oldIndex].items.indexOf(
      preparedItem.text
    )
    state.lists[preparedItem.oldIndex].items.splice(itemIndex, 1)
  },
  updateListTitle(state, listUpdate) {
    state.lists[listUpdate.index].title = listUpdate.newTitle
    state.lists[listUpdate.index].isInEdit = false
  },
  enableListEdit(state, listIndex) {
    state.lists[listIndex].isInEdit = true
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
