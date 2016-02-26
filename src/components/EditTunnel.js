import React, { Component } from 'react';
import submitOnChange from 'redux-submitform-onchange';

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

        <div className="form-group">
          <input
            { ...f.name }
            type="text"
            className="form-control"
            onChange = { onChange(f.name) }
          />
          {f.name.touched && f.name.error && <span>{f.name.error}</span>}
        </div>

        <div className="form-group open-on-start">
          <label>Open on startup</label>
          <input type="checkbox" className="form-control"
            { ...f.openOnStart }
            onChange = { onChange(f.openOnStart) }
            />
        </div>


        <h1>Connection</h1>

        <div className="form-group">
          <input
            type="text"
            className="form-control"
            { ...f.hostAddress }
            onChange = { onChange(f.hostAddress) }
            />
          <input
            type="number"
            className="form-control"
            { ...f.remotePort }
            onChange = { onChange(f.remotePort) }
          />
          &#x2192;
          <input
            type="number"
            className="form-control"
            { ...f.localPort }
            onChange = { onChange(f.localPort) }
          />
        </div>


        <h1>Authorization</h1>

        <div className="form-group user-name">
          <label>User</label>
          <input
            type="text"
            className="form-control"
            { ...f.userName }
            onChange = { onChange(f.userName) }
          />
        </div>

        <div className="radio auth-methods">
          <label>
            <input
              type="radio"
              {...f.authType}
              value="password"
              onChange = { onChange(f.authType) }
              checked={f.authType.value === 'password'}
            />
            Password
          </label>
          <input
            type="password"
            className="form-control"
            disabled={f.authType.value !== 'password'}
            { ...f.password }
            onChange = { onChange(f.password) }
          />
        </div>

        <div className="radio auth-methods">
          <label>
            <input
              type="radio" { ...f.authType }
              value="keyfile"
              checked={f.authType.value === 'keyfile'}
              onChange = { onChange(f.authType) }
            />
            Key file
          </label>
          <input
            type="text"
            disabled={f.authType.value !== 'keyfile'}
            className="form-control"
            { ...f.keyFile }
            onChange = { onChange(f.keyFile) }
          />

        </div>

        <input { ...f.id }  type="hidden"/>

      </form>
    );
  }
}
