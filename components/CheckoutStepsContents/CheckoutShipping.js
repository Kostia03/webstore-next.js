import {
  withStyles, Divider, Typography, Box,
  FormControlLabel, Radio, Button,
} from "@material-ui/core";
import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { ToggleButtonGroup, ToggleButton } from "@material-ui/lab";
import useTranslation from "hooks/useTranslation";

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
  }
})

const StyledToggleButtonGroup = withStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10
  },
  grouped: {
    '&:not(:first-child)': {
      width: '50%',
    },
    '&:first-child': {
      width: 'calc(50% + 1px)',
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

const CheckoutShipping = (props) => {
  const { t } = useTranslation('checkout')
  const [method, setMethod] = useState(t("delivery"))
  const { classes, onClickEdit } = props;
  const items = [t("delivery"), t("localPickup")];

  const handleChange = (e, value) => {
    if (value) {
      console.log(value)
      setMethod(value)
    }
  }

  return (
    <Fragment>
      <Typography className={classes.title}>{t("shippingMethod")}</Typography>
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
      <Box display="flex" mt={3} mb={1} alignItems="center">
        <Box flexGrow={1}>
          <Typography variant="subtitle1">{t("deliveryTo")}</Typography>
        </Box>
        <Box pl={2}>
          <Button disableFocusRipple disableRipple className={classes.edit} onClick={onClickEdit}>
            {t("edit")}
          </Button>
        </Box>
      </Box>
      <Typography variant="body2" >Steve Rogers</Typography>
      <Typography variant="body2" >2933  Smith Road</Typography>
      <Typography variant="body2" >BATESVILLE, Arkansas 77084</Typography>
    </Fragment>
  )
}

CheckoutShipping.propTypes = {
  classes: PropTypes.object,
  onClickEdit: PropTypes.func,
}

CheckoutShipping.defaultProps = {
}

export default withStyles(styles)(CheckoutShipping);
