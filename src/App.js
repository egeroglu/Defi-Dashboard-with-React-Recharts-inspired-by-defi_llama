import Datatable from "./components/Datatable";
import Sidebar from "./components/Sidebar";
import Searcbar from "./components/Searchbar";
import FilterBar from "./components/FilterBar";
import React, { useEffect, useState } from "react";
import Grid from '@mui/material/Grid';
import ActiveChart from "./PieChart";
import axios from 'axios';
import MyAreaChart from "./AreaChart";

function App () {
  const [chains, setChains] = useState([]);
  useEffect(() => {
    axios.get('https://api.llama.fi/chains')
    .then(res => {
      setChains(res.data);
    }).catch(err => {
      console.log(err);
    });
  });

  return (
    <div className="main">
      <Sidebar/>
      <div className="container">
        <div className="incontainer">
          <Searcbar placeholder="Search..." />
          <br/>
            <p className="subTitle">Total Value Locked All Chains</p>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <div className="dene">
                  <ActiveChart/>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div className="dene">
                  <MyAreaChart/>
                </div>
              </Grid>
            </Grid>
            <FilterBar placeholder="Filter..." />
            <br/>
            <Datatable/>
        </div>
      </div>
    </div>
  ); 
}

export default App;