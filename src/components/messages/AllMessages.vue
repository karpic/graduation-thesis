<template>
     <div>
         <table class="table table-inbox table-hover">
                            <tbody>
                              <tr class="unread" v-for="message in allMessages">
                                  <td class="inbox-small-cells">
                                      <input type="checkbox" class="mail-checkbox">
                                  </td>
                                  <td class="inbox-small-cells"><i class="fa fa-star"></i></td>
                                  <td class="view-message  dont-show">Subject</td>
                                  <td class="view-message ">{{ message.snippet }}</td>
                                  <td class="view-message  inbox-small-cells"><i class="fa fa-paperclip"></i></td>
                                  <td class="view-message  text-right">{{ message.internalDate | date}}</td>
                              </tr>
                            </tbody>
     </table>
     <button class="btn btn-prymary" @click="logMessages">Log messages</button>
     </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    export default {
        computed: {
            ...mapGetters([
                'allMessages'
            ])
        },
        methods: {
            ...mapActions([
                'listAllMessages'
            ]),
            logMessages() {
                console.log(this.allMessages);
            },
            logMessageBodies() {
                for(let message in this.allMessages) {
                    console.log(message);
                }
            }
        },
        created() {
            this.listAllMessages();
        }
    }
</script>

