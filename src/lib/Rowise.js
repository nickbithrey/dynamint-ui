import React from 'react';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

const Rowise = ({children, ...remainingProps}) => (
	<Stack {...remainingProps}>
		{children}
	</Stack>
);

export default Rowise;