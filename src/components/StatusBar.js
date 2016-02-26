import React from 'react';

export default ({statusBar: {message, kind}}) =>
  <span className={`status-${kind} status-bar`}>
    { message }
  </span>
;
