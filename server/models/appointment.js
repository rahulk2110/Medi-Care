const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const appointmentSchema = new mongoose.Schema(
	{
		docID: {
			type: String,
			required: true,
		},
		docName: {
			type: String,
			required: true,
		},
		docSpec: {
			type: String,
			required: true,
		},
		docCfee: {
			type: String,
			required: true,
		},
		pic: {
			type: String,
			default: null,
		},
		PatientDetails: {
			type: ObjectId,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

mongoose.model('Appointment', appointmentSchema);
