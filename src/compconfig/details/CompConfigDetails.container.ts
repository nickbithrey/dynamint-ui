import Details from './CompConfigDetails';
import { connect } from 'react-redux';
import { withLoading } from 'lib/loading';
import State, { AppDetailsState } from '~/redux/ApplicationState';
import { ICompConfig } from 'model/compconfig';
import { ThunkDispatch } from 'redux-thunk';
import { load, update } from './action';
import { History, Location } from 'history';
import { URI, Display } from '~/lib';
import * as AppActions from 'app/action';

const convoKey = 'compConfigDetails';

const initialState: State = {
    app: {
    },
    model: {
        compConfig: {}
    }
};

interface OwnProps {
    history: History;
    location: Location<URI & Display>;
}

const mapStateToProps = ( state: State = initialState, ownProps: OwnProps) => {
    const convo = state.app[convoKey] as AppDetailsState;
    return {
        id: ownProps.location.state.uri,
        item: convo ? convo.item : {}, 
        loading: !convo || convo.loading
    };
}

const mapDispatchToProps = ( dispatch: ThunkDispatch<{}, {}, any>, ownProps: OwnProps) => {
    return {
        load: (id: string) => dispatch( load(id) ),
        update: (item: ICompConfig) => dispatch( update(item) ),
        back: () => {
            ownProps.history.goBack();
            dispatch( AppActions.clear(convoKey) );
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withLoading(Details));