import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import HomePage from './components/HomePage';
import {Routes,Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/home' element={<Home/>}/>
    </Routes>
    </div>
  );
}

export default App;
