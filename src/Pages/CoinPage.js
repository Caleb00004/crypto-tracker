import Chart from '../components/Chart'
import CoinDetails from '../components/CoinDetails'
import { useParams } from "react-router-dom"
import { useContext } from 'react'
import { coinContext } from '../coinContext'
import LoadingSpinner from '../utils/LoadingSpinner'
import './coinpage.css'

export default function CoinPage() {

    const {coinId} = useParams() //getting current coin Param from url
    const {coinData, mode, dataLoaded, currency, error} = useContext(coinContext)

    if (dataLoaded) {
        const currentCoin = coinData.filter(data => data.id == coinId)

        let coin = {value: '', style: ''} // TO store current coin 24h% change value and style
        function coinStyle(number) {
            if (number > 0) {
                return coin = {
                    value: `+${number}%`,
                    style: {'color': 'green'}
                }
            } else {
                return coin = {
                    value: `${number}%`,
                    style: {'color': 'red'}
                }
            }
        }
        
        coinStyle(currentCoin[0].price_change_percentage_24h)

        return (
            <div className='coin-page'>
                <img src={currentCoin[0].image}/>
                <h1 style={coin.style}>{coinId.toUpperCase() } {coin.value}</h1>
                
                <br />
                <Chart mode={mode} coinId={coinId} error={error}/>
                <br />
                <CoinDetails mode={mode} coin={currentCoin[0]} currency={currency} />
             </div>
        )
    } else {
        <LoadingSpinner errorOccured={error}/>
    }

}