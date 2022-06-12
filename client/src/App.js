import './App.css';
import NavigationBar from './NavigationBar';
import Sidebar from './Sidebar';

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
    </div>
  );
}

export default App;
