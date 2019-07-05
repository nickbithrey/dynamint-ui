import React from 'react';
import PropTypes from 'prop-types';

const SelectorTitle = ({title}) => {
	if (title) {
		return (
			<div>
				<h1>{title}</h1>
			</div>
		);
	}
	return <div />
}

SelectorTitle.propTypes = {
	title: PropTypes.string
};

export default SelectorTitle;