import './table.css'

export default function Table ({coins, dataLoaded}) {

//    console.log(dataLoaded)
    dataLoaded && console.log(coins)

    if (dataLoaded) {
        const coinElements = coins.map((coinItem, i) => (
            <tr>
                <td>{i+1} <img width={'30px'} src={coinItem.image}/></td>
                <td>{coinItem.current_price}</td>
                <td>{coinItem.high_24h}</td>
                <td>{coinItem.market_cap}</td>
            </tr>
/*            <div>
                <p>{i+1} <img width={'30px'} src={coinItem.image}/> {coinItem.id} {coinItem.current_price} {coinItem.high_24h} {coinItem.market_cap}</p>
            </div> */
        ))
        return (
            <>
                <h1>The Table component</h1>
                <table>
                    <tr>
                        <th>Coin</th>
                        <th>Price</th>
                        <th>24h Change</th>
                        <th>Market Cap</th>
                    </tr>
                    {coinElements}
                </table>
            </>
        )
    } else {
        return (
            <h1>THe Table Component</h1>
        )
    }
}
