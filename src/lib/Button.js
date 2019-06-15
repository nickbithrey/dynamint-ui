import React from 'react';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

const Button = ({text, onClick}) => (
	<PrimaryButton text={text} onClick={onClick} />
);

export default Button;