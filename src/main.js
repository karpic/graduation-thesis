import store from './store/store';
import VueAlertify from 'vue-alertify';
import { mapMutations } from 'vuex';
import { router } from './router';
import App from './App.vue'
import DateFilter from './filters/date';
import Vue from 'vue'
import VueGAPI from 'vue-gapi';

Vue.use(VueGAPI, apiConfig);
Vue.use(VueAlertify);

Vue.filter('date', DateFilter);

new Vue({
  router,
  el: '#app',
  render: h => h(App),
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
