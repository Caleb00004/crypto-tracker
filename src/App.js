import './App.css';
import Coin from './Pages/Coin';
import Home from './Pages/Home';
import Navbar from './components/Navbar';
import {Routes, Route} from 'react-router-dom'
import {ContextProvider} from './coinContext'

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/coin' element={<Coin />} />
        </Routes>
      </ContextProvider>

    </div>
  );
}

export default App;
