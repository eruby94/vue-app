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
    <p v-if="user.name">
      Hello, {{user.name}}!
      <span class="highlighted font-large">|</span>
      <span @click="logout" class="pointer">Logout</span>
    </p>
    <p v-else @click="$modal.show('login')" class="pointer">
      Login
    </p>
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

<style>
.login {
  text-align: right;
}

.font-large {
  font-size: 1.5em;
  font-weight: 300;
}
</style>
