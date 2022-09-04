import Carousel from '../components/Carousel'
//import Table from '../components/Table'
import PaginatedItems from '../components/Table'
import { useContext } from 'react'
import { coinContext } from '../coinContext'
import LoadingSpinner from '../utils/LoadingSpinner'
import './home.css'

export default function Home() {
    const {coinData, dataLoaded, mode, currency} = useContext(coinContext) 
    console.log('HOME')

    return (
        <div className='home-page'>
            <h1 className={`${mode}-h1`}>Crypto Tracker App</h1>
            {dataLoaded ? <Carousel coinData={coinData} mode={mode} currency={currency}/> : <LoadingSpinner/>}
            <br />
            <h1>Coins Ranked By Market Cap</h1>
            {dataLoaded ? <PaginatedItems itemsPerPage={10} mode = {mode} coinData={coinData} currency={currency}/> : <LoadingSpinner />}
        </div>
    )
}