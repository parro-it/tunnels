import React from 'react';
import { remote } from 'electron';
import context from 'electron-contextmenu-middleware';

const inputs = new WeakMap();

context.use(({elm, menu}, next) => {
  if (inputs.has(elm)) {
    menu.push({
      label: 'Reset',
      enabled: !elm.disabled,
      click: () => {
        inputs.get(elm).onChangeFile('');
      }
    });
  }
  next();
});

export default function FileInput(props) {

  const onClick = e => {
    if (e.target.disabled) {
      return;
    }

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
    ref={ input => {
      if (input != null) {
        inputs.set(input, props);
      }
    }}
    readOnly
    type = "text"
    style = {{textOverflow: 'ellipsis'}}
    onClick = { onClick }
    { ...props }
  />;
}
