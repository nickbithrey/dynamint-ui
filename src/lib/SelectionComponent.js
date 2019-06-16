import React from 'react';
import PropTypes from 'prop-types';
import Table from '~/lib/Table';
import { Link } from 'react-router-dom';
import Button from '~/lib/Button';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

const SelectionComponent = ({title, list, loadList, columns, createBtn, editBtn}) => (
	<div>
		{renderTitle(title)}
		{renderSelectionTable(list, loadList, columns)}
		<Stack horizontalAlign={'end'}>
			<Stack horizontal tokens={{childrenGap: 5}} horizontal-align="space-between">
				{renderButtons([editBtn, createBtn])}
			</Stack>
		</Stack>
	</div>
);

const renderTitle = (title) => {
	if (title) {
		return <h1>{title}</h1>
	}
};

const renderSelectionTable = (list, loadList, columns) => (
	<Table list={list} load={loadList} columns={columns}></Table>
);

const renderButtons = (buttons = []) => (
	buttons.map((btn, i) => <Link key={i} to={btn.to}><Button text={btn.text} /></Link>)
);

SelectionComponent.propTypes = {
	title: PropTypes.string,
	list: PropTypes.array,
	loadList: PropTypes.func,
	columns: PropTypes.array,
	createBtn: PropTypes.object,
	editBtn: PropTypes.object
};

export default SelectionComponent;
