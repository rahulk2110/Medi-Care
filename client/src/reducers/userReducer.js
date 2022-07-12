export const initialState = {
	cd: 'data',
};

export const reducer = (state, action) => {
	if (action.type === 'USER') {
		return {
			...state,
			user: action.payload,
		};
	}
	if (action.type === 'DOCTOR') {
		return {
			doctor: action.payload,
		};
	}
	if (action.type === 'PATIENTIDFORHISTORY') {
		return {
			...state,
			patientIdForHistory: action.payload,
		};
	}
	if (action.type === 'CLEAR') {
		return {
			cd: 'data',
			//doing so that state dont get null (we r reading state.user and state.doctor in navbar comp)
		};
	}
	if (action.type === 'DLIST') {
		return {
			...state,
			dname: action.payload,
		};
	}
	if (action.type === 'DOCID') {
		return {
			...state,
			docID: action.payload,
		};
	}
	if (action.type === 'DNAME') {
		return {
			...state,
			docName: action.payload,
		};
	}
	if (action.type === 'DSEARCHSPEC') {
		return {
			...state,
			dsearchSpec: action.payload,
		};
	}
	if (action.type === 'DSPEC') {
		return {
			...state,
			docSpec: action.payload,
		};
	}
	if (action.type === 'DCFEE') {
		return {
			...state,
			docCfee: action.payload,
		};
	}
	if (action.type == 'UPDATEPIC') {
		return {
			...state,
			pic: action.payload,
		};
	}
	return state;
};
