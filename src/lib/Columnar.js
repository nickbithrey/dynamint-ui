import React from 'react';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

const Columnar = ({children, ...remainingProps}) => (
	<Stack horizontal horizontalAlign="space-between" {...remainingProps}>
		{children}
	</Stack>
);

export default Columnar;