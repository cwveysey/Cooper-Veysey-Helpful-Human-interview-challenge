import './App.css';
import NavigationBar from './NavigationBar';
import Sidebar from './Sidebar';
import Home from './Home';
import ViewConfiguration from '../enums/ViewConfiguration.js';
import ColorDetailView from './ColorDetailView';
import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import useSWR from "swr"; // A React Hooks library for data fetching.
import { laggy } from "../utils/utils.js"; // SWR middleware. Configured per https://swr.vercel.app/docs/middleware#keep-previous-result.
import TestId from '../enums/TestId.js'; // An enum that makes the codebase more DRY, via making the app's data-testid selectors reusable.

/* The fetcher function accepts a url and serves as (essentially) a Fetch API wrapper. The below line of code was borrowed
directly from the SWR documentation (https://swr.vercel.app/docs/data-fetching). */
const fetcher = (url) => fetch(url).then((res) => res.json());

function App() {

  /* The databasePageNumber value 
  
  1) Is (via props) ultimately passed to the PaginationList and Pagination components. 
  This value affects how these components are rendered (for example: which page number is highlighted, what page numbers 
  are displayed).

  2) Is passed as an argument to the useSWR hook, which will determine what data is fetched from the paginated-API 
  (e.g. if the value is 0, then the first page of relevant data will be fetched from the API) */
  const [databasePageNumber, setDatabasePageNumber] = useState(0);

  /* The activeColorGroupQueryParameter value is passed as an argument to the useSWR hook, which determines what data 
  is fetched from the API */
  const [activeColorGroupQueryParameter, setActiveColorGroupQueryParameter] = useState(null);
  let navigate = useNavigate();

  const handlePageSelection = (pageSelected) => {
    /* Because Pagination component page numbers are 1-indexed, and database page numbers are 0-indexed, we
    subtract 1 from the pageSelected value to calculate the desired databasePageNumber. */
    setDatabasePageNumber(((pageSelected - 1)));
  };

  const handleColorGroupClick = (colorGroup) => {
    setActiveColorGroupQueryParameter(colorGroup);
    /* If a user clicks a Color_group_list_item or the Random_color_button, the databasePageNumber should be set to 0, 
    because we want the first page of relevant data to be retrieved and displayed. */
    setDatabasePageNumber(0);
    navigate(`/`);
  };

  /* If a ColorGridSwatch is clicked while the "/" path is the current path, then the corresponding color id will be passed as
  an argument to the React Router 'useNavigate' hook. This will navigate the user to the path associated with the 
  aforementioned color id (which will render a ColorDetailView component as part of that process). */
  const handleColorGridSwatchClick = (color) => {
    navigate(`/colors/${color.id}`);
  };

  /* Via the useSWR hook we conditionally fetch data based on the current databasePageNumber and activeColorGroupQueryParameter
  values (per https://swr.vercel.app/docs/conditional-fetching) */
  const { data, error, isValidating } = useSWR(() => {
    return (process.env.REACT_APP_APIUrl + `/colors` + `?page=${databasePageNumber}` + (activeColorGroupQueryParameter !== null ? `&group=${activeColorGroupQueryParameter}` : ""))
  },
    fetcher, {
    /* Per https://swr.vercel.app/docs/middleware#keep-previous-result, "Sometimes you want the data returned by
    useSWR to be "laggy". Even if the key changes, you still want it to return the previous result until
    the new data has loaded." As far as our application, we decided that when the SWR key changes (via e.g. a
    user clicking the "Random Color" button), we want to continue to display the data returned by the previous key, until 
    the data associated with the new key has finished loading.*/
    use: [laggy]
  })

  /* Because the design file (as of July 2022) features 12 colors per page, we divide the total number of colors that we are 
  retrieving - this amount varies depending on whether or not e.g. the query is filtered by color group - by 12 to deterimine
  how the PaginationList component should render. */
  let maximumNumberOfHomePageColorGridSwatchesThatShouldBeDisplayed = 12;
  // Because Pagination component page numbers are 1 - indexed, we add 1 to the databasePageNumber value.
  let paginationComponentPageNumber = databasePageNumber + 1;

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
      {/* Per https://github.com/vercel/swr/discussions/563, isValidating === true if data is being fetched for
      the first time or data is being updated. Display loading indicator accordingly. */}
      {isValidating && data === undefined && <div>A moment please...</div>}
      {error && (
        <div>{`Error fetching colors data - ${error}`}</div>
      )}
      <Routes>
        {/* Regarding Math.ceil(data.totalItems / maximumNumberOfHomePageColorGridSwatchesThatShouldBeDisplayed), because page 
        values are integers, we round up to the nearest integer.*/}
        {data && <Route path="/" element={(data !== undefined) ? <Home colors={data.colors} onColorGridSwatchClick={handleColorGridSwatchClick} count={Math.ceil(data.totalItems / maximumNumberOfHomePageColorGridSwatchesThatShouldBeDisplayed)} page={paginationComponentPageNumber} onPageSelection={handlePageSelection} viewConfiguration={ViewConfiguration.list_view} data-testid={TestId.HomeTestId} /> : null} />}
        {<Route path="/colors/:id" element={<ColorDetailView data-testid={TestId.ColorDetailViewTestId} />} />}
      </Routes>
    </div>
  );
}

export default App;
