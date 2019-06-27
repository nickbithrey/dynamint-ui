import React from 'react';
import Button from '~/lib/Button';
import Field from '~/lib/Field';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { GroupedList, IGroup, IGroupHeaderProps, IGroupFooterProps } from 'office-ui-fabric-react/lib/GroupedList';
import ModelAttribute from './ModelAttribute';

export default class ModelDetails extends React.Component {

	constructor(props) {
		super(props);
		this.updateField = this.updateField.bind(this);
		this.updateAttributes = this.updateAttributes.bind(this);
		this.update = this.update.bind(this);
		this.back = this.back.bind(this);
		this.create = this.props.match.params.type === 'create';
		if (props.location.state) {
			this.uri = this.props.location.state.uri;
			this.id = props.location.state.id;
		} else {
			this.id = null;
			this.uri = null;
		}
	}
	
	componentDidMount() {
		if (!this.props.details) {
			this.props.load(this.uri);
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
			this.props.update(this.uri, this.props.details);
		}
		this.props.clear();
		this.props.history.goBack();
	}
	
	updateAttributes(attrs) {
		this.props.updateField({attributes: attrs});
	}
	
	back(e) {
		e.preventDefault();
		this.props.clear();
		this.props.history.goBack();
	}
	
	render() {
		if (!this.props.details || Object.keys(this.props.details).length === 0) {
			return <h1>Loading</h1>
		}
		let attributes = this.props.details.attributes;
		if (!attributes) {
			attributes = [];
		}
		return (
				<div>
					<form>
						<Stack maxWidth={600}>
							<Field label="Reference" value={this.props.details.reference} update={this.updateField} name="reference" />
							<Field label="Description" value={this.props.details.description} update={this.updateField} name="description" />
						</Stack>
						<Stack maxWidth={600}>
							<ModelAttribute attributes={attributes} updateAttributes={this.updateAttributes} componentConfigurationUri={this.uri} />
						</Stack>
						<Button text="Save" onClick={this.update} />
						<Button text="Back" onClick={this.back} />
					</form>
				</div>
			);
	}
						
}