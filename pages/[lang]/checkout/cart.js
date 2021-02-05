import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import inject from "hocs/inject";
import Grid from "@material-ui/core/Grid";
import { Typography, Container, Box, Divider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CartEmptyMessage from "@reactioncommerce/components/CartEmptyMessage/v1";
import { CartSummary } from "components/CartSummary";
import withCart from "containers/cart/withCart";
import CartItems from "components/CartItems";
import CheckoutButtons from "components/CheckoutButtons";
import Layout from "components/Layout";
import Router from "translations/i18nRouter";
import PageLoading from "components/PageLoading";
import { ContinueShoppingButton } from "components/CheckoutRelatedButton";
import { withApollo } from "lib/apollo/withApollo";
import { CheckoutShipping, CheckoutBilling } from 'components/CheckoutStepsContents';
import { ShippingAddressPopup } from "components/ShippingAddressPopup";

import { locales } from "translations/config";
import fetchPrimaryShop from "staticUtils/shop/fetchPrimaryShop";
import fetchTranslations from "staticUtils/translations/fetchTranslations";
import useTranslation from "hooks/useTranslation";

const styles = (theme) => ({
  cartContainer: {
    backgroundColor: 'white',
    padding: `${theme.spacing(5)}px 0 ${theme.spacing(30)}px 0`,
  },
  cartEmptyMessageContainer: {
    margin: "80px 0"
  },
  customerSupportCopy: {
    paddingLeft: `${theme.spacing(4)}px !important`
  },
  phoneNumber: {
    fontWeight: theme.typography.fontWeightBold
  },
  title: {
    fontWeight: theme.typography.fontWeightRegular,
    marginTop: "1.6rem",
    marginBottom: "3.1rem"
  },
  itemWrapper: {
    borderTop: theme.palette.borders.default,
    borderBottom: theme.palette.borders.default
  },
  cartSummary: {
    backgroundColor: theme.palette.reaction.black05,
    padding: theme.spacing(3),
    borderRadius: 10
  },
  checkoutButtonsContainer: {
    marginTop: theme.spacing(3)
  },
  otherContainer: {
    backgroundColor: theme.palette.reaction.black05,
    padding: theme.spacing(3),
    borderRadius: 10,
    marginTop: theme.spacing(2)
  },
});

const CartPage = (props) => {

  const { t } = useTranslation('cart');
  const [openSAPopup, setSAPopup] = useState(false)

  const handleClick = () => Router.push("/");

  const handleItemQuantityChange = (quantity, cartItemId) => {
    const { onChangeCartItemsQuantity } = props;

    onChangeCartItemsQuantity({ quantity, cartItemId });
  };

  const handleRemoveItem = async (itemId) => {
    const { onRemoveCartItems } = props;

    await onRemoveCartItems(itemId);
  };

  const renderCartItems = () => {
    const { cart, classes, hasMoreCartItems, loadMoreCartItems } = props;

    if (cart && Array.isArray(cart.items) && cart.items.length) {
      return (
        <Fragment>
          <Box my={3}>
            <Typography variant="h5" gutterBottom>
              Livesale Pro Shopping Bag
            </Typography>
          </Box>
          <div className={classes.itemWrapper}>
            <CartItems
              hasMoreCartItems={hasMoreCartItems}
              onLoadMoreCartItems={loadMoreCartItems}
              items={cart.items}
              onChangeCartItemQuantity={handleItemQuantityChange}
              onRemoveItemFromCart={handleRemoveItem}
            />
          </div>
        </Fragment>
      );
    }

    return (
      <Grid item xs={12} className={classes.cartEmptyMessageContainer}>
        <CartEmptyMessage onClick={handleClick} />
      </Grid>
    );
  }

  const renderCartSummary = () => {

    const { cart, classes } = props;

    if (cart && cart.checkout && cart.checkout.summary && Array.isArray(cart.items) && cart.items.length) {
      const { fulfillmentTotal, itemTotal, surchargeTotal, taxTotal, total } = cart.checkout.summary;

      return (
        <Fragment>
          <Box mt={4}>
            <CartSummary
              cartTitleText={t('orderSummary')}
              displayShipping={fulfillmentTotal && fulfillmentTotal.displayAmount}
              displaySubtotal={itemTotal && itemTotal.displayAmount}
              displaySurcharge={surchargeTotal && surchargeTotal.displayAmount}
              displayTax={taxTotal && taxTotal.displayAmount}
              displayTotal={total && total.displayAmount}
              itemsQuantity={cart.totalItemQuantity}
              type="other"
            />
          </Box>
          <Box my={5} display="flex">
            <Box width={1 / 3}>
              <ContinueShoppingButton>{t("continueShopping")}</ContinueShoppingButton>
            </Box>
            <Box flexGrow={1}></Box>
            <Box width={1 / 3}>
              <CheckoutButtons primaryButtonText={t("secureCheckout")} />
            </Box>
          </Box>
        </Fragment>
      );
    }

    return null;
  }

  const handleCloseShippingAddress = () => {
    setSAPopup(false)
  }

  const openShippingAddressPopup = () => {
    setSAPopup(true)
  }

  const renderOthers = () => {
    return (
      <div className={classes.otherContainer}>
        <CheckoutShipping onClickEdit={openShippingAddressPopup} />
        <Box mt={2}></Box>
        <Divider />
        <Box mt={6}></Box>
        <CheckoutBilling defaultMethod="paypal" />
        <ShippingAddressPopup
          open={openSAPopup}
          onClose={handleCloseShippingAddress}
          onClickCancel={handleCloseShippingAddress}
          onClickSave={handleCloseShippingAddress}
        />
      </div >
    )
  }

  const { cart, classes, shop } = props;

  // when a user has no item in cart in a new session, this.props.cart is null
  // when the app is still loading, this.props.cart is undefined
  if (typeof cart === "undefined") return <PageLoading delay={0} />;

  return (
    <Layout shop={shop}>
      <Helmet
        title={`Cart | ${shop && shop.name}`}
        meta={[{ name: "description", content: shop && shop.description }]}
      />
      <div className={classes.cartContainer}>
        <Container fixed>
          <Grid container spacing={6}>
            <Grid item xs={12} md={8}>
              {renderCartItems()}
              {renderCartSummary()}
            </Grid>
            <Grid item xs={12} md={4} >
              {renderOthers()}
            </Grid>
          </Grid>
        </Container>
      </div>
    </Layout>
  );
}

CartPage.propTypes = {
  cart: PropTypes.shape({
    totalItems: PropTypes.number,
    items: PropTypes.arrayOf(PropTypes.object),
    checkout: PropTypes.shape({
      fulfillmentTotal: PropTypes.shape({
        displayAmount: PropTypes.string
      }),
      itemTotal: PropTypes.shape({
        displayAmount: PropTypes.string
      }),
      taxTotal: PropTypes.shape({
        displayAmount: PropTypes.string
      })
    })
  }),
  classes: PropTypes.object,
  hasMoreCartItems: PropTypes.bool,
  loadMoreCartItems: PropTypes.func,
  onChangeCartItemsQuantity: PropTypes.func,
  onRemoveCartItems: PropTypes.func,
  shop: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string
  })
};

/**
 *  Static props for the cart route
 *
 * @param {String} lang - the shop's language
 * @returns {Object} props
 */
export async function getStaticProps({ params: { lang } }) {
  return {
    props: {
      ...await fetchPrimaryShop(lang),
      ...await fetchTranslations(lang, ["common", "footer", "cart", "checkout"])
    }
  };
}

/**
 *  Static paths for the cart route
 *
 * @returns {Object} paths
 */
export async function getStaticPaths() {
  return {
    paths: locales.map((locale) => ({ params: { lang: locale } })),
    fallback: false
  };
}

export default withApollo()(withStyles(styles)(withCart(inject("uiStore")(CartPage))));
