"use client";
import Modal from "@/components/Modal";
import Table from "@/components/Table";
import { showModalHandler } from "@/utils";
import React, { useState } from "react";
import customers from "@/data/customers.json";
import payments from "@/data/payments.json";
import products from "@/data/products.json";

const Page = () => {
	const [loading, setLoading] = useState(false);
	const addHandler = () => {
		showModalHandler();
	};

	const submitModalHandler = (e) => {
		e.preventDefault();
		const [title, description, due_date] = e.target;
	};

	return (
		<div className="flex flex-col gap-5">
			<div className="flex justify-between items-center">
				<h2 className="text-4xl font-bold text-green-600">Tasks</h2>
				<button className="btn bg-green-700 px-10 py-2 text-white" onClick={addHandler}>
					Add
				</button>
			</div>
			<Table />
			<Modal title="Task Form">
				<form className="flex flex-col" onSubmit={submitModalHandler}>
					{taskField.map((el, i) => {
						return (
							<div className="py-2" key={i}>
								<label htmlFor={el[0]}>{el[0]}</label>
								<input type={el[1]} placeholder={`Enter ${el[0]}`} className="mt-1 input input-bordered input-warning w-full " name={el[0]} />
							</div>
						);
					})}
					<button className="btn text-md bg-green-500 text-white my-3 rounded-full" disabled={loading}>
						{loading ? <span className="loading loading-spinner"></span> : "Submit"}
					</button>
				</form>
			</Modal>
			{/* <Modal id="deleteTask">
				<div className="getflex flex-col gap-5">
					<p className="block">
						Are you sure want to delete <span className="font-bold">{currentTask?.title}</span> ?
					</p>
					<div className="flex justify-end gap-2">
						<button className="btn bg-red-500 text-white" onClick={deleteHandler}>
							Yes
						</button>
						<button className="btn bg-green-500 text-white" onClick={removeModalHandler}>
							No
						</button>
					</div>
				</div>
			</Modal> */}
		</div>
	);
};

const taskField = [
	["Customer", "select", customers],
	["Product", "select", products],
	["Discount", "number"],
	["Special Discount", "number"],
	["Payment", "select", payments],
];

export default Page;