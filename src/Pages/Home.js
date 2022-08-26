import Carousel from '../components/Carousel'
import Table from '../components/Table'
import { useContext } from 'react'
import { coinContext } from '../coinContext'
import './home.css'

export default function Home() {
    const {mode} = useContext(coinContext)

    console.log('HOME')
//    console.log(coinData)

    function backgroundColor() {
        if (mode === 'light') {
            return '#d7d0d0'
        } else {
            return '#191717'
        }
    }
    
    return (
        <div style={{backgroundColor: backgroundColor()}} className='home-page'>
            <h1>Crypto Tracker App</h1>
            <Carousel />
            <br />
            <h3>Prices By Market</h3>
            <Table></Table>
        </div>

    )
}