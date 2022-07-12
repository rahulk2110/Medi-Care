import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import M from 'materialize-css';

import { UserContext } from '../../App';

const DocAppointment = () => {
	const history = useHistory();
	const { state, dispatch } = useContext(UserContext);

	const [appoint, setAppoint] = useState([]);
	const [fetched, setFetched] = useState(false);
	const [image, setImage] = useState('');

	useEffect(() => {
		fetch('/doc/appointment', {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('jwt1'),
			},
		})
			.then((res) => res.json())
			.then((a) => setAppoint(a.appointment))
			.then((res) => setFetched(true));
	}, []);

	const handleNameClick = (patientId) => {
		dispatch({ type: 'PATIENTIDFORHISTORY', payload: patientId });
		history.push('/patienthistory');
	};

	const handleClick = (id) => {
		const data = new FormData();
		data.append('file', image);
		data.append('upload_preset', 'medicare');
		data.append('cloud_name', 'jinkit');
		fetch('https://api.cloudinary.com/v1_1/jinkit/image/upload', {
			method: 'post',
			body: data,
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data.url);
				fetch(`/uploadprescription/${id}`, {
					method: 'put',
					headers: {
						'Content-Type': 'application/json',
						Authorization: 'Bearer ' + localStorage.getItem('jwt1'),
					},
					body: JSON.stringify({
						pic: data.url,
					}),
				}).then((e) => {
					console.log(e);
					if (e.error) {
						M.toast({
							html: e.error,
							classes: '#c62828 red darken-3',
						});
					} else {
						M.toast({
							html: 'Prescription Uploaded',
							classes: '#43a047 green darken-1',
						});
					}
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	let displayAppointment = <Spinner />;

	if (fetched == true && appoint.length == 0) {
		displayAppointment = (
			<h4
				style={{
					color: '#5e35b1',
					textAlign: 'center',
					marginTop: '60px',
					fontFamily: 'Goldman',
				}}
			>
				Nothing to Show 😪😪
			</h4>
		);
	}

	if (appoint.length !== 0) {
		displayAppointment = appoint.map((a) => {
			return (
				<div
					className="card #f5f5f5 grey lighten-4 appointmentcardDoc"
					key={a._id}
				>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<h5 style={{ color: '#5e35b1' }}>
							<span className="selectdoc">Patient Name:</span>{' '}
							<span
								style={{ color: '#000000', cursor: 'pointer' }}
								onClick={() => handleNameClick(a.PatientDetails._id)}
							>
								{' '}
								{a.PatientDetails.name}
							</span>
						</h5>
						<h5
							style={{ color: '#5e35b1', display: a.pic ? 'inline' : 'none' }}
						>
							<span className="selectdoc">Prescription </span>
							Uploaded
						</h5>
					</div>
					<hr />
					<p style={{ color: '#5e35b1' }}>
						Mobile Number:{' '}
						<span style={{ color: '#000000' }}> {a.PatientDetails.mobile}</span>
					</p>
					<p style={{ color: '#5e35b1' }}>
						Address:{' '}
						<span style={{ color: '#000000' }}>
							{' '}
							{a.PatientDetails.address}
						</span>
					</p>
					<p style={{ color: '#5e35b1' }}>
						Gender:{' '}
						<span style={{ color: '#000000' }}> {a.PatientDetails.gender}</span>
					</p>
					<p style={{ color: '#5e35b1' }}>
						Date of Birth:{' '}
						<span style={{ color: '#000000' }}>
							{' '}
							{a.PatientDetails.dob.split('-').reverse().join('-')}
						</span>
					</p>
					<hr />
					<div className="docappoin">
						<div className="file-field input-field">
							<div className="btn #82b1ff blue accent-1">
								Select <span className="selectdoc">Document</span>
								<input
									type="file"
									onChange={(e) => setImage(e.target.files[0])}
								/>
							</div>
							<div className="file-path-wrapper">
								<input className="file-path validate" type="text" />
							</div>
						</div>
						<button
							className="btn waves-effect waves-light #82b1ff blue accent-1 uploadpres"
							onClick={() => handleClick(a._id)}
						>
							Upload Prescription
							<i className="material-icons right">upload</i>
						</button>
					</div>
				</div>
			);
		});
	}

	return <div>{displayAppointment}</div>;
};

export default DocAppointment;
