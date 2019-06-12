import React from 'react';
import PropTypes from 'prop-types';

const TableRow = ({record = []}) => (
	<tr>
		{record.map((r,i) => <td key={i}>{r}</td>)}
	</tr>
);

TableRow.propTypes = {
	record: PropTypes.arrayOf(PropTypes.node)
}

export default TableRow;