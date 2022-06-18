import './App.css';
import NavigationBar from './NavigationBar';
import Sidebar from './Sidebar';
import ColorGrid from './ColorGrid';
import PaginationList from './PaginationList';
import { useState, useEffect} from "react";
import useSWR from "swr";
import {laggy} from "./utils.js";
const { stringify } = require('flatted');
const fetcher = (url) => fetch(url).then((res) => res.json());

function App() {
  
  const [databasePageNumber, setDatabasePageNumber] = useState(0);
  const [activeColorGroupQueryParameter, setActiveColorGroupQueryParameter] = useState(null);
  const [activeDetailViewColor, setActiveDetailViewColor] = useState(null);    
  
  const handlePageSelection = (pageSelected) => {
    setDatabasePageNumber(((pageSelected - 1)));
  };

  const handleColorGroupClick = (colorGroup) => {
    setActiveColorGroupQueryParameter(colorGroup);
  }; 

  const handleColorGridSwatchClick = (color) => {
    setActiveDetailViewColor(color);
  }; 

  const { data: colors, error, isValidating, isLagging, resetLaggy } = useSWR(() => {
    return ('http://localhost:8080/api/colors' + `?page=${databasePageNumber}` + (activeColorGroupQueryParameter !== null ? `&group=${activeColorGroupQueryParameter}` : ""))
  },
    fetcher, { use: [laggy] })

  console.log(`colors is ${JSON.stringify(colors)}`);
  return (
    <div className="App">
      <header>
        <nav>
        <NavigationBar></NavigationBar>
        </nav>
      </header>
      <div className='Sidebar'>
        <Sidebar onColorGroupClick={handleColorGroupClick}></Sidebar>
      </div>
      {isValidating && colors == undefined && <div>A moment please...</div>}
      {error && (
        <div>{`Error fetching colors data - ${error}`}</div>
      )}
      <div className='ColorGrid-container'>
        {colors != undefined &&
          <ColorGrid colors={colors} onColorGridSwatchClick={handleColorGridSwatchClick} ></ColorGrid>
        }
        <div className='PaginationList-container'>
          {colors != undefined && <PaginationList count={Math.ceil(colors.totalItems / 12)} page={databasePageNumber + 1} onPageSelection={handlePageSelection}>
          </PaginationList>}
        </div>
      </div>
      
    </div>
  );
}

export default App;
