import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Link, SvgIcon, ButtonBase } from "@material-ui/core";
import classNames from 'classnames';
import ArrowLeft from 'public/images/arrow_left.svg';
import ArrowRight from 'public/images/arrow_right.svg';

const styles = theme => ({
  container: {
    backgroundColor: 'white',
    width: '60px',
    height: '60px',
    borderRadius: '30px',
    borderStyle: 'solid',
    borderWidth: '2px',
    marginRight: theme.spacing(1),
    borderColor: theme.palette.colors.main,
    cursor: 'default',
    display: 'inline-block',
    transition: "all .3s ease",
    WebkitTransition: "all .3s ease",
    MozTransition: "all .3s ease",
  },
  arrow: {
    stroke: theme.palette.colors.main,
    transition: "all .3s ease",
    WebkitTransition: "all .3s ease",
    MozTransition: "all .3s ease",
    color: 'transparent'
  },
  enabled: {
    backgroundColor: theme.palette.colors.main,
    cursor: 'Pointer'
  },
  arrow_enabled: {
    stroke: 'white',
  }
});

const StatusArrow = (props) => {

  const { classes, direction, enabled, onClickArrow } = props;

  const onClickBtn = () => {
    if (onClickArrow && enabled) {
      onClickArrow();
    }
  };

  return (
    <ButtonBase className={classNames(classes.container, enabled && classes.enabled)} onClick={onClickBtn} disabled={!enabled}>
      <SvgIcon
        component={direction === 'left' ? ArrowLeft : ArrowRight}
        viewBox="0 0 14 25"
        className={classNames(classes.arrow, enabled && classes.arrow_enabled)}
      />
    </ButtonBase>
  );
}

StatusArrow.propTypes = {
  classes: PropTypes.object.isRequired,
  direction: PropTypes.string,
  enabled: PropTypes.bool,
  onClickArrow: PropTypes.func
}

StatusArrow.defaultProps = {
  direction: 'left',
  enabled: false,
  onClickArrow: null
}

export default withStyles(styles)(StatusArrow);