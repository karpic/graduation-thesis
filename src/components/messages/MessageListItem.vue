<template>
    <tr  @click="openMessage(message.id)" :class="{ boldedClass: isUnread }">
      <td>{{ getHeader(message.payload.headers, 'Subject') }}</td>
      <td>{{ message.snippet }}</td>
      <td>{{ message.internalDate | date}}</td> 
    </tr>
</template>

<script>
    import mixin from '../mixins/mixin.js';
    export default {
        data() {
            return {
                isUnread: false
            }
        },
        mixins: [mixin],
        props: ['message'],
        methods: {
            openMessage(messageId) {
                this.$router.push({ name: 'messagePreview', params: { id: messageId }});
            }
        },
        created(){
            for(let i = 0; i < this.message.labelIds.length; i++) {
                if(this.message.labelIds[i] === 'UNREAD') {
                    this.isUnread = true;
                }
            }
        }   
    }
</script>

<style scoped>
    .boldedClass {
        font-weight: bold;
    }
</style>


