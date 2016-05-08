import React, {Component} from 'react';
import submitOnChange from 'redux-submitform-onchange';
import FileInput from 'electron-file-input';

const FieldError = ({field}) =>
	<span className="field-error">
		{field.touched && field.error || '\u00a0'}
	</span>
;

FieldError.propTypes = {
	field: React.PropTypes.object
};

const Passphrase = ({field, authType, onChange}) =>
	<input
		type="text"
		disabled={authType !== 'keyfile'}
		className="form-control"
		{...field}
		onChange={onChange(field)}
		/>
;

Passphrase.propTypes = {
	field: React.PropTypes.object,
	authType: React.PropTypes.oneOf(['keyfile', 'password']),
	onChange: React.PropTypes.func
};

const Keyfile = ({field, authType, onChange, dispatch}) => {
	const onChangeFile = value => {
		onChange(field);
		dispatch(field.onChange({value}));
	};

	return (<FileInput
		disabled={authType !== 'keyfile'}
		className="form-control"
		{...field}
		onChangeFile={onChangeFile}
		/>);
};

Keyfile.propTypes = {
	field: React.PropTypes.object,
	authType: React.PropTypes.oneOf(['keyfile', 'password']),
	onChange: React.PropTypes.func,
	dispatch: React.PropTypes.func
};

const Password = ({field, authType, onChange}) =>
	<input
		type="password"
		className="form-control"
		disabled={authType !== 'password'}
		{...field}
		onChange={onChange(field)}
		/>
;

Password.propTypes = {
	field: React.PropTypes.object,
	authType: React.PropTypes.oneOf(['keyfile', 'password']),
	onChange: React.PropTypes.func
};

const AuthTypeKeyfile = ({field, onChange}) =>
	<label>
		<input
			type="radio" {...field}
			value="keyfile"
			checked={field.value === 'keyfile'}
			onChange={onChange(field)}
			/>
		Key file
	</label>
;

AuthTypeKeyfile.propTypes = {
	field: React.PropTypes.object,
	onChange: React.PropTypes.func
};

const AuthTypePassword = ({field, onChange}) =>
	<label>
		<input
			type="radio"
			{...field}
			value="password"
			onChange={onChange(field)}
			checked={field.value === 'password'}
			/>
		Password
	</label>
;

AuthTypePassword.propTypes = {
	field: React.PropTypes.object,
	onChange: React.PropTypes.func
};

const UserName = ({field, onChange}) =>
	<div className="form-group user-name">
		<label>User</label>
		<input
			type="text"
			className="form-control"
			{...field}
			onChange={onChange(field)}
			/>
		<FieldError field={field}/>
	</div>
;

UserName.propTypes = {
	field: React.PropTypes.object,
	onChange: React.PropTypes.func
};

const Name = ({field, onChange}) =>
	<div className="form-group">
		<input
			{...field}
			type="text"
			className="form-control"
			onChange={onChange(field)}
			/>
		<FieldError field={field}/>
	</div>
;

Name.propTypes = {
	field: React.PropTypes.object,
	onChange: React.PropTypes.func
};

const OpenOnStart = ({field, onChange}) =>
	<div className="form-group open-on-start">
		<label>Open on startup</label>
		<input
			type="checkbox"
			className="form-control"
			{...field}
			onChange={onChange(field)}
			/>
	</div>
;

OpenOnStart.propTypes = {
	field: React.PropTypes.object,
	onChange: React.PropTypes.func
};

const fieldWrapper = {
	display: 'inline-block',
	verticalAlign: 'top'
};

const HostAddress = ({field, onChange, asyncValidating}) =>
	<div style={fieldWrapper} className="hostAddress">
		<input
			type="text"
			className="form-control"
			{...field}
			onChange={onChange(field)}
			/>
		{
			asyncValidating === 'hostAddress' &&
				<i className="fa fa-lg fa-refresh fa-spin"/>
		}
		<FieldError field={field}/>
	</div>
;

HostAddress.propTypes = {
	field: React.PropTypes.object,
	onChange: React.PropTypes.func,
	asyncValidating: React.PropTypes.string
};

const RemotePort = ({field, onChange}) =>
	<div style={fieldWrapper} className="remotePort">
		<input
			type="number"
			className="form-control"
			{...field}
			onChange={onChange(field)}
			/>
		<FieldError field={field}/>
	</div>
;

RemotePort.propTypes = {
	field: React.PropTypes.object,
	onChange: React.PropTypes.func
};

const LocalPort = ({field, onChange}) =>
	<div style={fieldWrapper} className="localPort">
		<input
			type="number"
			className="form-control"
			{...field}
			onChange={onChange(field)}
			/>
		<FieldError field={field}/>
	</div>
;

LocalPort.propTypes = {
	field: React.PropTypes.object,
	onChange: React.PropTypes.func
};

export default class EditTunnel extends Component {
	render() {
		const f = this.props.fields;
		const onChange = submitOnChange(this.props, {
			throttlig: 100,
			onSubmitted: this.props.onSaveTunnel
		});

		return (
			<form className="padded">
				<h1>Name</h1>

				<Name field={f.name} onChange={onChange}/>
				<OpenOnStart field={f.openOnStart} onChange={onChange}/>

				<h1>Connection</h1>

				<div className="form-group">
					<HostAddress
						field={f.hostAddress}
						onChange={onChange}
						asyncValidating={this.props.asyncValidating}
						/>
					<span className="gliph">:</span>
					<RemotePort field={f.remotePort} onChange={onChange}/>
					<span className="gliph">&#x2192;</span>
					<LocalPort field={f.localPort} onChange={onChange}/>
				</div>

				<h1>Authorization</h1>
				<UserName field={f.userName} onChange={onChange}/>

				<div className="radio auth-methods">
					<div>
						<AuthTypePassword field={f.authType} onChange={onChange}/>
						<Password
							field={f.password}
							authType={f.authType.value}
							onChange={onChange}
							/>
						<FieldError field={f.password}/>
					</div>
					<div>
						<label className="passphrase-label">Passphrase</label>
					</div>
				</div>

				<div className="radio auth-methods">
					<div>
						<AuthTypeKeyfile field={f.authType} onChange={onChange}/>
						<Keyfile
							field={f.keyFile}
							authType={f.authType.value}
							onChange={onChange}
							dispatch={this.props.dispatch}
							/>
						{
							this.props.asyncValidating === 'keyFile' &&
								<i className="fa fa-lg fa-refresh fa-spin"/>
						}
						<FieldError field={f.keyFile}/>
					</div>
					<div>
						<Passphrase
							field={f.passphrase}
							authType={f.authType.value}
							onChange={onChange}
							/>
						<FieldError field={f.passphrase}/>

					</div>
				</div>
			</form>
		);
	}
}

EditTunnel.propTypes = {
	fields: React.PropTypes.object,
	onChange: React.PropTypes.func,
	dispatch: React.PropTypes.func,
	onSaveTunnel: React.PropTypes.func,
	asyncValidating: React.PropTypes.string
};
