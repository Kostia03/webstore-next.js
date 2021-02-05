import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import inject from "hocs/inject";

import { NavigationItemDesktop } from "components/NavigationDesktop";

const styles = (theme) => ({
  menuNav: {
    display: "flex",
    justifyContent: "flex-end"
  }
});

class NavigationDesktop extends Component {
  static propTypes = {
    classes: PropTypes.object,
    navItems: PropTypes.object
  };

  static defaultProps = {
    classes: {},
    navItems: {}
  };

  renderNavItem(navItem, index) {
    return <NavigationItemDesktop key={index} navItem={navItem} />;
  }

  render() {
    const { navItems, classes: { menuNav } } = this.props;

    if (navItems && navItems.items) {
      return <nav className={menuNav}>{navItems.items.map(this.renderNavItem)}</nav>;
    }

    // If navItems.items aren't available, skip rendering of navigation
    return null;
  }
}

export default withStyles(styles)(inject("navItems")(NavigationDesktop));
