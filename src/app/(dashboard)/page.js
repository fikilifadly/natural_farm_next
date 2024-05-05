import Cards from "@/components/Cards";
import Chart from "@/components/Chart";
import React from "react";

const page = () => {
	return (
		<>
			<Cards />
			<Chart title="Past 6 Months Sales" datasets={customChart.datasets} labels={customChart.labels} />
		</>
	);
};

const customChart = {
	name: "Monthly Sales",
	datasets: [
		{
			data: [251_437_000, 469_456_000, 754_631_000, 444_912_000, 159_987_000, 387_547_000],
			borderColor: "green",
		},
	],
	labels: ["January", "February", "March", "April", "May", "June"],
	stats: 1,
};

export default page;
