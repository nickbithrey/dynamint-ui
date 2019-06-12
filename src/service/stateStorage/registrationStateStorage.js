import localStorage from './adaptor/localStorageStateStorageAdaptor';

export class StorageAdaptors {
	
	constructor() {
		this.adaptors = {
			localStorage: localStorage
		};
		this.adaptorInUse = 'localStorage';
	}
	
	registerAdaptor(name, adaptor, opts) {
		if (this.adaptors[name]) {
			throw new Error("cannot register adaptor with name " + registration.name + " as one already exists");
		}
		this.adaptors[name] = adaptor;
		return this.adaptors[name];
	}
	
	setAdaptorInUse(name) {
		this.adaptorInUse = name;
	}
	
	getAdaptor() {
		return this.adaptors[this.adaptorInUse];
	}
}

const storageAdaptors = new StorageAdaptors();
export default storageAdaptors;