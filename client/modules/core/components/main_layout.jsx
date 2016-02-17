import React from 'react';

const Layout = ({content = () => null}) => (
  <div>
    <header>
    <h1>Olis</h1>
    </header>

    <div>
    {content()}
    </div>

    <footer>
    <small>Built with <a href='https://github.com/kadirahq/mantra'>Mantra</a> &amp; Meteor.</small>
    </footer>
  </div>
);

export default Layout;
