import Vue from "vue";
import Vuex from "vuex";
import { router } from '../main';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gapi: {},
    alertify: {},
    labels: [],
    allMessages: [], //currently loaded all messages
    isSignedIn: false
  },
  mutations: {
    SET_GAPI_INSTANCE(state, payload) {
      state.gapi = payload;
    },
    SET_ALERTIFY_INSTANCE(state, payload) {
      state.alertify = payload;
    },
    SET_LABELS(state, payload) {
      state.labels = payload;
    },
    SET_SIGNED_IN(state, payload) {
      state.isSignedIn = payload;
    },
    APPEND_MESSAGE(state, payload) {
      state.allMessages.push(payload);
    }
  },
  actions: {
    signIn(context, vueInstance) {
      if (vueInstance.$isAuthenticated !== true) {
        vueInstance.$getGapiClient().then(gapi => {
          gapi.auth2
            .getAuthInstance()
            .signIn()
            .then(googleUser => {
              vueInstance.$alertify.success(`Successfully logged in as ${googleUser.w3.ig}`);
              context.commit('SET_SIGNED_IN', true);
              context.commit('SET_GAPI_INSTANCE', gapi);
              context.commit('SET_ALERTIFY_INSTANCE', vueInstance.$alertify);
              gapi.client.gmail.users.labels
                .list({
                  userId: 'me'
                })
                .then(function(response) {
                  var labels = response.result.labels;
                  context.commit('SET_LABELS', labels);
                });
              vueInstance.$router.push({ path: 'home' });
            });
        });
      }
    },
    listAllMessages(context) {
      let gapi = context.getters.gapi;
      let request;
      request = gapi.client.gmail.users.messages.list({
        userId: 'me',
        maxResults: 10
      });

      request.execute(function(response) {
        for (let message of response.messages) {
          var messageRequest = gapi.client.gmail.users.messages.get({
            userId: 'me',
            id: message.id
          });
          messageRequest.execute(function(resp) {
            context.commit('APPEND_MESSAGE', resp);
          });
        }
      });
	},
	sendMessage(context, {headers, message}) {
    let gapi = context.getters.gapi;
    let alertify = context.getters.alertify;
		var email = '';
        for(var header in headers)
          email += header += ": "+headers[header]+"\r\n";
		email += "\r\n" + message;
		console.log(email);
		var sendRequest = gapi.client.gmail.users.messages.send({
      'userId': 'me',
      'resource': {
        'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
      }
    });
    sendRequest.execute(function(resp) {
      alertify.success('Successfully sent message');
      router.push({ name: 'allMessages' });
    });
	}
  },
  getters: {
    allLabels: state => {
      return state.labels;
    },
    isSignedIn: state => {
      return state.isSignedIn;
    },
    allMessages: state => {
      return state.allMessages;
    },
    gapi: state => {
      return state.gapi;
    },
    alertify: state => {
      return state.alertify;
    }
  }
});
