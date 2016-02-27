import React from 'react';
import electron from 'electron';

const actionsMenuTemplate = (props, tunnel) => [
  {
    label: 'Edit',
    click: () => props.onEditTunnel(tunnel.id)
  }, {
    label: tunnel.open ? 'Close' : 'Open',
    click: () => props.onToggleTunnelState(tunnel)
  }, {
    label: 'Delete',
    click: () => props.onDeleteTunnel(tunnel.id)
  }
];

function StatusIcon({status}) {
  let iconName;
  switch (status) {
    case 'opening':
      iconName = 'icon-arrows-ccw';
      break;
    case 'open':
      iconName = 'icon-record status status-ok';
      break;
    case 'open-failed':
      iconName = 'icon-record status status-error';
      break;
    default:
      iconName = 'icon-record status';
  }

  return <span className={'icon ' + iconName} ></span>;
}

export default (props) => (

  <nav className="nav-group">
    <h5 className="nav-group-title">Tunnels</h5>
    { props.list.map( t => (
      <span
        key = { t.id }
        className = "nav-group-item tunnel"
        onClick = { props.onEditTunnel(t.id) }
      >

        <StatusIcon status = {t.status} />
        <span className="tunnelName"> { t.name } </span>
        <span
          className="pull-right icon icon-dot-3"
          onClick = { () => {
            const menu = actionsMenuTemplate(props, t);
            electron.remote.Menu.buildFromTemplate(menu).popup();
          } }
        ></span>
      </span>
    ))}

  </nav>
);
