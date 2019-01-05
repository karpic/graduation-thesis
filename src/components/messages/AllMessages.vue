<template>
     <div>
         <table class="table table-inbox table-hover">
            <thead>
                <tr>
                <th scope="col">Subject</th>
                <th scope="col">Snippet</th>
                <th scope="col">Date</th>
                </tr>
            </thead>
            <tbody>
                <app-message-list-item v-for="message in allMessages" :message="message" :key="message.id"></app-message-list-item>
            </tbody>
     </table>
     </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import mixin from '../mixins/mixin.js';
    import MessageListItem from './MessageListItem.vue';
    export default {
        components: {
            appMessageListItem: MessageListItem
        },
        mixins: [mixin],
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
