import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';

class Field extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {key: props.name, value: props.value};
		this.updateValue = this.updateValue.bind(this);
		this.update = this.update.bind(this);
	}
	
	updateValue(e) {
		e.preventDefault();
		this.setState({...this.state, value: e.target.value});
	}
	
	update(e) {
		this.props.update({[this.state.key]: this.state.value}, e);
	}
	
	render() {
		if (this.props.checkbox) {
			return <Checkbox {...this.props} defaultChecked={this.state.value} onChange={this.updateValue} onBlur={this.update} />
		}
		return (
			<TextField {...this.props} value={this.state.value} onChange={this.updateValue} onBlur={this.update} />
		);
	}
	
}

Field.propTypes = {
	name: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.number,
				PropTypes.bool
			]).isRequired,
	update: PropTypes.func.isRequired,
	checkbox: PropTypes.bool
}

export default Field;