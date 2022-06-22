import './App.css';
import NavigationBar from './NavigationBar';
import Sidebar from './Sidebar';
import Home from './Home';
import Flow from './Flow.js';
import ColorDetailView from './ColorDetailView';
import { useState} from "react";
import { Routes, Route } from "react-router-dom";
import useSWR from "swr";
import {laggy} from "./utils.js";
import TestId from './TestId.js';
import { useNavigate } from "react-router-dom";

const fetcher = (url) => fetch(url).then((res) => res.json());

function App() {
  
  const [databasePageNumber, setDatabasePageNumber] = useState(0);
  const [activeColorGroupQueryParameter, setActiveColorGroupQueryParameter] = useState(null);
  const [activeDetailViewColor, setActiveDetailViewColor] = useState(null);    
  let navigate = useNavigate();
  
  const handlePageSelection = (pageSelected) => {
    setDatabasePageNumber(((pageSelected - 1)));
  };

  const handleColorGroupClick = (colorGroup) => {
    setActiveColorGroupQueryParameter(colorGroup);
    setDatabasePageNumber(0);
    navigate(`/`);
  }; 

  const handleColorGridSwatchClick = (color) => {
    setActiveDetailViewColor(color);
    setDatabasePageNumber(0);
    navigate(`/colors/${color.id}`);
  }; 

  const { data: colors, error, isValidating} = useSWR(() => {
    return (process.env.REACT_APP_APIUrl + `/colors` + `?page=${databasePageNumber}` + (activeColorGroupQueryParameter !== null ? `&group=${activeColorGroupQueryParameter}` : ""))
  },
    fetcher, { use: [laggy] })

  let homeElement;
  homeElement = (colors !== undefined) ? <Home colors={colors} onColorGridSwatchClick={handleColorGridSwatchClick} count={Math.ceil(colors.totalItems / 12)} page={databasePageNumber + 1} onPageSelection={handlePageSelection} flow={Flow.list_view} data-testid={TestId.HomeTestId} /> : null; // Regarding Math.ceil(colors.totalItems / 12), because the design file features 12 colors per page, we divide the total number of colors that we are retrieving - sometimes our color retrieval is filtered by color group -  by 12 to calculate our desired number of pages. Because page values are integers, we round up to the nearest integer.
  return (
    <div className="App">
      <header>
        <nav>
          <NavigationBar data-testid={TestId.NavigationBarTestId}></NavigationBar>
        </nav>
      </header>=
      <div className='Sidebar'>
        <Sidebar onColorGroupClick={handleColorGroupClick} data-testid={TestId.SidebarTestId}></Sidebar>
      </div>
      {isValidating && colors === undefined && <div>A moment please...</div>}
      {error && (
        <div>{`Error fetching colors data - ${error}`}</div>
      )}
      <Routes> 
        {colors && <Route path="/" element={homeElement} />}
        {colors && <Route path="home" element={homeElement} />}
        {<Route path="/colors/:id" element={<ColorDetailView color={activeDetailViewColor} data-testid={TestId.ColorDetailViewTestId}/>} />}
      </Routes>      
    </div>
  );
}

export default App;
