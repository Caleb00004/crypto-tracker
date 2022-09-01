import React, { useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto' //apparently the chart code won't work without this import.
import { useParams } from 'react-router'
import { useContext } from 'react'
import { coinContext } from '../coinContext'

export default function Chart () {
    const {coinId} = useParams()
    
    const {mode} = useContext(coinContext)

    const [graphData, setGraphData] = React.useState()
    const [garphLoaded, setGraphLoaded] = React.useState(false)

    useEffect(() => {
        fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=USD&days=1`)
        .then(response => response.json())
        .then(data => (
            setGraphLoaded(true),
            setGraphData(data.prices))
        )
    },[])

    console.log(graphData)

    console.log(mode)
    function chartColor() {
        /* if (mode === 'light') {
            return '#1414d8'
        } else {
            return 'green'
        } */
        return mode === 'light' ? '#1414d8' : 'green'
    } 

    const [days, setDays] = React.useState(1);
        if (garphLoaded) {
            const chartData = {
                    labels: graphData.map((coin) => {
                        let date = new Date(coin[0]);
                        let time =
                          date.getHours() > 12
                            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                            : `${date.getHours()}:${date.getMinutes()} AM`;
                        return days === 1 ? time : date.toLocaleDateString();
                      }),
        
                    datasets: [{
                        label: `${coinId} Chart`,
                        data: graphData.map(dataItem => dataItem[1]),
                        borderColor: chartColor()
        
                    }]
                }
        
                return (
                    <>
                        <h4>The Chart component</h4>
                        <Line data={chartData} /> 
                    </>
                )
        }
}

