import load, { addLoadDefaults } from './loadState';
import subscribe, { addSubscribeDefaults } from './subscribeState';
import storageAdaptors from './registrationStateStorage';

export class StateStorage {

	constructor() {
		let opts = addLoadDefaults({});
		this.options = addSubscribeDefaults(opts);
	}
	
	init(opts) {
		if (!opts.name) {
			throw new Error("must have a name");
		}
		this.options = {...this.options, ...opts};
	}
	
	loadState(initial) {
		return load(initial, this.options);
	}

	storeSubscribe(state) {
		return subscribe(state, this.options);
	}
	
	registerAdaptor(name, adaptor) {
		return storageAdaptors.register(name, adaptor, this.options);
	}

}

const stateStorage = new StateStorage();
export default stateStorage;
