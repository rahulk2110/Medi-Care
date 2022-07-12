import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import M from 'materialize-css';
import Spinner from '../../components/Spinner';

import { UserContext } from '../../App';

const DProfile = () => {
	const history = useHistory();
	const [dprofile, dSetprofile] = useState({});
	const { state, dispatch } = useContext(UserContext);

	useEffect(() => {
		fetch(`/dprofile/${state.docID}`)
			.then((res) => res.json())
			.then((data) => {
				dSetprofile(data.dprofile);
				dispatch({ type: 'DNAME', payload: data.dprofile.name });
				dispatch({ type: 'DSPEC', payload: data.dprofile.speciality });
				dispatch({ type: 'DCFEE', payload: data.dprofile.cfee });
			});
	}, []);

	function loadScript(src) {
		return new Promise((resolve) => {
			const script = document.createElement('script');
			script.src = src;
			script.onload = () => {
				resolve(true);
			};
			script.onerror = () => {
				resolve(false);
			};
			document.body.appendChild(script);
		});
	}

	async function displayRazorpay() {
		fetch('/createappointment', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + localStorage.getItem('jwt'),
			},
			body: JSON.stringify({
				docID: state.docID,
				docName: state.docName,
				docSpec: state.docSpec,
				docCfee: state.docCfee,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					M.toast({ html: data.error, classes: '#c62828 red darken-3' });
				} else {
					M.toast({
						html: 'Order Booked. Pay now to confirm',
						classes: '#43a047 green darken-1',
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});

		const res = await loadScript(
			'https://checkout.razorpay.com/v1/checkout.js'
		);

		if (!res) {
			M.toast({
				html: 'Razorpay SDK failed to load. Are you online?',
				classes: '#c62828 red darken-3',
			});
			return;
		}

		// creating a new order
		const result = await axios.post('/payment/orders');

		if (!result) {
			M.toast({
				html: 'Server error. Are you online?',
				classes: '#c62828 red darken-3',
			});
			return;
		}

		// Getting the order details back
		history.push('/');
		const { amount, id: order_id, currency } = result.data.order;

		const options = {
			key: 'rzp_test_ofFbthbjEkfeYt', // Enter the Key ID generated from the Dashboard
			amount: amount.toString(),
			currency: currency,
			name: 'MediCare',
			description: 'Test Transaction',
			order_id: order_id,
			handler: async function (response) {
				const data = {
					orderCreationId: order_id,
					razorpayPaymentId: response.razorpay_payment_id,
					razorpayOrderId: response.razorpay_order_id,
					razorpaySignature: response.razorpay_signature,
				};

				const result = await axios.post('/payment/success', data);

				M.toast({
					html: result.data.msg,
					classes: '#c62828 red darken-3',
				});
			},
			prefill: {
				name: state.user.name,
				email: state.user.email,
				contact: parseInt(state.user.mobile),
			},
			notes: {
				address: 'Soumya Dey Corporate Office',
			},
			theme: {
				color: '#61dafb',
			},
		};

		const paymentObject = new window.Razorpay(options);
		paymentObject.open();
	}

	let doctorProfile = <Spinner />;

	if (Object.keys(dprofile).length !== 0) {
		doctorProfile = (
			<div className="card #f5f5f5 grey lighten-4 dprofilecard">
				<div className="position">
					<h5 style={{ color: '#1a237e' }}>{dprofile.name}</h5>
					<p>
						<span className="ratings">ratings: </span>
						{dprofile.ratings}
						<i className="material-icons">grade</i>
					</p>
				</div>
				<hr />
				<p style={{ color: '#5e35b1' }}>About</p>
				<p>{dprofile.about}</p>
				<p style={{ color: '#5e35b1' }}>
					Degree: <span style={{ color: '#000000' }}> {dprofile.degree}</span>
				</p>
				<p style={{ color: '#5e35b1' }}>
					Speciality:{' '}
					<span style={{ color: '#000000' }}> {dprofile.speciality}</span>
				</p>
				<p style={{ color: '#5e35b1' }}>
					Consultant Fees:{' '}
					<span style={{ color: '#000000' }}> {dprofile.cfee} INR</span>
				</p>
				<p style={{ color: '#5e35b1' }}>
					Availability:
					<span style={{ color: '#000000' }}> Available To Book</span>
				</p>
				<hr />
				<button
					className="btn waves-effect waves-light #82b1ff blue accent-1"
					onClick={state.user ? displayRazorpay : () => history.push('/signup')}
				>
					{state.user ? 'Book Now' : 'Signup to Book'}
					<i className="material-icons right">send</i>
				</button>
			</div>
		);
	}

	return <div>{doctorProfile}</div>;
};

export default DProfile;
