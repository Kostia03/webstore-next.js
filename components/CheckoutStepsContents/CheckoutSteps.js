import { withStyles, Typography } from "@material-ui/core";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import { Fragment } from "react";
import PropTypes from "prop-types";
import useTranslation from "hooks/useTranslation";

const styles = theme => ({
  inactiveLabel: {
    color: theme.palette.reaction.black35,
    fontWeight: 400
  },
  activeLabel: {
    color: theme.palette.colors.main,
  }
});

const StyledToggleButtonGroup = withStyles((theme) => ({
  root: {
    width: '100%',
  },
  grouped: {
    '&:not(:first-child)': {
      width: '33.3333333%',
    },
    '&:first-child': {
      width: '33.3333333%',
    },
  },
}))(ToggleButtonGroup);

const StyledToggleButton = withStyles((theme) => ({
  root: {
    backgroundColor: 'transparent',
    textTransform: 'capitalize',
    borderRadius: 10
  },
  selected: {
    borderColor: theme.palette.colors.main,
    backgroundColor: 'transparent !important',
    '&:not(:first-child)': {
      borderLeftColor: theme.palette.colors.main,
    },
  },
}))(ToggleButton);

const CheckoutSteps = (props) => {
  const { t } = useTranslation('checkout')
  const { step, classes } = props;
  const items = [t("shipping"), t("billing"), t("confirm")]

  if (step > items.length - 1) return null

  return (
    <Fragment>
      <StyledToggleButtonGroup
        exclusive
        value={items[step]}
      >
        {items.map((item, i) => (
          <StyledToggleButton disabled={true} key={i} value={item} className={classes.active}>
            <Typography variant="subtitle1" className={step === i ? classes.activeLabel : classes.inactiveLabel}>{item}</Typography>
          </StyledToggleButton>
        ))}
      </StyledToggleButtonGroup>
    </Fragment>
  )
}

CheckoutSteps.propTypes = {
  classes: PropTypes.object,
  step: PropTypes.number.isRequired,
}

CheckoutSteps.defaultProps = {
  step: 0
}

export default withStyles(styles)(CheckoutSteps);
