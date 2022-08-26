import './navbar.css'

export default function Navbar() {
    return (
        <nav>
            <li>Coin Tracker</li>
            <div className='far-right'>
                <li >Toggle mode</li>
                <li >currency Flip</li>
            </div>
        </nav>  
    )
}