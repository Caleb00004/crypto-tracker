import './table.css'
import { useContext } from 'react'
import { coinContext } from '../coinContext'

export default function Table ({coins, dataLoaded}) {

    const {mode} = useContext(coinContext)

//    console.log(dataLoaded)
    dataLoaded && console.log(coins)

    if (dataLoaded) {
        const coinElements = coins.map((coinItem, i) => (
            <tbody className={`${mode}-table-body`} key={i}>
                <tr>
                    <td className='img-row'><span className='number'>{i+1}</span> <img width={'30px'} src={coinItem.image}/> <span className='coin-acronym'>{coinItem.symbol.toUpperCase()}</span></td>
                    <td>${coinItem.current_price.toLocaleString("en-US")}</td>
                    <td>{coinItem.high_24h}</td>
                    <td>${coinItem.market_cap.toLocaleString('en-US')}</td>
                </tr>
            </tbody>
/*            <div>
                <p>{i+1} <img width={'30px'} src={coinItem.image}/> {coinItem.id} {coinItem.current_price} {coinItem.high_24h} {coinItem.market_cap}</p>
            </div> */
        ))
        return (
            <div className='table-component'>
                <h1>The Table component</h1>
                <table className={`${mode}-table`}>
                    <tbody>
                        <tr>
                            <th>Coin</th>
                            <th>Price</th>
                            <th>24h Change</th>
                            <th>Market Cap</th>
                        </tr>
                    </tbody>
                        {coinElements}
                </table>
            </div>
        )
    } else {
        return (
            <h1>THe Table Component</h1>
        )
    }
}
