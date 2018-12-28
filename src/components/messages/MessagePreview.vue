<template>
    <div>
        <form class="form-horizontal">
            <div class="panel mail-wrapper rounded shadow">
                <div class="panel-heading">
                    <div class="pull-left">
                        <h3 class="panel-title">View Mail</h3>
                    </div>
                    <div class="clearfix"></div>
                </div><!-- /.panel-heading -->
                <div class="panel-sub-heading inner-all">
                    <div class="pull-left">
                        <h3 class="lead no-margin">{{ subject }}</h3>
                    </div>
                    <div class="pull-right">
                        <button class="btn btn-info btn-sm tooltips" data-container="body" data-original-title="Print" type="button" data-toggle="tooltip" data-placement="top" title=""><i class="fa fa-print"></i> </button>
                        <button class="btn btn-danger btn-sm tooltips" data-container="body" data-original-title="Trash" data-toggle="tooltip" data-placement="top" title=""><i class="fa fa-trash-o"></i></button>
                        <a href="#mail-compose.html" class="btn btn-success btn-sm"><i class="fa fa-reply"></i> Reply</a>
                    </div>
                    <div class="clearfix"></div>
                </div><!-- /.panel-sub-heading -->
                <div class="panel-sub-heading inner-all">
                    <div class="row">
                        <div class="col-md-8 col-sm-8 col-xs-7">
                            <span>{{from}}</span>
                            to
                            <strong>me</strong>
                        </div>
                        <div class="col-md-4 col-sm-4 col-xs-5">
                            <p class="pull-right"> {{ message.internalDate | date}}</p>
                        </div>
                    </div>
                </div><!-- /.panel-sub-heading -->
                <div class="panel-body">
                    <div class="view-mail">
                        <div v-html="decodedMessage"></div>
                    </div><!-- /.view-mail -->
                </div><!-- /.panel-body -->
                <div class="panel-footer">
                    <div class="pull-right">
                        <a href="#mail-compose.html" class="btn btn-success btn-sm" @click="toggleReplyClicked"><i class="fa fa-reply"></i> Reply</a>
                        <button type="submit" class="btn btn-primary btn-sm"><i class="fa fa-arrow-right"></i> Forward</button>
                        <button class="btn btn-info btn-sm tooltips" data-container="body" data-original-title="Print" type="button" data-toggle="tooltip" data-placement="top" title=""><i class="fa fa-print"></i> </button>
                        <button class="btn btn-danger btn-sm tooltips" data-container="body" data-original-title="Trash" data-toggle="tooltip" data-placement="top" title=""><i class="fa fa-trash-o"></i></button>
                    </div>
                    <div class="clearfix"></div>
                </div><!-- /.panel-footer -->
            </div><!-- /.panel -->
        </form>
        <div v-if="replyClicked">
            <textarea name="replyContent" id="replyContent" cols="120" rows="10" placeholder="Type your reply here" v-model="replyMessage"></textarea>
            <button class="btn btn-success" @click="sendReply">Send</button>
        </div>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import mixin from '../mixins/mixin.js';
    export default {
        mixins: [mixin],
        data() {
            return {
                messageId: this.$route.params.id,
                message: {},
                decodedMessage: '',
                replyClicked: false,
                replyMessage: '',
                subject: '',
                from: ''
            }
        },
        methods: {
            ...mapActions([
                'sendMessage'
            ]),
            decodeMessage(messageToDecode) {
                
                function getBody(message) {
                    var encodedBody = '';
                    if(typeof message.parts === 'undefined')
                    {
                        encodedBody = message.body.data;
                    }
                    else
                    {
                        encodedBody = getHTMLPart(message.parts);
                    }
                    encodedBody = encodedBody.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '');
                    return decodeURIComponent(escape(window.atob(encodedBody)));
                }
                function getHTMLPart(arr) {
                    for(var x = 0; x <= arr.length; x++)
                    {
                        if(typeof arr[x].parts === 'undefined')
                        {
                            if(arr[x].mimeType === 'text/html')
                            {
                            return arr[x].body.data;
                            }
                        }
                        else
                        {
                            return getHTMLPart(arr[x].parts);
                        }
                    }
                    return '';
                }
                this.decodedMessage = getBody(messageToDecode.payload);
                
            },
            toggleReplyClicked() {
                this.replyClicked = !this.replyClicked;
            },
            sendReply() {
                let headers = {
                    'To': this.getHeader(this.message.payload.headers, 'Return-Path'),
                    'In-Reply-To': this.message.id
                }
                console.log(headers);
                this.sendMessage({
                    headers,
                    message: this.replyMessage
                });
            }
        },
        created() {
            let that = this;
            let messageId = this.$route.params.id;
            let message = {};
            this.$getGapiClient().then(gapi=>{
                var messageRequest = gapi.client.gmail.users.messages.get({
                    userId: 'me',
                    id: messageId
                });
                messageRequest.execute(function(resp){
                    message = resp;   
                    console.log(message);       
                    that.decodeMessage(message);
                    that.message = message;
                    that.subject = that.getHeader(message.payload.headers, 'Subject');
                    that.from = that.getHeader(message.payload.headers, 'From');
                });
            });
        }
    }
</script>

