import Carousel from '../components/Carousel'
//import Table from '../components/Table'
import PaginatedItems from '../components/Table'
import { useContext } from 'react'
import { coinContext } from '../coinContext'
import './home.css'

export default function Home() {
    const {coinData, dataLoaded} = useContext(coinContext)

    console.log('HOME')
//    console.log(coinData)

    return (
        <div /* style={{backgroundColor: backgroundColor(), color: fontColor()}} */ className='home-page'>
            <h1>Crypto Tracker App</h1>
            <hr />
            <Carousel />
            <br />
            <h3>Prices By Market</h3>
            {/* <Table coins={coinData} dataLoaded = {dataLoaded} currentItems={10}/> */}
            {dataLoaded && <PaginatedItems itemsPerPage={10}/>}
        </div>

    )
}