import './App.css';
import Coin from './Pages/Coin';
import Home from './Pages/Home';
import Navbar from './components/Navbar';
import {Routes, Route} from 'react-router-dom'
import { useContext } from 'react'
import { coinContext } from './coinContext'

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
          <Route path='/coin' element={<Coin />} />
        </Routes>

    </div>
  );
}

export default App;
