import React from 'react';
import PropTypes from 'prop-types';
import Field from '~/lib/Field';

export const columns = [
    {key: 'name', name: 'Name', fieldName: 'name', minWidth: 50, maxWidth: 150},
    {key: 'type', name: 'Type', fieldName: 'type', maxWidth: 50},
    {key: 'required', name: 'Required', fieldName: 'required', type: 'boolean', maxWidth: 10},
    {key: 'pathParameter', name: 'Path Parameter', fieldName: 'pathParameter', type: 'boolean', maxWidth: 10},
    {key: 'defaultValue', name: 'Default', fieldName: 'defaultValue', maxWidth: 150}
];

const Attribute = ({name, type, required, pathParameter, defaultValue, updateField}) => {
	return (
		<div>
			<Field
				name="name"
				label="Name"
				value={name}
				update={updateField}
			/>
			<Field
				name="type"
				label="Type"
				value={type}
				update={updateField}
			/>
			<Field
				type="check"
				name="required"
				label="Required"
				value={required}
				update={updateField}
			/>
			<Field
				type="check"
				name="pathParameter"
				label="Path Parameter"
				value={pathParameter}
				update={updateField}
			/>
			<Field
				name="defaultValue"
				label="Default"
				value={defaultValue}
				update={updateField}
			/>
		</div>
	);
}

Attribute.defaultProps = {
	required: false,
	readOnly: false
}

Attribute.propTypes = {
	name: PropTypes.string,
	type: PropTypes.string,
	required: PropTypes.bool.isRequired,
	updateField: PropTypes.func.isRequired,
	readOnly: PropTypes.bool.isRequired
}

export default Attribute;