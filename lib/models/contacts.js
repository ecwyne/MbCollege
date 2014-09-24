Contacts = new Mongo.Collection('contacts');

Contacts.attachSchema(new SimpleSchema({
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	phone: {
		type: String,
		unique: true
	},
	email: {
		type: String,
		regEx: SimpleSchema.RegEx.Email,
		optional: true
	},
	active: {
		type: Boolean
	},
	gender: {
		type: String,
		allowedValues: ['male', 'female'],
		optional: true
	}
}));