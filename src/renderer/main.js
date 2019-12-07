import Vue from 'vue'

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import { onError } from "apollo-link-error"
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { withClientState } from 'apollo-link-state'
import { enableExperimentalFragmentVariables } from 'graphql-tag'
import VueApollo from 'vue-apollo'
import VueAnalytics from 'vue-analytics'

const Storage = require('electron-store');
const storage = new Storage();

import App from './App'
import router from './router'
import store from './store'

import Default from "./layouts/Default.vue";
import NoSidebar from "./layouts/NoSidebar.vue";

Vue.component("default-layout", Default);
Vue.component("no-sidebar-layout", NoSidebar);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

import './assets/css/base.css'
import './assets/css/components.css'
import './assets/css/utilities.css'

Vue.use(VueAnalytics, {
  id: 'UA-62716182-7'
})

// proccess.env.VUE_APP_URI
const serverIP = storage.get('serverIp')
const uri = `http://${serverIP}:5500/graphql`
const httpLink = new HttpLink({
  uri,
})

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      getFolder: (_, args, { getCacheKey }) => {
        return getCacheKey({ __typename: 'Folder', id: args.id })
      },
      getTask: (_, args, { getCacheKey }) => {
        return getCacheKey({ __typename: 'Task', id: args.id })
      }
    },
  },
})

// persistCache({
//   cache,
//   storage: window.localStorage,
// })

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('user-token')
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : null
    }
  })
  console.log('yes,,, its auth')
  return forward(operation)
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const client = new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    authMiddleware,
    httpLink
  ]),
  cache,
  connectToDevTools: true,
})

const apolloProvider = new VueApollo({
  defaultClient: client,
  defaultOptions: {
    $loadingKey: 'loading'
  }
})

Vue.use(VueApollo)
/* eslint-disable no-new s */
new Vue({
  components: { App },
  router,
  provide: apolloProvider.provide(),
  store,
  template: '<App/>'
}).$mount('#app')
