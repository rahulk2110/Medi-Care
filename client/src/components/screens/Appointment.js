import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Spinner from '../../components/Spinner';

import { UserContext } from '../../App';

const Appointment = () => {
	const history = useHistory();
	const { state, dispatch } = useContext(UserContext);

	const [appoint, setAppoint] = useState([]);
	const [fetched, setFetched] = useState(false);

	useEffect(() => {
		fetch('/appointment', {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('jwt'),
			},
		})
			.then((res) => res.json())
			.then((a) => setAppoint(a.appointment))
			.then((res) => setFetched(true));
	}, []);

	const Dprofile = (docID) => {
		dispatch({ type: 'DOCID', payload: docID });
		history.push(`/dprofile/${docID}`);
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
				Nothing to Show, Why don't you book an appointment?
			</h4>
		);
	}

	if (appoint.length !== 0) {
		displayAppointment = appoint.map((a) => {
			return (
				<div
					className="card #f5f5f5 grey lighten-4 appointmentcard"
					key={a._id}
				>
					<h5>
						<span className="docname">Doctor Name: </span>
						<span style={{ color: '#000000' }}> {a.docName}</span>
					</h5>
					<hr />
					<p style={{ color: '#5e35b1' }}>
						Speciality: <span style={{ color: '#000000' }}> {a.docSpec}</span>
					</p>
					<p style={{ color: '#5e35b1' }}>
						Booked On:{' '}
						<span style={{ color: '#000000' }}>
							{' '}
							{a.createdAt.split('T')[0].split('-').reverse().join('-')}
						</span>
					</p>
					<p style={{ color: '#5e35b1' }}>
						Fee Paid: <span style={{ color: '#000000' }}> {a.docCfee} INR</span>
					</p>
					<hr />
					<div className="appointbutton">
						<button
							className="btn waves-effect waves-light #82b1ff blue accent-1 bookagain "
							onClick={() => Dprofile(a.docID)}
						>
							Book Again
							<i className="material-icons right">autorenew</i>
						</button>
						<a href={a.pic} target="_blank" className="downloadpres">
							<button
								className="btn waves-effect waves-light #82b1ff blue accent-1 "
								style={{
									display: a.pic ? 'inline' : 'none',
								}}
							>
								Download Prescription
								<i className="material-icons right">download</i>
							</button>
						</a>
					</div>
				</div>
			);
		});
	}

	return <div>{displayAppointment}</div>;
};

export default Appointment;
