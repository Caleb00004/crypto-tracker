import './App.css';
import Coin from './Pages/Coin';
import Home from './Pages/Home';
//import PaginatedItems from './Pages/PaginatedItems';
import Navbar from './components/Navbar';
import {Routes, Route} from 'react-router-dom'
import { useContext } from 'react'
import { coinContext } from './coinContext'
import PaginatedItems from './Pages/paginateTest';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import InvalidPath from './utils/InvalidPath';

//import {ContextProvider} from './coinContext'

function App() {
  const {mode} = useContext(coinContext)

  function backgroundColor() {
    if (mode === 'light') {
        return 'white'
    } else {
        return '#191717'
    }
  }
  
  function fontColor() {
    if (mode === 'light') {
        return 'black'
    } else {
        return 'white'
    }
}

  return (
    <div style={{backgroundColor: backgroundColor(), color: fontColor()}} className="App">
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/coin/:coinId' element={<Coin />} />
          <Route path='/paginate' element={<PaginatedItems itemsPerPage={5}/>} />
          <Route path='*' element={<InvalidPath />}/> {/* To handle paths that don't exist */}
        </Routes>

    </div>
  );
}

export default App;
