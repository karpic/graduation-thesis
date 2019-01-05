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
                <app-message-list-item v-for="message in inboxMessages" :message="message" :key="message.id"></app-message-list-item>
            </tbody>
     </table>
     </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import MessageListItem from './MessageListItem.vue';
    import mixin from '../mixins/mixin.js';
    export default {
        components: {
            appMessageListItem: MessageListItem
        },
        mixins: [mixin],
        computed: {
            ...mapGetters([
                'inboxMessages'
            ])
        },
        methods: {
            ...mapActions([
                'listMessagesByLabel'
            ])
        },
        created(){
            this.listMessagesByLabel('INBOX');
        }
    }
</script>

<style scoped>
    
</style>

