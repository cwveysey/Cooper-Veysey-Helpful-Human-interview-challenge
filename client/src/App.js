import './App.css';
import NavigationBar from './NavigationBar';
import Sidebar from './Sidebar';
import ColorGrid from './ColorGrid';
import PaginationList from './PaginationList';
import { useState, useEffect, useRef, useCallback } from "react";
import useSWR from "swr";
const { stringify } = require('flatted');
const fetcher = (url) => fetch(url).then((res) => res.json());

function App() {
  
  const [databasePageNumber, setDatabasePageNumber] = useState(0);
  const [activeColorGroupQueryParameter, setActiveColorGroupQueryParameter] = useState(null);    
  const handlePageSelection = (pageSelected) => {
    setDatabasePageNumber(((pageSelected - 1)));
  };

  const handleColorGroupClick = (colorGroup) => {
    setActiveColorGroupQueryParameter(colorGroup);
  }; 
  console.log(`activeColorGroupQueryParameter is ${JSON.stringify(activeColorGroupQueryParameter)}`);
  { (activeColorGroupQueryParameter != null) ? console.log(`&group=${activeColorGroupQueryParameter}`): console.log("something else")}
  const { data: colors, error, isValidating, isLagging, resetLaggy } = useSWR(() => {
    if (activeColorGroupQueryParameter != null) {
    console.log('http://localhost:8080/api/colors' + `?page=${databasePageNumber}` + `&group=${activeColorGroupQueryParameter}`);
    return 'http://localhost:8080/api/colors' + `?page=${databasePageNumber}` + `&group=${activeColorGroupQueryParameter}`
    } else {
    return `http://localhost:8080/api/colors` + `?page=${databasePageNumber}`
    }
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
        <ColorGrid colors={colors}></ColorGrid>
        }
        <div className='PaginationList-container'>
          {colors != undefined && <PaginationList count={Math.ceil(colors.totalItems / 12)} page={databasePageNumber + 1} onPageSelection={handlePageSelection}>
          </PaginationList>}
        </div>
      </div>
      
    </div>
  );
}

// See https://swr.vercel.app/docs/middleware#keep-previous-result
function laggy(useSWRNext) {
  return (key, fetcher, config) => {
    // Use a ref to store previous returned data.
    const laggyDataRef = useRef()

    // Actual SWR hook.
    const swr = useSWRNext(key, fetcher, config)

    useEffect(() => {
      // Update ref if data is not undefined.
      if (swr.data !== undefined) {
        laggyDataRef.current = swr.data
      }
    }, [swr.data])

    // Expose a method to clear the laggy data, if any.
    const resetLaggy = useCallback(() => {
      laggyDataRef.current = undefined
    }, [])

    // Fallback to previous data if the current data is undefined.
    const dataOrLaggyData = swr.data === undefined ? laggyDataRef.current : swr.data

    // Is it showing previous data?
    const isLagging = swr.data === undefined && laggyDataRef.current !== undefined

    // Also add a `isLagging` field to SWR.
    return Object.assign({}, swr, {
      data: dataOrLaggyData,
      isLagging,
      resetLaggy,
    })
  }
}

export default App;
