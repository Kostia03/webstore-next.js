const styles = theme => ({
  footer: {
    padding: `${theme.spacing(4)}px 0`
  },
  mainContainer: {
    display: 'flex'
  },
  leftContainer: {
    width: '52%',
    marginRight: '3%'
  },
  label1: {
    fontSize: 16,
    marginTop: theme.spacing(2),
    display: 'inline-block'
  },
  label2: {
    marginTop: theme.spacing(5),
  },
  rightContainer: {
    flex: 1
  },
  mailForm: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: theme.spacing(2)
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: 16,
    fontWeight: 400,
    textTransform: 'capitalize',
  },
  btnSubmit: {
    color: theme.palette.colors.main,
    textTransform: 'capitalize',
    fontWeight: '400',
    fontSize: 16,
    "&:hover": {
      backgroundColor: 'transparent'
    }
  },
  socialContainer: {
    marginTop: theme.spacing(8)
  },
  socialBtnGroup: {
    marginTop: theme.spacing(3)
  },
  privacy: {
    fontWeight: '800',
    color: theme.typography.body2.color,
    cursor: 'pointer',
  },
  menutitle: {
    marginBottom: theme.spacing(2)
  },
  link: {
    color: theme.palette.colors.main,
    cursor: 'pointer',
    marginTop: 5
  },
  iconbutton: {
    cornerRadius: '255px',
    width: '40px',
    height: '40px',
    margin: `${theme.spacing()}px`
  },
  innerIcon: {
    width: '40px',
    height: '40px',
  }
});

export default styles;