import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    labels: [],
    allMessages: [], //currently loaded all messages
    isSignedIn: false
  },
  mutations: {
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
              console.log("Successfully logged in");
              console.log(googleUser);
              context.commit("SET_SIGNED_IN", true);
              gapi.client.gmail.users.labels
                .list({
                  userId: "me"
                })
                .then(function(response) {
                  var labels = response.result.labels;
                  context.commit("SET_LABELS", labels);
                });
              vueInstance.$router.push({ path: "home" });
            });
        });
      }
    },
    listAllMessages(context, vueInstance) {
      var request;
      vueInstance.$getGapiClient().then(gapi => {
        request = gapi.client.gmail.users.messages.list({
          userId: "me",
          maxResults: 10
        });

        request.execute(function(response) {
          for (let message of response.messages) {
            var messageRequest = gapi.client.gmail.users.messages.get({
              userId: "me",
              id: message.id
            });
            messageRequest.execute(function(resp) {
              context.commit("APPEND_MESSAGE", resp);
            });
          }
        });
      });
	},
	sendMessage(context, {headers, message, vueInstance}) {
		var email = '';
        for(var header in headers)
          email += header += ": "+headers[header]+"\r\n";
		email += "\r\n" + message;
		console.log(email);
		vueInstance.$getGapiClient().then(gapi=>{
			var sendRequest = gapi.client.gmail.users.messages.send({
				'userId': 'me',
				'resource': {
					'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
				}
			});
			sendRequest.execute(function(resp) {
				console.log(resp);
			});
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
	}
  }
});
