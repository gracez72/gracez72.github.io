import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import AreaChart from 'recharts/lib/chart/AreaChart';
import Area from 'recharts/lib/cartesian/Area';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
import Card from '@material-ui/core/Card';
import moment from 'moment';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const data = [
  { name: 'Mon', Visits: 2200, Orders: 3400 },
  { name: 'Tue', Visits: 1280, Orders: 2398 },
  { name: 'Wed', Visits: 5000, Orders: 4300 },
  { name: 'Thu', Visits: 4780, Orders: 2908 },
  { name: 'Fri', Visits: 5890, Orders: 4800 },
  { name: 'Sat', Visits: 4390, Orders: 3800 },
  { name: 'Sun', Visits: 4490, Orders: 4300 },
];

const styles = {
    card: {
        width: '100%',
        height: 500,
        display: 'flex',
        alignItems: 'center',
    },
  };

function SummaryGraph() {
    var CurrentDate = moment().format('dddd, MMMM Do');
  return (
    <Card style={styles.card} className={{minWidth: 300}}>
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', height: '100%', width: '100%',justifyContent: 'space-between', }}>        
                <div style={{ height: '20%', display: 'flex', justifyContent: 'space-between', paddingTop: '20px',paddingLeft: '18px', paddingRight: '5px'}}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                        <Typography variant='h6' style={{fontWeight: 'bold', color: '#686868'}}>Weekly Sleep Summary</Typography>
                        <Typography variant='subtitle2' style={{fontStyle: 'light', color: '#888888'}}>As of {CurrentDate}</Typography>
                    </div>
                    <IconButton style={{alignSelf: 'flex-start'}}>
                        <MoreVertIcon />
                    </IconButton>
                </div>
        <ResponsiveContainer width="99%" height="90%">
        <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="Visits" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="Orders" stroke="#8884d8" activeDot={{ r: 8 }} />
      </AreaChart>
        </ResponsiveContainer>
    </div>
    </Card>
  );
}

export default SummaryGraph;