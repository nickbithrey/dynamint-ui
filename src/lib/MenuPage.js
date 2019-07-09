import React from 'react';
import { Route, Switch } from 'react-router-dom';

const MenuPage = ({routes}) => (
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

export default MenuPage;