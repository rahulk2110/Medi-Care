import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';
import M from 'materialize-css';

const DocSignin = () => {
	const { state, dispatch } = useContext(UserContext);
	const history = useHistory();
	const [password, setPasword] = useState('');
	const [email, setEmail] = useState('');
	const PostData = () => {
		if (
			!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
				email
			)
		) {
			M.toast({ html: 'invalid email', classes: '#c62828 red darken-3' });
			return;
		}
		fetch('/doc/signin', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				password,
				email,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					M.toast({ html: data.error, classes: '#c62828 red darken-3' });
				} else {
					localStorage.setItem('jwt1', data.token);
					localStorage.setItem('doctor', JSON.stringify(data.doctor));
					dispatch({ type: 'DOCTOR', payload: data.doctor });
					M.toast({
						html: 'signedin success',
						classes: '#43a047 green darken-1',
					});
					history.push('/docappointment');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div className="mycard">
			<div className="card auth-card input-field">
				<h2>
					<span>Medi</span>
					<span style={{ color: '#e65100' }}>Care</span>
				</h2>
				<input
					type="text"
					placeholder="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="password"
					value={password}
					onChange={(e) => setPasword(e.target.value)}
				/>
				<button
					className="btn waves-effect waves-light #64b5f6 blue darken-1"
					onClick={() => PostData()}
				>
					Login
				</button>
				<h5>
					<Link to="/signin">Patient Login</Link>
				</h5>
			</div>
		</div>
	);
};

export default DocSignin;
