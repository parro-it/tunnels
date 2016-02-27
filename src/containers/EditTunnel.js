import EditTunnel from '../components/EditTunnel';
import {reduxForm} from 'redux-form';
import validate from '../model/validate-tunnel';

const fields = [
  'name',
  'openOnStart',
  'hostAddress',
  'remotePort',
  'localPort',
  'userName',
  'password',
  'keyFile',
  'id',
  'authType',
  'passphrase'
];

function mapStateToProps(state) {
  const initialValues = state.list.reduce((editing, t) => {
    if (editing) {
      return editing;
    }

    if (t.id === state.list.active || !state.list.active) {
      return t;
    }

    return null;
  }, null);

  return {
    initialValues
  };
}

export default reduxForm({
  form: 'tunnel',
  fields,
  validate
}, mapStateToProps )(EditTunnel);
