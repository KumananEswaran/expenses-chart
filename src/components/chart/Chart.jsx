import './chart.css';

import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

function Chart() {
	const [chartData, setChartData] = useState({
		labels: [],
		datasets: [],
	});

	useEffect(() => {
		fetch('/data.json')
			.then((response) => response.json())
			.then((data) => {
				const labels = data.map((item) => item.day);
				const amounts = data.map((item) => item.amount);

				const currentDay = new Date()
					.toLocaleString('en-MY', { weekday: 'short' })
					.toLowerCase();

				const backgroundColor = labels.map((day) => {
					return day === currentDay
						? 'hsl(186, 34%, 60%)'
						: 'hsl(10, 79%, 65%)';
				});

				const hoverBackgroundColor = labels.map((day) => {
					return day === currentDay
						? 'hsl(186, 49%, 80%)'
						: 'hsl(10, 100%, 76%)';
				});

				setChartData({
					labels,
					datasets: [
						{
							label: 'Spending (USD)',
							data: amounts,
							backgroundColor,
							hoverBackgroundColor,
							borderRadius: 5,
						},
					],
				});
			})
			.catch((error) => console.error('Error loading data:', error));
	}, []);

	const options = {
		responsive: true,
		scales: {
			y: {
				ticks: {
					display: false,
				},
				grid: {
					display: false,
				},
				border: {
					display: false,
				},
				beginAtZero: true,
			},
			x: {
				grid: {
					display: false,
				},
				border: {
					display: false,
				},
			},
		},
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				backgroundColor: 'hsl(25, 47%, 15%)',
				bodyColor: 'hsl(33, 100%, 98%)',
				displayColors: false,
				padding: 8,
				callbacks: {
					label: function (tooltipItem) {
						return `$${tooltipItem.raw}`;
					},
					title: function () {
						return '';
					},
				},
			},
		},
	};

	return (
		<div className="chart">
			<h1 className="chart__header">Spending - Last 7 days</h1>
			<div className="chart__container">
				{chartData.labels.length > 0 ? (
					<Bar data={chartData} options={options} />
				) : (
					<p>Loading chart...</p>
				)}
			</div>
			<hr />
			<div className="chart__summary">
				<div className="chart__text">
					<p>Total this month</p>
					<p>$478.33</p>
				</div>
				<div className="chart__text-2">
					<p>+2.4%</p>
					<p>from last month</p>
				</div>
			</div>
		</div>
	);
}

export default Chart;
