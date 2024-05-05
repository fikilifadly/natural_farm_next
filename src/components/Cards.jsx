import React from "react";

const Cards = () => {
	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-7">
			<div className="flex flex-col justify-between p-5 shadow-[0px_6px_24px_0px_rgba(0,0,0,0.05),0px_0px_0px_1.5px_rgba(0,0,0,0.08)] rounded-md">
				<div className="flex justify-between">
					<span>Revenue in Percentage</span>
					<button>&#8942;</button>
				</div>

				<div className="mt-10">
					<span className="text-4xl font-bold">400 Order</span>
				</div>
			</div>
		</div>
	);
};

export default Cards;
