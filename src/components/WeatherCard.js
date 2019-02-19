import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import SunIcon from '@material-ui/icons/WbSunny';
import axios from "axios";
import moment from 'moment';


let imgUrl = 'https://i.pinimg.com/originals/14/2d/6c/142d6c5e95565da9f4411a28adf4d3dd.png';
const styles = {
    card: {
        minWidth: 300, 
        backgroundImage: 'url(' + imgUrl + ')',
        backgroundSize: 'cover',
        overflow: 'hidden',
        height: 400,
    },
  };

function toCelsius(f) {
    return Math.floor(f-273.15);
}

class WeatherCard extends Component {
    state = {
        temperature: 0,
        city: 'Vancouver'
    }

    componentDidMount(){
        const url = "http://api.openweathermap.org/data/2.5/weather?q=Vancouver,CA&appid=579860cdc86588f8491eec562250b9e1"
        axios
          .get(url)
          .then(response => {
              console.log("Response: ", response);
              const newState = Object.assign({}, this.state, {
                temperature: response.data.main.temp
              });
    
              this.setState(newState);
          })
          .catch(error => console.log(error));
      }

    render() {
        var CurrentDate = moment().format('hh:mm a');
      return (
        <Card style={styles.card} className={{minWidth: 300}}>
            <div style={{height: '30%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-start'}}>
                <Typography variant="h1" style={{color: 'white', fontStyle:'bold', marginRight:5, marginTop: 20}}>{toCelsius(this.state.temperature)}</Typography>
                <Typography variant="h6" style={{color: 'white', fontStyle:'bold', marginRight:20, marginTop: 20}}>o</Typography>
            </div>
                <div style={{height: '70%', display: 'flex', flexDirection: 'row',  alignItems: 'flex-end', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                        <Typography variant="h4" style={{color: 'white', fontStyle:'bold', marginLeft: 25}}>Vancouver, BC</Typography>
                        <Typography variant="h5" style={{color: 'white', fontStyle:'bold', marginLeft: 25, marginBottom: 20}}>{CurrentDate}</Typography>
                    </div>
                    <SunIcon style={{fontSize: 50, color: 'white', marginRight: 15, marginBottom: 30}}/>
                </div>
        </Card>
      );
    }
  }

  export default WeatherCard;