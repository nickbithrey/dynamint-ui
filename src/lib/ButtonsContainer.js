import React from 'react';
import Btn from '~/lib/Button';
import { Columnar, Block } from '~/lib/Grid';

const ButtonsContainer = ({children = [], buttons = []}) => (
	<Columnar horizontalAlign={'end'} tokens={{childrenGap: 5}}>
		{renderChildren(children)}
		{buttons.map(renderButton)}
	</Columnar>
);

const renderChildren = (children) => {
	if (Array.isArray(children)) {
		return children.map(renderChild)
	} else if (children) {
		return renderChild(children, 0);
	}
}

const renderChild = (child, i) => (
	<Block key={i}>
		{child}
	</Block>
);

const renderButton = (button, i) => {
	if (!button.condition()) {
		return;
	}
	return (
		<Block key={i}>
			<Btn {...button} />
		</Block>
	);
}

export default ButtonsContainer;