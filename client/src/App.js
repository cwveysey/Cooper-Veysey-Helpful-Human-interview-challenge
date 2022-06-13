import './App.css';
import NavigationBar from './NavigationBar';
import Sidebar from './Sidebar';
import ColorGrid from './ColorGrid';
import { useState, useEffect } from "react";

function App() {
  
  const [colors, setColors] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/colors`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        console.log(`actualData is ${actualData}`);
        setColors(actualData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setColors(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
 
  return (
    <div className="App">
      <header>
        <nav>
        <NavigationBar></NavigationBar>
        </nav>
      </header>
      <div className='Sidebar'>
      <Sidebar></Sidebar>
      </div>
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the colors data - ${error}`}</div>
      )}
      <div className='ColorGrid-container'>
        {colors &&
        <ColorGrid colors={colors}></ColorGrid>
        }
      </div>
    </div>
  );
}

export default App;
