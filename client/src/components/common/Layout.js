import React from 'react';

import './layout.scss';

const Layout = (props) => {
  return (
    <div className="layout">
      {props.children}
    </div>);
};

export default Layout;
