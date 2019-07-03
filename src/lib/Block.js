import React from 'react';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

const Block = ({children, ...remainingProps}) => (
	<Stack.Item {...remainingProps}>
		{children}
	</Stack.Item>
);

export default Block;