import React from 'react';
import PropTypes from 'prop-types';
import { 
	PrimaryButton, 
	DefaultButton, 
	CommandBarButton, 
	IconButton 
} from 'office-ui-fabric-react/lib/Button';

const buttonTypes = {
	standard: DefaultButton,
	primary: PrimaryButton,
	command: CommandBarButton,
	icon: IconButton
};

const Button = ({text, onClick, type}) => {
	const Btn = buttonTypes[type];
	return <Btn text={text} onClick={onClick} />
};

Button.defaultProps = {
	type: 'standard'
};

Button.propTypes = {
	text: PropTypes.string.isRequired,
	onClick: PropTypes.func
}

export default Button;

export const newBtn = (text, onClick, condition = () => true) => (
	{
		text,
		onClick,
		condition,
		type: 'standard'
	}
);

export const newPrimaryBtn = (text, onClick, condition = () => true) => (
	{
		text,
		onClick,
		condition,
		type: 'primary'
	}
);