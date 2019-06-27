import React from 'react';
import Button from '~/lib/Button';
import Field from '~/lib/Field';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { List } from 'office-ui-fabric-react/lib/List';
import { Link } from 'office-ui-fabric-react/lib/Link';

export default class ModelAttribute extends React.Component {
	
	constructor(props) {
		super(props);
		this.renderCell = this.renderCell.bind(this);
		this.addAttr = this.addAttr.bind(this);
		this.updateAttrField = this.updateAttrField.bind(this);
		this.defaultGroupAttr = this.defaultGroupAttr.bind(this);
		this.state = {groups: []};
	}
	
	defaultGroupAttr(a, i) {
		const collapsed = this.state.groups.includes(g => g.data === a && g.data.isCollapsed)
		return {
			data: a,
			count: 1,
			startIndex: i,
			isCollapsed: !collapsed
		};
	}
	
	componentDidMount() {
		this.setState({
			groups: this.props.attributes.map(this.defaultGroupAttr)
		});
	}
	
	componentDidUpdate() {
		if (this.state.groups.length !== this.props.attributes.length) {
			this.setState({
				groups: this.props.attributes.map(this.defaultGroupAttr)
			});
		}
	}
	
	addAttr(e) {
		e.preventDefault();
		let attributes = this.props.attributes;
		if (!attributes) {
			attributes = [];
		}
		let attr = { componentConfiguration: this.props.componentConfigurationUri };
		attributes.push(attr);
		this.props.updateAttributes(attributes);
	}
	
	updateAttrField(field, e) {
		let attrIndex = e.target.getAttribute('data-index');
		let attrs = this.props.attributes;
		let attr = {...this.props.attributes[attrIndex], ...field};
		attrs[attrIndex] = attr;
		this.props.updateAttributes(attrs);
	}
	
	render() {
		return (
			<div>
				<List
			        items={this.props.attributes}
			        onRenderCell={this.renderCell}
			    />
				<Button text="Add Attribute" onClick={this.addAttr} />
			</div>
		);
	}
	
	renderHeader(props) {
		const toggleCollapse = () => {
			props.onToggleCollapse(props.group);
	    };

	    return (
	    	<h3>Attribute {props.group.data.name} &nbsp; (<Link onClick={toggleCollapse}>{props.group.isCollapsed ? 'Expand' : 'Collapse'}</Link>)</h3>
	    );
	}
	
	renderCell(item, index) {
		return (
			<Stack>
				<h1>Attribute {item.name}</h1>
				<Field label="name" value={item.name} update={this.updateAttrField} name="name" data-index={index} />
				<Field label="type" value={item.type} update={this.updateAttrField} name="type" data-index={index} />
				<Field checkbox label="required" value={item.required} update={this.updateAttrField} name="required" data-index={index} />
				<Field checkbox label="pathParameter" value={item.pathParameter} update={this.updateAttrField} name="pathParameter" data-index={index} />
				<Field label="default" value={item.defaultValue} update={this.updateAttrField} name="default" data-index={index} />
			</Stack>
		);
	}
}