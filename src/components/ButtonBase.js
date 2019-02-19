import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDiection: 'row',
    minWidth: 300,
    width: '30%',
    alignContent: 'flex-start'
  },
  image: {
    position: 'relative',
    height: 60,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 60,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
        color: '#795796'
      },
    },
    marginTop: 5, 
    marginBottom: 5,
    marginRight: 5,
    marginLeft:5,
    backgroundColor: 'white'
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: "white",
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'white',
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    color: '#7d7782',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  imageMarked: {
    height: 5,
    width: 50,
    backgroundColor: '#b17ded',
    position: 'absolute',
    bottom: -2,
    left: 'calc(30% - 2px)',
    transition: theme.transitions.create('opacity'),
  },
});

const tabs = [
  {
    title: 'Alarms',
    width: '30%',
  },
  {
    title: 'Trends',
    width: '30%',
  },
  {
    title: 'Events',
    width: '30%',
  },
];

function ButtonBases(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      {tabs.map(tab => (
        <ButtonBase
          focusRipple
          key={tab.title}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          style={{
            width: tab.width,
          }}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundColor:"white",
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle2"
              style={{fontSize: 15, fontWeight: 'normal'}}
              className={classes.imageTitle}
            >
              {tab.title}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
      ))}
    </div>
  );
}

ButtonBases.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonBases);