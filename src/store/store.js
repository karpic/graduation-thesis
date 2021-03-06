import Vue from 'vue';
import Vuex from 'vuex';
import { router } from '../router';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gapi: {},
    alertify: {},
    labels: [],
    allMessages: [],
    searchedMessages: [],
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
    isSignedIn: false,
    username: '',
    emailAddress: ''
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
    },
    SET_SEARCHED_MESSAGES(state, payload) {
      state.searchedMessages = payload;
    }
    ,
    SET_USERNAME(state, payload) {
      state.username = payload;
    },
    SET_EMAIL(state, payload) {
      state.emailAddress = payload;
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
              context.commit('SET_USERNAME', googleUser.w3.ig);
              context.commit('SET_EMAIL', googleUser.w3.U3);
              localStorage.setItem('token', googleUser.Zi.access_token);
              vueInstance.$alertify.success(
                `Successfully logged in as ${googleUser.w3.ig}`
              );
              localStorage.setItem('user', JSON.stringify(googleUser));
              context.commit('SET_SIGNED_IN', true);
              context.commit('SET_GAPI_INSTANCE', gapi);
              context.commit('SET_ALERTIFY_INSTANCE', vueInstance.$alertify);
              gapi.client.gmail.users.labels
                .list({
                  userId: "me"
                })
                .then(function(response) {
                  var labels = [];
                  
                  for(let label of response.result.labels) {
                    gapi.client.gmail.users.labels.get({
                      userId: 'me',
                      id: label.id
                    }).then(function(labelResponse) {
                      labels.push(labelResponse.result);
                    })
                  }
                  context.commit("SET_LABELS", labels);
                });
              vueInstance.$router.push({ name: 'allMessages' });
            });
        });
      }
    },
    signOut(context, vueInstance) {
      let alertify = context.getters.alertify;
      vueInstance.$logout();
      alertify.success('Successfully signed out');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
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
        if(response.messages){
          for(let message of response.messages) {
            var messageRequest = gapi.client.gmail.users.messages.get({
              userId: 'me',
              id: message.id
            });
            messageRequest.execute(function(resp){
              messages.push(resp);
            });
          }
        }
        context.commit('SET_MESSAGES_BY_LABEL', { label: label, messages: messages });
      });
    },
    searchMessages(context, query) {
      let gapi = context.getters.gapi;
      let request;
      let searchResult = [];
      request = gapi.client.gmail.users.messages.list({
        userId: "me",
        maxResults: 10,
        q: query
      });
      request.execute(function(response) {
        for (let message of response.messages) {
          var messageRequest = gapi.client.gmail.users.messages.get({
            userId: 'me',
            id: message.id
          });
          messageRequest.execute(function(resp) {
            searchResult.push(resp);
          });
        }
        context.commit('SET_SEARCHED_MESSAGES', searchResult);
      });
    },
    sendMessage(context, { headers, message }) {
      let gapi = context.getters.gapi;
      let alertify = context.getters.alertify;
      var email = "";
      for (var header in headers)
        email += header += ": " + headers[header] + "\r\n";
      email += "\r\n" + message;
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
        alertify.success('Successfully sent message!');
        router.push({ name: 'allMessages' });
      });
    },
    sendMessageWithAttachments(context, { gapiHeaders, messageText, files }) {
       let body = createMimeMessage({
        headers: gapiHeaders,
        textHtml: messageText,
        textPlain: messageText, 
        attachments: files
      });
      let token = localStorage.getItem('token');
      let headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/related; boundary="foo_bar_baz"'
      };

      axios.post('https://www.googleapis.com/upload/gmail/v1/users/me/messages/send?uploadType=media', body, {headers: headers})
            .then(function(response){
              console.log(response);
            })
            .catch(function(error){
              console.log(error);
            }); 
    },
    saveAsDraft(context, { headers, message }) {
      let gapi = context.getters.gapi;
      let alertify = context.getters.alertify;
      var email = "";
      for (var header in headers)
        email += header += ": " + headers[header] + "\r\n";
      email += "\r\n" + message;
      var draftRequest = gapi.client.gmail.users.drafts.create({
        userId: "me",
        resource: {
          message: {
            raw: window
              .btoa(email)
              .replace(/\+/g, "-")
              .replace(/\//g, "_")
          }
        }
      });
      draftRequest.execute(function(resp) {
        alertify.success('Successfully created a draft message!');
        router.push({ name: 'allMessages' });
      })
    },
    deleteMessage(context, messageId) {
      console.log(messageId);
      let gapi = context.getters.gapi;
      let alertify = context.getters.alertify;
      let deleteRequest = gapi.client.gmail.users.messages.delete({
        userId: 'me',
        id: messageId
      });
      deleteRequest.execute(function(response) {
        alertify.success('Successfully deleted the message');
        router.go(-1);
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
    },
    starredMessages: state => {
      return state.messagesByLabel['STARRED'];
    },
    sentMessages: state => {
      return state.messagesByLabel['SENT'];
    },
    trashMessages: state => {
      return state.messagesByLabel['TRASH'];
    },
    draftMessages: state => {
      return state.messagesByLabel['DRAFT'];
    },
    spamMessages: state => {
      return state.messagesByLabel['SPAM'];
    },
    unreadMessages: state => {
      return state.messagesByLabel['UNREAD'];
    },
    importantMessages: state => {
      return state.messagesByLabel['IMPORTANT'];
    },
    searchedMessages: state => {
      return state.searchedMessages;
    },
    username: state => {
      return state.username;
    },
    emailAddress: state => {
      return state.emailAddress;
    }
  }
});
