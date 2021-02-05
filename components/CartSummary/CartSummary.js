import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles, Box, Typography, Grid, Divider } from "@material-ui/core";
import useTranslation from "hooks/useTranslation";
import { CouponCodeInput } from 'components/CouponCodeInput';

const styles = theme => ({
  text: {
    fontWeight: 700,
    fontSize: 16
  },
  estTotalContainer: {
    padding: `${theme.spacing()}px 0`
  },
  estTotal: {
    fontWeight: 700,
    fontSize: 20
  },
});

const CartSummary = (props) => {

  const { t } = useTranslation("cart")

  const {
    className,
    displayDiscount,
    displayShipping,
    displaySubtotal,
    displaySurcharge,
    displayTax,
    displayTotal,
    isDense,
    isFreeShipping,
    freeText,
    itemLabelText,
    orderTotalLabelText,
    shippingLabelText,
    surchargesLabelText,
    taxLabelText,
    classes,
    cartTitleText,
    isReadOnly,
    type,
  } = props;

  return (
    <div className={className}>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
        spacing={1}
      >
        {type === 'default' && (
          <Fragment>
            <Grid item>
              <Box my={1}>
                <Typography variant="body2" className={classes.text}>
                  {cartTitleText}
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Divider />
            </Grid>
          </Fragment>
        )}
        <Grid item>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography variant="body2" className={classes.text}>
                {t("subtotal")}
              </Typography>
            </Box>
            <Box pl={2}>
              <Typography variant="body2" className={classes.text}>
                {displaySubtotal}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography variant="body2" className={classes.text}>
                {t("shippingHandle")}
              </Typography>
            </Box>
            <Box pl={2}>
              <Typography variant="body2" className={classes.text}>
                {displayShipping ? displayShipping : '$0.00'}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography variant="body2" className={classes.text}>
                {t("estTaxes")}
              </Typography>
            </Box>
            <Box pl={2}>
              <Typography variant="body2" className={classes.text}>
                {displayTax ? displayTax : '$0.00'}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item>
          <Box display="flex" className={classes.estTotalContainer}>
            <Box flexGrow={1}>
              <Typography variant="body2" className={classes.estTotal}>
                {t("estTotal")}
              </Typography>
            </Box>
            <Box pl={2}>
              <Typography variant="body2" className={classes.estTotal}>
                {displayTotal}
              </Typography>
            </Box>
          </Box>
        </Grid>
        {(!isReadOnly && type === 'default') && (
          <Fragment>
            <Grid item>
              <Divider />
            </Grid>
            <Grid item>
              <Box my={1}>
                <CouponCodeInput />
              </Box>
            </Grid>
            <Grid item>
              <Divider />
            </Grid>
          </Fragment>
        )}
      </Grid>
    </div>
  );
}

CartSummary.propTypes = {
  classes: PropTypes.object,
  /**
   * The text for the "Cart" title text.
   */
  cartTitleText: PropTypes.string,
  /**
   * You can provide a `className` prop that will be applied to the outermost DOM element
   * rendered by this component. We do not recommend using this for styling purposes, but
   * it can be useful as a selector in some situations.
   */
  className: PropTypes.string,
  /**
   * Discount amount associated with promo code
   */
  displayDiscount: PropTypes.string,
  /**
   * Shipping cost
   */
  displayShipping: PropTypes.string,
  /**
   * Subtotal amount
   */
  displaySubtotal: PropTypes.string.isRequired,
  /**
   * Surcharge amount
   */
  displaySurcharge: PropTypes.string,
  /**
   * Calculated tax amount
   */
  displayTax: PropTypes.string,
  /**
   * Total amount
   */
  displayTotal: PropTypes.string.isRequired,
  /**
   * The text for the "FREE" label text.
   */
  freeText: PropTypes.string,
  /**
   * Dense layout with a transparent background color
   */
  isDense: PropTypes.bool,
  /**
   * If a product qualifies for free shipping, display "FREE" for shipping method
   */
  isFreeShipping: PropTypes.bool,
  /**
   * The text for the "Items" label text.
   */
  itemLabelText: PropTypes.string,
  /**
   * Quantity of products in shopping cart
   */
  itemsQuantity: PropTypes.number,
  /**
   * The text for the "items" header text.
   */
  itemsText: PropTypes.string,
  /**
   * The text for the "Order total" label text.
   */
  orderTotalLabelText: PropTypes.string,
  /**
   * The text for the "Promo code applied" text.
   */
  promoCodeText: PropTypes.string,
  /**
   * The text for the "Shipping" label text.
   */
  shippingLabelText: PropTypes.string,
  /**
   * The text for the "Surcharges" label text.
   */
  surchargesLabelText: PropTypes.string,
  /**
   * The text for the "Tax" label text.
   */
  taxLabelText: PropTypes.string,

  isReadOnly: PropTypes.bool,

  type: PropTypes.string,
}

CartSummary.defaultProps = {
  cartTitleText: "Order Summary",
  freeText: "FREE",
  itemLabelText: "Items",
  itemsText: "items",
  orderTotalLabelText: "Order total",
  promoCodeText: "Promo code applied",
  shippingLabelText: "Shipping",
  surchargesLabelText: "Surcharges",
  taxLabelText: "Tax",
  isReadOnly: false,
  type: 'default'
}


export default withStyles(styles)(CartSummary);
