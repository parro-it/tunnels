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
      iconName = 'fa fa-lg fa-refresh fa-spin';
      break;
    case 'open':
      iconName = 'fa fa-lg fa-link status-ok';
      break;
    case 'open-failed':
      iconName = 'fa fa-lg fa-unlink status-error';
      break;
    default:
      iconName = 'fa fa-lg fa-dot-circle-o status';
  }

  return <i className={ iconName } ></i>;
}

export default (props) => (

  <nav className="nav-group">
    <h5 className="nav-group-title">Tunnels</h5>
    { props.list.map( t => (
      <span
        key = { t.id }
        className = {
          'nav-group-item tunnel ' +
          (t.id === props.list.active ? 'active' : '')
        }
        onClick = { props.onEditTunnel(t.id) }
      >

        <StatusIcon status = {t.status} />
        <span className="tunnelName"> { t.name } </span>
        <i className="tunnelMenu fa fa-bars"
          onClick = { () => {
            const menu = actionsMenuTemplate(props, t);
            electron.remote.Menu.buildFromTemplate(menu).popup();
          } }
        ></i>
      </span>
    ))}

  </nav>
);
