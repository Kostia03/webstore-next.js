import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles, SvgIcon } from "@material-ui/core";
import ButtonBase from "@material-ui/core/ButtonBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import MinusIcon from 'public/images/ic_minus.svg';
import PlusIcon from 'public/images/ic_plus.svg';


const styles = () => ({
  incrementButton: {
    boxSizing: "inherit",
    padding: 0
  },
  quantityContainer: {
    boxSizing: "border-box",
    height: "30px",
    overflow: "hidden",
    padding: 0
  },
  quantityInput: {
    "appearance": "none",
    "boxSizing": "inherit",
    "color": "#3c3c3c",
    "fontSize": "16px",
    "lineHeight": "2",
    "height": "30px",
    "max-width": "36px",
    "textAlign": "center"
  },
  icon: {
    width: 17
  }
});

class QuantityInput extends Component {
  static propTypes = {
    /**
     * You can provide a `className` prop that will be applied to the outermost DOM element
     * rendered by this component. We do not recommend using this for styling purposes, but
     * it can be useful as a selector in some situations.
     */
    className: PropTypes.string,
    /**
     * MUI theme classes
     */
    classes: PropTypes.object,
    /**
     * On change hanlder for input
     */
    onChange: PropTypes.func,
    /**
     * Prepopulate the input's value.
     */
    value: PropTypes.number,
    /**
     * Hide remove plus minus button and quantity input
     */
    isReadOnly: PropTypes.bool,
  };

  static defaultProps = {
    classes: {},
    onChange() { },
    isReadOnly: false
  };

  constructor(props) {
    super(props);

    const value = props.value || 0;

    this.state = {
      initialValue: props.value,
      value
    };
  }

  handleChanged(value) {
    const { onChange } = this.props;
    onChange(value);
  }

  handleQuantityInputChange = (event) => {
    const { value } = event.target;

    const numericValue = Math.floor(Number(value));

    if (Number.isNaN(numericValue)) return;

    this.setState({ value: numericValue });
    this.handleChanged(numericValue);
  };

  handleIncrementButton = () => {
    const value = this.state.value + 1;

    this.setState({ value });
    this.handleChanged(value);
  };

  handleDecrementButton = () => {
    const value = this.state.value - 1;

    if (value >= 0) {
      this.setState({ value });
      this.handleChanged(value);
    }
  };

  render() {
    const { className, classes: { incrementButton, quantityContainer, quantityInput, icon }, isReadOnly } = this.props;
    const { value } = this.state;

    return (
      <TextField
        className={className}
        value={value}
        disabled={isReadOnly}
        onChange={this.handleQuantityInputChange}
        InputProps={{
          startAdornment: isReadOnly ? null : (
            <InputAdornment>
              <ButtonBase
                color="default"
                variant="outlined"
                onClick={this.handleDecrementButton}
                className={incrementButton}
                disableRipple
                disableTouchRipple
              >
                <SvgIcon component={MinusIcon} viewBox="0 0 17 17" className={icon} />
              </ButtonBase>
            </InputAdornment>
          ),
          endAdornment: isReadOnly ? null : (
            <InputAdornment>
              <ButtonBase
                variant="outlined"
                color="default"
                onClick={this.handleIncrementButton}
                className={incrementButton}
                disableRipple={true}
                disableTouchRipple={true}
              >
                <SvgIcon component={PlusIcon} viewBox="0 0 17 17" className={icon} />
              </ButtonBase>
            </InputAdornment>
          ),
          disableUnderline: true,
          classes: {
            root: quantityContainer,
            input: quantityInput
          }
        }}
      />
    );
  }
}

export default withStyles(styles)(QuantityInput)
