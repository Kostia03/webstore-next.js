const styles = theme => ({
  iconbutton: {
    backgroundColor: 'White',
    cornerRadius: '255px',
    width: '40px',
    height: '40px',
    marginLeft: `${theme.spacing(2)}px`
  },
  innerIcon: {
    width: '20px',
    height: '20px',
    color: theme.palette.colors.main
  }
});

export default styles;