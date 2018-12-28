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
        }
    }
};
export default mixin;