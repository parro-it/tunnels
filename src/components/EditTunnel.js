import React, { Component } from 'react';
import submitOnChange from 'redux-submitform-onchange';

const Passphrase = ({field, authType, onChange}) =>
  <input
    type="text"
    disabled={authType !== 'keyfile'}
    className="form-control"
    { ...field }
    onChange = { onChange(field) }
  />
;

const Keyfile = ({field, authType, onChange}) =>
  <input
    type="text"
    disabled={authType !== 'keyfile'}
    className="form-control"
    { ...field }
    onChange = { onChange(field) }
  />
;

const Password = ({field, authType, onChange}) =>
  <input
    type="password"
    className="form-control"
    disabled={authType !== 'password'}
    { ...field }
    onChange = { onChange(field) }
  />
;

const AuthTypeKeyfile = ({field, onChange}) =>
  <label>
    <input
      type="radio" { ...field }
      value="keyfile"
      checked={field.value === 'keyfile'}
      onChange = { onChange(field) }
    />
    Key file
  </label>
;

const AuthTypePassword = ({field, onChange}) =>
  <label>
    <input
      type="radio"
      {...field}
      value="password"
      onChange = { onChange(field) }
      checked={field.value === 'password'}
    />
    Password
  </label>
;

const UserName = ({field, onChange}) =>
  <div className="form-group user-name">
    <label>User</label>
    <input
      type="text"
      className="form-control"
      { ...field }
      onChange = { onChange(field) }
    />
  </div>
;

const Name = ({field, onChange}) =>
  <div className="form-group">
    <input
      { ...field }
      type="text"
      className="form-control"
      onChange = { onChange(field) }
    />
    {field.touched && field.error && <span>{field.error}</span>}
  </div>
;

const OpenOnStart = ({field, onChange}) =>
  <div className="form-group open-on-start">
    <label>Open on startup</label>
    <input type="checkbox" className="form-control"
      { ...field }
      onChange = { onChange(field) }
      />
  </div>
;

const HostAddress = ({field, onChange}) =>
  <input
    type="text"
    className="form-control"
    { ...field }
    onChange = { onChange(field) }
  />
;

const RemotePort = ({field, onChange}) =>
  <input
    type="number"
    className="form-control"
    { ...field }
    onChange = { onChange(field) }
  />
;

const LocalPort = ({field, onChange}) =>
  <input
    type="number"
    className="form-control"
    { ...field }
    onChange = { onChange(field) }
  />
;

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
          <HostAddress field={f.hostAddress} onChange={onChange}/>
          <RemotePort field={f.remotePort} onChange={onChange}/>
          &#x2192;
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
            />

          </div>
          <div>
            <Passphrase
              field={f.passphrase}
              authType={f.authType.value}
              onChange={onChange}
            />
          </div>
        </div>
      </form>
    );
  }
}
