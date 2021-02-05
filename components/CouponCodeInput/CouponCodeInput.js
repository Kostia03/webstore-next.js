import PropTypes from "prop-types";
import { withStyles, Box, Button, InputBase } from "@material-ui/core";
import useTranslation from "hooks/useTranslation";

const styles = theme => ({
  couponContainer: {
    padding: `${theme.spacing()}px 0`,
  },
  couponInput: {
    width: '100%',
  },
  addCoupon: {
    color: theme.palette.colors.main,
    '&:hover': {
      backgroundColor: 'transparent',
    }
  }
})

const CouponCodeInput = (props) => {
  const { classes } = props;
  const { t } = useTranslation("cart")

  return (
    <div className={classes.couponContainer}>
      <Box display="flex">
        <Box flexGrow={1}>
          <InputBase
            className={classes.couponInput}
            placeholder={t("couponcodenone")}
          />
        </Box>
        <Box pl={2}>
          <Button disableFocusRipple disableRipple className={classes.addCoupon}>
            {t("add")}
          </Button>
        </Box>
      </Box>
    </div>
  )
}

CouponCodeInput.propTypes = {
  classes: PropTypes.object
}

export default withStyles(styles)(CouponCodeInput);
