import { withStyles, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import Router from "translations/i18nRouter";

const styles = theme => ({
  main: {
    color: theme.palette.reaction.black80,
    borderRadius: 10,
    border: theme.palette.borders.default,
    borderColor: theme.palette.reaction.black70,
    fontSize: 16,
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&:active': {
      backgroundColor: 'transparent',
    },
    textTransform: 'capitalize',
  }
})

const onClickContine = () => {
  Router.push("/cart");
}

const ContinueShoppingButton = (props) => {
  const { children, classes } = props;
  return (
    <Button disableElevation disableFocusRipple disableRipple fullWidth variant="contained" className={classes.main} onClick={onClickContine}>
      {children}
    </Button>
  )
}

ContinueShoppingButton.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(ContinueShoppingButton);
