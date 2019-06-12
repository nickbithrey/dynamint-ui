import storageAdaptors from './registrationStateStorage';

const defaultOpts = {
	timeToLive: 600000
};

export function addLoadDefaults(options) {
	return {...options, ...defaultOpts};
}

export default function loadState(initial, opts = defaultLoadOpts) {
	let state = storageAdaptors.getAdaptor().get('dynamint-ui');
	if (!state || isExpired(state, opts.timeToLive)) {
		state = initial;
	}
	return state;
}

function isExpired(state, timeToLive) {
	return Date.now() > state.timestamp + timeToLive;
}