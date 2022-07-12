import React, { useState, useEffect, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import medicine from '../../assests/medicine.svg';
import M from 'materialize-css';

import { UserContext } from '../../App';

const Home = () => {
	const searchSpec = useRef(null);
	const history = useHistory();
	const [dsearch, setDsearch] = useState('');

	const { state, dispatch } = useContext(UserContext);

	useEffect(() => {
		M.FormSelect.init(searchSpec.current);
	});

	const searchDoctor = () => {
		dispatch({ type: 'DLIST', payload: dsearch });
		history.push(`/dlist?q=${dsearch}`);
	};

	const searchDoctorSpec = (dSpecSearch) => {
		dispatch({ type: 'DSEARCHSPEC', payload: dSpecSearch });
		history.push(`/dlist?q=${dSpecSearch}`);
	};

	return (
		<div className="home">
			<div className="searchhome input-field">
				<input
					type="text"
					placeholder="Search Doctors by Name"
					value={dsearch}
					onChange={(e) => setDsearch(e.target.value)}
				/>
				<button
					className="btn waves-effect waves-light #64b5f6 blue darken-1"
					style={{ marginLeft: '100px', marginTop: '15px' }}
					onClick={searchDoctor}
				>
					Search
					<i className="material-icons right">search</i>
				</button>
				<div className="input-field col s12" style={{ marginTop: '70px' }}>
					<select
						ref={searchSpec}
						onChange={(e) => searchDoctorSpec(e.target.value)}
						defaultValue={'DEFAULT'}
					>
						<option value="DEFAULT" disabled>
							Search by Speciality
						</option>
						<option value="Dentist">Dentist</option>
						<option value="Physician">Physician</option>
						<option value="Cardiologist">Cardiologist</option>
						<option value="Pediatricians">Pediatricians</option>
						<option value="Dermatologists">Dermatologists</option>
						<option value="ENT">ENT (Head and Neck)</option>
						<option value="Gynecologist">Gynecologist</option>
						<option value="Surgeon">Surgeon</option>
					</select>
				</div>
			</div>

			<div className="imagehome hide-on-med-and-down">
				<img
					style={{ width: '700px', height: '650px' }}
					src={medicine}
					alt="home_img"
				/>
			</div>
		</div>
	);
};

export default Home;
