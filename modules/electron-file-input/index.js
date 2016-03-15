import React from 'react';
import { remote } from 'electron';

export default function FileInput(props) {

  const onContext = () => {
    const menu = remote.Menu.buildFromTemplate([{
      label: 'Reset',
      click: () => {
        props.onChangeFile('');
      },
    }]);
    menu.popup(remote.getCurrentWindow());
  };

  const onClick = () => {
    const file = remote.dialog.showOpenDialog({
      properties: [
        'openFile'
        // ,'openDirectory', 'multiSelections'
      ]
    });

    if (file !== undefined) {
      props.onChangeFile(file[0]);
    }
  };

  return <input
    readOnly
    type = "text"
    style = {{textOverflow: 'ellipsis'}}
    onContextMenu = { onContext }
    onClick = { onClick }
    { ...props }
  />;
}
