UI.registerHelper('formatPhone', function (phone){
	if (phone) return phone.replace(/[^0-9]/g, '').replace(/(1)(\d{3})(\d{3})(\d{4})/, "$1 ($2) $3-$4");
});

UI.registerHelper('activePage', function (page){
	return page == Router.current().route.name ? 'active' : '';
});

UI.registerHelper('formatDate', function (date){
	return moment(date).format('M/D/YY @ h:mm') + ' - ' + moment(date).fromNow();
})
