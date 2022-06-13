import './App.css';
import NavigationBar from './NavigationBar';
import Sidebar from './Sidebar';
import ColorGrid from './ColorGrid';

function App() {
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
      <div className='ColorGrid-container'>
        <ColorGrid></ColorGrid>
      </div>
    </div>
  );
}

export default App;
