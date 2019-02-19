import React, {Component} from 'react';
import './App.css';
import Dashboard from "././components/DashboardDrawer";

class App extends Component {
  

  render() {
    console.log("rendering...");
    return (
      <div className = 'App' style={{backgroundColor:'#ededed'}}>
        <Dashboard/>
      </div>
    );
  }
}

export default App;
