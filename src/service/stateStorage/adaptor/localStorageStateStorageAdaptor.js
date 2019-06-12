export default {

	/**
	 * Stores the given data as a string at the given namespace.
	 * 
	 * @param {String}
	 * @param {*}
	 */
	set (name, data) {
		let value = JSON.stringify(data);
		window.localStorage.setItem(name, value);
		return value;
	},

	/**
	 * Returns the data stored at the given namespace.
	 * 
	 * @param {String}
	 *            name
	 * @return {*}
	 */
	get (name) {
		return JSON.parse(window.localStorage.getItem(name));
	},

	/**
	 * Returns true if data is stored at the given namespace.
	 * 
	 * @param {String}
	 *            name
	 * @return {Boolean}
	 */
	has (name) {
		return !!window.localStorage.getItem(name);
	},

	/**
	 * Removes the item stored at the given namespace.
	 * 
	 * @param {String}
	 *            name
	 */
	clear (name) {
		window.localStorage.removeItem(name);
	}

};