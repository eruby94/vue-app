<template>
  <div class="todo">
    <h1 v-bind:title="message">{{ msg }}</h1>
    <div class="row">
        <form v-on:submit.prevent @submit="addTodo($data)">
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
            <h3>{{list.title}}</h3>
            <ul v-for="item in list.items">
                <li>
                    {{item}}
                </li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'todo',
  data() {
    return {
      newItem: '',
      lists: {
        todoItems: {
          title: 'Things To Do:',
          items: []
        },
        inProgress: {
          title: 'In-Progress:',
          items: []
        },
        completedItems: {
          title: 'Completed:',
          items: []
        }
      },
      msg: 'Welcome to Your Vue.js Todo App',
      message: 'You loaded this page on ' + new Date().toLocaleString()
    }
  },
  methods: {
    addTodo: data => {
      data.lists.todoItems.items.push(data.newItem)
      data.newItem = ''
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
  display: inline-block;
  margin: 0 10px;
}
</style>
