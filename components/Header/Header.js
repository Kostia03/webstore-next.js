import React, { Component } from "react";
import PropTypes from "prop-types";
import inject from "hocs/inject";
import AppBar from "@material-ui/core/AppBar";
import Hidden from "@material-ui/core/Hidden";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import { NavigationDesktop } from "components/NavigationDesktop";
import { NavigationMobile, NavigationToggleMobile } from "components/NavigationMobile";
import AccountDropdown from "components/AccountDropdown";
import Link from "components/Link";
import MiniCart from "components/MiniCart";

const styles = (theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.reaction.coolGrey500,
  },
  controls: {
    flex: 1,
  },
  toolbar: {
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
  },
  logo: {
    height: 46,
    paddingTop: 3,
  },
});

class Header extends Component {
  static propTypes = {
    classes: PropTypes.object,
    shop: PropTypes.shape({
      name: PropTypes.string,
    }),
    uiStore: PropTypes.shape({
      toggleMenuDrawerOpen: PropTypes.func.isRequired,
    }).isRequired,
    viewer: PropTypes.object,
  };

  static defaultProps = {
    classes: {},
  };

  handleNavigationToggleClick = () => {
    this.props.uiStore.toggleMenuDrawerOpen();
  };

  render() {
    const {
      classes: { appBar, controls, toolbar, logo },
      shop = {},
    } = this.props;
    const shopLogo = (shop && shop.shopLogoUrls && shop.shopLogoUrls.primaryShopLogoUrl) || null;

    return (
      <AppBar position="static" elevation={0} className={appBar}>
        <Toolbar>
          <Container fixed className={toolbar}>
            <Hidden lgUp>
              <NavigationToggleMobile onClick={this.handleNavigationToggleClick} />
            </Hidden>

            <Link route="/">
              <img src={shopLogo} alt={shop ? shop.name : ''} className={logo} />
            </Link>

            <div className={controls}>
              <Hidden mdDown initialWidth={"md"}>
                <NavigationDesktop />
              </Hidden>
            </div>

            <AccountDropdown />

            <MiniCart />
          </Container>
        </Toolbar>
        <NavigationMobile shop={shop} />
      </AppBar>
    );
  }
}

export default withStyles(styles)(inject("uiStore")(Header));
