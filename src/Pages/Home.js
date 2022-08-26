import Carousel from '../components/Carousel'
import Table from '../components/Table'
import { useContext } from 'react'
import { coinContext } from '../coinContext'

export default function Home() {
    const coinData = useContext(coinContext)

    console.log('HOME')
    console.log(coinData)
    return (
        <div>
            <h1>Home Page</h1>
            <Carousel />
            <br />
            <h3>Prices By Market</h3>
            <Table></Table>
        </div>

    )
}