import Vue from 'vue'
import VueRouter from 'vue-router';
import { routes } from './routes';
import store from './store/store';
import VueGAPI from 'vue-gapi';

import App from './App.vue'
import DateFilter from './filters/date';

const apiConfig = {
  apiKey: 'AIzaSyD-dOyUXQS_9bNDYCCdKiWNwE6YhffsBpg',
  clientId: '239411929608-0okoo5064eo3ul5aucc5qqslksaqhn3t.apps.googleusercontent.com',
  discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"],
  scope: "https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send"
};

Vue.use(VueRouter);
Vue.use(VueGAPI, apiConfig);

Vue.filter('date', DateFilter);

const router = new VueRouter({
  mode: 'history',
  routes
});

/* router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.loggedIn()) {
      next({
        path: '/signin',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
}); */

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
