const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Appointment = mongoose.model('Appointment');
const requireLogin = require('../middleware/requireLogin');

router.post('/createappointment', requireLogin, (req, res) => {
	const { docID, docName, docSpec, docCfee } = req.body;
	if (!docID || !docName || !docSpec || !docCfee) {
		return res.status(422).json({ error: 'please add all the fields' });
	}
	req.user.password = undefined;
	const appointment = new Appointment({
		docID,
		docName,
		docSpec,
		docCfee,
		PatientDetails: req.user,
	});
	appointment
		.save()
		.then((result) => {
			res.json({ booking: result });
		})
		.catch((err) => {
			console.log(err);
		});
});

router.get('/appointment', requireLogin, (req, res) => {
	Appointment.find({ PatientDetails: { $in: req.user._id } })
		.sort('-createdAt')
		.then((appointment) => {
			res.json({ appointment });
		});
});

module.exports = router;
