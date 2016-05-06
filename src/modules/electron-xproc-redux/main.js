const ipcMain = require('electron').ipcMain;

const sendActions = (actionTypes = [], wins = []) => () => next => action => {
	const result = next(action);
	console.log('main: sendActions', action)

	if (actionTypes.indexOf(action.type) !== -1) {
		wins
			.map(w => w.webContents)
			.forEach(wc => wc.send('xproc-redux', action));
	}

	return result;
};

const receiveActions = dispatch => {
	ipcMain.on('xproc-redux', (event, arg) => {
		console.log('main: receiveActions', arg)

		dispatch(arg);
	});
};

module.exports = {sendActions, receiveActions};

