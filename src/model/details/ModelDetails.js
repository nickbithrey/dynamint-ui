import React from 'react';
import Button from '~/lib/Button';
import Field from '~/lib/Field';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

export default class ModelDetails extends React.Component {

	constructor(props) {
		super(props);
		this.updateField = this.updateField.bind(this);
		this.update = this.update.bind(this);
		this.back = this.back.bind(this);
		this.create = this.props.match.params.type === 'create';
		this.addAttr = this.addAttr.bind(this);
		this.updateAttrField = this.updateAttrField.bind(this);
		if (props.location.state) {
			this.id = props.location.state.id;
		} else {
			this.id = null;
		}
	}
	
	componentDidMount() {
		if (!this.props.details) {
			this.props.load(this.id);
		}
	}
	
	updateField(field, e) {
		this.props.updateField(field);
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
	
	addAttr(e) {
		e.preventDefault();
		let attributes = this.props.details.attributes;
		if (!attributes) {
			attributes = [];
		}
		attributes.push({});
		this.updateField({attributes: attributes});
	}
	
	updateAttrField(field, e) {
		let attrIndex = e.target.getAttribute('data-index');
		let attrs = this.props.details.attributes;
		let attr = {...this.props.details.attributes[attrIndex], ...field};
		attrs[attrIndex] = attr;
		this.updateField({attributes: attrs});
	}
	
	render() {
		if (!this.props.details) {
			return <h1>Loading</h1>
		}
		let attributes = this.props.details.attributes;
		if (!attributes) {
			attributes = [];
		}
		return (
			<div>
				<form>
					<Stack maxWidth={300}>
						<Field label="Reference" value={this.props.details.reference} update={this.updateField} name="reference" />
						<Field label="Description" value={this.props.details.description} update={this.updateField} name="description" />
					</Stack>
					<Stack>
						{attributes.map((a,i) => <Field label="name" value={a.name} update={this.updateAttrField} name="name" data-index={i} />)}
					</Stack>
					<Button text="Add Attribute" onClick={this.addAttr} />
					<Button text="Create" onClick={this.update} />
					<Button text="Back" onClick={this.back} />
				</form>
			</div>
		);
	}
}