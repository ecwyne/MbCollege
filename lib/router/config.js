Router.configure({
	layoutTemplate: 'layoutTemplate',
	loadingTemplate: 'loadingTemplate',
	notFoundTemplate: 'notFoundTemplate'
});

var exceptions = {except: ['home', 'apiInbox', 'apiStatus', 'editByNum']}

Router.onBeforeAction('loading', exceptions);
Router.onBeforeAction('dataNotFound', exceptions);
Router.onBeforeAction(function (pause){
	if (_.intersection(Meteor.user().emails.map(function(e){return e.address}), Meteor.settings.public.admin).length == 0){
		this.render('notAdmin')
		pause();
	}
	this.next();
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
				contacts: Contacts.find({}, {sort: {firstName: 1, lastName: 1}})
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

	this.route('editByNum', {
		path: '/preferences/:num',
		waitOn: function(){
			return [Meteor.subscribe('contacts'), Meteor.subscribe('messages')]
		},
		data: function(){
			return Contacts.findOne({phone: {$regex: this.params.num}});
		}
	})

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
				messages: Messages.find({type: 'inbound', date: {$gte: new Date(new Date()*1 - 1000*60*60*24*7)}}, {sort: {date: -1}})
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
				messages: Messages.find({type: 'outbound', date: {$gte: new Date(new Date()*1 - 1000*60*60*24*1)}}, {sort: {date: -1}})
			}
		}
	});
});