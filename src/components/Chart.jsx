"use client";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Chart = ({ labels, datasets, title }) => {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: title,
			},
		},
	};

	const data = {
		labels: labels,
		datasets,
	};

	return (
		<>
			<div className="p-5 flex self-center w-[75%] mx-auto">
				<Line options={options} data={data} />
			</div>
		</>
	);
};

export default Chart;
