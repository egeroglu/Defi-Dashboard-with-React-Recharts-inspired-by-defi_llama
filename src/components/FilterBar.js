import "./Searchbar.css";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, { useEffect, useState } from "react";
import axios from 'axios';

export default function Searchbar({placeholder}){
    const [chains, setChains] = useState([]);
    useEffect(() => {
      axios.get('https://api.llama.fi/chains')
      .then(res => {
        setChains(res.data);
      }).catch(err => {
        console.log(err);
      });
    });
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = chains.filter((value) =>{
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });
        if(searchWord === ""){
            setFilteredData([]);
        }else{
            setFilteredData(newFilter);
        }
    };
    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
    }
    return (
        <div className="search">
            <div className="searchInputs">
                <input type="text" placeholder={placeholder} value={wordEntered} onChange={handleFilter}/>
                <div className="searchIcon">
                    {filteredData.length === 0 ? <KeyboardArrowDownIcon/> :<CloseIcon id="clearBtn" onClick={clearInput} />}
                </div>
            </div>
            {filteredData.length != 0 && (
                <div className="dataResult">
                    {filteredData.map((value,key) => {
                        return (
                            <a className="dataItem" href={value.url} key={key}>
                                <p>{value.name}</p>
                            </a>
                        );
                    })}
                </div>
            )}
        </div>
    )
}