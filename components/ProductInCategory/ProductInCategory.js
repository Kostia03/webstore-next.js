import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import {
  Container, Typography, Select, MenuItem,
  InputBase, Paper, IconButton, SvgIcon
} from "@material-ui/core";
import useTranslation from "hooks/useTranslation";
import Breadcrumbs from "components/Breadcrumbs";
import ProductGridItem from './ProductGridItem';
import SearchIcon from 'public/images/ic_search.svg';

const styles = (theme) => ({
  breadcrumbs: {
    backgroundColor: theme.breadcrumbs.background,
    padding: `${theme.spacing()}px 0`
  },
  productContainer: {
    backgroundColor: 'white',
    padding: `${theme.spacing()}px 0`
  },
  controls: {
    paddingTop: theme.spacing(3),
  },
  height100: {
    height: '100%'
  },
  mainContainer: {
    display: 'flex'
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
    },
  },
  input: {
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    '&:focus': {
      backgroundColor: 'transparent'
    },
  },
}))(InputBase);

const ProductInCategory = (props) => {
  const { t } = useTranslation("common");
  const [sortBy, setSortBy] = useState(1);

  const { classes, catalogItems = [1, 2, 3, 4, 5, 6] } = props;

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

      {/* Controls & Products in Category */}
      <div className={classes.productContainer}>
        <Container fixed>
          {/* Controls */}
          <Grid container className={classes.controls} spacing={2}>
            <Grid item xs={12} md={5}>
              <Grid
                container
                direction="column"
                justify="center"
                className={classes.height100}
              >
                <Typography variant="h5">
                  Category Name
                </Typography>
                <Grid
                  container
                  direction="row"
                  alignItems="center"
                >
                  <Typography variant="body2">
                    Sort By
                  </Typography>
                  <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={sortBy}
                    onChange={handleSortBy}
                    input={<CustomInput />}
                  >
                    <MenuItem value={1}>Fetured</MenuItem>
                    <MenuItem value={2}>Fetured1</MenuItem>
                    <MenuItem value={3}>Fetured2</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={7}>
              <Grid
                container
                direction="row"
                alignItems="center"
                className={classes.height100}
              >
                <Paper component="form" className={classes.searchForm} elevation={0} >
                  <InputBase
                    className={classes.input}
                    placeholder={t("searchPlaceholder")}
                    inputProps={{ 'aria-label': '' }}
                  />
                  <IconButton disableRipple color="inherit" className={classes.iconbutton}>
                    <SvgIcon component={SearchIcon} viewBox="0 0 19 20" className={classes.innerIcon} />
                  </IconButton>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          {/* Products */}
          <Grid container spacing={4} justify="flex-start">
            {catalogItems.map((item, index) => (
              <Grid key={index} item xs={6} sm={4} md={3} lg={2}>
                <ProductGridItem item={{}} />
              </Grid>
            ))}
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
