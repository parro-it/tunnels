'use strict';
const electron = require('electron');
const electronDebug = require('electron-debug');
const window = require('electron-window');
const debug = require('debug')('tunnels');
const debugMenu = require('debug-menu');

const reduxMain = require('./redux-main');

const Menu = electron.Menu;
const Tray = electron.Tray;

let listWindow;
let closingApp = false;
let appIcon;

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
		height: 620,
		minimizable: false,
		maximizable: false,
		titleBarStyle: process.platform === 'darwin' ? 'hidden' : undefined,
		resizable: false,
		fullscreenable: false,
		icon: `${__dirname}/src/IconTemplate.png`
	});

	debug('listWindow created');

	electron.app.on('before-quit', closeWindow);
	listWindow.on('close', preventMainWindowClose);

	if (process.platform === 'darwin') {
		Menu.setApplicationMenu(buildMenu());
	} else {
		listWindow.setMenu(buildMenu());
	}

	const indexPath = `${__dirname}/src/index.html`;
	// listWindow._loadUrlWithArgs(indexPath, () => {});
	listWindow.showUrl(indexPath, () => {});
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
	appIcon = new Tray(`${__dirname}/src/IconTemplate.png`);
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

	reduxMain(listWindow, appIcon);
	debug('redux started in main process.');
};

const handleError = err => {
	console.error(err);
	electron.dialog.showErrorBox(
		'Unexpected error during ui setup',
		err.stack
	);
	electron.app.exit(-1);
};

try {
	electronDebug();
	makeSingleInstanceApp();
	// electron.BrowserWindow.addDevToolsExtension(`${__dirname}/node_modules/devtron`);

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
} catch (err) {
	handleError(err);
}

