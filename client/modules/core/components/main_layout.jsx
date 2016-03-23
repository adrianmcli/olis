import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const Layout = ({content = () => null}) => (
  <div id="content">
    {content()}
  </div>
);

export default Layout;
