import { connect } from 'react-redux';
import App from '../components/App';
import {
  addTunnel, editTunnel, saveTunnel
} from '../action-creators';

const mapStateToProps = state => {
  return {
    list: state.list,
    form: state.form,
    wholeState: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddTunnel: () => dispatch(addTunnel()),
    onSaveTunnel: tunnel => dispatch(saveTunnel(tunnel)),
    onEditTunnel: id => () => {
      dispatch(editTunnel(id));
    }
  };
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;
