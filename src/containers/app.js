import {connect} from 'react-redux';
import App from '../components/app';
import {
	addTunnel, editTunnel, saveTunnel, deleteTunnel, toggleTunnelState
} from '../action-creators';

const mapStateToProps = state => {
	return {
		list: state.list,
		form: state.form,
		statusBar: state.statusBar
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onAddTunnel: () => dispatch(addTunnel()),
		onSaveTunnel: tunnel => dispatch(saveTunnel(tunnel)),
		onDeleteTunnel: id => dispatch(deleteTunnel(id)),
		onToggleTunnelState: tunnel => dispatch(toggleTunnelState(tunnel)),
		onEditTunnel: id => () => dispatch(editTunnel(id))
	};
};

const AppContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

export default AppContainer;