import Chart from '../components/Chart'
import CoinDetails from '../components/CoinDetails'
import { useParams } from "react-router-dom"
import './coin.css'

export default function Coin() {

    const {coinId} = useParams()

    console.log(coinId)
    return (
        <div className='coin-page'>
            <h1>Coin Page</h1>
            <Chart />
            <br />
            <CoinDetails />
        </div>
    )
}