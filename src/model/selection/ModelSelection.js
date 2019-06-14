import React from 'react';
import ModelRecord from './ModelRecord';
import Table from '~/lib/Table';
import { Link } from 'react-router-dom';


export const ModelSelection = ({load, models = {models:null}}) => (
	<div>
		<h1>Models</h1>
		<Table list={models.models} load={load} tag={ModelRecord}></Table>
		<Link to={{
			pathname: "/models/create",
			state: {}}}>Create</Link>
		<Link to={{
			pathname: "/models/edit",
			state: {id: 1}}}>Edit</Link>
	</div>
);

export default ModelSelection;