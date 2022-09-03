import React from "react"

const coinContext = React.createContext()

function ContextProvider(props) {
    const [coinData, setCoinData] = React.useState([])
    const [dataLoaded, setDataLoaded] = React.useState(false)
    const [mode, setMode] = React.useState('light')
    const [currency, setCurrency] = React.useState('USD')

    const toggleMode = () => {
        setMode(prevMode => prevMode === 'dark' ? 'light' : 'dark')
    }

    const changeCurrency = (newCurrency) => {
        console.log('called')
        setCurrency(newCurrency)
    }

    React.useEffect(() => {
//        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=100&page=1&sparkline=false')
//        console.log('useEffect ran')
//        console.log(currency)
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
            .then(response => response.json())
            .then(data => (
                setDataLoaded(true),
                setCoinData(data))
            )
            .catch(err => console.error(err));
    },[currency])

//    console.log(coinData)
    
    return (
        <coinContext.Provider value={{coinData, dataLoaded, mode, toggleMode, currency, changeCurrency}}>
            {props.children}
        </coinContext.Provider>
    )

}

export {ContextProvider, coinContext}