import React, { Component } from "react";
import PropTypes from "prop-types";
import inject from "hocs/inject";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import MenuList from "@material-ui/core/MenuList";
import Slide from "@material-ui/core/Slide";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "mdi-material-ui/Close";
import Link from "components/Link";
import NavigationItemMobile from "./NavigationItemMobile";
import NavigationSubMenuMobile from "./NavigationSubMenuMobile";

const styles = (theme) => ({
  drawerPaper: {
    overflowX: 'hidden'
  },
  toolbarTitle: {
    position: "absolute",
    width: "100%",
    textAlign: "center"
  },
  menu: {
    flex: "1 1 auto",
    overflowY: "auto",
    width: 320
  },
  subNav: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 320,
    height: "100vh",
    backgroundColor: theme.palette.background.default
  },
  logo: {
    height: 46,
    paddingTop: 3
  }
});

class NavigationMobile extends Component {
  static propTypes = {
    classes: PropTypes.object,
    navItems: PropTypes.object,
    shop: PropTypes.shape({
      name: PropTypes.string
    }),
    uiStore: PropTypes.shape({
      closeMenuDrawer: PropTypes.func
    }).isRequired
  };

  static defaultProps = {
    classes: {},
    navItems: {}
  };

  state = {
    navItem: null
  }

  handleNavItemClick = (navItem) => {
    this.setState({
      navItem
    });
  }

  handleCloseSubMenu = () => {
    this.setState({ navItem: null });
  }

  renderNavItem = (navItem, index) => (
    <NavigationItemMobile
      key={index}
      isTopLevel
      navItem={navItem}
      onClick={this.handleNavItemClick}
    />
  );

  handleClose = () => {
    this.handleCloseSubMenu();
    this.props.uiStore.closeMenuDrawer();
  };

  render() {
    const { classes, navItems, uiStore, shop } = this.props;
    const shopLogo = shop ? shop.shopLogoUrls ? shop.shopLogoUrls.primaryShopLogoUrl : null : null

    if (navItems && navItems.items) {
      return (
        <Drawer open={uiStore.isMenuDrawerOpen} onClose={this.handleClose} classes={{
          paper: classes.drawerPaper,
        }}>
          <div className={classes.header}>
            <Toolbar disableGutters>
              <div className={classes.toolbarTitle}>
                <Link route="/">
                  <img src={shopLogo} alt={shop.name} className={classes.logo} />
                </Link>
              </div>
              <IconButton onClick={this.handleClose}>
                <CloseIcon />
              </IconButton>
            </Toolbar>
            <Divider />
          </div>
          <nav className={classes.menu}>
            <MenuList disablePadding>{navItems.items.map(this.renderNavItem)}</MenuList>
          </nav>
          <Slide direction="left" in={!!this.state.navItem}>
            <nav className={classes.subNav}>
              <NavigationSubMenuMobile
                navItem={this.state.navItem}
                onBackButtonClick={this.handleCloseSubMenu}
              />
            </nav>
          </Slide>
        </Drawer>
      );
    }

    // If navItems.items aren't available, skip rendering of navigation
    return null;
  }
}

export default withStyles(styles)(inject("navItems", "shop", "uiStore")(NavigationMobile));
