Router.map(function(){
	this.route('apiInbox', {
		path: '/api/inbox',
		where: 'server',
		action: function(){
			this.response.writeHead(200, {'Content-Type': 'text/html'});
			this.response.end('message has been received');
			Meteor.inbox.handleMessage(this.params.query)
			

		}
	});
});

Meteor.inbox = {
	handleMessage: function(msg){
		var obj = {
				type: 'inbound',
				date: new Date(),
				text: decodeURIComponent(msg.text).replace(/\+/g, ' '),
				messageId: msg.messageId,
				status: 'delivered',
				phone: msg.msisdn
			}
			Messages.insert(obj);

			if (msg.text.toLowerCase() == 'stop')
				Contacts.update({phone: msg.msisdn}, {$set: {active: false}});
			if (msg.text.toLowerCase() == 'start')
				Contacts.update({phone: msg.msisdn}, {$set: {active: true}});
	}
}

/*
type	Expected values are: text, unicode (URL encoded, valid for standard GSM, Arabic, Chinese ... characters) or binary
to	Recipient number (your long virtual number).
msisdn	Optional. Sender ID
network-code	Optional. Unique identifier of a mobile network MCCMNC. Wikipedia list here.
messageId	Nexmo Message ID.
message-timestamp	Time (UTC) when Nexmo started to push the message to your callback URL in the following format YYYY-MM-DD HH:MM:SS e.g. 2012-04-05 09:22:57
text	Content of the message
*/