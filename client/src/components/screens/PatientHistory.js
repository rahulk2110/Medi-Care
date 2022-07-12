import React, { useContext, useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';

import { UserContext } from '../../App';

const PatientHistory = () => {
	const { state, dispatch } = useContext(UserContext);

	const [mypics, setMyPics] = useState([]);
	const [fetched, setFetched] = useState(false);

	useEffect(() => {
		fetch(`/doc/patienthistory/${state.patientIdForHistory}`, {
			headers: {
				Authorization: 'Bearer ' + localStorage.getItem('jwt1'),
			},
		})
			.then((res) => res.json())
			.then((result) => {
				setMyPics(result.result);
			})
			.then((e) => setFetched(true));
	}, []);

	// const handlePresClick = (src) => {
	// 	console.log('clicked');
	// };

	let patientHistoryVar = <Spinner />;

	if (fetched == true && mypics.length == 0) {
		patientHistoryVar = <h4>No Previous Prescriptions Found</h4>;
	}

	if (fetched == true && mypics.length != 0) {
		patientHistoryVar = mypics.map((item) => {
			if (item.pic == null) {
				// <p>Prescription Not Uploaded by Doctor</p>;
			} else {
				return (
					<a key={item._id} href={item.pic} target="_blank" className="item12">
						<img
							src={item.pic}
							alt="Prescription"
							className="item11"
							// onClick={() => handlePresClick(item.pic)}
						/>
					</a>
				);
			}
		});
	}

	return (
		<div>
			<h3
				style={{ color: '#2196f3', textAlign: 'center', fontFamily: 'Goldman' }}
			>
				Previous Prescriptions
			</h3>
			<div className="gallery12">{patientHistoryVar}</div>
		</div>
	);
};

export default PatientHistory;
