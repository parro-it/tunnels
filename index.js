'use strict';
const electron = require('electron');
const electronDebug = require('electron-debug');
const electronDetach = require('electron-detach');
const window = require('electron-window');
const debug = require('debug')('tunnels');
const debugMenu = require('debug-menu');
const Menu = electron.Menu;
const Tray = electron.Tray;


if (electronDetach({ requireCmdlineArg: false })) {
  let listWindow;
  let closingApp = false;

  const preventMainWindowClose = e => {
    if (closingApp) {
      return;
    }
    debug('preventing window close');
    e.preventDefault();
    listWindow.hide();
  };

  const closeWindow = () => {
    if (listWindow) {
      debug('closeWindow');
      closingApp = true;
      listWindow.close();
      listWindow = null;
    } else {
      debug('closeWindow skipped: listWindow===null');
    }
  };

  const buildMenu = () => Menu.buildFromTemplate([
    {
      label: 'Debug',
      submenu: debugMenu.windowDebugMenu(listWindow)
    }
  ]);

  const openMainWindow = () => {
    debug('openMainWindow');

    listWindow = window.createWindow({
      width: 750,
      height: 530,
      minimizable: false,
      maximizable: false,
      titleBarStyle: process.platform === 'darwin' ? 'hidden' : undefined,
      resizable: true,
      fullscreenable: false,
      skipTaskbar: true,
      type: process.platform === 'linux' ? 'toolbar' : undefined,
      icon: __dirname + '/src/IconTemplate.png'
    });

    debug('listWindow created');

    electron.app.on('before-quit', closeWindow);
    listWindow.on('close', preventMainWindowClose);

    if (process.platform !== 'darwin') {
      listWindow.setMenu(buildMenu());
    } else {
      Menu.setApplicationMenu(buildMenu());
    }

    const indexPath = __dirname + '/src/index.html';
    listWindow.showUrl(indexPath);
    debug('showUrl ' + indexPath);
  };

  const focusMainWindow = () => {
    debug('focusMainWindow - listWindow is null:', listWindow === null);

    if (listWindow) {
      listWindow.show();
    }
  };

  const makeSingleInstanceApp = () => {
    if (electron.app.makeSingleInstance(focusMainWindow)) {
      debug('second app instance called. Exit');
      electron.app.exit(0);
      return;
    }
  };

  const setupTray = () => {
    const appIcon = new Tray(__dirname + '/src/IconTemplate.png');
    const contextMenu = Menu.buildFromTemplate(
      [{
        label: 'Exit',
        click: () => electron.app.quit(0)
      }, {
        label: 'Configure',
        click: focusMainWindow
      }]
    );
    appIcon.setContextMenu(contextMenu);
  };

  const handleError = err =>
    electron.dialog.showErrorBox(
      'Unexpected error during ui setup',
      err.stack
    );

  try {
    electronDebug();
    makeSingleInstanceApp();
  } catch (err) {
    return handleError(err);
  }

  electron.app.on('activate', focusMainWindow);
  electron.app.on('ready', () => {
    try {
      if (process.platform === 'darwin') {
        electron.app.dock.hide();
      }

      openMainWindow();
      setupTray();
    } catch (err) {
      handleError(err);
    }
  });

}

