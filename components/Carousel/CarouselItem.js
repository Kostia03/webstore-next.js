import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Grid, Container, Link } from "@material-ui/core";
import useTranslation from "hooks/useTranslation";

const styles = theme => ({
  img: {
    display: 'block',
    objectFit: 'cover',
  },
  container: {
    position: 'fixed',
    top: theme.spacing(3),
  },
  controls: {
    display: 'inline-block',
    marginTop: theme.spacing(3),
    backgroundColor: 'white',
    borderRadius: '255px',
    padding: `${theme.spacing()}px ${theme.spacing(2)}px`,
  },
  ctrlItem: {
    display: 'inline-block',
    fontWeight: '200'
  },
  ctrlItem2: {
    display: 'inline-block',
    marginLeft: theme.spacing(3),
    fontWeight: '200'
  },
  addCart: {
    color: theme.palette.colors.main,
    "&:hover": {
      textDecoration: 'none'
    }
  },
  [theme.breakpoints.down('sm')]: {
    img: {
      height: 300
    },
    mainText: {
      maxWidth: '75%',
      fontSize: '1.7rem'
    },
    subText: {
      maxWidth: '85%',
      marginTop: theme.spacing(1),
    }  
  },
  [theme.breakpoints.up('sm')]: {
    img: {
      height: 400
    },
    mainText: {
      maxWidth: 300,
      fontSize: '1.9rem'
    },
    subText: {
      maxWidth: 400,
      marginTop: theme.spacing(2),
    }  
  },
  [theme.breakpoints.up('md')]: {
    img: {
      height: 450
    },
    mainText: {
      maxWidth: 400,
      fontSize: '2rem'
    },
    subText: {
      maxWidth: 500,
      marginTop: theme.spacing(2),
    }  
  },
  [theme.breakpoints.up('lg')]: {
    img: {
      minHeight: 500,
      height: 'auto'
    },
    mainText: {
      maxWidth: 450,
    },
    subText: {
      maxWidth: 600,
      marginTop: theme.spacing(3),
    },  
  },
});

const CarouselItem = (props) => {
  const { t } = useTranslation("common");
  const { src, mainText, subText, price, onClickItem, classes } = props;
  const onClickItm = (e) => {
    e.preventDefault();
    if (onClickItem) {
      onClickItem()
    }
  }
  return (
    <div>
      <img src={src} className={classes.img} />
      <Container fixed>
        <Grid
          className={classes.container}
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
        >
          <Typography variant="h4" component="h5" align="left" className={classes.mainText}>
            {mainText}
          </Typography>

          <Typography variant="body1" component="h5" align="left" className={classes.subText}>
            {subText}
          </Typography>
          <div className={classes.controls}>
            <Typography variant="h6" className={classes.ctrlItem}>
              ${price.toFixed(2)}
            </Typography>
            <Typography variant="h6" className={classes.ctrlItem2}>
              <Link href="#" onClick={onClickItm} className={classes.addCart}>
                {t("btnAddToCart")}
              </Link>
            </Typography>
          </div>
        </Grid>
      </Container>
    </div>
  );
}

CarouselItem.propTypes = {
  src: PropTypes.string.isRequired,
  mainText: PropTypes.string.isRequired,
  subText: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onClickItem: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

CarouselItem.defaultProps = {
  onClickItem: null
}

export default withStyles(styles)(CarouselItem);