<template>
  <div class='todo container'>
    <div v-if='showModal'>
        <transition name='modal'>
          <div class='modal-mask'>
            <div class='modal-wrapper'>
              <div class='modal-container col-xs-4 col-xs-offset-4'>
                <div class='modal-header'>
                    <h3 v-if="preparedItem.title">Move from {{preparedItem.title}}</h3>
                    <h3 v-else>Add Item</h3>
                </div>
                <div class='modal-body'>
                    <div class='form-group'>
                        <label for='newIndex'>To:</label>
                        <select class='form-control' name='newIndex' v-model='newIndex'>
                            <option disabled default value=''>
                                Select a Destination
                            </option>
                            <option v-for='(list, index) in lists' v-if='index !== preparedItem.oldIndex' :value='index'>
                                {{list.title}}
                            </option>
                        </select>
                    </div>
                    <p>
                      {{preparedItem.text}}
                    </p>
                </div>
                <div class='modal-footer'>
                  <button class='btn btn-md btn-danger btn-left' v-on:click='toggleModal'>
                    Cancel
                  </button>
                  <button class='btn btn-md btn-primary' v-on:click='localArchiveItem'>
                    Archive
                  </button>
                  <button class='btn btn-md btn-success' v-on:click='move' :disabled="!newIndex">Move</button>
                </div>
              </div>
            </div>
          </div>
        </transition>
    </div>
    <div class='row'>
      <draggable v-model="lists" :options="{group: 'lists', draggable: '.list-container'}">
        <div class='col-xs-4 list-container' v-for='(list, index) in lists'>
            <div class='col-xs-12 list'>
                <h3 v-show="!isInEdit(index)" v-on:click.prevent="() => enableListEdit(index)">{{list.title}}:</h3>
                <form v-show="isInEdit(index)" v-on:submit.prevent="() => updateTitle(index)">
                  <input class="col-xs-12 title-edit" type="text" name="newTitle" v-model="list.newTitle" />
                </form>
                <draggable v-model="list.items" :options="{group:'todos', draggable: '.item'}" class="drag-area">
                  <div v-for='item in list.items' v-on:click='() => prepareItem(index, list.title, item)' class='col-xs-12 item'>
                    {{item}}
                  </div>
                  <form class="col-xs-12 add-item" slot="footer" v-on:submit.prevent="() => add(index)">
                    <input type="text" class="col-xs-12" v-model="list.newItem" placeholder="Add Item..."/>
                  </form>
                </draggable>
            </div>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'todo',
  computed: {
    lists: {
      get() {
        return this.$store.state.lists
      },
      set(updatedLists) {
        this.$store.commit('setListStore', updatedLists)
      }
    },
    ...mapState(['showModal', 'archive'])
  },
  components: {
    draggable
  },
  updated() {
    var that = this
    that.$nextTick(function() {
      if (that.archive) {
        that.$localStorage.set('archive', JSON.stringify(that.archive))
      }
      if (that.lists) {
        that.$localStorage.set('lists', JSON.stringify(that.lists))
      }
    })
  },
  data() {
    return {
      preparedItem: {},
      newIndex: null,
      newTitle: '',
      isFrom: false
    }
  },
  methods: {
    prepareItem(index, title, text) {
      this.newIndex = ''
      this.preparedItem = {
        oldIndex: index,
        text: text,
        title: title
      }
      this.toggleModal()
    },
    isInEdit(listIndex) {
      return this.lists[listIndex].isInEdit
    },
    move() {
      let payload = {
        preparedItem: this.preparedItem,
        newIndex: this.newIndex
      }
      this.moveItem(payload)
      this.newIndex = null
    },
    add(listIndex) {
      let listUpdate = {
        newIndex: listIndex,
        item: this.lists[listIndex].newItem
      }
      this.lists[listIndex].newItem = ''
      this.addItem(listUpdate)
    },
    updateTitle(listIndex, oldTitle) {
      let listUpdate = {
        index: listIndex,
        newTitle: this.lists[listIndex].newTitle
      }
      this.updateListTitle(listUpdate)
      this.newTitle = ''
    },
    localArchiveItem() {
      this.extractItem(this.preparedItem)
      this.archiveItem(this.preparedItem.text)
    },
    ...mapMutations([
      'addItem',
      'extractItem',
      'toggleModal',
      'archiveItem',
      'updateListTitle',
      'enableListEdit'
    ]),
    ...mapActions(['moveItem'])
  }
}
</script>

<style>
.title-edit {
  margin-top: .5em;
  text-align: center;
  font-weight: 500;
  font-size: 1.75em;
  background-color: #d6d6d6;
  border-color: transparent;
  border-radius: 3px;
  outline: none;
}
</style>
