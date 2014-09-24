Router.map(function(){
	this.route('apiStatus', {
		path: '/api/status',
		where: 'server',
		action: function(){
			this.response.writeHead(200, {'Content-Type': 'text/html'});
			this.response.end('status has been received');
			Messages.update({messageId: this.params.messageId}, {$set: {status: this.params.status}});
		}
	});
});

/*
to	Sender Id of the message.
network-code	Optional identifier of a mobile network MCCMNC. Wikipedia list here.
messageId	Message ID.
msisdn	Number message was delivered to.
status	Status of message.
err-code	Status related error code.
price	Message price.
scts	UTC time when notification is received from mobile network in the following format YYMMDDHHMM e.g. 1101181426 is 2011 Jan 18th 14:26
message-timestamp	When Nexmo started to push the receipt to your callback URL in the following format YYYY-MM-DD HH:MM:SS e.g. 2012-04-05 09:22:57
client-ref	If you set a custom reference during your send request, this will return that value.
*/