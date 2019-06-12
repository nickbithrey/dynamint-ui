import React from 'react';
import ModelRecord from './ModelRecord';
import Table from '~/lib/Table';
import ModelDetails from './ModelDetails';
import { Route, Link } from 'react-router-dom';


export const Model = ({load, create, models = {models:null}}) => (
	<div>
		<h1>Models</h1>
		<Table list={models.models} load={load} tag={ModelRecord}></Table>
		<Link to="/models/create">Create</Link>
		<Route path="/models/:type" render={props => <ModelDetails update={create} {...props}/>}></Route>
	</div>
);

export default Model;