import Chart from '../components/Chart'
import CoinDetails from '../components/CoinDetails'
import { useParams } from "react-router-dom"
import { useContext } from 'react'
import { coinContext } from '../coinContext'
import LoadingSpinner from '../utils/LoadingSpinner'
import './coinpage.css'

export default function CoinPage() {

    const {coinId} = useParams()
    const {coinData, mode, dataLoaded, currency} = useContext(coinContext)

    if (dataLoaded) {
        const coin = coinData.filter(data => data.id == coinId)

        console.log(coin[0])
        //console.log(coinId)
        return (
            <div className='coin-page'>
                <img src={coin[0].image}/>
                <h1>{coinId.toUpperCase() }</h1>
                
                <br />
                <Chart mode={mode} coinId={coinId}/>
                <br />
                <CoinDetails mode={mode} coin={coin[0]} currency={currency}/>
             </div>
        )
    } else {
        <LoadingSpinner />
    }

}