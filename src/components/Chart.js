import React, { useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto' //apparently the chart code won't work without this import.
import LoadingSpinner from '../utils/LoadingSpinner'
import './chart.css'

export default function Chart ({mode, coinId}) {

    const [graphData, setGraphData] = React.useState()
    const [chartLoaded, setChartLoaded] = React.useState(false)

    useEffect(() => {
        fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=USD&days=1`)
        .then(response => response.json())
        .then(data => (
            setChartLoaded(true),
            setGraphData(data.prices))
        )
    },[])

//    console.log(graphData)
//    console.log(mode)
    
    function chartColor() {
        return mode === 'light' ? '#1414d8' : 'green'
    } 

    const [days, setDays] = React.useState(1);
        if (chartLoaded) {
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
                        label: `${coinId} (1 - day) Chart`,
                        data: graphData.map(dataItem => dataItem[1]),
                        borderColor: chartColor(),
                        pointRadius: 0,
                    }],


                }
        
                return (
                    <div className='chart' >
                        <Line data={chartData} /> 
                    </div>
                )
        } else {
            return <LoadingSpinner />
        }
}

