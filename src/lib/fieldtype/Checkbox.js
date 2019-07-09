import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Checkbox as CheckboxField } from 'office-ui-fabric-react/lib/Checkbox';

const Checkbox = ({name, label, value, update, readOnly, ...remainingProps}) => (
	<CheckboxField 
		label={label} 
		checked={value} 
		onChange={update} 
		{...remainingProps}
	/>
);

Checkbox.defaultProps = {
	value: false
}

Checkbox.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	value: PropTypes.bool,
	update: PropTypes.func
};

export default Checkbox;