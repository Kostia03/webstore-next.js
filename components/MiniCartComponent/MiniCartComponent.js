import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withComponents } from "@reactioncommerce/components-context";
import { addTypographyStyles, applyTheme, CustomPropTypes } from "@reactioncommerce/components/utils";
import { Box } from "@material-ui/core";
import CheckoutButtons from "components/CheckoutButtons";
import useTranslation from "hooks/useTranslation";

const Cart = styled.div`
  border-bottom-color: ${applyTheme("MiniCart.borderBottomColor")};
  border-bottom-style: solid;
  border-bottom-width: ${applyTheme("MiniCart.borderBottomWidth")};
  border-left-color: ${applyTheme("MiniCart.borderLeftColor")};
  border-left-style: solid;
  border-left-width: ${applyTheme("MiniCart.borderLeftWidth")};
  border-right-color: ${applyTheme("MiniCart.borderRightColor")};
  border-right-style: solid;
  border-right-width: ${applyTheme("MiniCart.borderRightWidth")};
  border-top-color: ${applyTheme("MiniCart.borderTopColor")};
  border-top-style: solid;
  border-top-width: ${applyTheme("MiniCart.borderTopWidth")};
  max-width: ${applyTheme("MiniCart.maxWidth")};
  overflow: hidden;
`;

const Items = styled.div`
  max-height: ${applyTheme("MiniCart.listHeightToBeginScrolling")};
  overflow-x: hidden;
  overflow-y: auto;
  padding-bottom: ${applyTheme("MiniCart.listPaddingBottom")};
  padding-left: ${applyTheme("MiniCart.listPaddingLeft")};
  padding-right: ${applyTheme("MiniCart.listPaddingRight")};
  padding-top: ${applyTheme("MiniCart.listPaddingTop")};
`;

const Footer = styled.div`
  border-top-color: ${applyTheme("MiniCartFooter.borderTopColor")};
  border-top-style: solid;
  border-top-width: ${applyTheme("MiniCartFooter.borderTopWidth")};
  box-shadow: ${({ count }) =>
    (count > 2 ? applyTheme("MiniCartFooter.boxShadow_overflow") : applyTheme("MiniCartFooter.boxShadow"))};
  padding-bottom: ${applyTheme("MiniCartFooter.paddingBottom")};
  padding-left: ${applyTheme("MiniCartFooter.paddingLeft")};
  padding-right: ${applyTheme("MiniCartFooter.paddingRight")};
  padding-top: ${applyTheme("MiniCartFooter.paddingTop")};
  position: relative;
`;

const FooterMessage = styled.span`
  ${addTypographyStyles("MiniCartFooterMessage", "captionText")} display: block;
  padding-bottom: ${applyTheme("MiniCartFooterMessage.paddingBottom")};
  padding-left: ${applyTheme("MiniCartFooterMessage.paddingLeft")};
  padding-right: ${applyTheme("MiniCartFooterMessage.paddingRight")};
  padding-top: ${applyTheme("MiniCartFooterMessage.paddingTop")};
  text-align: center;
`;

const MiniCartComponent = (props) => {

  const { t } = useTranslation('cart');

  const {
    cart: { checkout: { summary }, items },
    className,
    components: { CartItems, MiniCartSummary },
    footerMessageText,
  } = props;

  return (
    <Cart className={className}>
      <Items>
        <CartItems items={items} {...props} isMiniCart />
      </Items>
      <Footer count={items.length}>
        <MiniCartSummary displaySubtotal={summary.itemTotal.displayAmount} />
        <CheckoutButtons primaryButtonText={t("secureCheckout")} />
        <Box mt={1} />
        <FooterMessage>{footerMessageText}</FooterMessage>
      </Footer>
    </Cart>
  );
}

MiniCartComponent.propTypes = {
  /**
   * Cart data
   */
  cart: PropTypes.shape({
    /**
     * Cart checkout info
     */
    checkout: PropTypes.shape({
      /**
       * Checkout summary
       */
      summary: PropTypes.shape({
        /**
         * Checkout summary item total info
         */
        itemTotal: PropTypes.shape({
          /**
           * Checkout summary item total display amount
           */
          displayAmount: PropTypes.string
        }),
        /**
         * Checkout summary tax info
         */
        taxTotal: PropTypes.shape({
          /**
           * Checkout summary tax display amount
           */
          displayAmount: PropTypes.string
        })
      })
    }),
    /**
     * CartItem data. This is passed to CartItems, which may require some props.
     */
    items: PropTypes.arrayOf(PropTypes.object).isRequired
  }),
  /**
   * The text for the "Checkout" button text.
   */
  checkoutButtonText: PropTypes.string,
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
     * Pass either the Reaction Button component or your own component that
     * accepts compatible props.
     */
    Button: CustomPropTypes.component,
    /**
     * An element to show as the cart checkout button. If this isn't provided,
     * a button will be rendered using Button component.
     */
    CartCheckoutButton: CustomPropTypes.component,
    /**
     * Pass either the Reaction CartItems component or your own component that
     * accepts compatible props.
     */
    CartItems: CustomPropTypes.component.isRequired,
    /**
     * Pass either the Reaction MiniCartSummary component or your own component that
     * accepts compatible props.
     */
    MiniCartSummary: CustomPropTypes.component.isRequired
  }),
  /**
   * The text for the "Shipping and tax calculated in checkout" message text.
   */
  footerMessageText: PropTypes.string,
  /**
   * On cart item quantity change handler
   */
  onChangeCartItemQuantity: PropTypes.func,
  /**
   * On default checkout button click. Not used if a custom button is supplied by `components.CartCheckoutButton`
   */
  onCheckoutButtonClick: PropTypes.func,
  /**
   * On remove item from cart handler
   */
  onRemoveItemFromCart: PropTypes.func,
  /**
   * Product URL path to be prepended before the slug
   */
  productURLPath: PropTypes.string
};

MiniCartComponent.defaultProps = {
  onChangeCartItemQuantity() { },
  onCheckoutButtonClick() { },
  onRemoveItemFromCart() { },
  checkoutButtonText: "Checkout",
  footerMessageText: "Shipping and tax calculated in checkout"
};

export default withComponents(MiniCartComponent);
