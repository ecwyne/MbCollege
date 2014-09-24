if (Meteor.settings.nexmo){
	Nexmo.initialize(Meteor.settings.nexmo.key, Meteor.settings.nexmo.secret, 'https', true);
} else {
	throw new Meteor.Error(404, 'Nexmo api-key and secret are required in settings.json file');
}

Meteor.methods({
	sendSMS: function(num, text, sentId){
		Nexmo.sendTextMessage(Meteor.settings.nexmo.phone, num, text, {},Meteor.bindEnvironment(function (err, data){
			if (err){
				console.log(err);
				throw new Meteor.Error(500, 'Nexmo Server Error Occured');
			} else {
				var obj = {
					type: 'outbound',
					date: new Date(),
					text: text,
					phone: data.messages[0].to,
					status: 'sent',
					messageId: data.messages[0]['message-id']
				}
				if (sentId){
					obj.sentId = sentId;
				}
				Messages.insert(obj);
			}
		}));
	}
})