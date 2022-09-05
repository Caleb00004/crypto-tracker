import './App.css';
import CoinPage from './Pages/CoinPage';
import Home from './Pages/Home';
import Navbar from './components/Navbar';
import {Routes, Route} from 'react-router-dom'
import { useContext } from 'react'
import { coinContext } from './coinContext'
import "slick-carousel/slick/slick.css";    //Needed for the carousel component
import "slick-carousel/slick/slick-theme.css";  // Needed for the carousel component
import InvalidPath from './utils/InvalidPath';
import { createGlobalStyle } from 'styled-components'
import { fontColor } from './functions/fontColor';

function App() {
  const {mode} = useContext(coinContext)  // dark or light mode.

  let GlobalStyles;

  if (mode === 'light') {
    GlobalStyles = createGlobalStyle`    
    html {
      --backgroundcolor: white
    }
  `
  } else {
    GlobalStyles = createGlobalStyle`    
    html {
      --backgroundcolor: #191717
    }
  ` 
  }
  
  return (
    <div style={{color: fontColor(mode)}} className="App">
        <GlobalStyles />
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/coin/:coinId' element={<CoinPage />} />
          <Route path='*' element={<InvalidPath />}/> {/* To handle paths that don't exist */}
        </Routes>

    </div>
  );
}

export default App;
