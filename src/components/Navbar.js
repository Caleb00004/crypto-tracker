import './navbar.css'
import moonfill from '../icons/moon-fill.png'
import sunline from '../icons/sun-line.png'
import { useContext } from 'react'
import { coinContext } from '../coinContext'

export default function Navbar() {
    const {mode, toggleMode} = useContext(coinContext)
    
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
            <li>Coin Tracker</li>
            <div className = {`${mode}-far-right`}>
                <img className='nav-icon' width={'15px'} height={'20px'} src={iconImg} onClick={toggleMode}/>            
                    <div class="dropdown">
                        <li><button class="dropbtn" style={{color: fontColor()}}>USD<i class="fa fa-caret-down">▾</i></button></li>
                        <div class="dropdown-content">
                        <li><a href="#">EUR</a></li>
                        <li><a href="#">NGN</a></li>
                        </div>
                    </div>

            </div>
        </nav>  
    )
}
