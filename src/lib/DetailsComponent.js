import React from 'react';
import PropTypes from 'prop-types';
import Button from '~/lib/Button';
import Loading from '~/lib/Loading';

const detailsComponent = (WrappedComponent) => {
	class DetailsComponent extends React.Component {
		
		constructor(props) {
			super(props);
			this.load = this.load.bind(this);
			this.renderTitle = this.renderTitle.bind(this);
			this.renderBackBtn = this.renderBackBtn.bind(this);
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
					<WrappedComponent fieldUpdate={this.handleUpdateField} update={this.handleUpdate} {...remainingProps} />
					{this.renderBackBtn()}
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
		
		renderBackBtn() {
			return (
				<Button text="Back" onClick={this.back} />
			);
		}
		
	}

	DetailsComponent.propTypes = {
			load: PropTypes.func.isRequired,
			loading: PropTypes.bool.isRequired,
			history: PropTypes.object.isRequired,
			record: PropTypes.object,
			title: PropTypes.string.isRequired,
			url: PropTypes.string
	};
	
	return DetailsComponent;
}

export default detailsComponent;