import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import HotelIcon from '@material-ui/icons/Hotel';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import BoardIcon from '@material-ui/icons/DeveloperBoard';



var date = new Date().getDate();
var month = new Date().getMonth() + 1; 
var year = new Date().getFullYear(); 
var today = month + '/' + date + '/' + year;

export const secondaryListItems = (
  <div>
    <Divider style={{height:30, backgroundColor: '#323335'}}/>
    <ListItem button>
      <ListItemIcon>
        <HotelIcon style={{color:'#d7e597'}}/>
      </ListItemIcon>
      <div style={{marginLeft:15, flexDirection: 'column'}}>
        <Typography variant="h4" style={{color: '#8ceadf', justifyContent:'center'}}>8</Typography>
        <Typography variant="body2" style={{color: '#f2f4f7', fontStyle:'italic'}}>Hours of sleep</Typography>
        <Typography variant="body2" style={{color: '#f2f4f7', fontStyle:'italic'}}>{today}</Typography>
      </div>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BoardIcon  style={{color:'#aae597'}} />
      </ListItemIcon>
      <div style={{marginLeft:15, flexDirection: 'column'}}>
        <Typography variant="body2" style={{color: '#f2f4f7'}}>FGPA is connected!</Typography>
      </div>
    </ListItem>
  </div>
);