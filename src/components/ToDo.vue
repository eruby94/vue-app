<template>
  <div class="todo">
    <h1 v-bind:title="message">{{ msg }}</h1>
    <div class="row">
        <form v-on:submit.prevent @submit="addTodo">
            <div class="form-group col-xs-5 col-xs-offset-3">
                <input class="form-control" type="text" name="newItem" placeholder="New Item" v-model="newItem"/>
            </div>
            <div class="col-xs-1">
                <button class="btn btn-primary btn-md" type="submit">Add</button>
            </div>
        </form>
    </div>
    <div class="row">
        <div class="col-xs-4" v-for="list in lists">
            <h3>{{list.title}}:</h3>
            <ul v-for="item in list.items">
                <li v-on:click="prepareItem(list.name, list.title, item)">
                    {{item}}
                </li>
            </ul>
        </div>
    </div>
    <div v-if="showModal">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
              <div class="modal-container col-xs-4 col-xs-offset-4">
                <div class="modal-header">
                    <h3>Move from {{preparedItem.title}}</h3>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="toName">To:</label>
                        <select class="form-control" name="toName" v-model="toName">
                            <option disabled default value="">
                                Select a Destination
                            </option>
                            <option v-for="list in lists" v-if="list.name !== preparedItem.name" :value="list.name">
                                {{list.title}}
                            </option>
                        </select>
                    </div>
                    <p>
                      {{preparedItem.text}}
                  </p>
                </div>
                <div class="modal-footer">
                  <button class="btn btn-md btn-danger" v-on:click="close">
                    Cancel
                  </button>
                  <button class="btn btn-md btn-success" v-on:click="moveItem">Move</button>
                </div>
              </div>
            </div>
          </div>
        </transition>
    </div>
  </div>
</template>

<script>
import Modal from './Modal'
export default {
  name: 'todo',
  components: {
    Modal
  },
  beforeMount() {
    if (this.$localStorage.get('lists')) {
      this.lists = JSON.parse(this.$localStorage.get('lists'))
    }
  },
  updated() {
    var that = this
    that.$nextTick(function() {
      that.$localStorage.set('lists', JSON.stringify(that.lists))
    })
  },
  data() {
    return {
      newItem: '',
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
      preparedItem: {},
      toName: '',
      msg: 'Welcome to Your Vue.js Todo App',
      message: 'You loaded this page on ' + new Date().toLocaleString(),
      showModal: false
    }
  },
  methods: {
    addTodo: function() {
      this.lists.todoItems.items.push(this.newItem)
      this.newItem = ''
    },
    prepareItem: function(name, title, text) {
      this.preparedItem = {
        name: name,
        text: text,
        title: title
      }
      this.showModal = true
    },
    moveItem() {
      let index = this.lists[this.preparedItem.name].items.indexOf(
        this.preparedItem.text
      )
      this.lists[this.preparedItem.name].items.splice(index, 1)
      this.lists[this.toName].items.push(this.preparedItem.text)
      this.close()
      this.toName = ''
    },
    close() {
      this.showModal = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 1;
  text-align: left;
}

li {
  transition: .3s;
  cursor: pointer;
  width: 100%;
  display: inline-block;
  margin: 0 10px;
  padding: 5px 10px;;
  border: 1px solid #cfcfcf;
  border-radius: 5px;
}

li:hover {
  transform: scale(1.05);
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

.modal-close-button {
  float: left;
}

.modal-default-button {
    float: right;
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

.modal-close-button {
  float: left;
}

.modal-default-button {
    float: right;
}
</style>
