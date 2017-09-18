<template>
  <div class='todo container'>
    <div class='row'>
        <form v-on:submit.prevent>
            <div class='form-group col-xs-5 col-xs-offset-2'>
                <input class='form-control' type='text' name='newItem' placeholder='New Item' v-model='newItem.text'/>
            </div>
            <div class='col-xs-3'>
                <button class='btn btn-primary btn-md btn-left' v-on:click="addTodo">Add</button>
                <button
                class='btn btn-primary btn-md btn-right'
                v-on:click="() => prepareItem('','',newItem.text)"
                >
                  Add To...
                </button>
            </div>
        </form>
    </div>
    <div class='row'>
        <div class='col-xs-4' v-for='list in lists'>
            <div class='col-xs-12 list'>
                <h3>{{list.title}}:</h3>
                <ul v-for='item in list.items'>
                    <li v-on:click='prepareItem(list.name, list.title, item)' class='col-xs-12'>
                        {{item}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
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
                  <button class='btn btn-md btn-success' v-on:click='() => moveItem()'>Move</button>
                </div>
              </div>
            </div>
          </div>
        </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'todo',
  // beforeMount() {
  //   if (this.$localStorage.get('lists')) {
  //     this.lists = JSON.parse(this.$localStorage.get('lists'))
  //   }
  //   if (this.$localStorage.get('archive')) {
  //     this.archive = JSON.parse(this.$localStorage.get('archive'))
  //   }
  // },
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
          items: [
            'Un-Archive Items (start with localStorage)',
            'Enable Item Re-ordering',
            'Enable Move to Position #',
            'Create Full To-Do Object Model',
            'List Customization',
            'Add Vuex to Project',
            'Multiple Boards'
          ]
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
      newItem: {
        text: ''
      },
      toName: '',
      showModal: false,
      isFrom: false
    }
  },
  methods: {
    addTodo() {
      this.toName = 'todoItems'
      this.preparedItem = this.newItem
      this.moveItem()
      this.newItem.text = ''
    },
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
      this.newItem.text = ''
      this.close()
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

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style>
h1 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
  text-align: left;
}

li {
  transition: .2s;
  cursor: pointer;
  display: inline-block;
  margin: 5px 0;
  padding: 5px 20px;
  background-color: #ffffff;
  border: 1px solid #cfcfcf;
  border-radius: 5px;
}

li:hover {
  border-color: black;
}

.todo {
  margin-top: 1em;
}

.list {
    border: 1px solid #42b983;
    border-radius: 3px;
    background-color: #ededed;
    padding-bottom: 5px;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.btn-left {
  float: left;
}

.btn-right {
  float: right;
}
</style>
