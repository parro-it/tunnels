import EditTunnel from '../components/EditTunnel';
import {reduxForm} from 'redux-form';
import validate from '../model/validate-tunnel';
import fields from '../model/tunnel-fields';

function mapStateToProps(state) {
  return {
    initialValues: state.list.find(
      t => t.id === state.list.active
    )
  };
}

export default reduxForm({
  form: 'tunnel',
  fields,
  validate
}, mapStateToProps )(EditTunnel);
