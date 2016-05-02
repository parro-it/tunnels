import React from 'react';

const StatusBar = ({statusBar: {message, kind}}) =>
	<span className={`status-${kind} status-bar`}>
		{message}
	</span>
;

StatusBar.propTypes = {
	statusBar: React.PropTypes.object.isRequired
};

export default StatusBar;
