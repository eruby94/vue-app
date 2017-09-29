<template>
  <div>
    <div class="header-bar">
      <div v-if="username">
        <div class="col-xs-2">
          <h4 class="nav-item">
            Hello {{username}}! <span class="highlighted">|</span> <span @click="logout()" class="nav-link">Logout</span>
          </h4>
        </div>
        <div class="col-xs-8">
          <router-link to="/" tag="h4" class="nav-item nav-link">Main Board</router-link>
        </div>
        <div class="col-xs-2">
          <router-link to="/archive" tag="h4" class="nav-item nav-link right">Archive</router-link>
        </div>
      </div>
      <div v-else>
        <div class="col-xs-12">
          <h4>Welcome!</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants/settings'
import { mapMutations } from 'vuex'
export default {
  name: 'nav-header',
  computed: {
    username() {
      return this.$store.state.user.firstName
    }
  },
  methods: {
    logout() {
      localStorage.removeItem(GC_USER_ID)
      localStorage.removeItem(GC_AUTH_TOKEN)
      this.setUserStore({})
      this.$router.push({ path: '/login' })
    },
    ...mapMutations(['setUserStore'])
  }
}
</script>

<style scoped>
.nav-item {
  color: #352E21;
}

.nav-link {
  cursor: pointer;
}

.nav-link:hover {
  color: #526a82;
}

.right {
  text-align: right;
}

.header-bar {
  position: fixed;
  top: 0;
  z-index: 1000;
  width: 100%;
  padding-top: .3em;
  border-bottom: 1px solid black;
  box-shadow: 0 1px 3px gray;
  background-color: #ededed;
}

h2 {
  margin-top: 2em;
}
</style>
