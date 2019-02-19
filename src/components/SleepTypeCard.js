import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import moment from 'moment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import { PieChart, Pie, Sector, Cell} from 'recharts';

const data = [
    { name: 'Awake', value: 2.5 },
    { name: 'Light Sleep', value: 3 },
    { name: 'REM Sleep', value: 2 },
    { name: 'Deep Sleep', value: 0.6 },
  ];

  const COLORS = ['#00A896', '#02C39A', '#05668D', '#028090'];

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
      fill, payload, percent, value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
  

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${value} hr`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`(${(Math.floor(percent * 100))}%)`}
        </text>
      </g>
    );
  };
    
const styles = theme => ({
  card: {
      width: '100%',
      height: 'auto',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
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
});

class SleepTypeCard extends React.Component {
  state = { activeIndex: 0 };

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    const { classes } = this.props;
    var CurrentDate = moment().format('dddd, MMMM Do');

    return (
      <Card className={classes.card}>
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between'}}>        
            <div style={{ height: '20%', display: 'flex', justifyContent: 'space-between', padding: '18px 40px'}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                    <Typography variant='h6' style={{fontWeight: 'bold', color: '#686868'}}>Sleep Distribution Overview</Typography>
                    <Typography variant='subtitle2' style={{fontStyle: 'light', color: '#888888'}}>As of {CurrentDate}</Typography>
                </div>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div>
            <div style={{height: '80%', justifyContent: 'center', alignItems: 'center'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', flex: 1, marginLeft: 20}}>
                    <PieChart width={450} height={400} style={{width: '70%'}}>
                        <Pie
                            activeIndex={this.state.activeIndex}
                            activeShape={renderActiveShape}
                            data={data}
                            cx='50%'
                            cy='35%'
                            innerRadius={100}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                            onMouseEnter={this.onPieEnter}
                        >        	
                        {
                            data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
                        }
                        </Pie>
                    </PieChart>
                    <div style={{display: 'flex', width: '30%', flexDirection: 'column', marginRight: 15, justifyContent: 'flex-start'}}>
                        <div style={{width: '100%', height: '25%', flexDirection: 'column', display: 'flex', justifyContent: 'center'}}>
                                <Typography variant="h6" style={{color: '#ff6961', fontWeight:'bold', fontSize: 15}}>HEART RATE</Typography>    
                                <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <Typography variant="h2" style={{color: '#686868', fontSize:45}}>80</Typography>
                                    <Typography variant="subtitle2" style={{color: '#686868', alignSelf: 'flex-end', marginLeft: 5}}>bpm</Typography>
                                </div>
                            </div>
                            <div style={{width: '100%', height: '25%', flexDirection: 'column', display: 'flex', justifyContent: 'center'}}>
                            <Typography variant="h6" style={{color: '#00A896', fontWeight:'bold', fontSize: 15}}>OXYGEN LEVEL</Typography> 
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <Typography variant="h2" style={{color: '#686868', fontSize:45, justifyContent: 'flex-start'}}>95%</Typography>
                           </div>
                        </div>
                        
                        <div style={{width: '100%', height: '25%', flexDirection: 'column', display: 'flex', justifyContent: 'center'}}> 
                            <Typography variant="h6" style={{color: '#05668D', fontWeight:'bold', fontSize: 15}}>HOURS OF SLEEP</Typography>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <Typography variant="h2" style={{color: '#686868', fontSize:45}}>7.5</Typography>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </Card>
    );
  }
}

SleepTypeCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SleepTypeCard);