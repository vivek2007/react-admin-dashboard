import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class NavTabLink extends React.Component {
    render() {
        var isActive = this.context.router.route.location.pathname === this.props.to;
        var className = isActive ? 'active' : '';

        return(
            <Link className={className} {...this.props}>
                {this.props.children}
            </Link>
        );
    }
}

NavTabLink.contextTypes = {
    router: PropTypes.object
};

export default NavTabLink;