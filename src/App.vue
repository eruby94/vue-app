<template>
  <div id="app">
      <nav-header></nav-header>
      <div class="app-container">
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import NavHeader from './components/NavHeader.vue'
export default {
  name: 'app',
  components: {
    NavHeader
  },
  beforeMount() {
    let lists = JSON.parse(this.$localStorage.get('lists'))
    if (lists) {
      this.setListStore(lists)
    }
    let archive = JSON.parse(this.$localStorage.get('archive'))
    if (archive) {
      this.setArchiveStore(archive)
    }
  },
  methods: {
    ...mapMutations(['setListStore', 'setArchiveStore'])
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #352E21;
  margin-bottom: 15px;
}

.app-container {
  position: relative;
  z-index: 0;
}

.logo {
  width: 100%;
  height: auto;
}

.highlighted {
  color: #E07454;
}

.nav {
  cursor: pointer;
  color: #352E21;
}

.nav:hover {
  color: #526a82;
}

h1 {
  font-weight: normal;
}

.item, .add-item {
  text-align: left;
  transition: .2s;
  cursor: pointer;
  margin: 5px 0;
  padding: 5px 20px;
  background-color: #ffffff;
  border: 1px solid #cfcfcf;
  border-radius: 5px;
}

.add-item > input {
  border: transparent;
  outline: none;
  margin-left: -15px;
}

.item:active {
  border-color: black;
}

.todo {
  margin-top: 1em;
}

.list {
    border: 1px solid #E07454;
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
  color: #E07454;
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

.drag-area {
  min-height: 60px;
}

.pointer {
  cursor: pointer;
}
</style>
