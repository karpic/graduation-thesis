<template>
	  <div>
		<div class="panel panel-default">
			<div class="panel-body message">
				<p class="text-center">New Message</p>
				<form class="form-horizontal" role="form">
					<div class="form-group">
				    	<label for="to" class="col-sm-1 control-label">To:</label>
				    	<div class="col-sm-11">
                              <input type="email" class="form-control select2-offscreen" id="to" placeholder="Type email" tabindex="-1" v-model="to">
				    	</div>
				  	</div>
					<div class="form-group">
				    	<label for="cc" class="col-sm-1 control-label">CC:</label>
				    	<div class="col-sm-11">
                              <input type="email" class="form-control select2-offscreen" id="cc" placeholder="Type email" tabindex="-1">
				    	</div>
				  	</div>
					<div class="form-group">
				    	<label for="bcc" class="col-sm-1 control-label">Subject:</label>
				    	<div class="col-sm-11">
                              <input type="email" class="form-control select2-offscreen" id="bcc" placeholder="Enter subject" tabindex="-1" v-model="subject">
				    	</div>
				  	</div>
				  
				</form>
				
				<div class="col-sm-11 col-sm-offset-1">
					
					
					<br>	
					
					<div class="form-group">
						<textarea class="form-control" id="message" name="body" rows="12" placeholder="Click here to reply" v-model="messageText"></textarea>
					</div>
					
					<div class="form-group">	
						<button type="submit" class="btn btn-success" @click="sendEmail">Send</button>
						<button type="submit" class="btn btn-default" @click="saveDraft">Draft</button>
						<button type="submit" class="btn btn-danger" @click="navigateDiscard">Discard</button>
					</div>
				</div>	
			</div>	
		</div>	
	</div>		
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        data() {
            return {
                to: '',
                subject: '',
                messageText: ''
            }
        },
        methods: {
            ...mapActions([
				'sendMessage',
				'saveAsDraft'
            ]),
            sendEmail() {
                let headers = {
                    'To': this.to,
                    'Subject': this.subject
                };
                this.sendMessage({
                    headers, 
                    message: this.messageText
                });
			},
			saveDraft() {
				let headers = {
                    'To': this.to,
                    'Subject': this.subject
				};
				this.saveAsDraft({
					headers,
					message: this.messageText
				});
			},
			navigateDiscard() {
				if(confirm('Are you sure you want to discard this message?')){
					this.$router.go(-1);
				}
			}
        }
    }
</script>

<style scoped>

</style>

