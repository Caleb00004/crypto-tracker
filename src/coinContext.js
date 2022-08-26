import React from "react"

const coinContext = React.createContext()

function ContextProvider(props) {
    const [coinData, setCoinData] = React.useState([])
    const [dataLoaded, setDataLoaded] = React.useState('yes')

    React.useEffect(() => {
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false')
            .then(response => response.json())
            .then(data => setCoinData(data))
            .catch(err => console.error(err));
    },[])

//    console.log(coinData)
    
    return (
        <coinContext.Provider value={{coinData, dataLoaded}}>
            {props.children}
        </coinContext.Provider>
    )

}

export {ContextProvider, coinContext}