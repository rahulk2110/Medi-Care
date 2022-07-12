const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Doctor = mongoose.model('Doctor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys');

router.post('/signup', (req, res) => {
	const {
		name,
		email,
		password,
		mobile,
		address,
		bloodgroup,
		gender,
		pic,
		dob,
	} = req.body;
	if (
		!name ||
		!password ||
		!email ||
		!mobile ||
		!address ||
		!bloodgroup ||
		!gender ||
		!dob
	) {
		return res.status(422).json({ error: 'please add all the fields' });
	}
	User.findOne({ email: email })
		.then((savedUser) => {
			if (savedUser) {
				return res
					.status(422)
					.json({ error: 'user already exists with that email' });
			}
			bcrypt.hash(password, 12).then((hashedpassword) => {
				const user = new User({
					name,
					password: hashedpassword,
					email,
					mobile,
					pic,
					address,
					bloodgroup,
					gender,
					dob,
				});

				user
					.save()
					.then((user) => {
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

router.post('/signin', (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(422).json({ error: 'please add email or password' });
	}
	User.findOne({ email: email }).then((savedUser) => {
		if (!savedUser) {
			return res.status(422).json({ error: 'Invalid Email or password' });
		}
		bcrypt
			.compare(password, savedUser.password)
			.then((doMatch) => {
				if (doMatch) {
					// res.json({message:"successfully signed in"})
					const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
					const {
						_id,
						name,
						email,
						mobile,
						pic,
						address,
						bloodgroup,
						gender,
						dob,
					} = savedUser;
					res.json({
						token,
						user: {
							_id,
							name,
							email,
							mobile,
							pic,
							address,
							bloodgroup,
							gender,
							dob,
						},
					});
				} else {
					return res.status(422).json({ error: 'Invalid Email or password' });
				}
			})
			.catch((err) => {
				console.log(err);
			});
	});
});

router.post('/doc/signin', (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.status(422).json({ error: 'please add email or password' });
	}
	Doctor.findOne({ email: email }).then((savedDoctor) => {
		if (!savedDoctor) {
			return res.status(422).json({ error: 'Invalid Email or password' });
		}
		bcrypt
			.compare(password, savedDoctor.password)
			.then((doMatch) => {
				if (doMatch) {
					// res.json({message:"successfully signed in"})
					const token = jwt.sign({ _id: savedDoctor._id }, JWT_SECRET);
					const { _id } = savedDoctor;
					res.json({
						token,
						doctor: {
							_id,
						},
					});
				} else {
					return res.status(422).json({ error: 'Invalid Email or password' });
				}
			})
			.catch((err) => {
				console.log(err);
			});
	});
});

module.exports = router;
