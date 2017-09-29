<template>
  <div>
    <div class="header-bar">
      <div class="col-xs-8">
        <login></login>
      </div>
      <div class="col-xs-3">
        <router-link to="/" tag="h4" class="col-xs-6 nav-item">Main Board</router-link>
      </div>
      <div class="col-xs-1">
        <router-link to="/archive" tag="h4" class="col-xs-6 nav-item right">Archive</router-link>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-8 col-xs-offset-2">
        <h2>Reduce the Noise. <span class="highlighted">Stay Productive.</span></h2>
      </div>
    </div>
  </div>
</template>

<script>
import Login from './Login.vue'
export default {
  name: 'nav-header',
  components: {
    Login
  }
}
</script>

<style scoped>
.nav-item {
  cursor: pointer;
  color: #352E21;
}

.nav-item:hover {
  color: #526a82;
}

.right {
  text-align: right;
}

.header-bar {
  position: fixed;
  z-index: 1000;
  width: 100%;
  padding-top: .3em;
  border-bottom: 1px solid black;
  box-shadow: 0 3px 2px -2px gray;
  background-color: #ededed;
}

h2 {
  margin-top: 2em;
}
</style>
