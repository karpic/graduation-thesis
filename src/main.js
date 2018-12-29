import Vue from 'vue'
import VueRouter from 'vue-router';
import { routes } from './routes';
import store from './store/store';
import VueGAPI from 'vue-gapi';
import VueAlertify from 'vue-alertify';
import { mapMutations } from 'vuex';

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
Vue.use(VueAlertify);

Vue.filter('date', DateFilter);

export const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => { 
  let signedIn = store.getters.isSignedIn;
  if (to.matched.some(record => record.meta.requiresAuth)) { 
      if (!signedIn) { 
          next({ 
              path: '/signin', 
              query: { redirect: to.fullPath } 
          }) 
      } else { 
          next();
      } 
  } else { 
      next();
  } 
}) 

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  created() {
    let signedIn;
    this.$getGapiClient().then(gapi => {
      signedIn = gapi.auth2.getAuthInstance().isSignedIn.get(); 
      this.$store.commit('SET_ALERTIFY_INSTANCE', this.$alertify)
      if(signedIn == true) {
        console.log('Got into if');
        this.$store.commit('SET_SIGNED_IN', true);
        this.$getGapiClient().then(gapi=>{
          this.$store.commit('SET_GAPI_INSTANCE', gapi);
        });
      } else {
        this.$store.commit('SET_SIGNED_IN', false);
      }
    });
  }
})
