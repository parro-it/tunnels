import {reduxForm} from 'redux-form';

import EditTunnel from '../components/edit-tunnel';
import {validate, asyncValidate} from '../model/validate-tunnel';
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
	asyncValidate,
	asyncBlurFields: ['hostAddress', 'keyFile'],
	validate
}, mapStateToProps)(EditTunnel);
