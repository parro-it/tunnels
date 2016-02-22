import React from 'react';
import ssh from '../ssh';
import electron from 'electron';

const actionsMenuTemplate = (props, tunnelId) => [
  {
    label: 'Edit',
    click: () => props.onEditTunnel(tunnelId)
  }, {
    label: ssh.isOpen(tunnelId) ? 'Close' : 'Open',
    click: () => props.onToggleConnection(tunnelId)
  }, {
    label: 'Delete',
    click: () => props.onDeleteTunnel(tunnelId)
  }
];

export default (props) => (

  <nav className="nav-group">
    <h5 className="nav-group-title">Tunnels</h5>
    { props.list.map( t => (
      <span
        key = { t.id }
        className = "nav-group-item tunnel"
        onClick = { props.onEditTunnel(t.id) }
      >

        <span className="icon icon-record status"></span>
        <span className="tunnelName"> { t.name } </span>
        <span
          className="pull-right icon icon-dot-3"
          onClick = { () => {
            const menu = actionsMenuTemplate(props, t.id);
            electron.remote.Menu.buildFromTemplate(menu).popup();
          } }
        ></span>
      </span>
    ))}

  </nav>
);
