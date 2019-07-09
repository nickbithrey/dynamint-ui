// js imports
import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Provider } from 'react-redux';

import store from './redux/store';

import CompConfig from './componentconfiguration';
import Nav from './nav';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { Columnar, Block } from '~/lib/Grid';

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
			<Columnar tokens={tokens.headingStack}>
				<Block>
					<Nav history={props.history} />
				</Block>	
				<Block grow>	
					<Route path="/compconfigs" component={CompConfig} store={store}></Route>
				</Block>
			</Columnar>
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