import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Router from "translations/i18nRouter";

const styles = (theme) => ({
  item: {
    backgroundColor: "white",
    position: "relative",
    width: "100%",
    paddingTop: "160%", // 5:3
    borderRadius: 10,
    overflow: "hidden",
  },
  itemContainer: {
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
  },
  btnCategory: {
    width: "70%",
    background: "linear-gradient(white, white)",
    borderRadius: "255px",
    marginBottom: theme.spacing(3),
    fontSize: 16,
    fontWeight: 400,
    textTransform: "capitalize",
  },
});

const ProductGridItem = (props) => {
  const { classes, item } = props;
  const { product } = item.node;
  const { title, primaryImage } = product;
  const src = primaryImage && primaryImage.URLs && primaryImage.URLs.medium;
  const onClickCategory = () => {
    Router.push("/category");
  }
  return (
    <Fragment>
      <div className={classes.item}>
        <div className={classes.itemContainer} style={{ backgroundImage: `url(${src})` }}>
          <Button variant="contained" className={classes.btnCategory} disableElevation onClick={onClickCategory}>
            {title}
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

ProductGridItem.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductGridItem);
