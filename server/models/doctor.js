const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema({
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
	about: {
		type: String,
		required: true,
	},
	degree: {
		type: String,
		required: true,
	},
	speciality: {
		type: String,
		required: true,
	},
	cfee: {
		type: String,
		required: true,
	},
	ratings: {
		type: String,
		required: true,
	},

	availability: {
		type: String,
		required: true,
	},
	availabilitytimeday: {
		type: String,
		required: true,
	},
	availabilitytimeeven: {
		type: String,
		required: true,
	},
});

mongoose.model('Doctor', doctorSchema);
