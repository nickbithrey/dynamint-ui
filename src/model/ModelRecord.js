import React from 'react';
import TableRow from '~/lib/TableRow';

const ModelRecord = ({reference, description, status}) => (
		<TableRow record={[reference, description, status]}></TableRow>
);

export default ModelRecord;