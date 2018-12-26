import Vue from "vue";
import Vuex from "vuex";
import { router } from "../main";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gapi: {},
    alertify: {},
    labels: [],
    allMessages: [],
    messagesByLabel: {
      'SENT': [],
      'INBOX': [],
      'TRASH': [],
      'DRAFT': [],
      'SPAM': [],
      'UNREAD': [],
      'IMPORTANT': [],
      'STARRED': [],
    },
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
    SET_ALL_MESSAGES(state, payload) {
      state.allMessages = payload;
    },
    SET_MESSAGES_BY_LABEL(state, payload) {
      state.messagesByLabel[payload.label] = payload.messages;
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
              vueInstance.$alertify.success(
                `Successfully logged in as ${googleUser.w3.ig}`
              );
              context.commit("SET_SIGNED_IN", true);
              context.commit("SET_GAPI_INSTANCE", gapi);
              context.commit("SET_ALERTIFY_INSTANCE", vueInstance.$alertify);
              gapi.client.gmail.users.labels
                .list({
                  userId: "me"
                })
                .then(function(response) {
                  var labels = response.result.labels;
                  console.log(labels);
                  context.commit("SET_LABELS", labels);
                });
              vueInstance.$router.push({ path: "home" });
            });
        });
      }
    },
    signOut(context, vueInstance) {
      let alertify = context.getters.alertify;
      vueInstance.$logout();
      alertify.success('Successfully signed out');
      context.commit('SET_SIGNED_IN', false);
      router.push('/signin');
    },
    listAllMessages(context) {
      let gapi = context.getters.gapi;
      let request;
      let allMessages = [];
      request = gapi.client.gmail.users.messages.list({
        userId: "me",
        maxResults: 10
      });

      request.execute(function(response) {
        for (let message of response.messages) {
          var messageRequest = gapi.client.gmail.users.messages.get({
            userId: 'me',
            id: message.id
          });
          messageRequest.execute(function(resp) {
            allMessages.push(resp);
          });
        }
        context.commit('SET_ALL_MESSAGES', allMessages);
      });
    },
    listMessagesByLabel(context, label) {
      let gapi = context.getters.gapi;
      let request;
      let messages = [];
      let labels = [];
      labels.push(label);
      request = gapi.client.gmail.users.messages.list({
        userId: 'me',
        labelIds: labels,
        maxResults: 10
      });
      request.execute(function(response) {
        for(let message of response.messages) {
          var messageRequest = gapi.client.gmail.users.messages.get({
            userId: 'me',
            id: message.id
          });
          messageRequest.execute(function(resp){
            messages.push(resp);
          });
        }
        context.commit('SET_MESSAGES_BY_LABEL', { label: label, messages: messages });
      });
    },
    sendMessage(context, { headers, message }) {
      let gapi = context.getters.gapi;
      let alertify = context.getters.alertify;
      var email = "";
      for (var header in headers)
        email += header += ": " + headers[header] + "\r\n";
      email += "\r\n" + message;
      console.log(email);
      var sendRequest = gapi.client.gmail.users.messages.send({
        userId: "me",
        resource: {
          raw: window
            .btoa(email)
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
        }
      });
      sendRequest.execute(function(resp) {
        alertify.success("Successfully sent message");
        router.push({ name: "allMessages" });
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
    },
    inboxMessages: state => {
      return state.messagesByLabel['INBOX'];
    }
  }
});
