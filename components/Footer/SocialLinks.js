import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { IconButton, SvgIcon, Grid } from "@material-ui/core";
import footerStyles from 'components/Footer/footer-jss';
import IconFacebook from 'public/images/ic_facebook.svg';
import IconInstagram from 'public/images/ic_instagram.svg';
import IconTwitter from 'public/images/ic_twitter.svg';
import IconYoutube from 'public/images/ic_youtube.svg';

const styles = (theme) => ({
  ...footerStyles(theme)
});

const SocialIcons = [
  IconFacebook, IconInstagram, IconTwitter, IconYoutube
]

const SocialLinks = (props) => {
  const { classes } = props;
  return (
    <Fragment>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.socialBtnGroup}
      >
        {SocialIcons.map((icon, index) => (
          <IconButton key={index} color="inherit" className={classes.iconbutton}>
            <SvgIcon component={icon} viewBox="0 0 32 32" className={classes.innerIcon} />
          </IconButton>
        ))}
      </Grid>
    </Fragment>
  )
};

SocialLinks.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(SocialLinks);
