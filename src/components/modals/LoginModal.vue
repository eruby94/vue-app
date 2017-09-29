<template>
  <modal :height="350" name="login">
    <div class="modal-header">
        <h3>Login</h3>
    </div>
    <div class='modal-body'>
      <form v-on:submit.prevent="login">
        <div class='form-group'>
            <label for='username'>Username:</label>
            <input class='form-control' name='username' v-model='username' type="text" v-focus/>
        </div>
        <div class='form-group'>
            <label for='password'>Password:</label>
            <input class='form-control' name='password' v-model='password' type="password"/>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button class="btn btn-md btn-primary modal-close-button" v-on:click.prevent="hide">
        Cancel
      </button>
      <button class="btn btn-md btn-success" v-on:click="login" :disabled="!username">Login</button>
    </div>
  </modal>
</template>

<script>
export default {
  name: 'login-modal',
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
    login() {
      this.user = {
        name: this.username
      }
      this.username = ''
      this.hide()
    },
    hide() {
      this.$modal.hide('login')
    }
  },
  directives: {
    focus: {
      inserted: function(el) {
        // Focus the element
        el.focus()
      }
    }
  }
}
</script>
