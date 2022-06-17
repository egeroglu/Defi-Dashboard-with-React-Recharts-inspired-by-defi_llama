import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import React, { useEffect, useState } from "react";
import axios from 'axios';

const toPercent = (decimal, fixed = 0) =>
  `${(decimal * 100).toFixed(fixed)}%`;

const getPercent = (value, total) => {
  const ratio = total > 0 ? value / total : 0;
  return toPercent(ratio, 2);
};
const timeCon = (myNum) => {
    var a = new Date(myNum * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + ' ' + month + ' ' + year;
    return time;
}
const timeflag = (myNum) => {
    var a = new Date(myNum * 1000);
    var date = a.getDate();
    if(date == "15"){
        return true;
    }else{
        return false;
    }
}

const renderTooltipContent = (o) => {
  const { payload = [], label } = o;
  const total = payload.reduce((result, entry ) => result + entry.value,0);

  return (
    <div className="customized-tooltip-content">
      <p className="total">{`${label} (Total: ${total})`}</p>
      <ul className="list">
        {payload.map((entry, index) => (
          <li key={`item-${index}`} style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}(${getPercent(entry.value, total)})`}
          </li>
        ))}
      </ul>
    </div>
  );
};
var time ="";


export default function MyAreaChart() {
    const [eth, setEth] = useState([]);
    useEffect(() => {
      axios.get('https://api.llama.fi/charts/Ethereum')
      .then(res => {
        setEth(res.data);
      }).catch(err => {
        console.log(err);
      });
    });
    const [bsc, setBsc] = useState([]);
    useEffect(() => {
      axios.get('https://api.llama.fi/charts/BSC')
      .then(res => {
        setBsc(res.data);
      }).catch(err => {
        console.log(err);
      });
    });
    const [tron, setTron] = useState([]);
    useEffect(() => {
      axios.get('https://api.llama.fi/charts/BSC')
      .then(res => {
        setTron(res.data);
      }).catch(err => {
        console.log(err);
      });
    });
    const [avax, setAvax] = useState([]);
    useEffect(() => {
      axios.get('https://api.llama.fi/charts/BSC')
      .then(res => {
        setAvax(res.data);
      }).catch(err => {
        console.log(err);
      });
    });
    const [sol, setSol] = useState([]);
    useEffect(() => {
      axios.get('https://api.llama.fi/charts/BSC')
      .then(res => {
        setSol(res.data);
      }).catch(err => {
        console.log(err);
      });
    });
    //console.log(avax.length);
    var firstEth=[];
    var firstEthTime=[];
    for(let i =0;i<eth.length;i++){
        var a = new Date(eth[i].date * 1000);
        var date = a.getDate();
        if(date == "15"){
            firstEth.push(eth[i].totalLiquidityUSD);
            firstEthTime.push(eth[i].date);
        }        
    }
    var firstBsc=[];
    var firstBscDate=[];
    for(let i =0;i<bsc.length;i++){
        var a = new Date(bsc[i].date * 1000);
        var date = a.getDate();
        if(date == "15"){
            firstBsc.push(bsc[i].totalLiquidityUSD);
            firstBscDate.push(bsc[i].date);
        }
    }
    var firstTron=[];
    var firstTronDate=[];
    for(let i =0;i<tron.length;i++){
        var a = new Date(tron[i].date * 1000);
        var date = a.getDate();
        if(date == "15"){
            firstTron.push(tron[i].totalLiquidityUSD);
            firstTronDate.push(tron[i].date);
        }
    }
    var firstAvax=[];
    var firstAvaxDate=[];
    for(let i =0;i<avax.length;i++){
        var a = new Date(avax[i].date * 1000);
        var date = a.getDate();
        if(date == "15"){
            firstAvax.push(avax[i].totalLiquidityUSD);
            firstAvaxDate.push(avax[i].date);
        }
    }
    var firstSol=[];
    var firstSolDate=[];
    for(let i =0;i<sol.length;i++){
        var a = new Date(sol[i].date * 1000);
        var date = a.getDate();
        if(date == "15"){
            firstSol.push(sol[i].totalLiquidityUSD);
            firstSolDate.push(sol[i].date);
        }
    }
    var displayEth=firstEth.slice(firstEth.length-18,firstEth.length);
    var displayBsc=firstBsc.slice(firstBsc.length-18,firstBsc.length);
    var displayTron=firstTron.slice(firstTron.length-18,firstTron.length);
    var displayAvax=firstAvax.slice(firstAvax.length-18,firstAvax.length);
    var displaySol=firstSol.slice(firstSol.length-18,firstSol.length);
    var displayEthDate=firstEthTime.slice(firstEthTime.length-18,firstEthTime.length);

    var normalEthDate = [];
    for(let i = 0; i<displayEthDate.length;i++){
        var a = new Date(displayEthDate[i] * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var time = date + ' ' + month + ' ' + year;
        normalEthDate.push(time);
    }
    //console.log(normalEthDate);

    var myMap=[];
    for(let i =0;i<18;i++){
        myMap.push({
            "month":normalEthDate[i],
            "Ethereum":displayEth[i],
            "BSC":displayBsc[i],
            "Tron":displayTron[i], 
            "Avalance":displayAvax[i],
            "Solana":displaySol[i],           
        });
    }

    return (
        <AreaChart
        width={650}
        height={400}
        data={myMap}
        stackOffset="expand"
        margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0
        }}
        >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis tickFormatter={toPercent} />
        <Tooltip content={renderTooltipContent} />
        <Area
            type="monotone"
            dataKey="Ethereum"
            stackId="1"
            stroke="#008000"
            fill="#008000"
        />
        <Area
            type="monotone"
            dataKey="BSC"
            stackId="1"
            stroke="#800080"
            fill="#800080"
        />
        <Area
            type="monotone"
            dataKey="Tron"
            stackId="1"
            stroke="#ADD8E6"
            fill="#ADD8E6"
        />
            <Area
            type="monotone"
            dataKey="Avalance"
            stackId="1"
            stroke="#CE0A55"
            fill="#CE0A55"
        />
        <Area
            type="monotone"
            dataKey="Solana"
            stackId="1"
            stroke="#FFA500"
            fill="#FFA500"
        />

        </AreaChart>
    );
}
