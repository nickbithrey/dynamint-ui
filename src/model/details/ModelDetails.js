import React from 'react';

export default class ModelDetails extends React.Component {

	constructor(props) {
		super(props);
		this.updateField = this.updateField.bind(this);
		this.update = this.update.bind(this);
		this.back = this.back.bind(this);
		this.create = this.props.match.params.type === 'create';
		this.id = props.location.state.id;
	}
	
	componentDidMount() {
		if (!this.props.details) {
			this.props.load(this.id);
		}
	}
	
	updateField(e) {
		e.preventDefault();
		const val = e.target.value;
		const name = e.target.getAttribute('data-item');
		this.props.details[name]= val;
	}
	
	update(e) {
		e.preventDefault();
		if (this.create) {
			this.props.create(this.props.details);
		} else {
			this.props.update(this.id, this.props.details);
		}
		this.props.clear();
		this.props.history.goBack();
	}
	
	back(e) {
		e.preventDefault();
		this.props.clear();
		this.props.history.goBack();
	}
	
	render() {
		if (!this.props.details) {
			return <h1>Loading</h1>
		}
		return (
			<div>
				<form onSubmit={this.update}>
					reference: <input type="text" name="reference" id="edit-reference" placeholder="Reference" data-item="reference" onChange={this.updateField} defaultValue={this.props.details.reference} />
					description: <input type="text" name="description" id="edit-description" placeholder="Description" data-item="description" onChange={this.updateField} defaultValue={this.props.details.description} />
					<button type="submit">Create</button>
				</form>
				<button onClick={this.back}>Back</button>
			</div>
		);
	}
}