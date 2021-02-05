import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import { withComponents } from "@reactioncommerce/components-context";
import { CustomPropTypes } from "@reactioncommerce/components/utils";
import { Grid, Box, Typography, withStyles, SvgIcon, ButtonBase } from "@material-ui/core";
import { QuantityInput } from 'components/QuantityInput';
import DeleteIcon from 'public/images/ic_delete.svg';
import useTranslation from "hooks/useTranslation";

const styles = theme => ({
  container: {
    borderBottom: theme.palette.borders.default,
    padding: `${theme.spacing(3)}px 0`,
    "&:last-of-type": {
      borderBottom: 'none'
    }
  },
  headerTitle: {
    color: theme.palette.reaction.black30,
    marginBottom: theme.spacing(3),
    fontSize: 16
  },
  deleteIcon: {
    width: 16,
  },
  label: {
    fontSize: 16,
  },
  img: {
    width: 100,
    height: 100
  },
  miniImg: {
    width: 60,
    height: 60
  }
});

const CartItem = (props) => {
  const { t } = useTranslation("cart")

  const {
    classes,
    className,
    components,
    isMiniCart,
    isReadOnly,
    productURLPath,
    item: {
      attributes,
      compareAtPrice,
      currentQuantity,
      productSlug,
      productVendor,
      title,
      quantity,
      isLowQuantity,
      price,
      subtotal
    },
    removeText,
    totalText
  } = props;

  const [isProcessing] = useState(false)

  const handleChangeCartItemQuantity = (value) => {
    const { onChangeCartItemQuantity, item: { _id } } = props;
    onChangeCartItemQuantity(value, _id);
  };

  const handleRemoveItemFromCart = () => {
    const { onRemoveItemFromCart, item: { _id } } = props;
    onRemoveItemFromCart(_id);
  };

  const renderImage = () => {
    const { isMiniCart, item: { imageURLs, productSlug }, productURLPath } = props;

    const { small, thumbnail } = imageURLs || {};

    if (!small || !thumbnail) return null;

    return (
      <a href={[productURLPath, productSlug].join("")}>
        <picture>
          {isMiniCart ? "" : <source srcSet={small} media="(min-width: 768px)" />}
          <img src={thumbnail} alt="" style={{ display: "block" }} />
        </picture>
      </a>
    );
  }


  return (
    <div className={classes.container}>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        spacing={3}
      >
        <Grid item xs={!isMiniCart ? 6 : 5} md={!isMiniCart ? 7 : 5}>
          <Typography variant="h6" className={classes.headerTitle}>
            {t("product")}
          </Typography>
          <Box display="flex">
            <Box >
              <img className={isMiniCart ? classes.miniImg : classes.img} src="/images/bg_category_sample1.jpg" />
              {/* {renderImage()} */}
            </Box>
            <Box px={2} flexGrow={1}>
              <Typography variant="body2" className={classes.label}>
                {title}
              </Typography>
              <Typography variant="body2" className={classes.label}>
                {price.displayAmount}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={!isMiniCart ? 3 : 3} md={!isMiniCart ? 3 : 3}>
          <Typography variant="h6" className={classes.headerTitle}>
            {t("quantity")}
          </Typography>
          <div>
            <QuantityInput isReadOnly={isReadOnly} value={quantity} onChange={handleChangeCartItemQuantity} />
          </div>
        </Grid>
        <Grid item xs={!isMiniCart ? 3 : 4} md={!isMiniCart ? 2 : 4}>
          <Typography variant="h6" className={classes.headerTitle}>
            {t("price")}
          </Typography>
          <Box display="flex">
            <Box display="flex" alignItems="center">
              <Typography variant="body2" className={classes.label}>
                {subtotal.displayAmount}
              </Typography>
            </Box>
            {!isReadOnly &&
              <Box flexGrow={1} justifyContent="flex-end" display="flex">
                <ButtonBase color="inherit" onClick={handleRemoveItemFromCart} >
                  <SvgIcon component={DeleteIcon} viewBox="0 0 16 17" className={classes.deleteIcon} />
                </ButtonBase>
              </Box>
            }
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

CartItem.propTypes = {
  classes: PropTypes.object,
  /**
   * You can provide a `className` prop that will be applied to the outermost DOM element
   * rendered by this component. We do not recommend using this for styling purposes, but
   * it can be useful as a selector in some situations.
   */
  className: PropTypes.string,
  /**
   * If you've set up a components context using
   * [@reactioncommerce/components-context](https://github.com/reactioncommerce/components-context)
   * (recommended), then this prop will come from there automatically. If you have not
   * set up a components context or you want to override one of the components in a
   * single spot, you can pass in the components prop directly.
   */
  components: PropTypes.shape({
    /**
     * Pass either the Reaction CartItemDetail component or your own component that
     * accepts compatible props.
     */
    CartItemDetail: CustomPropTypes.component.isRequired,
    /**
     * Pass either the Reaction Price component or your own component that
     * accepts compatible props.
     */
    Price: CustomPropTypes.component.isRequired,
    /**
     * Pass either the Reaction QuantityInput component or your own component that
     * accepts compatible props.
     */
    QuantityInput: CustomPropTypes.component.isRequired,
    /**
     * Pass either the Reaction StockWarning component or your own component that
     * accepts compatible props.
     */
    StockWarning: CustomPropTypes.component.isRequired
  }).isRequired,
  /**
   * Is in a MiniCart component
   */
  isMiniCart: PropTypes.bool,
  /**
   * Hide remove button and quantity input button
   */
  isReadOnly: PropTypes.bool,
  /**
   * CartItem data
   */
  item: PropTypes.shape({
    /**
     * The cart item ID
     */
    _id: PropTypes.string,
    /**
     * Array of additional attributes of the chosen item.
     */
    attributes: PropTypes.arrayOf(PropTypes.object),
    /**
     * The current compareAt price (MSRP)
     */
    compareAtPrice: PropTypes.shape({
      /**
       * The display price
       */
      displayAmount: PropTypes.string.isRequired
    }),
    /**
     * Current stock quantity of item
     */
    currentQuantity: PropTypes.number,
    /**
     * Image URLs of chosen item
     */
    imageURLs: PropTypes.shape({
      large: PropTypes.string,
      medium: PropTypes.string,
      original: PropTypes.string,
      small: PropTypes.string,
      thumbnail: PropTypes.string
    }),
    /**
     * Is the chosen item have a low quantity
     */
    isLowQuantity: PropTypes.bool,
    /**
     * Price object of chosen item
     */
    price: PropTypes.shape({
      /**
       * The display price
       */
      displayAmount: PropTypes.string.isRequired
    }).isRequired,
    /**
     * Chosen items slug
     */
    productSlug: PropTypes.string,
    /**
     * Chosen items vendor
     */
    productVendor: PropTypes.string,
    /**
     * Chosen items title
     */
    subtotal: PropTypes.shape({
      /**
       * The display subtotal
       */
      displayAmount: PropTypes.string
    }),
    title: PropTypes.string,
    /**
     * Quantity of chosen item in cart
     */
    quantity: PropTypes.number
  }).isRequired,
  /**
   * On cart item quantity change handler
   */
  onChangeCartItemQuantity: PropTypes.func,
  /**
   * On remove item from cart handler
   */
  onRemoveItemFromCart: PropTypes.func,
  /**
   * Product URL path to be prepended before the slug
   */
  productURLPath: PropTypes.string,
  /**
   * Text to display inside the remove button
   */
  removeText: PropTypes.string,
  /**
   * The text for the "Total" title text.
   */
  totalText: PropTypes.string
};

CartItem.defaultProps = {
  isMiniCart: false,
  isReadOnly: false,
  onChangeCartItemQuantity() { },
  onRemoveItemFromCart() { },
  removeText: "Remove",
  totalText: "Total"
};

export default withStyles(styles)(withComponents(CartItem))
