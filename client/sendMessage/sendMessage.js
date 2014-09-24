_.templateSettings = {
	interpolate: /\{\{(.+?)\}\}/g
};

var templateDep = new Tracker.Dependency;
var sentDep = new Tracker.Dependency;

Template.sendMessage.events({
	'keyup #messageText': function(e){
		templateDep.changed();
		Template.sendMessage.template = _.template(e.target.value);
	},
	'click .sendMessageBtn': function(){
		Template.sendMessage.sentId = Date.now();
		var contacts = Contacts.find({active: true}).fetch();
		_.each(contacts, function (e){
			sentDep.changed();
			Meteor.call('sendSMS', e.phone, Template.sendMessage.template(e), Template.sendMessage.sentId);
		});
	}
});

Template.sendMessage.preview = function(){
	templateDep.depend()
	return Template.sendMessage.template(Contacts.findOne({active: true}));
}

Template.sendMessage.activeCount = function(){
	return Contacts.find({active:true}).count();
}

Template.sendMessage.sentMessages = function(){
	sentDep.depend();
	if (!Template.sendMessage.sentId)
		return;
	return Messages.find({sentId: Template.sendMessage.sentId});
}