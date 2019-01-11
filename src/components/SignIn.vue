<template>
  <div>
    <br><br><br><br>
    <div class="text-center">
        <div class="row">
            <div class="col-md-6">
                <img src="../assets/logo.png" style="border-radius: 2em;">
            </div>
            <div class="col-md-6">
                <h3><br>Welcome to Mailer. Gmail clone made with VueJS <br> as part of Graduation thesis.</h3>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-md-6">
                <h3><br>Author: Arsenije Karpic <br> Faculty of Technical Sciences, Novi Sad</h3>
                <ul class="social-icons">
                    <li><a href="https://github.com/karpic"><img src="../assets/Github.png" alt="Github logo"></a></li>
                    <li><a href="https://www.linkedin.com/in/arsenije-karpi%C4%87-a0905516a/"><img src="../assets/Linkedin.png" alt="Linkedin logo"></a></li>
                </ul>
            </div>
            <div class="col-md-6">
                <img src="../assets/author.jpg" alt="Author" style="width: 200px; height: 200px; border-radius: 7em;">
            </div>
        </div>
        <br><br>
        <hr>
        <div class="row">
            <div class="col-md-6">
                <h3>To continue using the app, login with Google.</h3>
            </div>
            <div class="col-md-6">
                <br>
                <button class="loginBtn loginBtn--google" @click="login">
                    Login with Google
                </button>
            </div>
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
    .social-icons {
        text-align: center;
    }  
    .social-icons li {
        display:inline-block;
        list-style-type:none;
        -webkit-user-select:none;
        -moz-user-select:none;
    }
    .social-icons li a {
        border-bottom: none;
    }
    .social-icons li img {
        width:70px;
        height:70px;
        margin-right: 20px;
    }
</style>
