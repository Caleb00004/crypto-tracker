import './navbar.css'
import moonfill from '../icons/moon-fill.png'
import sunline from '../icons/sun-line.png'
import { useContext } from 'react'
import { coinContext } from '../coinContext'
import {Link} from 'react-router-dom'

export default function Navbar() {
    const {mode, toggleMode, changeCurrency} = useContext(coinContext)
    
    let iconImg = ''
    mode == 'light' ? iconImg = moonfill : iconImg = sunline

    // function to determine font color for DropDOwn 
    const fontColor = () => {
        if (mode === 'light') {
            return 'black'
        } else {
            return 'white'
        }
    }
    return (
        <nav className={`${mode}-nav`}>
            <li><Link  className={`${mode}-Header-nav`} to = '/'>Coin Tracker</Link></li>
            <div className = {`${mode}-far-right`}>
                <img className='nav-icon' width={'15px'} height={'20px'} src={iconImg} onClick={toggleMode}/>            
                    <div className="dropdown">
                        <li><button className="dropbtn" style={{color: fontColor()}}>USD<i className="fa fa-caret-down">▾</i></button></li>
                        <div className="dropdown-content">
                        <li><a href="#">EUR</a></li>
                        <li onClick={() => changeCurrency('NGN')}><a href="#">NGN</a></li>
                        </div>
                    </div>

            </div>
        </nav>  
    )
}
