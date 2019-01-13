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
        },
        b64toBlob(b64Data, contentType, sliceSize) {
            contentType = contentType || ''
            sliceSize = sliceSize || 512

            var byteCharacters = atob(b64Data)
            var byteArrays = []

            for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                var slice = byteCharacters.slice(offset, offset + sliceSize)

                var byteNumbers = new Array(slice.length)
                for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i)
                }

                var byteArray = new Uint8Array(byteNumbers)

                byteArrays.push(byteArray)
            }

            var blob = new Blob(byteArrays, {type: contentType})
            let urlBlob = URL.createObjectURL(blob)
            return urlBlob
        }
    }
};
export default mixin;