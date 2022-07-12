import React, { useEffect, useContext, useReducer, createContext } from 'react';
import Navbar from './components/screens/Navbar';
import './App.css';

import SignIn from './components/screens/Signin';
import SignUp from './components/screens/Signup';
import Home from './components/screens/Home';
import Profile from './components/screens/Profile';
import Appointment from './components/screens/Appointment';
import DList from './components/screens/DList';
import DProfile from './components/screens/DProfile';
import DocSignin from './components/screens/DocSignin';
import DocAppointment from './components/screens/DocAppointment';
import PatientHistory from './components/screens/PatientHistory';
import NotFoundRoute from './components/screens/NotFound/NotFoundRoute';
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';
import { reducer, initialState } from './reducers/userReducer';

export const UserContext = createContext();

const Routing = () => {
	const history = useHistory();
	const { state, dispatch } = useContext(UserContext);
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		const doctor = JSON.parse(localStorage.getItem('doctor'));
		if (user) {
			dispatch({ type: 'USER', payload: user });
		} else if (doctor) {
			dispatch({ type: 'DOCTOR', payload: doctor });
		}
	}, []);

	return (
		<>
			{state.doctor ? (
				<Switch>
					<Route path="/docappointment" component={DocAppointment} />
					<Route path="/patienthistory" component={PatientHistory} />
					<NotFoundRoute component={NotFoundRoute} />
				</Switch>
			) : state.user ? (
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/profile" component={Profile} />
					<Route path="/dprofile" component={DProfile} />
					<Route path="/appointment" component={Appointment} />
					<Route path="/dlist" component={DList} />
					<Route path="/dprofile" component={DProfile} />
					<NotFoundRoute component={NotFoundRoute} />
				</Switch>
			) : (
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/signin" component={SignIn} />
					<Route path="/signup" component={SignUp} />
					<Route path="/dlist" component={DList} />
					<Route path="/dprofile" component={DProfile} />
					<Route path="/doc/signin" component={DocSignin} />
					<NotFoundRoute component={NotFoundRoute} />
				</Switch>
			)}
		</>
	);
};

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<UserContext.Provider value={{ state, dispatch }}>
			<BrowserRouter>
				<Navbar />
				<Routing />
			</BrowserRouter>
		</UserContext.Provider>
	);
}

export default App;
