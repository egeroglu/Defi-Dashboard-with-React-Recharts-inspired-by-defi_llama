import React, { useCallback, useState, useEffect } from "react";
import { PieChart, Pie, Sector,Cell } from "recharts";
import axios from 'axios';

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
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
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function ActiveChart() {
  const [chains, setChains] = useState([]);
  useEffect(() => {
    axios.get('https://api.llama.fi/chains')
    .then(res => {
      setChains(res.data);
    }).catch(err => {
      console.log(err);
    });
  });
  var emptyMap = [];
  var tvl=[];
  var names=["Ethereum","BSC","Tron","Avalanche","Solana","Polygon","Cronos","Fantom","Arbitrum","Waves","Others"];
  var othersTvl=0;
  // take tvl
  for(let i =0;i<chains.length;i++){
    tvl[i]=chains[i].tvl;
  }
  //sort tvl
  tvl.sort(function(a, b){return b - a});
  for(let i = 10;i<tvl.length;i++){
    othersTvl += tvl[i];
  }
  tvl[10]=othersTvl;
  // put into map
  for(let i=0;i<names.length;i++){
    emptyMap.push({"value":tvl[i],"name":names[i]});
  }
  //mydata is data map to display
  const myData = emptyMap.slice(0,11);
  const COLORS = ["#008000", "#800080", "#ADD8E6", "#CE0A55","#FFA500", "#00FF00", "#FF00FF", "#82801D","#29A6A6", "#A52A2A", "#9C9EA3"];

  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  return (
    <PieChart width={450} height={450}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={myData}
        cx={250}
        cy={185}
        innerRadius={75}
        outerRadius={110}
        dataKey="value"
        onMouseEnter={onPieEnter}
      >
      {myData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
      </Pie>
    </PieChart>
  );
}
