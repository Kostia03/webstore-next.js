import PropTypes from "prop-types";
import {
  withStyles, Divider, Typography, Box,
  FormControlLabel, Radio, Button, InputBase
} from "@material-ui/core";
import { Fragment, useEffect, useState } from "react";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import useTranslation from "hooks/useTranslation";
import { CouponCodeInput } from 'components/CouponCodeInput';

const styles = theme => ({
  title: {
    fontSize: 16,
    color: theme.palette.reaction.black35
  },
  formLabelFont: {
    fontSize: 16
  },
  formLabel: {
    margin: 0,
    color: theme.palette.reaction.black35
  },
  formLabelActive: {
    color: theme.palette.colors.main,
  },
  radio: {
    padding: 0,
    paddingRight: 4,
    '&$checked': {
      color: theme.palette.colors.main,
    }
  },
  checked: {},
  edit: {
    color: theme.palette.colors.main,
    '&:hover': {
      backgroundColor: 'transparent',
    }
  },
  textField: {
    backgroundColor: 'white',
    borderRadius: 10,
    border: theme.palette.borders.default,
    margin: 0,
    padding: `5px ${theme.spacing(2)}px`,
    fontSize: 16,
  },
})

const StyledToggleButtonGroup = withStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10
  },
  grouped: {
    '&:not(:first-child)': {
      width: '33.3333%',
    },
    '&:first-child': {
      width: '33.3333%',
    },
    '&:last-child': {
      width: 'calc(33.3333% + 2px)',
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

const CheckoutBilling = (props) => {

  const { t } = useTranslation('checkout')
  const [method, setMethod] = useState("")
  const { classes, onClickEdit, defaultMethod } = props;
  const items = [t("card"), t("paypal"), t("sezzle")];

  useEffect(() => {
    switch (defaultMethod) {
      case 'card':
        setMethod(t("card"))
        break;
      case 'paypal':
        setMethod(t("paypal"))
        break;
      case 'sezzle':
        setMethod(t("sezzle"))
        break;
      default:
        setMethod(t("card"))
    }
  }, [])

  const handleChange = (e, value) => {
    if (value) {
      console.log(value)
      setMethod(value)
    }
  }

  const renderCard = () => {
    return (
      <Fragment>
        <Box mt={2}>
          <Box my={1}>
            <Typography variant="body2">{t("nameOnCard")}</Typography>
          </Box>
          <InputBase
            fullWidth
            variant="outlined"
            placeholder=""
            className={classes.textField}
          />
        </Box>
        <Box mt={2}>
          <Box my={1}>
            <Typography variant="body2">{t("cardNumber")}</Typography>
          </Box>
          <InputBase
            fullWidth
            variant="outlined"
            placeholder=""
            className={classes.textField}
          />
        </Box>
        <Box mt={2}>
          <Box display="flex">
            <Box flexGrow="1" mr={2}>
              <Box my={1}>
                <Typography variant="body2">{t("expirationDate")}</Typography>
              </Box>
              <InputBase
                fullWidth
                variant="outlined"
                placeholder=""
                className={classes.textField}
              />
            </Box>
            <Box flexGrow="1">
              <Box my={1}>
                <Typography variant="body2">{t("secureCode")}</Typography>
              </Box>
              <InputBase
                fullWidth
                variant="outlined"
                placeholder=""
                className={classes.textField}
              />
            </Box>
          </Box>
        </Box>

        <Box display="flex" mt={3} alignItems="center">
          <Box flexGrow={1}>
            <Typography variant="subtitle1">{t("billingAddress")}</Typography>
          </Box>
          <Box pl={2}>
            <Button disableFocusRipple disableRipple className={classes.edit} onClick={onClickEdit}>
              {t("edit")}
            </Button>
          </Box>
        </Box>
        <Box mt={1}></Box>
        <Typography variant="body2" >Steve Rogers</Typography>
        <Typography variant="body2" >2933  Smith Road</Typography>
        <Typography variant="body2" >BATESVILLE, Arkansas 77084</Typography>
      </Fragment>
    )
  }

  const renderPaypal = () => {
    return (
      <Fragment>
        <Box mt={2}>
          <Box my={1}>
            <Typography variant="body2">{t("paypalEmailAddress")}</Typography>
          </Box>
          <InputBase
            fullWidth
            variant="outlined"
            placeholder=""
            className={classes.textField}
          />
        </Box>
        <Box mt={3} />
        <Divider />
        <Box mt={1}>
          <CouponCodeInput />
        </Box>
      </Fragment>
    )
  }

  const renderSezzle = () => {
    return null
  }

  return (
    <Fragment>
      <Typography className={classes.title}>{t("paymentMethod")}</Typography>
      <Box mt={2}></Box>
      <StyledToggleButtonGroup
        exclusive
        value={method}
        onChange={handleChange}
      >
        {items.map((item, i) => (
          <StyledToggleButton key={i} value={item} className={classes.active}>
            <FormControlLabel
              control={
                <Radio
                  size="small"
                  value={item}
                  checked={method === item}
                  classes={{ root: classes.radio, checked: classes.checked }} />
              }
              label={item}
              className={`${classes.formLabel} ${method === item ? classes.formLabelActive : ''}`}
              classes={{ label: classes.formLabelFont }}
            />
          </StyledToggleButton>
        ))}
      </StyledToggleButtonGroup>
      {method === items[0] && renderCard()}
      {method === items[1] && renderPaypal()}
      {method === items[2] && renderSezzle()}
    </Fragment>
  )
}

CheckoutBilling.propTypes = {
  classes: PropTypes.object,
  onClickEdit: PropTypes.func,
  defaultMethod: PropTypes.string.isRequired  // card, paypal, sezzel
}

CheckoutBilling.defaultProps = {
  defaultMethod: 'card'
}

export default withStyles(styles)(CheckoutBilling);
