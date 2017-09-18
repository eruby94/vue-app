<template>
  <div id="app">
      <div class="container">
          <div class="row">
              <img src="./assets/logo.png">
          </div>
          <div class="row">
              <div class="col-xs-6 col-xs-offset-3">
                  <router-link to="/" tag="h4" class="col-xs-6 nav">Main Board</router-link>
                  <router-link to="/archive" tag="h4" class="col-xs-6 nav">Archive</router-link>
              </div>
          </div>
      </div>
      <h1>Welcome to Your Vue.js Todo App</h1>
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.nav {
    cursor: pointer;
    color: #42b983;
}
.nav:hover {
    color: #329468;;
}
</style>
