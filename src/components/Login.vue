<template>
  <div class="login">
    <login-modal></login-modal>
    <h4 v-if="user.name">
      Hello, {{user.name}}!
      <span class="highlighted">|</span>
      <span @click="logout" class="pointer">Logout</span>
    </h4>
    <h4 v-else @click="$modal.show('login')" class="pointer">Login</h4>
  </div>
</template>

<script>
import LoginModal from './modals/LoginModal.vue'
export default {
  name: 'login',
  components: {
    LoginModal
  },
  computed: {
    user: {
      get() {
        return this.$store.state.user
      },
      set(updatedUser) {
        this.$store.commit('setUser', updatedUser)
      }
    }
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    logout() {
      this.user.name = ''
    }
  }
}
</script>

<style scoped>
.login {
  text-align: left;
}
</style>
