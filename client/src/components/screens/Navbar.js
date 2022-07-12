import React, { useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import M from 'materialize-css';

const NavBar = () => {
	const history = useHistory();
	const { state, dispatch } = useContext(UserContext);

	useEffect(() => {
		var elems = document.querySelectorAll('.sidenav');
		M.Sidenav.init(elems);
	}, []);

	const renderList = () => {
		if (state.user) {
			return [
				<li key="1">
					<Link to="/profile">Profile</Link>
				</li>,
				<li key="2">
					<Link to="/appointment">Appointment</Link>
				</li>,
				<li key="3">
					<Link
						to="/#"
						className="btn #c62828 red darken-3"
						onClick={() => {
							localStorage.clear();
							dispatch({ type: 'CLEAR' });
							history.push('/signin');
						}}
						style={{ marginRight: '15px' }}
					>
						Logout
					</Link>
				</li>,
			];
		} else if (state.doctor) {
			return [
				<li key="1">
					<Link to="docappointment">
						<p style={{ margin: '0 10px 10px 0' }}>Appointment</p>
					</Link>
				</li>,
				<li key="2">
					<Link
						to="/#"
						className="btn #c62828 red lighten-2"
						onClick={() => {
							localStorage.clear();
							dispatch({ type: 'CLEAR' });
							history.push('/signin');
						}}
						style={{ marginRight: '15px' }}
					>
						Logout
					</Link>
				</li>,
			];
		} else {
			return [
				<li key="1">
					<Link to="/signin">Signin</Link>
				</li>,
				<li key="2">
					<Link to="/signup">Signup</Link>
				</li>,
			];
		}
	};

	return (
		<>
			<nav>
				<div className="nav-wrapper #b2ebf2 cyan lighten-4">
					<Link
						to={state.doctor ? '/docappointment' : '/'}
						className="brand-logo"
					>
						<span style={{ marginLeft: '15px' }}>Medi</span>
						<span style={{ color: '#e65100' }}>Care</span>
					</Link>
					<Link to="/#" className="sidenav-trigger" data-target="mobile-links">
						<i className="material-icons">menu</i>
					</Link>
					<ul className="right hide-on-med-and-down">{renderList()}</ul>
				</div>
			</nav>

			<ul className="sidenav" id="mobile-links">
				<div className="sidebarelement">{renderList()}</div>
			</ul>
		</>
	);
};

export default NavBar;
