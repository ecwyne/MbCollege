Messages = new Mongo.Collection('messages');

Messages.attachSchema(new SimpleSchema({
	type: {
		type: String,
		allowedValues: ['inbound', 'outbound']
	},
	date: {
		type: Date
	},
	text: {
		type: String
	},
	messageId: {
		type: String
	},
	status: {
		type: String
	},
	phone: {
		type: String
	},
	sentId: {
		type: Number,
		optional: true
	}
}));