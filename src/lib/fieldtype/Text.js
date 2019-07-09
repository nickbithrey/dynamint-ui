import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

const Text = ({name, label, value, update, readOnly, ...remainingProps}) => (
	<TextField 
		label={label} 
		defaultValue={value} 
		onBlur={e => update(e, e.target.value)} 
		{...remainingProps}
	/>
);

Text.defaultProps = {
	value: ''
}

Text.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	value: PropTypes.string,
	update: PropTypes.func
};

export default Text;