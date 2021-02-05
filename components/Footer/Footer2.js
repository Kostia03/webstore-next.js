import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Container, Grid, Paper, InputBase, Button, Link } from "@material-ui/core";
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import SocialLinks from './SocialLinks';
import footerStyles from 'components/Footer/footer-jss';
import useTranslation from "hooks/useTranslation";

const styles = (theme) => ({
  ...footerStyles(theme)
});

const Footer = (props) => {
  const { t } = useTranslation("footer");

  const { classes, width } = props;

  const menus = {
    [t("menuTitleCategory")]: [
      {
        title: t("menuCategoryNewArrivals"),
        link: '#'
      },
      {
        title: t("menuCategoryDresses"),
        link: '#'
      },
      {
        title: t("menuCategoryTops"),
        link: '#'
      },
      {
        title: t("menuCategoryPants"),
        link: '#'
      },
      {
        title: t("menuCategoryOuterwear"),
        link: '#'
      },
      {
        title: t("menuCategoryShoes"),
        link: '#'
      },
      {
        title: t("menuCategoryJewelry"),
        link: '#'
      },
      {
        title: t("menuCategoryCurvy"),
        link: '#'
      },
      {
        title: t("menuCategorySale"),
        link: '#'
      },
    ],
    [t("menuTitleLinks")]: [
      {
        title: t("menuLinkAboutus"),
        link: '#'
      },
      {
        title: t("menuLinkContactus"),
        link: '#'
      },
      {
        title: t("menuLinkReturns"),
        link: '#'
      },

    ],
    [t("menuTitleHelp")]: [
      {
        title: t("menuHelpShopping"),
        link: '#'
      },
      {
        title: t("menuHelpReturns"),
        link: '#'
      },
      {
        title: t("menuHelpFAQs"),
        link: '#'
      },

    ]
  }

  const renderMenus = () => (
    Object.keys(menus).map((key, index) => (
      <Grid key={index} item>
        <Typography variant="h6" className={classes.menutitle}>
          {key.toUpperCase()}
        </Typography>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
          spacing={0}>
          {menus[key].map((menu, i) => (
            <Link key={i} className={classes.link}>{menu.title}</Link>
          ))}
        </Grid>
      </Grid>
    ))
  );

  return (
    <footer className={classes.footer}>
      <Container fixed>
        <div className={classes.mainContainer}>
          <div className={classes.leftContainer}>
            <Typography variant="h6">
              {t("getInTouch")}
            </Typography>
            <Typography variant="caption" className={classes.label1}>
              {t("getInTouchExplain")}
            </Typography>

            <Typography variant="h6" className={classes.label2}>
              {t("joinOurMailingList")}
            </Typography>
            <Paper component="form" className={classes.mailForm} elevation={0}>
              <InputBase
                className={classes.input}
                placeholder=""
                inputProps={{ 'aria-label': '' }}
              />
              <Button className={classes.btnSubmit} disableRipple >{t("btnSubmit")}</Button>
            </Paper>
          </div>
          <div className={classes.rightContainer}>
            <Grid container justify={isWidthDown("sm", width) ? "space-between" : "space-around"} spacing={2}>
              {renderMenus()}
            </Grid>
          </div>
        </div>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.socialContainer}>
          <Typography variant="caption" align="center">
            {t("copyright")}
            <Link className={classes.privacy}> {t("privacy")} </Link>
          </Typography>
          <SocialLinks />
        </Grid>
      </Container>
    </footer>
  )
};

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired
};

export default withStyles(styles, { name: "SkFooter" })(withWidth()(Footer));
