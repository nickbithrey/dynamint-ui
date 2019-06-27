import React from 'react';
import { Nav, INavLink } from 'office-ui-fabric-react/lib/Nav';
import { browswerHistory } from 'history';

export const Navigation = ({history}) => {
	const onHeaderClick = (event) => {
	    history.push(event.target.getAttribute('link'));
	}
	const onClick = (event, element) => {
	    history.push(element.link);
	}
  return (
    <Nav
    	initialSelectedKey="home"
    	onLinkClick={onClick}
        expandButtonAriaLabel="Expand or collapse"
        styles={{
          root: {
            width: 200,
            height: 350,
            overflowY: 'auto'
          }
        }}
      groups={[{
        links: [
        {
        	key: 'home',
		   name: 'DynamInt',
		   link: '/'
        },
        {
        	key: 'models',
        	name: 'Models',
        	link: '/models'
        }
        ]
      }]}
    />
  );
};

export default Navigation;