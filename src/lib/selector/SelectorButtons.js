import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../Button';
import ButtonsContainer from '../ButtonsContainer';

const SelectorButtons = ({buttons, selection}) => (
	<ButtonsContainer>
		{buttons.map(btn => btn.build()).filter(btn => btn.condition(selection)).map((btn, i) => renderButton(btn, i, selection))}
	</ButtonsContainer>
);

function renderButton(btn, i, selection) {
	let to = {
		pathname: btn.pathname,
		state: btn.stateFn(selection)
	};
	return <Link key={i} to={to}><Button text={btn.text} /></Link>
}

SelectorButtons.defaultProps = {
	buttons: []
};

SelectorButtons.propTypes = {
	buttons: PropTypes.array.isRequired,
	selection: PropTypes.object.isRequired
};

export default SelectorButtons;