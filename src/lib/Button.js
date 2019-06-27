import React from 'react';
import PropTypes from 'prop-types';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

const Button = ({text, onClick}) => (
	<PrimaryButton text={text} onClick={onClick} />
);

Button.propTypes = {
	text: PropTypes.string.isRequired,
	onClick: PropTypes.func
}

export default Button;