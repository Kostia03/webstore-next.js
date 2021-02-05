import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Router from "translations/i18nRouter";

const styles = (theme) => ({
  container: {
    padding: `${theme.spacing(4)}px 0`
  },
  imgContainer: {
    backgroundColor: "white",
    position: "relative",
    width: "100%",
    paddingTop: "160%", // 5:3
    borderRadius: 10,
    overflow: "hidden",
  },
  img: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    backgroundPosition: "center",
    cursor: 'pointer'
  },
  title: {
    color: theme.palette.colors.main,
    fontSize: 16,
    padding: `${theme.spacing()}px 0`,
    lineHeight: '1.1'
  },
  price: {
    fontSize: 16,
  }
});

const ProductGridItem = (props) => {
  const { classes, item } = props;
  const src = '/images/bg_category_sample1.jpg';
  const title = 'Wine Striped & Animal Print';
  const price = '$34.00';
  const onClickItem = () => {
    Router.push("/category/product2");
  }

  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes.imgContainer}>
          <div className={classes.img} style={{ backgroundImage: `url(${src})` }} onClick={onClickItem}>
          </div>
        </div>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="body2" gutterBottom className={classes.price}>
          {price}
        </Typography>
      </div>
    </Fragment>
  );
};

ProductGridItem.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductGridItem);
