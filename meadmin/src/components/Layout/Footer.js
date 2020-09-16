import React from 'react';

import { Navbar, Nav, NavItem } from 'reactstrap';

import SourceLink from 'components/SourceLink';

const Footer = () => {
  return (
    <footer className="p-3 text-center">
      <Nav navbar>
        <NavItem>
        &nbsp;&copy;{(new Date()).getFullYear()} MobileExperts. All Rights Reserved.
        </NavItem>
      </Nav>
    </footer>
  );
};

export default Footer;
