import './coindetails.css'

export default function CoinDetails ({coin, mode, currency}) {

    return (
        <div className="coin-details">
            <hr />
            <h1>Market Stats</h1>
            <div className="grid-container">
                <div className='grid-item'>
                    <p className={`grid-header-${mode}`}>Market Cap: </p>
                    <p>{coin.market_cap.toLocaleString("en-US")}</p>
                </div>
                <div className='grid-item'>
                    <p className={`grid-header-${mode}`}>Market Cap Rank: </p>
                    <p>#{coin.market_cap_rank}</p>
                </div> 
                <div className='grid-item'>
                    <p className={`grid-header-${mode}`}>Current Price: </p>
                    <p>{coin.current_price.toLocaleString("en-US")}</p>
                </div>
                <div className='grid-item'>
                    <p className={`grid-header-${mode}`}>All time low: </p>
                    <p>{coin.atl.toLocaleString("en-US")}</p>
                </div>
                <div className='grid-item'>
                    <p className={`grid-header-${mode}`}>All time high </p>
                    <p>{coin.ath.toLocaleString("en-US")}</p>
                </div>
                <div className='grid-item'>
                    <p className={`grid-header-${mode}`}>Total Volume </p>
                    <p>{coin.total_volume}</p>
                </div>
                <div className='grid-item'>
                    <p className={`grid-header-${mode}`}>High 24h: </p>
                    <p>{coin.high_24h}</p>
                </div>
                <div className='grid-item'>
                    <p className={`grid-header-${mode}`}>Low 24h:</p>
                    <p>{coin.low_24h}</p>
                </div>

            </div>
            <br />
        </div>
    )
}

