import React, {Component} from "react";
import "./Alarms.css";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import StarIcon from '@material-ui/icons/Star';
import moment from 'moment';
import axios from "axios";
import Switch from 'react-switch';

const styles = theme => ({
    card: {
      maxWidth: 400,
    },
    actions: {
      display: 'flex',
    },
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    card: {
        minWidth: 275, 
    },
  });

const colours = ['#b2f2fe', '#9fc8fc', '#d0e1fb', '#98c6fb', '#c0cef1', '#c7dfdf', '#ceccd7', '#d9d7dc', '#c8bac1', '#c2e6ff', '#afdaff', 
                '#99cbff', '#87b7fe', '#80acff', '#7a9aff', '#7a86ff', '#76acff', '#75c7ff', '#b9e3c2', '#a2d6c8', '#71bbc1', '#85a3c5', '#878dbf', 
                '#cbe1ea', '#98c0ce', '#719cad', '#496370', '#daeed8', '#d4eacc', '#e6ffdc', '#a8c1a1'];

class Alarm extends Component {

    state = { expanded: false, 
              checked: this.props.active,
              id: this.props.id};

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded}));
      };

    handleChange = () => {
        console.log(this.state.id);
        const url = "http://django-env.4qma8yiikv.us-east-1.elasticbeanstalk.com/alarms/" +  this.state.id + "/";
        this.setState(state => ({checked: !state.checked}));
        console.log(this.state.checked)
        axios 
            .patch(url, {
                'active': this.state.checked,
            })
            .then(response => {
                console.log("Response: ", response);
            })
            .catch(error => console.log(error));
    }
     
    handleDeleteClick(id){
        const url = "http://django-env.4qma8yiikv.us-east-1.elasticbeanstalk.com/alarms/" +  id + "/";
        console.log(id);
        console.log(url);
        axios 
            .delete(url)
            .then(response => {
                console.log("Response: ", response);
            })
            .catch(error => console.log(error));
    }

    render() {
        const { classes } = this.props;
        var rcolor = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
        var date = new Date(this.props.alarm_time).toISOString();
        var blue = colours[(Math.floor(Math.random() * colours.length))];
        return (
        <div>
            
        <Divider style={{height: 5, backgroundColor: 'white'}}/>
        <Card className={styles.card} style={{ borderLeft: '10px solid', borderColor: blue,}}>
            <div style={{flexDirection: 'column', justifyContent: 'space-around', alignContent: 'space-around'}}>
                    <div style={{flexDirection: 'column', marginLeft: 15, marginTop: 10}}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div style={{display:'flex'}}>
                                <Typography variant="h3" style={{color: '#464b51'}}>{moment(date).format('hh:mm')}</Typography>
                                <Typography variant="subtitle2" style={{color: '#464b51'}}>{moment(date).format('a')}</Typography>
                            </div>
                            <Switch
                                className="react-switch"
                                onChange={this.handleChange}
                                checked={this.state.checked}
                                aria-labelledby="neat-label"
                                />
                        </div>
                        <div style={{display: 'flex'}}>
                            <Typography variant="subtitle1" style={{color: '#464b51'}}>{moment(date).format('dddd, MMMM Do YYYY')}</Typography>
                        </div>
                    </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}} >
                <div>
                    <IconButton aria-label="Edit">
                        <StarIcon style={{fontSize: 25}}/>
                    </IconButton>
                    <IconButton aria-label="Edit">
                        <EditIcon style={{fontSize: 25}}/>
                    </IconButton>
                    <IconButton aria-label="Delete"  onClick={() => {this.handleDeleteClick(this.props.id)}}>
                        <DeleteIcon style={{fontSize: 25}}/>
                    </IconButton>
                </div>
                <IconButton
                    className={classnames(styles.expand, {
                    [styles.expandOpen]: this.state.expanded,
                    })}
                    onClick={this.handleExpandClick}
                    aria-expanded={this.state.expanded}
                    aria-label="Show more"
                >
                    <ExpandMoreIcon  style={{fontSize: 25}}/>
                </IconButton>
            </div>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <Typography paragraph>Alarm Description:</Typography>
                <Typography style={{fontStyle: 'italic'}}>
                {this.props.description}
                </Typography>
            </CardContent>
            </Collapse>
        </div>
        </Card>
        
        <Divider style={{height: 10, backgroundColor: 'transparent'}}/>
        </div>
        );
    }
}

Alarm.propTypes = {
    description: PropTypes.string.isRequired
};

export default Alarm;