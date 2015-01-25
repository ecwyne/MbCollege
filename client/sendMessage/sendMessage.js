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
		var obj = {};
		obj[Router.current().state.get('activeGroup')] = true;
		var contacts = Contacts.find(obj).fetch();
		var timeout = 0;
		_.each(contacts, function (e){
			Meteor.setTimeout(function(){
				sentDep.changed();
				Meteor.call('sendSMS', e.phone, Template.sendMessage.template(e), Template.sendMessage.sentId);
			}, 1250 * timeout++);
		});
	},
	'change #activeGroupSelect': function(e){
		Router.current().state.set('activeGroup', e.currentTarget.value);
	}
});

Template.sendMessage.preview = function(){
	templateDep.depend()
	var obj = {};
	obj[Router.current().state.get('activeGroup')] = true;
	return Template.sendMessage.template(Contacts.findOne(obj));
}

Template.sendMessage.activeCount = function(){
	var obj = {};
		obj[Router.current().state.get('activeGroup')] = true;
	return Contacts.find(obj).count();
}

Template.sendMessage.sentMessages = function(){
	sentDep.depend();
	if (!Template.sendMessage.sentId)
		return;
	return Messages.find({sentId: Template.sendMessage.sentId});
}

Template.sendMessage.rendered = function(){
	Router.current().state.set('activeGroup', 'weekly');
}