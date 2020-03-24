import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

function withCssBaseline(Component) {
  return () => (
    <>
      <CssBaseline />
      <Component />
    </>
  );
}

export default withCssBaseline;
