import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import inject from "hocs/inject";
import Grid from "@material-ui/core/Grid";
import { Typography, Container, Box, Button, Divider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CartEmptyMessage from "@reactioncommerce/components/CartEmptyMessage/v1";
import { CartSummary } from "components/CartSummary";
import withCart from "containers/cart/withCart";
import CartItems from "components/CartItems";
import Layout from "components/Layout";
import Router from "translations/i18nRouter";
import PageLoading from "components/PageLoading";
import { EditOrderButton } from "components/CheckoutRelatedButton";
import { ShippingAddressPopup } from "components/ShippingAddressPopup";
import { CheckoutSteps, CheckoutShipping, CheckoutBilling, CheckoutConfirm } from 'components/CheckoutStepsContents';
import { withApollo } from "lib/apollo/withApollo";

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
  otherContainer: {
    backgroundColor: theme.palette.reaction.black05,
    padding: theme.spacing(3),
    borderRadius: 10,
    marginTop: theme.spacing(2)
  },
  checkoutButtonsContainer: {
    marginTop: theme.spacing(3)
  },
  btnNext: {
    width: '100%',
    color: 'white',
    fontWeight: '400',
    textTransform: 'capitalize',
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
});

const ShippingPage = (props) => {
  const { t } = useTranslation('cart');
  const tCheckout = useTranslation('checkout').t;
  const [openSAPopup, setSAPopup] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState(0)

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
              isReadOnly={true}
              onChangeCartItemQuantity={handleItemQuantityChange}
              onRemoveItemFromCart={handleRemoveItem}
            />
          </div>
          <Box my={3} display="flex">
            <Box width={1 / 3}>
              <EditOrderButton>{t("editOrder")}</EditOrderButton>
            </Box>
          </Box>
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
        <div className={classes.cartSummary}>
          <CartSummary
            isReadOnly={true}
            cartTitleText={t('orderSummary')}
            displayShipping={fulfillmentTotal && fulfillmentTotal.displayAmount}
            displaySubtotal={itemTotal && itemTotal.displayAmount}
            displaySurcharge={surchargeTotal && surchargeTotal.displayAmount}
            displayTax={taxTotal && taxTotal.displayAmount}
            displayTotal={total && total.displayAmount}
            itemsQuantity={cart.totalItemQuantity}
          />
        </div>
      );
    }
    return null;
  }

  const renderNextButton = () => {
    const onClickNext = () => {
      if (checkoutStep === 2) {
        // TO DO: go to home page
      }
      const step = (checkoutStep + 1) % 3
      setCheckoutStep(step)
    }
    return (
      <Box mt={5} mb={4}>
        <Button className={classes.btnNext} onClick={onClickNext}>{checkoutStep === 2 ? tCheckout("gotoHomePage") : tCheckout("next")}</Button>
      </Box>
    )
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
        <CheckoutSteps step={checkoutStep} />
        {checkoutStep === 0 && (
          <Fragment>
            <Box mt={2}></Box>
            <Divider />
            <Box mt={6}></Box>
            <CheckoutShipping onClickEdit={openShippingAddressPopup} />
          </Fragment>
        )}
        {checkoutStep === 1 && (
          <Fragment>
            <Box mt={2}></Box>
            <Divider />
            <Box mt={6}></Box>
            <CheckoutBilling />
          </Fragment>
        )}
        {checkoutStep === 2 && (
          <CheckoutConfirm />
        )}

        {renderNextButton()}
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
            <Grid item xs={12} md={7} lg={8}>
              {renderCartItems()}
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
              {renderCartSummary()}
              {renderOthers()}
            </Grid>
          </Grid>
        </Container>
      </div>
    </Layout>
  );
}

ShippingPage.propTypes = {
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

export default withApollo()(withStyles(styles)(withCart(inject("uiStore")(ShippingPage))));
