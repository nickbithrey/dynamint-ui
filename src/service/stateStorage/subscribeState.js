import storageAdaptors from './registrationStateStorage';

const defaultOpts = {
	extractState: extractFromState
};

export function addSubscribeDefaults(options) {
	return {...options, ...defaultOpts};
}

export default function storeSubscribe(state, opts = defaultSubscribeOpts) {
	return storageAdaptors.getAdaptor().set(opts.name, opts.extractState(state));
}

function extractFromState(state) {
	return {...state, timestamp: Date.now()};
}