import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Button, Grid, InputBase } from "@material-ui/core";
import useTranslation from "hooks/useTranslation";

const styles = theme => ({
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 0,
    margin: 0,
    padding: 12,
    fontSize: 16,
    color: theme.palette.colors.main,
  },
  searchButton: {
    background: `linear-gradient(${theme.palette.colors.main}, ${theme.palette.colors.main})`,
    color: 'white',
    borderRadius: 10,
    fontSize: 16,
    textTransform: 'capitalize',
    height: '56px',
  }
});

const SearchBar = (props) => {
  const { t } = useTranslation("common");
  const { classes } = props;
  return (
    <React.Fragment>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={9} md={10}>
            <InputBase
              fullWidth
              variant="outlined"
              placeholder={t("searchPlaceholder")}
              className={classes.searchInput}
            />
          </Grid>
          <Grid item xs={3} md={2}>
            <Button fullWidth variant="contained" className={classes.searchButton}>
              {t("btnSearch")}
            </Button>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}

SearchBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

SearchBar.defaultProps = {
}

export default withStyles(styles)(SearchBar);