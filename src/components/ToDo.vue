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
    <Modal v-if="showModal" :preparedItem="preparedItem" :lists.sync="lists" :show-modal.sync="showModal"></Modal>
  </div>
</template>

<script>
import Modal from './Modal'
export default {
  name: 'todo',
  components: {
    Modal
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
</style>
