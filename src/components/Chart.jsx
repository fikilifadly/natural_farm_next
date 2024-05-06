"use client";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = ({ labels, datasets, title }) => {
	const options = {
		responsive: true,
		plugins: {
			title: {
				display: true,
				text: title,
			},
			legend: false,
			tooltip: {
				enabled: false,
			},
		},
	};

	const data = {
		labels: labels,
		datasets,
	};

	return (
		<div className="mt-5">
			<h3 className="font-bold text-xl">Summary of recent record</h3>
			<div className="px-5 flex self-center w-full md:w-[75%] mx-auto">
				<Line options={options} data={data} />
			</div>
		</div>
	);
};

export default Chart;
