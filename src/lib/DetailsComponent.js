import React from 'react';
import PropTypes from 'prop-types';
import { newBtn, newPrimaryBtn } from '~/lib/Button';
import Loading from '~/lib/Loading';
import { Rowise, Block } from '~/lib/Grid';
import ButtonsContainer from '~/lib/ButtonsContainer';

const detailsComponent = (WrappedComponent) => {
	class DetailsComponent extends React.Component {
		
		constructor(props) {
			super(props);
			this.load = this.load.bind(this);
			this.renderTitle = this.renderTitle.bind(this);
			this.createBackBtn = this.createBackBtn.bind(this);
			this.createSaveBtn = this.createSaveBtn.bind(this);
			this.back = this.back.bind(this);
			this.handleUpdateField = this.handleUpdateField.bind(this);
			this.handleUpdate = this.handleUpdate.bind(this);
			this.uri = props.location.state.uri;
			this.isCreate = props.location.state.isCreate;
		}
		
		load() {
			this.props.load(this.uri, this.isCreate);
		}
		
		componentDidMount() {
			this.load();
		}
		
		componentWillUnmount() {
			this.props.clear();
		}
		
		handleUpdateField(field) {
			this.props.updateField(field);
		}
		
		handleUpdate(e) {
			e.preventDefault();
			this.props.update(this.props.record, this.uri, this.isCreate)
			this.back();
		}
		
		createSaveBtn() {
			return newPrimaryBtn('Save', this.handleUpdate);
		}
		
		render() {
			if (this.props.loading || !this.props.record) {
				return <Loading />
			}
			const {
				updateField,
				update,
				...remainingProps
			} = this.props;
			return (
				<div>
					{this.renderTitle()}
					<Rowise tokens={{childrenGap: 5}}>
						<Block>
							<WrappedComponent fieldUpdate={this.handleUpdateField} update={this.handleUpdate} {...remainingProps} />
						</Block>
						<Block>
							<ButtonsContainer buttons={[this.createSaveBtn(), this.createBackBtn()]} />
						</Block>
					</Rowise>
				</div>
			);
		}
		
		renderTitle() {
			const {
				title
			} = this.props;
			return <h1>{title}</h1>;
		}
		
		back() {
			const {
				history
			} = this.props;
			history.goBack();
		}
		
		createBackBtn() {
			return newBtn('Back', this.back);
		}
		
	}

	DetailsComponent.propTypes = {
		load: PropTypes.func.isRequired,
		clear: PropTypes.func.isRequired,
		update: PropTypes.func.isRequired,
		updateField: PropTypes.func.isRequired,
		loading: PropTypes.bool.isRequired,
		history: PropTypes.object.isRequired,
		record: PropTypes.object,
		title: PropTypes.string.isRequired,
		url: PropTypes.string
	};
	
	return DetailsComponent;
}

export default detailsComponent;