import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Spinner from '../../components/Spinner';

import { UserContext } from '../../App';

const DList = () => {
	const history = useHistory();
	const { state, dispatch } = useContext(UserContext);

	const [dlist, setDlist] = useState([]);
	const [fetched, setFetched] = useState(false);

	const handleClick = (d) => {
		dispatch({ type: 'DOCID', payload: d });
		history.push(`/dprofile/${d}`);
	};

	useEffect(() => {
		if (state.dsearchSpec) {
			fetch(`/dlistbyspeciality?s=${state.dsearchSpec}`)
				.then((res) => res.json())
				.then((data) => {
					setDlist(data.dlist);
					dispatch({ type: 'DSEARCHSPEC', payload: null });
				})
				.then((res) => setFetched(true));
		} else {
			fetch(`/dlist?q=${state.dname}`)
				.then((res) => res.json())
				.then((data) => {
					setDlist(data.dlist);
				})
				.then((res) => setFetched(true));
		}
	}, []);

	let doctorList = <Spinner />;

	if (fetched == true && dlist.length == 0) {
		doctorList = (
			<h4
				style={{
					color: '#5e35b1',
					textAlign: 'center',
					marginTop: '60px',
					fontFamily: 'Goldman',
				}}
			>
				No Doctor found with given name. Please Try again...
			</h4>
		);
	}

	if (dlist.length !== 0) {
		doctorList = dlist.map((d) => (
			<div className="card #f5f5f5 grey lighten-4 dlistcard" key={d._id}>
				<div className="position ">
					<h5 style={{ color: '#1a237e' }}>{d.name}</h5>
					<p>
						<span className="ratings">ratings: </span> {d.ratings}{' '}
						<i className="material-icons">grade</i>
					</p>
				</div>
				<hr />
				<p style={{ color: '#5e35b1' }}>
					Speciality: <span style={{ color: '#000000' }}> {d.speciality}</span>
				</p>
				<p style={{ color: '#5e35b1' }}>
					Consultant Fees:{' '}
					<span style={{ color: '#000000' }}> {d.cfee} INR</span>
				</p>
				<p style={{ color: '#5e35b1' }}>
					Availability:{' '}
					<span style={{ color: '#000000' }}>{d.availability}</span>
				</p>
				<p style={{ color: '#5e35b1' }}>
					Availability Time :{' '}
					<span style={{ color: '#000000' }}>
						{d.availabilitytimeday} AM and {d.availabilitytimeeven} PM
					</span>
				</p>
				<hr />
				<button
					className="btn waves-effect waves-light #82b1ff blue accent-1 "
					onClick={() => handleClick(d._id)}
				>
					Book Now
					<i className="material-icons right">send</i>
				</button>
			</div>
		));
	}
	return <div>{doctorList}</div>;
};

export default DList;
