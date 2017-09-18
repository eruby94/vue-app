<template>
  <div id="app">
      <div class="container">
          <div class="row">
              <img src="./assets/logo.png">
          </div>
          <div class="row">
              <h1>Reduce Noise. <span class="highlighted">Maximize Productivity.</span></h1>
              <div class="col-xs-6 col-xs-offset-3">
                  <router-link to="/" tag="h4" class="col-xs-6 nav">Main Board</router-link>
                  <router-link to="/archive" tag="h4" class="col-xs-6 nav">Archive</router-link>
              </div>
          </div>
      </div>
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
  margin-top: 30px;
  margin-bottom: 15px;
}
.highlighted {
  color: #42b983;
}
.nav {
    cursor: pointer;
    color: #526a82;
}
.nav:hover {
    color: #2c3e50;
}
</style>
