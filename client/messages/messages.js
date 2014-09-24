Template.messages.getContact = function(phone){
	return Contacts.findOne({phone: phone});
}