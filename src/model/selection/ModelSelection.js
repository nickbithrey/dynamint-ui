import React from 'react';
import ModelRecord from './ModelRecord';
import Table from '~/lib/Table';
import { Link } from 'react-router-dom';
import Button from '~/lib/Button';

export const ModelSelection = ({load, models = {models:null}}) => (
	<div>
		<h1>Models</h1>
		<Table list={models.models} load={load} tag={ModelRecord}></Table>
		<Link to={{
			pathname: "/models/create",
			state: {}}}><Button text="Create" /></Link>
		<Link to={{
			pathname: "/models/edit",
			state: {id: 1}}}><Button text="Edit" /></Link>
	</div>
);

export default ModelSelection;