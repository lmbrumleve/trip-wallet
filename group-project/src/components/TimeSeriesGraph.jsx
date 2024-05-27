import '../App.css';
import { React, useState, useEffect } from 'react';
import NavBar from "./NavBar.jsx";
import Axios from 'axios';
import { Line, Chart } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    TimeScale, //x-axis
    LinearScale, //y-axis
    CategoryScale,
    PointElement,
    Legend,
    Tooltip,
    Title,
    Filler,
    ArcElement
} from 'chart.js';
import { userDefaultCurrency } from './ExchangeRatesTable.jsx';
import 'chartjs-adapter-date-fns';
import { useParams } from "react-router-dom";


ChartJS.register(
    LineElement,
    TimeScale, //x-axis
    LinearScale, //y-axis
    CategoryScale,
    PointElement,
    Legend,
    Tooltip,
    Title,
    Filler,
    ArcElement
)

export default function TimeSeriesGraph() {

//DEFINE USER DEFAULT CURRENCY AND TARGET CURRENCY

    const routeParams = useParams();
    console.log(routeParams);

    const userDefaultCurrency = routeParams.userDefaultCurrency;
    const targetCurrency = routeParams.targetCurrency;
    const firstDate = "2024-01-01";

    let dateId;
    let rate;
    let dates = [];
    let rates = [];

//FETCH TODAY'S RATE:
const [latestRate, setLatestRate] = useState("");

const fetchLatestRate = async () => {
   await Axios.get(`https://api.frankfurter.app/latest?from=${userDefaultCurrency}`).then((res) => {
        setLatestRate(res.data.rates);
    });
};

    useEffect(() => {
        fetchLatestRate();
    }, []);

    console.log(latestRate)

const todayRate = latestRate[`${targetCurrency}`];
// console.log(todayRate)


//FETCH TIME SERIES RATES:
  const [timeSeriesRates, setTimeSeriesRates] = useState("");

  const fetchTimeSeriesRates = async () => {
      await Axios.get(`https://api.frankfurter.app/${firstDate}..?from=${userDefaultCurrency}&to=${targetCurrency}`).then((res) => {
          setTimeSeriesRates(res.data.rates);
      });
  };

      useEffect(() => {
          fetchTimeSeriesRates();
      }, []);

const [chartData, setChartData] = useState({datasets: [],});
const [dateArr, setDateArr] = useState([]);
const [rateArr, setRateArr] = useState([]);

const chart = () => {

    for (let i=0; i<Object.keys(timeSeriesRates).length; i++) {
      // console.log(Object.keys(timeSeriesRates)[i]);
      dateId = Object.keys(timeSeriesRates)[i] //access all of the dates
      // console.log(dateId);
      dates.push(dateId);
      setDateArr(dates);
      // console.log(timeSeriesRates[dateId][targetCurrency.toString()])
      rate = timeSeriesRates[dateId][targetCurrency.toString()]
      rates.push(rate);
    //   console.log(rates)
      setRateArr(rates);


    }
    //   console.log(dateArr);
    //   console.log(rateArr);


    setChartData({
        labels: dateArr,
        datasets: [
            {
                label: "Foreign Exchange Rate",
                data: rateArr,
                fill: true,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)'  //why is this not working like in the tutorial
                ],
                borderWidth: 4,
                tension: 0.4,
                // pointBorderColor: 'aqua'
            }
        ]
    })
}

const options = {
    responsive: true,
        plugins: {
            legend: true
        },
    maintainAspectRatio: false,
    scales: {
        // x: {
        //     type: 'time',
        //     adapters: {
        //         date: {
        //         }
        //     }
        // },

        y: {
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 10,
                    beginAtZero: true
                },
                grid: {
                    display: false,
                }
            }
    }
}

useEffect(() => {
    chart()
})

return(
    <>
        <NavBar/>

        <h1>{userDefaultCurrency}/{targetCurrency} </h1>
        <h2>{todayRate} </h2>
        <div style = {
            {height: '300px',
            width: '600px' }
            }>
            <Line
            data={chartData}
            options = {options}
            ></Line>
        </div>
    </>
);}

