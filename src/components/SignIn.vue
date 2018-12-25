<template>
  <div>
    <br><br><br><br>
    <div class="text-center">
        <div class="row">
            <img src="../assets/signinImage.jpg" width="500" height="300" style="border-radius: 2em;">
        </div>
        <br><br>
        <div class="row">
            <h2>Welcome to Mailer</h2>
            <h3>A Gmail clone made with VueJS</h3>
        </div>
        <div class="row">
            <button class="loginBtn loginBtn--google" @click="login">
                Login with Google
            </button>
        </div>
    </div>
  </div>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
    methods: {
        ...mapActions([
            'signIn'
        ]),
        login() {
            this.signIn(this);
        }
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
</style>
