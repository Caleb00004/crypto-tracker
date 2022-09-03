import './navbar.css'
import moonfill from '../icons/moon-fill.png'
import sunline from '../icons/sun-line.png'
import { useContext } from 'react'
import { coinContext } from '../coinContext'
import {Link} from 'react-router-dom'

export default function Navbar() {
    const {mode, toggleMode, changeCurrency, currency} = useContext(coinContext)
    
    let themeImg = (mode == 'light') ? moonfill : sunline

    // function to determine font color for DropDOwn 
    const fontColor = () => {
        if (mode === 'light') {
            return 'black'
        } else {
            return 'white'
        }
    }

    function currencySelect(call) {
        if (currency == 'USD') {
            return call == '2nd' ? 'EUR' : 'NGN'
        } else if (currency == 'EUR') {
            return call == '2nd' ? 'USD' : 'NGN'
        } else if (currency == 'NGN') {
            return call == '2nd' ? 'USD' : 'EUR'
        }
    }

    return (
        <nav className={`${mode}-nav`}>
            <li><Link  className={`${mode}-Header-nav`} to = '/'>Coin Tracker</Link></li>
            <div className = {`${mode}-far-right`}>
                <img className='nav-icon' width={'15px'} height={'20px'} src={themeImg} onClick={toggleMode}/>
                    <div className="dropdown">
                        <li>
                            <button className="dropbtn"  style={{color: fontColor()}}>
                                {currency}<i className="fa fa-caret-down">▾</i>
                            </button>
                        </li>
                        <div className="dropdown-content">
                        <li onClick={() => changeCurrency(currencySelect('2nd'))}><a href="#"> {currencySelect('2nd')}</a></li>
                        <li onClick={() => changeCurrency(currencySelect('3rd'))}><a href="#">{currencySelect('3rd')}</a></li>
                        </div>
                    </div>

            </div>
        </nav>  
    )
}
