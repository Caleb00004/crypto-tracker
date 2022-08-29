import Chart from '../components/Chart'
import CoinDetails from '../components/CoinDetails'
import './coin.css'

export default function Coin() {
    return (
        <div className='coin-page'>
            <h1>Coin Page</h1>
            <Chart />
            <br />
            <CoinDetails />
        </div>
    )
}