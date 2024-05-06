"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InputPassword from "./InputPassword";
import { isUserExist, readDatabase, writeDatabase } from "@/lib/firebase";
import toast from "react-hot-toast";
import { getCookie, removeModalHandler } from "@/utils";
import { revalidatePath } from "next/cache";

const CustomForm = ({ fields, url, type, successpath, successmessage, title, setLoading, loading, setData }) => {
	const router = useRouter();
	const [simulation, setSimulation] = useState({
		Price: 208000,
		Discount: 0,
		SpecialDiscount: 0,
		Quantity: 1,
	});

	const priceQuantity = simulation.Price * (simulation.Quantity == 0 || simulation.Quantity.length == 0 ? 1 : simulation.Quantity);
	const priceDiscount = priceQuantity * (simulation.Discount == 0 || simulation.Discount.length == 0 ? 0 : simulation.Discount / 100);
	const priceSpecialDiscount = priceQuantity * (simulation.SpecialDiscount == 0 || simulation.SpecialDiscount.length == 0 ? 0 : simulation.SpecialDiscount / 100);
	const total = priceQuantity - priceDiscount - priceSpecialDiscount;

	const onChangeHandler = (e) => {
		const { name, value } = e.target;
		console.log(name, value);
		if (name === "Discount" || name === "SpecialDiscount") {
			if (value >= 0 && value <= 100) setSimulation((prev) => ({ ...prev, [name]: value }));
		} else if (name === "Quantity" && value >= 0) {
			setSimulation((prev) => ({ ...prev, [name]: value }));
		}
	};

	const data = {};

	const submitHandler = async (e) => {
		try {
			e.preventDefault();

			for (const field of fields) {
				data[field.name] = e.target[field.name].value;
			}

			console.log(data, "data===");
			const fieldsName = Object.keys(data);

			for (const field of fieldsName) {
				if (!data[field]) {
					throw new Error(`${field} is required`);
				}
			}
			let newData;

			if (type === "logres") {
				const res = await readDatabase("users");
				const isExist = await isUserExist(res, data.Email, data.Password);
				if (successpath === "/login") {
					console.log(isExist, "masuk4");

					if (isExist) {
						throw new Error(`User ${data.Email} already exist`);
					}
					await writeDatabase(url, data);

					toast.success(successmessage);
				} else {
					if (!isExist) throw new Error(`Invalid Email or Password`);
					console.log(isExist[1].data, "---- ini datanya");

					document.cookie = `Authorization=${isExist[1].data.Username}`;
				}
			} else {
				setLoading(true);
				const previousData = JSON.parse(localStorage.getItem("data"));

				if (previousData) {
					newData = [...previousData, { ...data, user: getCookie("Authorization") }];
				} else {
					newData = [{ ...data, user: getCookie("Authorization") }];
				}

				console.log(newData, "=== newData");

				localStorage.setItem("data", JSON.stringify(newData));
				setData(newData);
			}

			toast.success(successmessage);

			successpath ? router.push(successpath) : removeModalHandler();
		} catch (error) {
			console.log(error.message, "=====");
			toast.error(error.message);
		} finally {
			if (type !== "logres") setLoading(false);
		}
	};

	return (
		<>
			{title && <h3 className="text-center text-2xl font-bold">{title}</h3>}

			<form className="flex flex-col gap-3 p-5" onSubmit={submitHandler}>
				{fields.map((field, index) => (
					<div key={index} className="flex flex-col gap-2 w-full">
						<label htmlFor={field.type}>{field.name}</label>
						{field.type === "password" && <InputPassword name={field.name} key={index} />}
						{field.type === "select" && (
							<select name={field.name} id={field.name} onChange={field.name !== "Customer" ? onChangeHandler : null} className="select select-bordered w-full" key={index}>
								{field.name === "Customer"
									? field.options.data.map((option, index) => (
											<option key={index} value={option.id}>
												{option.label}
											</option>
									  ))
									: field.options.map((option, index) => (
											<option key={index} value={option.id}>
												{option.name}
											</option>
									  ))}
							</select>
						)}
						{field.type !== "password" && field.type !== "select" && field.type !== "number" && (
							<input type={field.type} placeholder={field.name} className="input input-bordered w-full" name={field.name} key={index} />
						)}
						{field.type === "number" && (
							<input
								type={field.type}
								value={simulation[field.name]}
								onChange={onChangeHandler}
								placeholder={field.name}
								className="input input-bordered w-full"
								min="0"
								max="100"
								name={field.name}
								key={index}
							/>
						)}
					</div>
				))}

				{type !== "logres" && (
					<div className="flex flex-col gap-2">
						<div className="flex justify-between">
							<span>Price :</span>
							<span className="text-green-500 font-bold">{priceQuantity}</span>
						</div>
						<div className="flex justify-between">
							<span>Discount :</span>
							<span className="text-green-500 font-bold">{priceDiscount > 0 ? "- " + priceDiscount : 0}</span>
						</div>
						<div className="flex justify-between">
							<span>Special Discount :</span>
							<span className="text-green-500 font-bold">{priceSpecialDiscount > 0 ? "- " + priceSpecialDiscount : 0}</span>
						</div>
						<div className="flex justify-between">
							<span>Total :</span>
							<span className="text-green-500 font-bold">{total}</span>
						</div>
					</div>
				)}

				<button className="btn bg-green-500 mt-5 text-white shadow-md transition-all duration-100 hover:text-green-500 hover:bg-white " disabled={loading ? true : false}>
					{loading ? <span className="loading loading-spinner loading-sm"></span> : "Submit"}
				</button>

				{type === "logres" && successpath == "/login" && (
					<p className="text-center">
						Already have an account?{" "}
						<Link href="/login" className="text-green-500">
							Login
						</Link>
					</p>
				)}

				{type === "logres" && successpath != "/login" && (
					<p className="text-center">
						Doesnt have an account?{" "}
						<Link href="/register" className="text-green-500">
							Register
						</Link>
					</p>
				)}
			</form>
		</>
	);
};

export default CustomForm;
