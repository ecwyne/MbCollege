Template.messages.getContact = function(phone){
	return Contacts.findOne({phone: phone});
}

Template.messages.hasReplied = function(){
	var last = Messages.findOne({phone: this.phone}, {sort: {date: -1}});
	return this.date < last.date;
}