AutoForm.hooks({
	updateContactByNum: {
		after: {
			update: function (err, res, template){
				if (!err){
					swal('Success', 'Contact Information Successfully Updated', 'success');
				}
			}
		}
	}
})