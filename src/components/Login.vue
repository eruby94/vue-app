<template>
  <div>
    <h3 class='highlighted'>{{hasLogin ? 'Login' : 'Sign Up'}}</h3>
    <div class="row">
      <div class='col-xs-6 col-xs-offset-3'>
        <div class="row">
          <div class="col-xs-6">
            <div class='form-group' v-show="!hasLogin">
                <label for='firstName'>First Name:</label>
                <input class='form-control' name='firstName' v-model='firstName' type="text" v-focus/>
            </div>
          </div>
          <div class="col-xs-6">
            <div class='form-group' v-show="!hasLogin">
                <label for='lasName'>Last Name:</label>
                <input class='form-control' name='lastName' v-model='lastName' type="text"/>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input class="form-control" type="text" v-model="email"/>
        </div>
        <div class="form-group" v-show="!hasLogin">
          <label for="role">Role:</label>
          <select class="form-control" v-model="role">
            <option selected disabled value=''>Select a role</option>
            <option v-for="role in roles" :value="role.title.replace(/\s/g, '')">{{role.title}}</option>
          </select>
        </div>
        <div class='form-group'>
            <label for='password'>Password:</label>
            <input class='form-control' name='password' v-model='password' type="password"/>
        </div>
        <div class="col-xs-6">
          <button class='btn btn-default' @click.prevent="hasLogin = !hasLogin">
            {{hasLogin ? 'Need to create an account?' : 'Already have an account?'}}
          </button>
        </div>
        <div class="col-xs-6">
          <button class='btn btn-default' @click.prevent="confirm()">
            {{hasLogin ? 'Login' : 'Create Account'}}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GC_USER_ID, GC_AUTH_TOKEN, USER_ROLES } from '../constants/settings'
import { mapMutations } from 'vuex'

import {
  SIGNIN_USER_MUTATION,
  CREATE_USER_MUTATION
} from '../graphql/mutations/userMutations'

import LoginModal from './modals/LoginModal.vue'

export default {
  name: 'login',
  components: {
    LoginModal
  },
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      roles: USER_ROLES,
      role: '',
      password: '',
      hasLogin: false
    }
  },
  methods: {
    confirm() {
      const { firstName, lastName, email, password, role } = this.$data
      if (this.hasLogin) {
        this.$apollo
          .mutate({
            mutation: SIGNIN_USER_MUTATION,
            variables: {
              email,
              password
            }
          })
          .then(result => {
            const token = result.data.signinUser.token
            this.saveUserData(result.data.signinUser.user, token)
          })
          .catch(error => {
            alert(error)
          })
      } else {
        this.$apollo
          .mutate({
            mutation: CREATE_USER_MUTATION,
            variables: {
              firstName,
              lastName,
              role,
              email,
              password
            }
          })
          .then(result => {
            const token = result.data.signinUser.token
            this.saveUserData(result.data.signinUser.user, token)
          })
          .catch(error => {
            alert(error)
          })
      }
      this.$router.push({ path: '/' })
    },
    saveUserData(user, token) {
      localStorage.setItem(GC_USER_ID, user.id)
      localStorage.setItem(GC_AUTH_TOKEN, token)
      this.setUserStore(user)
    },
    ...mapMutations(['setUserStore'])
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

<style scoped>
label {
  float: left;
}
</style>
