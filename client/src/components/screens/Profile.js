import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { UserContext } from '../../App';

const Profile = () => {
	const { state, dispatch } = useContext(UserContext);

	let UserDetailsToShow = <Spinner />;

	if (state.user) {
		UserDetailsToShow = (
			<div className="profileContainer">
				<div className="profileImg">
					<img
						style={{
							width: '180px',
							height: '180px',
							borderRadius: '10px',
							border: '2px solid red',
						}}
						src={state.user.pic}
						alt="profilepic"
					/>
					<hr />
				</div>
				<div className="profileText">
					<h6 style={{ color: '#5e35b1' }}>
						Name:
						<span style={{ color: '#000000' }}> {state.user.name}</span>
					</h6>
					<h6 style={{ color: '#5e35b1' }}>
						DOB:{' '}
						<span style={{ color: '#000000' }}>
							{' '}
							{state.user.dob.split('-').reverse().join('-')}
						</span>
					</h6>
					<h6 style={{ color: '#5e35b1' }}>
						Gender:
						<span style={{ color: '#000000' }}> {state.user.gender}</span>
					</h6>
					<h6 style={{ color: '#5e35b1' }}>
						Blood Group:
						<span style={{ color: '#000000' }}> {state.user.bloodgroup}</span>
					</h6>
					<h6 style={{ color: '#5e35b1' }}>
						Address:
						<span style={{ color: '#000000' }}> {state.user.address}</span>
					</h6>
					<h6 style={{ color: '#5e35b1' }}>
						Mobile number:
						<span style={{ color: '#000000' }}> {state.user.mobile}</span>
					</h6>
					<h6 style={{ color: '#5e35b1' }}>
						Email Id:
						<span style={{ color: '#000000' }}> {state.user.email}</span>
					</h6>
					<Link to="/">
						<h6 style={{ color: 'red', fontWeight: 'bold' }}>
							BOOK APPOINTMENT
						</h6>
					</Link>
					<Link to="/appointment">
						<h6 style={{ color: 'red', fontWeight: 'bold' }}>
							APPOINTMENT HISTORY
						</h6>
					</Link>
				</div>
			</div>
		);
	}

	return <div>{UserDetailsToShow}</div>;
};

export default Profile;
