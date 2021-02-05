import {
  Typography, Box, withStyles, InputBase,
  Dialog, DialogTitle, DialogContent, Button,
} from "@material-ui/core";
import PropTypes from "prop-types";
import useTranslation from "hooks/useTranslation";

const styles = theme => ({
  textField: {
    backgroundColor: 'white',
    borderRadius: 10,
    border: theme.palette.borders.default,
    margin: 0,
    padding: `5px ${theme.spacing(2)}px`,
    fontSize: 16,
  },
  btnSave: {
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
  },
  btnCancel: {
    width: '100%',
    color: theme.palette.reaction.black80,
    borderRadius: 10,
    border: theme.palette.borders.default,
    borderColor: theme.palette.reaction.black70,
    fontSize: 16,
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&:active': {
      backgroundColor: 'transparent',
    },
    textTransform: 'capitalize',
  }
})

const ShippingAddressPopup = (props) => {
  const { t } = useTranslation('checkout');
  const { classes, open, onClose, onClickCancel, onClickSave } = props
  return (
    <Dialog
      open={open}
      fullWidth={true}
      maxWidth="xs"
      onClose={onClose}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        {t("shippingAddress")}
      </DialogTitle>
      <DialogContent>
        <form className={classes.root} noValidate autoComplete="off">
          <Box>
            <Box my={1}>
              <Typography variant="body2">{t("firstname")}</Typography>
            </Box>
            <InputBase
              fullWidth
              variant="outlined"
              placeholder=""
              className={classes.textField}
            />
          </Box>
          <Box>
            <Box my={1}>
              <Typography variant="body2">{t("lastname")}</Typography>
            </Box>
            <InputBase
              fullWidth
              variant="outlined"
              placeholder=""
              className={classes.textField}
            />
          </Box>
          <Box>
            <Box my={1}>
              <Typography variant="body2">{t("streetAddress")}</Typography>
            </Box>
            <InputBase
              fullWidth
              variant="outlined"
              placeholder=""
              className={classes.textField}
            />
          </Box>
          <Box>
            <Box my={1}>
              <Typography variant="body2">{t("streetAddress2")}</Typography>
            </Box>
            <InputBase
              fullWidth
              variant="outlined"
              placeholder=""
              className={classes.textField}
            />
          </Box>
          <Box>
            <Box my={1}>
              <Typography variant="body2">{t("city")}</Typography>
            </Box>
            <InputBase
              fullWidth
              variant="outlined"
              placeholder=""
              className={classes.textField}
            />
          </Box>
          <Box>
            <Box my={1}>
              <Typography variant="body2">{t("state")}</Typography>
            </Box>
            <InputBase
              fullWidth
              variant="outlined"
              placeholder=""
              className={classes.textField}
            />
          </Box>
          <Box>
            <Box my={1}>
              <Typography variant="body2">{t("zipcode")}</Typography>
            </Box>
            <InputBase
              fullWidth
              variant="outlined"
              placeholder=""
              className={classes.textField}
            />
          </Box>
          <Box>
            <Box my={1}>
              <Typography variant="body2">{t("country")}</Typography>
            </Box>
            <InputBase
              fullWidth
              variant="outlined"
              placeholder=""
              className={classes.textField}
            />
          </Box>
          <Box my={3} display="flex">
            <Box flexGrow={1}>
              <Button className={classes.btnCancel} onClick={onClickCancel} >{t("cancel")}</Button>
            </Box>
            <Box mx={1}></Box>
            <Box flexGrow={1}>
              <Button className={classes.btnSave} onClick={onClickSave}>{t("save")}</Button>
            </Box>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  )
}

ShippingAddressPopup.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onClickSave: PropTypes.func,
  onClickCancel: PropTypes.func,
}

export default withStyles(styles)(ShippingAddressPopup);
