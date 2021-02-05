import { withStyles, Typography, Box } from "@material-ui/core";
import { Fragment } from "react";
import PropTypes from "prop-types";
import useTranslation from "hooks/useTranslation";

const styles = theme => ({
})

const CheckoutConfirm = (props) => {

  const { t } = useTranslation('checkout')
  const { classes } = props;


  return (
    <Fragment>
      <Box mt={4} />
      <Typography variant="h6">
        {t("paymentSucceful")}
      </Typography>
      <Typography>
        {t("pleaseCheckEmail")}
      </Typography>
    </Fragment>
  )
}

CheckoutConfirm.propTypes = {
  classes: PropTypes.object,
}

CheckoutConfirm.defaultProps = {
}

export default withStyles(styles)(CheckoutConfirm);
