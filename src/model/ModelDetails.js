import React from 'react';

export default class ModelDetails extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
		this.updateField = this.updateField.bind(this);
		this.update = this.update.bind(this);
	}
	
	updateField(e) {
		e.preventDefault();
		const val = e.target.value;
		const name = e.target.getAttribute('data-item');
		this.setState({...this.state, [name]: val});
	}
	
	update(e) {
		e.preventDefault();
		this.props.update(this.state);
		this.props.history.push('/models');
	}
	
	render() {
		return (
			<form onSubmit={this.update}>
				<input type="text" name="reference" id="edit-reference" placeholder="Reference" data-item="reference" onChange={this.updateField} />
				<input type="text" name="description" id="edit-description" placeholder="Description" data-item="description" onChange={this.updateField} />
				<button type="submit">Create</button>
			</form>
		);
	}
}