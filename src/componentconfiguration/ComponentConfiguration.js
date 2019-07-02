import React from 'react';
import Selection from './selection';
import Details from './details';
import { Route, Switch } from 'react-router-dom';

export default () => (
	<div>
		<Switch>
			<Route exact path="/compconfig" component={Selection}></Route>
			<Route path="/compconfig/:type" component={Details}></Route>
		</Switch>
	</div>
);