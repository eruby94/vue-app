<template>
  <div class="login">
    <modal name="login">
      <div class="modal-header">
          <h3>Login</h3>
      </div>
      <div class='modal-body'>
        <form v-on:submit.prevent="login">
          <div class='form-group'>
              <label for='username'>Username:</label>
              <input class='form-control' name='username' v-model='username' type="text" v-focus/>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn btn-md btn-primary modal-close-button" v-on:click="$modal.hide('login')">
          Cancel
        </button>
        <button class="btn btn-md btn-success" v-on:click="login" :disabled="!username">Login</button>
      </div>
    </modal>
    <h4 v-if="user.name">
      Hello, {{user.name}}!
      <span class="highlighted">|</span>
      <span @click="logout" class="pointer">Logout</span>
    </h4>
    <h4 v-else @click="$modal.show('login')" class="pointer">Login</h4>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: '',
      user: {
        name: ''
      }
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        // Focus the element
        el.focus()
      }
    }
  },
  methods: {
    login() {
      this.user = {
        name: this.username
      }
      this.username = ''
      this.$modal.hide('login')
    },
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
