import Carousel from '../components/Carousel'
//import Table from '../components/Table'
import PaginatedItems from '../components/Table'
import { useContext } from 'react'
import { coinContext } from '../coinContext'
import LoadingSpinner from '../utils/LoadingSpinner'
import './home.css'

export default function Home() {
    const {coinData, dataLoaded, mode} = useContext(coinContext) 
    console.log('HOME')

    return (
        <div className='home-page'>
            <h1 className={`${mode}-h1`}>Crypto Tracker App</h1>
            {dataLoaded ? <Carousel /> : <LoadingSpinner/>}
            <br />
            <h1>Prices ranked by Market Cap</h1>
            {dataLoaded ? <PaginatedItems itemsPerPage={10}/> : <LoadingSpinner />}
        </div>

    )
}