import React from 'react';
import EditTunnel from './EditTunnel';
import TunnelList from './TunnelList';

export default ({
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
          onClick = { onAddTunnel }
          >

          <span className="icon icon-plus"></span>
        </button>

      </div>
    </header>

    <div className="window-content">
      <div className="pane-group">
        <div className="pane pane-sm sidebar">
          <TunnelList
            list = { list }
            onEditTunnel = { onEditTunnel }
            onDeleteTunnel = { onDeleteTunnel }
            onToggleTunnelState = { onToggleTunnelState }
          />
        </div>
        <main className="pane">
          <EditTunnel onSaveTunnel = { onSaveTunnel } />

        </main>
      </div>
    </div>


    <footer className="toolbar toolbar-footer draggable">
      <span className="status-bar">{ statusBar }</span>
    </footer>


  </main>
);

