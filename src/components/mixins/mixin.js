var mixin = {
    methods: {
        getHeader(headers, index){
            var header = '';
            for(let i = 0; i < headers.length; i++){
                if(headers[i].name.toLowerCase() === index.toLowerCase()){
                    header = headers[i].value;
                }
            }
            return header;
        },
        getUnreadCountForLabel(labels, labelName) {
            let unreadMessageCount;
            for(let i = 0; i < labels.length; i++){
                if(labels[i].name.toLowerCase() === labelName.toLowerCase()){
                    unreadMessageCount = labels[i].messagesUnread;
                }
            }
            return unreadMessageCount;
        }
    }
};
export default mixin;