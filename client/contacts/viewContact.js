Template.viewContact.messages = function(){
	return Messages.find({phone: this.phone}, {sort: {date: -1}});
}

Template.viewContact.typeSpan = function(type){
	return type == 'inbound' ? false : true;
}

_.templateSettings = {
	interpolate: /\{\{(.+?)\}\}/g
};

var templateDep = new Tracker.Dependency;
var sentDep = new Tracker.Dependency;

Template.viewContact.events({
	'keyup #messageText': function(e){
		templateDep.changed();
		Template.viewContact.template = _.template(e.target.value);
	},
	'click .sendMessageBtn': function(){
		Template.viewContact.sentId = Date.now();
		var contacts = Contacts.find({_id: this._id}).fetch();
		_.each(contacts, function (e){
			sentDep.changed();
			Meteor.call('sendSMS', e.phone, Template.viewContact.template(e), Template.viewContact.sentId);
		});
	}
});

Template.viewContact.preview = function(){
	templateDep.depend()
	return Template.viewContact.template(Contacts.findOne({_id: this._id}));
}

Template.viewContact.activeCount = function(){
	return Contacts.find({_id: this._id}).count();
}

Template.viewContact.sentMessages = function(){
	sentDep.depend();
	if (!Template.viewContact.sentId)
		return;
	return Messages.find({sentId: Template.viewContact.sentId});
}