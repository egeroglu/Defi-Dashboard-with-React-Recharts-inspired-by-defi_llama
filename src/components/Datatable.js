import React, { useEffect, useState, useMemo } from "react";
import axios from 'axios';
import { useTable } from 'react-table'
import { COLUMNS } from './columns'
import './table.css'

export default function Datatable ({width='100%', height='auto'}) {
    const [chains, setChains] = useState([]);
    useEffect(() => {
      axios.get('https://api.llama.fi/chains')
      .then(res => {
        setChains(res.data);
      }).catch(err => {
        console.log(err);
      });
    });

    var myChainNames=[];
    var myChainTvls=[];
    var myChainSymbols=[];
    for(let i =0;i<chains.length;i++){
        myChainNames.push(chains[i].name);
        myChainTvls.push(chains[i].tvl);
        myChainSymbols.push(chains[i].tokenSymbol);
    }
    var MOCK_DATA=[];
    for(let i =0;i<chains.length;i++){
        MOCK_DATA.push({
            "id":i+1,
            "tokenSymbol":myChainSymbols[i],
            "name":myChainNames[i],
            "tvl":myChainTvls[i]
        });
    }    
    var colNames = ["No","Short Name","Chain Name", "TVL"];
    return (
        <div>
            {MOCK_DATA.length > 0 && (
                <table className="table"
                    cellSpacing="0"
                    style={{width: width, height: height,padding:"5px 10px"}}
                >
                    <thead>
                        <tr>
                            {colNames.map((headerItem,index) =>(
                                <th key={index}>
                                   {headerItem.toUpperCase()}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(MOCK_DATA).map((obj,index) =>(
                            <tr key={index}>
                                {Object.values(obj).map((value,index2)=>(
                                    <td key={index2}>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}