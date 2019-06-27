import React from 'react';
import ModelSelection from './selection';
import ModelDetails from './details';
import { Route, Switch } from 'react-router-dom';

export const Model = ({load, create, models = {models:null}}) => (
	<div>
		<Switch>
			<Route exact path="/models" component={ModelSelection}></Route>
			<Route path="/models/:type" component={ModelDetails}></Route>
		</Switch>
	</div>
);

export default Model;