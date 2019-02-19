import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import { fade } from '@material-ui/core/styles/colorManipulator';
import InputBase from '@material-ui/core/InputBase';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';
import LocationIcon from '@material-ui/icons/LocationOn';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import {secondaryListItems } from './DrawerListItems';
import AlarmList from "./AlarmList";
import axios from "axios";

import WeatherCard from "./WeatherCard"
import SleepTypeCard from './SleepTypeCard';
import SummaryGraph from './SummaryGraph';
import RecommendationCard from './RecommendationsCard';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';

import sleep from "../assets/tent.jpg";
import pi from "../assets/pi.jpg";
import ButtonBase from "./ButtonBase";
import bg from "../assets/blue_green_vector.jpg"
import Example from './SleepDataBarGraph'

import {Image, Container} from 'semantic-ui-react';
import AlarmClock from "./Clock";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 5,
    justifyContent: 'space-between',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'white',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    background: "#323335",
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
    backgroundColor: '#e8e8e8'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade("#535456", 0.15),
    '&:hover': {
      backgroundColor: fade('#a7a4ad', 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  alarmList: {
    marginLeft: 'auto', 
    height: 'auto', 
    width: 300,
  },
  card: {
      minWidth: 275,
  },
  title: {
  fontSize: 14,
  },
  pos: {
  marginBottom: 12,
  },  
});


class Dashboard extends React.Component {
  state = {
    open: true,
    alarms: [],
  };

  componentDidMount(){
    console.log("ComponentDidMount");
    const proxyurl = "https://cors-anywhere.herokuapp.com/"
    const url = "http://django-env.4qma8yiikv.us-east-1.elasticbeanstalk.com/alarms/"
    axios
      .get(url)
      .then(response => {
          console.log("Response: ", response);
          const newAlarms = response.data.map(a => {
            return {
              id: a.id,
              description: a.description,
              alarm_time: a.alarm_time,
              volume: a.volume,
              active: a.active,
            };
          });

          const newState = Object.assign({}, this.state, {
            alarms: newAlarms
          });

          this.setState(newState);
      })
      .catch(error => console.log(error));
  }

  handleRefresh = () => {
    console.log('refresh');
    window.location.reload();
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
          style={{flexDirection: 'row',}}
        >
          <Toolbar disableGutters={!this.state.open} className={classes.toolbar} style={{backgroundColor: 'white', flex: 1}}>
          
                  <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={this.handleDrawerOpen}
                    className={classNames(
                      classes.menuButton,
                      this.state.open && classes.menuButtonHidden,
                    )}
                  >
                    <MenuIcon style={{color:'#323335'}}/>
                  </IconButton>
                          
                  <ButtonBase/>
            <div style={{flex:1}}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon style={{color:'#3c3d3a'}}/>
                </div>
                <InputBase
                  style={{color: 'black'}}
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
            </div>
            </div>
            <div style={{alignItems:'flex-end', backgroundColor: 'white'}}>
              <IconButton color="inherit">
                <SettingsIcon style={{color:'#323335'}}/>
              </IconButton>
              <IconButton color="inherit">
                <Badge badgeContent={7} color="secondary">
                  <NotificationsIcon style={{color:'#323335'}}/>
                </Badge>
              </IconButton>
              <IconButton color="inherit">
                  <Image src={pi} size = "mini" avatar/>
              </IconButton>
              
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <Image style={{fontSize:30}} src={sleep}  avatar/>
            <Typography component="h1" variant="subtitle1" style={{color: "#b5b7b7"}}>Sleep Tracker</Typography>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon style={{color: 'white'}}/>
            </IconButton>
          </div>
          <Divider/>
          <Divider/>
          <List>  
            <div>
              <ListItem button  onClick={this.handleRefresh}>
                <ListItemIcon>
                  <DashboardIcon style={{color:'#d6e6ff'}}/>
                </ListItemIcon >
                <ListItemText
                    disableTypography
                    primary={<Typography variant="body2" style={{color: '#f2f4f7'}}>Dashboard</Typography>} />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <ShoppingCartIcon style={{color:'#d7ccff'}} />
                </ListItemIcon>
                <ListItemText
                    disableTypography
                    primary={<Typography variant="body2" style={{color: '#f2f4f7'}}>Alarms</Typography>} />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <PeopleIcon style={{color:'#faccff'}}  />
                </ListItemIcon>
                <ListItemText
                    disableTypography
                    primary={<Typography variant="body2" style={{color: '#f2f4f7'}}>Sleep Data</Typography>} />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <BarChartIcon style={{color:'#ffcdcc'}}/>
                </ListItemIcon>
                <ListItemText
                    disableTypography
                    primary={<Typography variant="body2" style={{color: '#f2f4f7'}}>Predictions</Typography>} />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <LayersIcon style={{color:'#fff0cc'}} />
                </ListItemIcon>
                <ListItemText
                    disableTypography
                    primary={<Typography variant="body2" style={{color: '#f2f4f7'}}>Settings</Typography>} />
              </ListItem>
            </div>
          </List>
          <Divider style={{backgroundColor: '#4b4d4f', height: 3}}/>
          <List>{secondaryListItems}</List>
        </Drawer>


        <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <div style={{display: 'flex', alignContent: 'space-between'}}>
                      <div style={{flex: 1, display: 'column', alignContent: 'space-between', marginRight: 30}}>
                              <div style={{ height: 400, display: 'flex', justifyContent: 'space-between', marginBottom: 30}}>
                                <div style={{display: 'flex'}}>
                                  <WeatherCard/>
                                </div>
                                <div style={{display: 'flex', width: '100%', marginLeft: 30, flexGrow: 1}}>
                                  <SleepTypeCard/>
                                </div>
                              </div>
                              <div style={{ height: 500, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 30}}>
                                <SummaryGraph/>
                              </div>
                              <div style={{height: 300, backgroundColor: 'yellow', display: 'flex', justifyContent:'center', marginBottom: 30}}>
                                <RecommendationCard/>
                              </div>
                      </div>
                <div className={classes.alarmList}>             
                        <Card className={classes.card}>
                          <div style={{flexDirection: 'column'}}>
                            <Image src={bg} style={{alignSelf: 'flex-start'}}/>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                              <AlarmClock style={{alignSelf: 'center'}}/>
                            </div>
                            <Divider style={{height: 12, backgroundColor: 'white'}}/>
                            <Typography variant="h5" style={{color: '#464b51', fontStyle:'bold'}}>My Alarms</Typography>
                            <Typography variant="subtitle1" style={{color: '#979fa8', fontStyle:'bold'}}>FPGA & Raspberry</Typography>
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                              <LocationIcon style={{color: '#38ddff'}}/>
                              <Typography variant="subtitle2" style={{color: '#979fa8', fontStyle:'bold'}}>Vancouver, BC</Typography>
                            </div>
                          </div>
                            <CardContent>
                              <AlarmList alarms={this.state.alarms}/>
                            </CardContent>
                        </Card>
                </div>
            </div>
        </main>
      </div>
    );
  }
}



Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);