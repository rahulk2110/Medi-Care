const { RAZORPAY_KEY_ID } = require('../config/keys');
const { RAZORPAY_SECRET } = require('../config/keys');
const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const router = express.Router();

router.post('/orders', (req, res) => {
	const instance = new Razorpay({
		key_id: RAZORPAY_KEY_ID,
		key_secret: RAZORPAY_SECRET,
	});

	const options = {
		amount: 42000, // amount in smallest currency unit
		currency: 'INR',
		receipt: 'receipt_order_74394',
	};

	instance.orders
		.create(options)
		.then((order) => {
			if (!order) return res.status(500).send('Some error occured');
			res.json({ order });
		})
		.catch((err) => res.json({ err }));
});

router.post('/success', async (req, res) => {
	try {
		// getting the details back from our font-end
		const {
			orderCreationId,
			razorpayPaymentId,
			razorpayOrderId,
			razorpaySignature,
		} = req.body;

		// Creating our own digest
		// The format should be like this:
		// digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
		const shasum = crypto.createHmac('sha256', 'w2lBtgmeuDUfnJVp43UpcaiT');

		shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

		const digest = shasum.digest('hex');

		// comaparing our digest with the actual signature
		if (digest !== razorpaySignature)
			return res.status(400).json({ msg: 'Transaction not legit!' });

		// THE PAYMENT IS LEGIT & VERIFIED
		// YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

		res.json({
			msg: 'success',
			orderId: razorpayOrderId,
			paymentId: razorpayPaymentId,
		});
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = router;
