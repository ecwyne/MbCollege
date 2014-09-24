Router.configure({
	layoutTemplate: 'layoutTemplate',
	loadingTemplate: 'loadingTemplate',
	notFoundTemplate: 'notFoundTemplate'
});

var exceptions = {except: ['home', 'apiInbox', 'apiStatus']}

Router.onBeforeAction('loading', exceptions);
Router.onBeforeAction('dataNotFound', exceptions);
Router.onBeforeAction(function (pause){
	if (_.intersection(Meteor.user().emails.map(function(e){return e.address}), Meteor.settings.public.admin).length == 0){
		this.render('notAdmin')
		pause();
	}
}, exceptions);


Router.map(function(){
	this.route('home', {
		path: '/'
	});

	this.route('addContact', {
		path: '/contacts/new'
	});

	this.route('viewContacts', {
		path: '/contacts/all',
		waitOn: function(){
			return [Meteor.subscribe('contacts'), Meteor.subscribe('messages')]
		},
		data: function(){
			return {
				contacts: Contacts.find()
			}
		}
	});

	this.route('editContact', {
		path: '/contacts/edit/:_id',
		waitOn: function(){
			return [Meteor.subscribe('contacts'), Meteor.subscribe('messages')]
		},
		data: function(){
			return Contacts.findOne(this.params._id);
		}
	});

	this.route('viewContact', {
		path: '/contacts/view/:_id',
		waitOn: function(){
			return [Meteor.subscribe('contacts'), Meteor.subscribe('messages')]
		},
		data: function(){
			return Contacts.findOne(this.params._id);
		}
	})

	this.route('sendMessage', {
		path: '/messages/new',
		waitOn: function(){
			return [Meteor.subscribe('contacts'), Meteor.subscribe('messages')]
		}
	});

	this.route('inbox', {
		path: '/inbox',
		template: 'messages', 
		waitOn: function(){
			return [Meteor.subscribe('contacts'), Meteor.subscribe('messages')]
		},
		data: function(){
			return {
				messages: Messages.find({type: 'inbound'}, {sort: {date: -1}})
			}
		}
	});
	this.route('outbox', {
		path: '/outbox',
		template: 'messages', 
		waitOn: function(){
			return [Meteor.subscribe('contacts'), Meteor.subscribe('messages')]
		},
		data: function(){
			return {
				messages: Messages.find({type: 'outbound'}, {sort: {date: -1}})
			}
		}
	});
});