<template>
    <tr  @click="openMessage(message.id)">
      <td>{{ getHeader(message.payload.headers, 'Subject') }}</td>
      <td>{{ message.snippet }}</td>
      <td>{{ message.internalDate | date}}</td>
    </tr>
</template>

<script>
    import mixin from '../mixins/mixin.js';
    export default {
        mixins: [mixin],
        props: ['message'],
        methods: {
            openMessage(messageId) {
                this.$router.push({ name: 'messagePreview', params: { id: messageId }});
            }
        }   
    }
</script>

