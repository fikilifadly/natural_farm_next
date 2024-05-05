import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Title, Tooltip, Legend);

const Chart = ({ labels, datasets }) => {
	const options = {
		responsive: true,
		plugins: {
			filler: {
				propagate: false,
			},
			legend: false,
			title: {
				display: false,
				text: "Chart.js Line Chart",
			},
			tooltip: {
				enabled: false,
			},
		},
		elements: {
			point: {
				radius: 0,
			},
			line: {
				tension: 0.4,
			},
		},
		scales: {
			x: {
				display: false,
			},
			y: {
				display: false,
			},
		},
	};

	const data = {
		labels: labels,
		datasets,
	};

	// return <>{type == "line" && <Line options={options} data={data} />}</>;
	return (
		<>
			<div className="w-24 flex self-end">
				<Line options={options} data={data} />
			</div>
		</>
	);
};

export default Chart;
