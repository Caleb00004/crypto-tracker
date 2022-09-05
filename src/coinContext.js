import React from "react"
// Setting Up Context

const coinContext = React.createContext()

function ContextProvider(props) {
    const [coinData, setCoinData] = React.useState([])
    const [dataLoaded, setDataLoaded] = React.useState(false) //To check if api data has being fetched
    const [mode, setMode] = React.useState('light')
    const [currency, setCurrency] = React.useState('USD')
    const [error, setError] = React.useState(false)

    const toggleMode = () => {
        setMode(prevMode => prevMode === 'dark' ? 'light' : 'dark')
    }

    const changeCurrency = (newCurrency) => {
        setCurrency(newCurrency)
    }

    // fetching coin Data from coingecko Api
    React.useEffect(() => {
//        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
            .then(response => response.json())
            .then(data => (
                setDataLoaded(true),
                setCoinData(data))
            )
            .catch(err => setError(true));
    },[currency])

//    console.log(coinData)
    
    return (
        <coinContext.Provider value={{coinData, dataLoaded, mode, toggleMode, currency, changeCurrency, error}}>
            {props.children}
        </coinContext.Provider>
    )

}

export {ContextProvider, coinContext}