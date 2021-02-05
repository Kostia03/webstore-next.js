import PropTypes from "prop-types";
import { Container, Hidden } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Carousel } from "react-responsive-carousel";
import CarouselItem from "./CarouselItem";
import StatusArrow from "./StatusArrow";
import { SearchBar } from "components/SearchBar";
import { createRef, useState } from "react";

const styles = (theme) => ({
  container: {
    position: "relative",
  },
  paginator_search: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  searchBar: {
    margin: `${theme.spacing(2)}px 0`,
  },
  [theme.breakpoints.up("sm")]: {
    searchBar: {
      margin: `${theme.spacing(4)}px 0`,
    },
  },
});

const items = [
  {
    src: "./images/bg_carousel_sample1.jpg",
    mainText: "Mauris iaculis purus in nisi posuere",
    subText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi diam enim, tempor id leo vitae, elementum consectetur arcu",
    price: 34.0,
  },
  {
    src: "./images/bg_carousel_sample1.jpg",
    mainText: "Mauris iaculis purus in nisi posuere",
    subText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi diam enim, tempor id leo vitae, elementum consectetur arcu",
    price: 34.0,
  },
  {
    src: "./images/bg_carousel_sample1.jpg",
    mainText: "Mauris iaculis purus in nisi posuere",
    subText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi diam enim, tempor id leo vitae, elementum consectetur arcu",
    price: 34.0,
  },
  {
    src: "./images/bg_carousel_sample1.jpg",
    mainText: "Mauris iaculis purus in nisi posuere",
    subText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi diam enim, tempor id leo vitae, elementum consectetur arcu",
    price: 34.0,
  },
];

const AppCarousel = (props) => {
  const carouselRef = createRef();
  const [enabledLArrow, setEnableLArrow] = useState(false);
  const [enabledRArrow, setEnableRArrow] = useState(true);
  const { classes } = props;

  const onClickItem = (item) => {};

  const onClickArrowLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.onClickPrev();
    }
  };

  const onClickArrowRight = () => {
    if (carouselRef.current) {
      carouselRef.current.onClickNext();
    }
  };

  const onChangeCarousel = (index) => {
    setEnableLArrow(index > 0);
    setEnableRArrow(index < items.length - 1);
  };

  return (
    <div>
      <div className={classes.container}>
        <Carousel
          showArrows={false}
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          ref={carouselRef}
          onChange={onChangeCarousel}
        >
          {items.map((item, index) => (
            <CarouselItem key={index} {...item} onClickItem={() => onClickItem(item)} />
          ))}
        </Carousel>
        <div className={classes.paginator_search}>
          <Container fixed>
            <Hidden smDown>
              <div>
                <StatusArrow direction="left" enabled={enabledLArrow} onClickArrow={() => onClickArrowLeft()} />
                <StatusArrow direction="right" enabled={enabledRArrow} onClickArrow={() => onClickArrowRight()} />
              </div>
            </Hidden>
            <Hidden xsDown>
              <div className={classes.searchBar}>
                <SearchBar />
              </div>
            </Hidden>
          </Container>
        </div>
      </div>
      <Hidden smUp>
        <Container fixed>
          <div className={classes.searchBar}>
            <SearchBar />
          </div>
        </Container>
      </Hidden>
    </div>
  );
};

AppCarousel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppCarousel);
