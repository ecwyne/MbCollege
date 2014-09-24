Template.viewContacts.events({
	'click .glyphicon-check': function(e){
		Contacts.update(this._id, {$set: {active: false}})
	},
	'click .glyphicon-unchecked': function(e){
		Contacts.update(this._id, {$set: {active: true}})
	}
})