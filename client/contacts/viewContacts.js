Template.viewContacts.events({
	'click .glyphicon-check': function(e){
		var obj = {};
		obj[e.currentTarget.dataset.key]= false
		Contacts.update(this._id, {$set: obj})
	},
	'click .glyphicon-unchecked': function(e){
		var obj = {};
		obj[e.currentTarget.dataset.key]= true
		Contacts.update(this._id, {$set: obj})
	}
})