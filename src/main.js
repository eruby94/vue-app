// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueApollo from 'vue-apollo'
import { ApolloClient, createBatchingNetworkInterface } from 'apollo-client'
import VueLocalStorage from 'vue-localstorage'
import VModal from 'vue-js-modal'

Vue.config.productionTip = false
Vue.use(VueLocalStorage)
Vue.use(VModal)

const networkInterface = createBatchingNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj85z9wpe00p40124qil35fsd'
})

const apolloClient = new ApolloClient({
  networkInterface,
  connectToDevTools: true
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  apolloProvider,
  router,
  store,
  template: '<App/>',
  components: { App }
})
