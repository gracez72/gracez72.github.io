import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import moment from 'moment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';


let imgUrl = 'https://i.ytimg.com/vi/pGbIOC83-So/maxresdefault.jpg';

const styles = {
    card: {
        width: '100%', 
        height: 300,
        backgroundImage: 'url(' + imgUrl + ')',
        backgroundSize: 'cover',
        overflow: 'hidden',
    },
    smallcard: {
        width: 190,
        height: 220,
        backgroundColor: 'white',
        marginLeft: '10px',
        marginRight: '10px',
        marginTop: '5px'
    },  
    bigAvatar: {
        margin: 10,
        width: 100,
        height: 100,
        marginTop: 20,
    },
  };

class RecommendationCard extends Component {

    render() {
      return (
        <Card style={styles.card}>
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', height: '100%', width: '100%',justifyContent: 'space-between', }}>    
        <div style={{ height: '20%', display: 'flex', justifyContent: 'space-between', paddingTop: '20px',paddingLeft: '18px', paddingRight: '5px'}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                    <Typography variant='h6' style={{fontWeight: 'bold', color: '#282828'}}>Popular Recommendations</Typography>
                </div>
                <IconButton style={{alignSelf: 'flex-start'}}>
                        <MoreVertIcon />
                    </IconButton>
            </div>

            <div style={{height: '85%', flex: 1, display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                <Card style={{...styles.smallcard, ...{marginLeft: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}}>    
                    <Avatar alt="No coffee" src="https://cdn2.iconfinder.com/data/icons/miscellaneous-5/512/coffee-512.png" style={styles.bigAvatar} />
                    <Typography  variant='h6' style={{fontWeight: 'bold', color: '#686868'}}>No Coffee</Typography>
                    <div style={{paddingLeft: 20, paddingRight: 20, paddingTop: 5}}>
                        <Typography paragraph style={{color: '#686868'}}>Reduce the amount of caffeine you consume.</Typography>
                    </div>
                </Card>
                <Card style={{...styles.smallcard, ...{display: 'flex', flexDirection: 'column', alignItems: 'center'}}}>
                    <Avatar alt="No coffee" src="https://cdn3.iconfinder.com/data/icons/20-business-flat-icons-shadow/96/41-512.png" style={styles.bigAvatar} />
                        <Typography  variant='h6' style={{fontWeight: 'bold', color: '#686868'}}>Backlit Screen</Typography>
                        <div style={{paddingLeft: 20, paddingRight: 20, paddingTop: 5}}>
                            <Typography paragraph style={{color: '#686868'}}>Text text text text text text text text text.</Typography>
                        </div>
                </Card>
                <Card  style={{...styles.smallcard, ...{display: 'flex', flexDirection: 'column', alignItems: 'center'}}}>
                <Avatar alt="No " src="data:image/png;base64,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" style={styles.bigAvatar} />
                        <Typography  variant='h6' style={{fontWeight: 'bold', color: '#686868'}}>7 Hours Sleep</Typography>
                        <div style={{paddingLeft: 20, paddingRight: 20, paddingTop: 5}}>
                            <Typography paragraph style={{color: '#686868'}}>Text text text text text text text text text.</Typography>
                        </div>
                </Card>
                <Card  style={{...styles.smallcard, ...{display: 'flex', flexDirection: 'column', alignItems: 'center'}}}>
                <Avatar alt="No " src="data:image/png;base64,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" style={styles.bigAvatar} />
                        <Typography  variant='h6' style={{fontWeight: 'bold', color: '#686868'}}>No Daytime Naps</Typography>
                        <div style={{paddingLeft: 20, paddingRight: 20, paddingTop: 5}}>
                            <Typography paragraph style={{color: '#686868'}}>Text text text text text text text text text.</Typography>
                        </div>
                </Card>
            </div>
        </div>
        </Card>
      );
    }
  }

  export default RecommendationCard;