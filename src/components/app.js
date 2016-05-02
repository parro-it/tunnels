import React from 'react';
import EditTunnel from '../containers/edit-tunnel';
import TunnelList from './tunnel-list';
import StatusBar from './status-bar';

const App = ({
		list,
		statusBar,
		onEditTunnel,
		onSaveTunnel,
		onAddTunnel,
		onDeleteTunnel,
		onToggleTunnelState
	}) => (
	<main className="window">

		<header className="toolbar toolbar-header draggable">
			<h1 className="title visible-darwin">Tunnels</h1>
			<div className="toolbar-actions not-draggable">
				<button
					type="button"
					className="btn btn-default btn-large"
					onClick={onAddTunnel}
					>

					<span className="icon icon-plus"></span>
				</button>

			</div>
		</header>

		<div className="window-content">
			<div className="pane-group">
				<div className="pane pane-sm sidebar">
					<TunnelList
						list={list}
						onEditTunnel={onEditTunnel}
						onDeleteTunnel={onDeleteTunnel}
						onToggleTunnelState={onToggleTunnelState}
						/>
				</div>
				<main className="pane">
					<EditTunnel onSaveTunnel={onSaveTunnel}/>
				</main>
			</div>
		</div>

		<footer className="toolbar toolbar-footer draggable">
			<StatusBar statusBar={statusBar}/>
		</footer>

	</main>
);

App.propTypes = {
	list: React.PropTypes.arrayOf(React.PropTypes.object),
	statusBar: React.PropTypes.object.isRequired,
	onEditTunnel: React.PropTypes.func.isRequired,
	onSaveTunnel: React.PropTypes.func.isRequired,
	onAddTunnel: React.PropTypes.func.isRequired,
	onDeleteTunnel: React.PropTypes.func.isRequired,
	onToggleTunnelState: React.PropTypes.func.isRequired
};

export default App;
