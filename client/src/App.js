import './App.css';
import NavigationBar from './NavigationBar';
import Sidebar from './Sidebar';
import Home from './Home';
import Flow from './Flow.js';
import ColorDetailView from './ColorDetailView';
import { useState} from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import useSWR from "swr"; // SWR is a React Hooks library for data fetching
import { laggy } from "./utils.js"; // See https://swr.vercel.app/docs/middleware#keep-previous-result
import TestId from './TestId'; // An enum that makes the codebase more DRY, via making the app's data-testid selectors reusable.
 
// The fetcher function accepts a url and serves as (essentially) a Fetch API wrapper. The below line of code was borrowed directly from the SWR documentation (https://swr.vercel.app/docs/data-fetching). 
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

  // If a ColorGridSwatch is clicked while the user is on the / path, the user will be navigated to the /color-detail-view path, and the activeDetailViewColor state will be set to the color that was clicked.
  const handleColorGridSwatchClick = (color) => {
    setActiveDetailViewColor(color);
    setDatabasePageNumber(0);
    navigate(`/colors/${color.id}`);
  }; 
  
  /* Via the useSWR hook we conditionally fetch data based on the current databasePageNumber and activeColorGroupQueryParameter values (per https://swr.vercel.app/docs/conditional-fetching)*/
  const { data: colors, error, isValidating} = useSWR(() => {
    return (process.env.REACT_APP_APIUrl + `/colors` + `?page=${databasePageNumber}` + (activeColorGroupQueryParameter !== null ? `&group=${activeColorGroupQueryParameter}` : ""))
  },
    fetcher, { 
    /* Per https://swr.vercel.app/docs/middleware#keep-previous-result, "Sometimes you want the data returned by
   useSWR to be "laggy". Even if the key changes, you still want it to return the previous result until
   the new data has loaded." As far as our application, we decided that when the SWR key changes (via e.g. a
   user clicking the "Random Color" button), we want to continue to display the data returned by the previous key, until 
   the data associated with the new key has finished loading.*/
      use: [laggy] })

  let maximumNumberOfHomePageColorGridSwatchesThatShouldBeDisplayed = 12; // Regarding the below Math.ceil(colors.totalItems / maximumNumberOfHomePageColorGridSwatchesThatShouldBeDisplayed) function, because the design file (as of July 2022) features 12 colors per page, we divide the total number of colors that we are retrieving - this amount varies depending on whether or not e.g. the query is filtered by color group - by 12 to deterimine how the PaginationList component should render. Because page values are integers, we round up to the nearest integer.
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
        {colors && <Route path="/" element={(colors !== undefined) ? <Home colors={colors} onColorGridSwatchClick={handleColorGridSwatchClick} count={Math.ceil(colors.totalItems / maximumNumberOfHomePageColorGridSwatchesThatShouldBeDisplayed)} page={databasePageNumber + 1} onPageSelection={handlePageSelection} flow={Flow.list_view} data-testid={TestId.HomeTestId} /> : null} />}
        {<Route path="/colors/:id" element={<ColorDetailView color={activeDetailViewColor} data-testid={TestId.ColorDetailViewTestId}/>} />}
      </Routes>      
    </div>
  );
}

export default App;
