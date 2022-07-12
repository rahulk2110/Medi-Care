const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	pic: {
		type: String,
		default:
			'https://images.unsplash.com/photo-1605220462697-f2e1ac24d203?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80',
	},
	mobile: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	bloodgroup: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		required: true,
	},
	dob: {
		type: String,
		required: true,
	},
});

mongoose.model('User', userSchema);
