const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Doctor = mongoose.model('Doctor');
const Appointment = mongoose.model('Appointment');
const docrequireLogin = require('../middleware/docrequireLogin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys');

router.post('/adddoctor', (req, res) => {
	const {
		name,
		email,
		password,
		about,
		degree,
		speciality,
		cfee,
		ratings,
		availability,
		availabilitytimeday,
		availabilitytimeeven,
	} = req.body;
	if (
		!name ||
		!email ||
		!password ||
		!about ||
		!degree ||
		!speciality ||
		!cfee ||
		!ratings ||
		!availability ||
		!availabilitytimeday ||
		!availabilitytimeeven
	) {
		return res.status(422).json({ error: 'please add all the fields' });
	}
	Doctor.findOne({ email: email })
		.then((savedDoctor) => {
			if (savedDoctor) {
				return res
					.status(422)
					.json({ error: 'Doctor already exists with that email' });
			}
			bcrypt.hash(password, 12).then((hashedpassword) => {
				const doctor = new Doctor({
					name,
					email,
					password: hashedpassword,
					about,
					degree,
					speciality,
					cfee,
					ratings,
					availability,
					availabilitytimeday,
					availabilitytimeeven,
				});

				doctor
					.save()
					.then((doctor) => {
						res.json({ message: 'saved successfully' });
					})
					.catch((err) => {
						console.log(err);
					});
			});
		})
		.catch((err) => {
			console.log(err);
		});
});

router.get('/dlist', (req, res) => {
	Doctor.find({ name: req.query.q })
		.select('-password')
		.sort('-ratings')
		.then((dlist) => {
			res.json({ dlist });
		});
});

router.get('/dlistbyspeciality', (req, res) => {
	Doctor.find({ speciality: req.query.s })
		.select('-password')
		.sort('-ratings')
		.then((dlist) => {
			res.json({ dlist });
		});
});

router.get('/dprofile/:dID', (req, res) => {
	Doctor.findOne({ _id: req.params.dID }).then((dprofile) => {
		res.json({ dprofile });
	});
});

router.get('/doc/appointment', docrequireLogin, (req, res) => {
	Appointment.find({ docID: req.doctor.id })
		.populate('PatientDetails', 'name mobile address gender dob')
		.sort('-createdAt')
		.then((appointment) => {
			res.json({ appointment });
		});
});

router.get('/doc/patienthistory/:patientID', docrequireLogin, (req, res) => {
	Appointment.find({ PatientDetails: { _id: req.params.patientID } }).then(
		(result) => {
			res.json({ result });
		}
	);
});

router.put(
	'/uploadprescription/:appointmentId',
	docrequireLogin,
	(req, res) => {
		Appointment.findByIdAndUpdate(
			{ _id: req.params.appointmentId },
			{ $set: { pic: req.body.pic } },
			{ new: true },
			(err, result) => {
				if (err) {
					return res.status(422).json({ error: 'pic canot post' });
				}
				res.json(result);
			}
		);
	}
);

module.exports = router;
