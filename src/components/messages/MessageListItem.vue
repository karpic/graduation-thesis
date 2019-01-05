<template>
  <div>
    <tr class="unread" v-for="message in inboxMessages" @click="openMessage(message.id)">
      <td class="inbox-small-cells">
        <input type="checkbox" class="mail-checkbox">
      </td>
      <td class="inbox-small-cells">
        <i class="fa fa-star"></i>
      </td>
      <td class="view-message dont-show">{{ getHeader(message.payload.headers, 'Subject') }}</td>
      <td class="view-message">{{ message.snippet }}</td>
      <td class="view-message inbox-small-cells">
        <i class="fa fa-paperclip"></i>
      </td>
      <td class="view-message text-right">{{ message.internalDate | date}}</td>
    </tr>
  </div>
</template>

<script>
    import mixin from '../mixins/mixin.js';
    export default {
        mixins: [mixin],
        props: [message]   
    }
</script>

