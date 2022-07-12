import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import M from 'materialize-css';
const SignUp = () => {
	const history = useHistory();
	const [name, setName] = useState('');
	const [password, setPasword] = useState('');
	const [email, setEmail] = useState('');
	const [mobile, setMobile] = useState('');
	const [address, setAddress] = useState('');
	const [bloodgroup, setBloodgroup] = useState('');
	const [gender, setGender] = useState('');
	const [dob, setDob] = useState('');
	const [image, setImage] = useState('');
	const [url, setUrl] = useState(undefined);

	useEffect(() => {
		if (url) {
			uploadFields();
		}
	}, [url]);

	const uploadPic = () => {
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
				setUrl(data.url);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const uploadFields = () => {
		if (
			!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
				email
			)
		) {
			M.toast({ html: 'invalid email', classes: '#c62828 red darken-3' });
			return;
		}
		fetch('/signup', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
				password,
				mobile,
				address,
				bloodgroup,
				gender,
				dob,
				pic: url,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					M.toast({ html: data.error, classes: '#c62828 red darken-3' });
				} else {
					M.toast({ html: data.message, classes: '#43a047 green darken-1' });
					history.push('/signin');
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const PostData = () => {
		if (image) {
			uploadPic();
		} else {
			uploadFields();
		}
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
					placeholder="Name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPasword(e.target.value)}
				/>
				<div className="file-field input-field">
					<div className="btn #64b5f6 blue darken-1">
						<span>Upload pic</span>
						<input type="file" onChange={(e) => setImage(e.target.files[0])} />
					</div>
					<div className="file-path-wrapper">
						<input
							className="file-path validate"
							type="text"
							placeholder="Optional"
						/>
					</div>
				</div>
				<input
					type="text"
					placeholder="Mobile Number"
					value={mobile}
					onChange={(e) => setMobile(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Address"
					value={address}
					onChange={(e) => setAddress(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Blood Group"
					value={bloodgroup}
					onChange={(e) => setBloodgroup(e.target.value)}
				/>
				<input
					type="text"
					placeholder="Gender (Male/Female)"
					value={gender}
					onChange={(e) => setGender(e.target.value)}
				/>
				<input
					type="date"
					placeholder="Date of Birth (YYYY-MM-DD)"
					value={dob}
					onChange={(e) => setDob(e.target.value)}
				/>
				<button
					className="btn waves-effect waves-light #64b5f6 blue darken-1"
					onClick={PostData}
				>
					SignUP
				</button>
				<h5>
					<Link to="/signin">Patient SignIn</Link>
				</h5>
			</div>
		</div>
	);
};

export default SignUp;
