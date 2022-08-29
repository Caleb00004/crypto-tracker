import './table.css'
import { useContext } from 'react'
import { coinContext } from '../coinContext'

export default function Table ({coins, dataLoaded}) {

    const {mode} = useContext(coinContext)

//    console.log(dataLoaded)
    dataLoaded && console.log(coins)


    if (dataLoaded) {

        function sign(number) {
            if (number > 0) {
                return {color: 'green'}
            } else if (number < 0){
                return {color: 'red'}
            }
        }

        const coinElements = coins.map(({image, symbol, current_price, price_change_percentage_24h, market_cap}, i) => (
            <tbody className={`${mode}-table-body`} key={i}>
                <tr>
                    <td className='img-row'><span className='number'>{i+1}</span> <img className='coin-icon' width={'25px'} src={image}/> <span className='coin-acronym'>{symbol.toUpperCase()}</span></td>
                    <td>${current_price.toLocaleString("en-US")}</td>
                    <td style={sign(price_change_percentage_24h)}>
                        {price_change_percentage_24h > 0 ? `+${price_change_percentage_24h.toFixed(2)}% ` : `${price_change_percentage_24h.toFixed(2)}%`} 
                    </td>
                    <td>${market_cap.toLocaleString('en-US')}</td>
                </tr> 
            </tbody>
/*            <div>
                <p>{i+1} <img width={'30px'} src={image}/> {id} {current_price} {high_24h} {market_cap}</p>
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
