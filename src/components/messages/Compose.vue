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
					<div>
						<div class="form-group">
							<label for="files">Attachments: </label>
							<input type="file" name="files" id="files" class="form-control" multiple>
						</div>
					</div>
					<hr>
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
				messageText: '',
				sendMessagesWithAttachments: false,
				attachmentFiles: []
            }
        },
        methods: {
            ...mapActions([
				'sendMessage',
				'saveAsDraft',
				'sendMessageWithAttachments'
            ]),
            sendEmail() {
				var headers = {
                    'To': this.to,
                    'Subject': this.subject
					};
                if(!this.sendMessagesWithAttachments){
					this.sendMessage({
						headers, 
						message: this.messageText
					});
				}else {
					this.sendMessageWithAttachments({
						gapiHaders: headers,
						messageText: this.messageText,
						files: this.attachmentFiles}
					);
				}
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
			},
			handleFileSelection(event) {
				let filesTidy = [];
				function getBase64(file) {
					return new Promise((resolve, reject) => {
						const reader = new FileReader();
						reader.readAsBinaryString(file);
						reader.onload = () => resolve(reader.result);
						reader.onerror = error => reject(error);
					});
				};
				this.sendMessagesWithAttachments = true;
				let files = event.target.files;
				for (let i = 0, f; f = files[i]; i++){
					getBase64(files[0]).then(function(data) {
						addToFilesArray(files[0].type, files[0].name, data);
					})
				};
				function addToFilesArray(type, name, data) {
					filesTidy.push({
						type,
						name,
						data: window.btoa(data)
					});
				}
				this.attachmentFiles = filesTidy;
			}
		},
		mounted() {
			let inputFilesTag = document.getElementById('files');
			inputFilesTag.addEventListener('change', this.handleFileSelection, false);
		}
    }
</script>

<style scoped>

</style>

