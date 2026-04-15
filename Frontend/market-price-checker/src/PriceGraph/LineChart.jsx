import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';

import { CategoryScale, Chart, LinearScale, LineController, LineElement, PointElement, Tooltip, Legend, Filler } from 'chart.js';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
const BASE_URL = import.meta.env.VITE_BASE_URL;

Chart.register([LineElement, CategoryScale, LinearScale, PointElement, LineController, Tooltip, Legend, Filler]);

const LineChart = () => {
  const [priceHistory, setPriceHistory] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const graphData = await axios.get(`${BASE_URL}/marketItems/trendAnalyze/${id}`);
        setPriceHistory(graphData.data.priceData);
      }
      catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id]);


  const data = {
    labels: priceHistory.map((data) =>
      new Date(data.date).toDateString().slice(4, 10)
    ),
    datasets: [
      {
        label: 'Price',
        data: priceHistory.map((data) => data.price),
        lineTension: 0,
        fill: false,
        backgroundColor: '#9F7AEA',
        borderColor: '#9F7AEA',
        pointBorderColor: '#B57295',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#D6BCFA',
        pointHoverBorderColor: '#D6BCFA',
        pointRadius: 3,
      },
    ],
  };

  return (
    <div>
      <h1 className='chartHeading' style={{ color: '#805AD5' }}>Line Chart</h1>
      <Line data={data}/>
    </div>
  );
};

export default LineChart;