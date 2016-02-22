import React from 'react';

const Layout = ({content = () => null}) => (
  <div id="content">
    {content()}
  </div>
);

export default Layout;
