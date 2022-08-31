import Carousel from '../components/Carousel'
//import Table from '../components/Table'
import PaginatedItems from '../components/Table'
import { useContext } from 'react'
import { coinContext } from '../coinContext'
import './home.css'

export default function Home() {
    const {coinData, dataLoaded, mode} = useContext(coinContext)

    console.log('HOME')
//    console.log(coinData)

    return (
        <div /* style={{backgroundColor: backgroundColor(), color: fontColor()}} */ className='home-page'>
            <h1 className={`${mode}-h1`}>Crypto Tracker App</h1>
            {/* <hr /> */}
            {dataLoaded ? <Carousel /> : <h1>Loading...</h1>}
            <br />
            <h1>Prices ranked by <br />Market Cap</h1>
            {/* <Table coins={coinData} dataLoaded = {dataLoaded} currentItems={10}/> */}
            {dataLoaded ? <PaginatedItems itemsPerPage={10}/> : <h2>Loading Tables...</h2>}
        </div>

    )
}