import React from 'react';
import { remote } from 'electron';


export default function FileInput(props) {

  function onContext(ev) {
    const menu = remote.Menu.buildFromTemplate([{
      label: 'Reset',
      click: () => {
        ev.target.setAttribute('value', '');
      },
    }]);
    menu.popup(remote.getCurrentWindow());
  }

  function onClick(ev) {
    const file = remote.dialog.showOpenDialog({
      properties: [
        'openFile'
        // ,'openDirectory', 'multiSelections'
      ]
    });

    if (file !== undefined) {
      ev.target.setAttribute('value', file);
    }

  }

  return <input
    readOnly
    type = "text"
    style = {{textOverflow: 'ellipsis'}}
    onContextMenu = { onContext }
    onClick = { onClick }
    {...props}
  />;
}
