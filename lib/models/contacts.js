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
		label: 'Cell Phone (only digits with prededing 1, eg. 18057777777)',
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
	},
	weekly: {
		type: Boolean,
		label: 'Receive Weekly Meeting Reminders',
		optional: true
	},
	ultimate: {
		type: Boolean,
		label: 'Receive Ultimate Frisbee Reminders',
		optional: true
	},
	welcome: {
		type: Boolean,
		label: 'You are brand new and would like to receive welcome texts',
		optional: true
	}
}));