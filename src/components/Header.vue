<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <router-link to="/"><a class="navbar-brand">Mailer</a></router-link>
      </div>
      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <router-link tag="li" to="/home" v-if="isSignedIn">
            <a>Mail</a>
          </router-link>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <form class="navbar-form navbar-left" v-if="isSignedIn" id="search">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Search" v-model="query">
            </div>
            <button class="btn btn-default" @click.prevent="handleSearch">Submit</button>
          </form>
          <li v-if="!isSignedIn">
            <button class="loginBtn loginBtn--google" @click="login">Login with Google</button>
          </li>
          <li v-if="isSignedIn">
            <a>{{ username }} ( {{ emailAddress }} )</a>
          </li>
          <li v-if="isSignedIn">
            <a @click="logout">Log out</a>
          </li>
      </ul>
    </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      user: {},
      signedIn: false,
      query: ''
    }
  },
  created() {
    
  },
  methods: {
    ...mapActions(['signIn', 'signOut', 'searchMessages']),
    listLabels() {
      console.log(this.allLabels);
    },
    logout() {
      this.signOut(this);
    },
    login() {
      this.signIn(this);
    },
    handleSearch() {
      this.searchMessages(this.query);
      this.$router.push({ name: 'searchedMessages'});
    }
  },
  computed: {
    ...mapGetters(['allLabels', 
                  'isSignedIn', 
                  'username',
                  'emailAddress']),
  }
};
</script>

<style scoped>
  body {
        padding: 2em;
    }

    /* Shared */
    .loginBtn {
        box-sizing: border-box;
        position: relative;
        /* width: 13em;  - apply for fixed size */
        margin: 0.2em;
        padding: 0 15px 0 46px;
        border: none;
        text-align: left;
        line-height: 34px;
        white-space: nowrap;
        border-radius: 0.2em;
        font-size: 16px;
        color: #fff;
    }
    .loginBtn:before {
        content: "";
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        width: 34px;
        height: 100%;
    }
    .loginBtn:focus {
        outline: none;
    }
    .loginBtn:active {
        box-shadow: inset 0 0 0 32px rgba(0, 0, 0, 0.1);
    }

    /* Google */
    .loginBtn--google {
    /*font-family: "Roboto", Roboto, arial, sans-serif;*/
        background: #dd4b39;
    }
    .loginBtn--google:before {
        border-right: #bb3f30 1px solid;
        background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png")
            6px 6px no-repeat;
    }
    .loginBtn--google:hover,
    .loginBtn--google:focus {
        background: #e74b37;
    }
    #search{
      text-align: center;
    }
    #search input[type=text] {
      width: 400px !important;
    }
</style>
