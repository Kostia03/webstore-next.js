import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import {
  Container, Typography, Select, MenuItem,
  InputBase, Paper, IconButton, SvgIcon, Button,
  Box
} from "@material-ui/core";
import useTranslation from "hooks/useTranslation";
import Breadcrumbs from "components/Breadcrumbs";
import SearchIcon from 'public/images/ic_search.svg';

const styles = (theme) => ({
  breadcrumbs: {
    backgroundColor: theme.breadcrumbs.background,
    padding: `${theme.spacing()}px 0`
  },
  productContainer: {
    backgroundColor: 'white',
    padding: `${theme.spacing(8)}px 0`
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
  },
  title: {
    fontSize: 30,
    fontWeight: '600'
  },
  price: {
    fontSize: 30,
    fontWeight: '400'
  },
  titleLabel: {
    fontSize: 16,
    textTransform: 'uppercase',
    fontWeight: '800',
  },
  detailContent: {
    fontSize: 16,
    fontWeight: '400'
  },
  searchButton: {
    background: `linear-gradient(${theme.palette.colors.main}, ${theme.palette.colors.main})`,
    color: 'white',
    borderRadius: 10,
    fontSize: 16,
    textTransform: 'capitalize',
    height: '44px',
    padding: `0 ${theme.spacing(4)}px`,
    marginLeft: theme.spacing(2)
  },
  searchForm: {
    flex: 1,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: theme.palette.reaction.black15,
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 10,
    margin: `${theme.spacing(8)}px 0`
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: 16,
    fontWeight: 400,
    textTransform: 'capitalize',
  },
  iconbutton: {
    cornerRadius: '255px',
    width: '26px',
    height: '26px',
    margin: theme.spacing()
  },
  innerIcon: {
    width: '20px',
    height: '20px',
  }
});

const CustomInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
      borderRadius: 10,
    },
  },
  input: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 10,
    borderColor: theme.palette.reaction.black15,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 10,
      backgroundColor: 'transparent'
    },
  },
}))(InputBase);

const ProductInCategory = (props) => {
  const tCommon = useTranslation("common");
  const tProdDetail = useTranslation("productDetail");

  const [sortBy, setSortBy] = useState(1);

  const { classes, sizes = [1, 2, 3, 4] } = props;

  const src = '/images/bg_category_sample1.jpg';

  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  }
  return (
    <Fragment>
      {/* breadcrumbs */}
      <div className={classes.breadcrumbs}>
        <Container fixed>
          <Breadcrumbs isCategory categoryName="Category Name" />
        </Container>
      </div>

      {/* Product Detail */}
      <div className={classes.productContainer}>
        <Container fixed>
          <Grid
            container
            direction="row"
            justify="center"
            spacing={4}
          >
            <Grid item xs={6} md={4}>
              <div className={classes.imgContainer}>
                <div className={classes.img} style={{ backgroundImage: `url(${src})` }}>
                </div>
              </div>
            </Grid>
            <Grid item xs={6} md={8}>
              <Box>
                <Typography className={classes.title}>
                  Wine striped & Animal Print
                </Typography>
                <Typography className={classes.price}>
                  $34.00
                </Typography>
              </Box>
              <Box mt={3}>
                <Typography className={classes.titleLabel}>
                  Product Details
                </Typography>
                <Typography className={classes.detailContent}>
                  How fun and festive is this pumpkin graphic tee?? I love the black and white buffalo plaid and the super soft material!
                </Typography>
              </Box>
              <Box mt={3}>
                <Typography className={classes.titleLabel}>
                  Available in these sizes
                </Typography>
                {sizes.map(i => (
                  <div key={i}>
                    <span className={classes.titleLabel}>S</span><span> (2/4)</span>
                  </div>
                ))}
              </Box>
              <Box mt={5}>
                <Typography className={classes.titleLabel}>
                  {tProdDetail.t("addToCart")}
                </Typography>
                <Box mt={1}>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                  >
                    <Select
                      labelId="demo-customized-select-label"
                      id="demo-customized-select"
                      value={sortBy}
                      onChange={handleSortBy}
                      input={<CustomInput />}
                    >
                      <MenuItem value={1}>M</MenuItem>
                      <MenuItem value={2}>L</MenuItem>
                      <MenuItem value={3}>XL</MenuItem>
                      <MenuItem value={3}>2XL</MenuItem>
                    </Select>

                    <Button variant="contained" className={classes.searchButton}>
                      {tProdDetail.t("addToCart")}
                    </Button>

                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            alignItems="center"
          >
            <Paper component="form" className={classes.searchForm} elevation={0} >
              <InputBase
                className={classes.input}
                placeholder={tCommon.t("searchPlaceholder")}
                inputProps={{ 'aria-label': '' }}
              />
              <IconButton disableRipple color="inherit" className={classes.iconbutton}>
                <SvgIcon component={SearchIcon} viewBox="0 0 19 20" className={classes.innerIcon} />
              </IconButton>
            </Paper>
          </Grid>

        </Container>
      </div>
    </Fragment>
  );
};

ProductInCategory.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductInCategory);
