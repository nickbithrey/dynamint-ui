import React from 'react';
import PropTypes from 'prop-types';
import fieldTypes from './fieldtype';

export default class Field extends React.Component {
	
	constructor(props) {
		super(props);
		this.update = this.update.bind(this);
	}
	
	update(e, newVal) {
		this.props.update({
			name: this.props.name,
			value: newVal,
			e: e
		})
	}
	
	render() {
		const {
			type,
			update,
			...remainingProps
		} = this.props;
		const Tag = fieldTypes[type];
		return <Tag update={this.update} {...remainingProps} />
	}
	
}

const possibleTypes = [
	PropTypes.string,
	PropTypes.bool
];

Field.defaultProps = {
	readOnly: true,
	type: 'text'
};

Field.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	value: PropTypes.oneOfType([...possibleTypes, PropTypes.arrayOf(possibleTypes)]),
	readOnly: PropTypes.bool.isRequired,
	update: PropTypes.func.isRequired,
	type: PropTypes.oneOf(Object.keys(fieldTypes)).isRequired
};
