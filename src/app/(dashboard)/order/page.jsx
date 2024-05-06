"use client";
import Modal from "@/components/Modal";
import Table from "@/components/Table";
import { showModalHandler } from "@/utils";
import React, { useState } from "react";
import customers from "@/data/customers.json";
import payments from "@/data/payments.json";
import products from "@/data/products.json";
import CustomForm from "@/components/CustomForm";

const Page = () => {
	const [data, setData] = useState(localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : []);
	const [loading, setLoading] = useState(false);

	const addHandler = () => {
		showModalHandler();
	};

	const submitModalHandler = (e) => {
		e.preventDefault();
		const [title, description, due_date] = e.target;
	};

	const getDataByIdHandler = (id) => {
		console.log(id);
	};

	console.log(orderField, "taskfield", data);

	return (
		<div className="flex flex-col gap-5">
			<div className="flex justify-between items-center">
				<h2 className="text-4xl font-bold text-green-600">Order</h2>
				<button className="btn bg-green-700 px-10 py-2 text-white" onClick={addHandler}>
					Add
				</button>
			</div>
			<Table fields={orderField} data={data} loading={loading} idModal="deleteSubtask" getDataByIdHandler={getDataByIdHandler} />
			<Modal title="Order Form">
				<CustomForm
					fields={orderField}
					url="tasks"
					loading={loading}
					setData={setData}
					setLoading={setLoading}
					successmessage={"Order Created Successfully"}
					submitModalHandler={submitModalHandler}
				/>
			</Modal>
		</div>
	);
};

const orderField = [
	{
		type: "select",
		name: "Customer",
		options: customers,
	},
	{
		type: "select",
		name: "Product",
		options: products,
	},
	{
		type: "number",
		name: "Quantity",
	},
	{
		type: "number",
		name: "Discount",
	},
	{
		type: "number",
		name: "SpecialDiscount",
	},
	{
		type: "select",
		name: "Payment",
		options: payments,
	},
];

export default Page;
