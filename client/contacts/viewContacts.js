Template.viewContacts.events({
	'click .glyphicon-check': function(e){
		var self = this;
		confirm(function(){
			var obj = {};
			obj[e.currentTarget.dataset.key]= false
			Contacts.update(self._id, {$set: obj})
		})
	},
	'click .glyphicon-unchecked': function(e){
		var self = this;
		confirm(function(){
			var obj = {};
			obj[e.currentTarget.dataset.key]= true
			Contacts.update(self._id, {$set: obj})
		})
	}
})

function confirm(callback){
	swal({
		title: "Are you sure?",   
		text: "Would you like to change this messaging preferences?",   
		type: "warning",   
		showCancelButton: true,   
		confirmButtonColor: "#DD6B55",   
		confirmButtonText: "Yes",   
		closeOnConfirm: false 
	}, function(){
		callback();
		swal("Success!", "Preference changed.", "success"); 
	});
}