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
                        <label for='toName'>To:</label>
                        <select class='form-control' name='toName' v-model='toName'>
                            <option disabled default value=''>
                                Select a Destination
                            </option>
                            <option v-for='list in lists' v-if='list.name !== preparedItem.name' :value='list.name'>
                                {{list.title}}
                            </option>
                        </select>
                    </div>
                    <p>
                      {{preparedItem.text}}
                    </p>
                </div>
                <div class='modal-footer'>
                  <button class='btn btn-md btn-danger btn-left' v-on:click='close'>
                    Cancel
                  </button>
                  <button class='btn btn-md btn-primary' v-on:click='archiveItem'>
                    Archive
                  </button>
                  <button class='btn btn-md btn-success' v-on:click='() => moveItem(toName,true)'>Move</button>
                </div>
              </div>
            </div>
          </div>
        </transition>
    </div>
    <div class='row'>
        <div class='col-xs-4' v-for='list in lists'>
            <div class='col-xs-12 list'>
                <h3>{{list.title}}:</h3>
                <draggable v-model="list.items" :options="{group:'todos', draggable: '.item'}" class="drag-area">
                  <div v-for='item in list.items' v-on:click='prepareItem(list.name, list.title, item)' class='col-xs-12 item'>
                    {{item}}
                  </div>
                  <form class="col-xs-12 add-item" slot="footer" v-on:submit.prevent="() => addTo(list.name)">
                    <input type="text" class="col-xs-12" v-model="list.newItem" placeholder="Add Item..."/>
                  </form>
                </draggable>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'todo',
  beforeMount() {
    if (this.$localStorage.get('lists')) {
      this.lists = JSON.parse(this.$localStorage.get('lists'))
    }
    if (this.$localStorage.get('archive')) {
      this.archive = JSON.parse(this.$localStorage.get('archive'))
    }
  },
  components: {
    draggable
  },
  updated() {
    var that = this
    that.$nextTick(function() {
      that.$localStorage.set('lists', JSON.stringify(that.lists))
      that.$localStorage.set('archive', JSON.stringify(that.archive))
    })
  },
  data() {
    return {
      lists: {
        todoItems: {
          name: 'todoItems',
          title: 'Things To Do',
          items: []
        },
        inProgress: {
          name: 'inProgress',
          title: 'In-Progress',
          items: []
        },
        completedItems: {
          name: 'completedItems',
          title: 'Completed',
          items: []
        }
      },
      archive: [],
      preparedItem: {},
      toName: '',
      showModal: false,
      isFrom: false
    }
  },
  methods: {
    prepareItem(name, title, text) {
      this.toName = ''
      this.preparedItem = {
        name: name,
        text: text,
        title: title
      }
      this.showModal = true
    },
    removeItem() {
      let index = this.lists[this.preparedItem.name].items.indexOf(
        this.preparedItem.text
      )
      this.lists[this.preparedItem.name].items.splice(index, 1)
    },
    moveItem(toList, fromList) {
      if (fromList) {
        this.removeItem()
      }
      this.lists[this.toName].items.push(this.preparedItem.text)
      this.close()
    },
    addTo(toList) {
      this.lists[toList].items.push(this.lists[toList].newItem)
      this.lists[toList].newItem = ''
    },
    close() {
      this.showModal = false
    },
    archiveItem() {
      this.removeItem()
      this.archive.push(this.preparedItem.text)
      this.close()
    }
  }
}
</script>
