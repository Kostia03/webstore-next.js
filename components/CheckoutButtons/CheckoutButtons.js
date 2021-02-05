import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@reactioncommerce/components/Button/v1";
import Router from "translations/i18nRouter";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  main: {
    border: 'none',
    fontSize: 16,
    borderRadius: 10,
    backgroundColor: theme.palette.colors.main,
    '&:hover': {
      backgroundColor: theme.palette.colors.main,
    },
    '&:active': {
      backgroundColor: theme.palette.colors.main,
    }
  }
})

class CheckoutButtons extends Component {
  static propTypes = {
    classes: PropTypes.object,
    /**
     * Set to `true` to prevent the button from calling `onClick` when clicked
     */
    isDisabled: PropTypes.bool,
    /**
     * The NextJS route name for the primary checkout button.
     */
    primaryButtonRoute: PropTypes.string,
    /**
     * Text to display inside the button
     */
    primaryButtonText: PropTypes.string,
    /**
     * className for primary checkout button
     */
    primaryClassName: PropTypes.string
  }

  static defaultProps = {
    primaryButtonRoute: "/cart/checkout",
    primaryButtonText: "Checkout"
  };

  handleOnClick = () => {
    const { primaryButtonRoute } = this.props;
    Router.push(primaryButtonRoute);
  }

  render() {
    const {
      isDisabled,
      primaryClassName,
      primaryButtonText,
      classes,
    } = this.props;

    return (
      <Button
        actionType="important"
        className={primaryClassName ? primaryClassName : classes.main}
        isDisabled={isDisabled}
        isFullWidth
        onClick={this.handleOnClick}
      >
        {primaryButtonText}
      </Button>
    );
  }
}

export default withStyles(styles)(CheckoutButtons)
