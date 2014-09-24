Meteor.publish('contacts', function(){
	return Contacts.find();
});
Meteor.publish('messages', function(){
	return Messages.find();
});