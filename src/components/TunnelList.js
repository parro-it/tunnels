import React from 'react';

export default ({ list, onEditTunnel }) => (
  <nav className="nav-group">
    <h5 className="nav-group-title">Tunnels</h5>
    { list.map( t => (
      <span
        key = { t.id }
        className = "nav-group-item tunnel"
        onClick = { onEditTunnel(t.id) }
      >

        <span className="icon icon-record status"></span>
        <span className="tunnelName"> { t.name } </span>
        <span className="pull-right icon icon-dot-3 menu-actions"></span>
      </span>
    ))}

  </nav>
);
