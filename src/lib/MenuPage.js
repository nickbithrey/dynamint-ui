import React from 'react';
import { Route, Switch } from 'react-router-dom';

export default function(routes) {
	return <MenuPage routes={routes} />
}

export const MenuPage = ({routes}) => (
	<div>
		<Switch>
			{mapRoutes(routes)}
		</Switch>
	</div>
);

function mapRoutes(routes) {
	return routes.map(mapRoute);
}

function mapRoute(route) {
	return <Route key={route.path} exact={route.exact} path={route.path} component={route.component} />
}