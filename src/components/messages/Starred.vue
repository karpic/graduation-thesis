<template>
    <div>
         <table class="table table-inbox table-hover">
                            <tbody>
                              <div v-if="starredMessages">
                                  <tr class="unread" v-for="message in starredMessages" @click="openMessage(message.id)">
                                  <td class="inbox-small-cells">
                                      <input type="checkbox" class="mail-checkbox">
                                  </td>
                                  <td class="inbox-small-cells"><i class="fa fa-star"></i></td>
                                  <td class="view-message  dont-show">Subject</td>
                                  <td class="view-message ">{{ message.snippet }}</td>
                                  <td class="view-message  inbox-small-cells"><i class="fa fa-paperclip"></i></td>
                                  <td class="view-message  text-right">{{ message.internalDate | date}}</td>
                              </tr>
                              </div>
                            </tbody>
        </table>
     </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    export default {
        computed: {
            ...mapGetters([
                'starredMessages'
            ])
        },
        methods: {
            ...mapActions([
                'listMessagesByLabel'
            ]),
            openMessage(messageId) {
                this.$router.push({ name: 'messagePreview', params: { id: messageId }});
            }
        },
        created(){
            this.listMessagesByLabel('STARRED');
        }
    }
</script>
