import Cards from "@/components/Cards";
import Chart from "@/components/Chart";
import { cookies } from "next/headers";
import React from "react";

const page = () => {
	const username = cookies().get("Authorization")?.value;
	return (
		<>
			<div className="flex flex-col gap-2 mb-5">
				<h2 className="font-bold text-3xl">Welcome Back, {username}</h2>
				<p className="text-gray-500">Track, manage and forecast your platform information here</p>
			</div>
			<Cards />
			<Chart title="Past 6 Months Sales" datasets={customChart.datasets} labels={customChart.labels} />
		</>
	);
};

const customChart = {
	datasets: [
		{
			data: [251_437_000, 469_456_000, 754_631_000, 444_912_000, 159_987_000, 387_547_000],
			borderColor: "rgb(255, 99, 132)",
			backgroundColor: "rgba(255, 99, 132, 0.5)",
		},
	],
	labels: ["January", "February", "March", "April", "May", "June"],
	stats: 1,
};

export default page;
