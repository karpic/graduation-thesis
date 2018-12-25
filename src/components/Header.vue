<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" href="#">Mailer</a>
      </div>
      <ul class="nav navbar-nav">
        <router-link tag="li" to="/home" v-if="isSignedIn">
          <a>Mail</a>
        </router-link>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <router-link tag="li" to="/signin" v-if="!isSignedIn">
          <a>Sign In</a>
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions(["signIn", "signOut"]),
    listLabels() {
      console.log(this.allLabels);
    }
  },
  computed: {
    ...mapGetters(["allLabels", "isSignedIn"])
  }
};
</script>

