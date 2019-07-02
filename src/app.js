// js imports
import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Provider } from 'react-redux';

import store from './redux/store';

import CompConfig from './componentconfiguration';
import Nav from './nav';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

initializeIcons();

const App = (props) => {
	const tokens = {
		      sectionStack: {
		        childrenGap: 10
		      },
		      headingStack: {
		        childrenGap: 30
		      }
		    };
	return (
		<div>
			<Stack horizontal tokens={tokens.headingStack} horizontalAlign="space-between">
				<Stack.Item>
					<Nav history={props.history} />
				</Stack.Item>	
				<Stack.Item grow>	
					<Route path="/compconfigs" component={CompConfig} store={store}></Route>
				</Stack.Item>
			</Stack>
		</div>
	);
};

const Root = () => (
	<Provider store={store}>
		<Router>
			<div>
				<Route path="/" component={App}></Route>
			</div>
		</Router>
	</Provider>
);

ReactDOM.render(<Root />, document.getElementById("index"));