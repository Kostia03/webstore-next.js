import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import ProductGridItem from "./ProductGridItem";

const styles = (theme) => ({
  container: {
    backgroundColor: "white",
    padding: `${theme.spacing(6)}px 0`,
  },
});

const ProductGrid = (props) => {
  const { classes, catalogItems = [] } = props;
  return (
    <Fragment>
      <div className={classes.container}>
        <Container fixed>
          <Grid container spacing={4} justify="flex-start">
            {catalogItems.map((item, index) => (
              <Grid key={index} item xs={6} sm={4} md={3} xl={2}>
                <ProductGridItem item={item} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </Fragment>
  );
};

ProductGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  catalogItems: PropTypes.arrayOf(PropTypes.object),
  currencyCode: PropTypes.string.isRequired,
  isLoadingCatalogItems: PropTypes.bool,
  pageInfo: PropTypes.shape({
    startCursor: PropTypes.string,
    endCursor: PropTypes.string,
    hasNextPage: PropTypes.bool,
    hasPreviousPage: PropTypes.bool,
    loadNextPage: PropTypes.func,
    loadPreviousPage: PropTypes.func,
  }),
  pageSize: PropTypes.number.isRequired,
  setPageSize: PropTypes.func.isRequired,
  setSortBy: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
};

export default withStyles(styles)(ProductGrid);
