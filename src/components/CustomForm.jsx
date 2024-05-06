"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import InputPassword from "./InputPassword";
import { isUserExist, readDatabase, writeDatabase } from "@/lib/firebase";
import toast from "react-hot-toast";

const CustomForm = ({ fields, url, type, successpath, successmessage, title }) => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const data = {};
	console.log("first");

	const submitHandler = async (e) => {
		e.preventDefault();
		console.log(e, "====");
		try {
			setLoading(true);
			for (const field of fields) {
				data[field.name] = e.target[field.name].value;
			}

			const fieldsName = Object.keys(data);

			for (const field of fieldsName) {
				if (!data[field]) {
					throw `${field} is required`;
				}
			}

			const res = await readDatabase("users");

			const isExist = await isUserExist(res, data.Email, data.Password);
			if (successpath === "/login") {
				console.log(isExist, "masuk4");

				if (isExist) {
					throw `User ${data.Email} already exist`;
				}
				await writeDatabase(url, data);

				toast.success(successmessage);
			} else {
				if (!isExist) throw `Invalid Email or Password`;
				console.log(isExist[1].data, "---- ini datanya");

				document.cookie = `Authorization=${isExist[1].data.Username}`;
			}

			toast.success(successmessage);
			router.push(successpath);
		} catch (error) {
			toast.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<h1 className="text-center text-2xl  font-bold">{title}</h1>
			<form className="flex flex-col gap-3 p-5" onSubmit={submitHandler}>
				{fields.map((field, index) => (
					<div key={index} className="flex flex-col gap-2 w-full">
						<label htmlFor={field.type}>{field.placeholder}</label>
						{field.type === "password" ? (
							<InputPassword name={field.name} key={index} />
						) : (
							<input
								key={index}
								type={field.type}
								name={field.placeholder}
								id={field.type}
								className="w-full p-2 rounded-md shadow-md border border-slate-200"
								defaultValue={field.value && field.value}
							/>
						)}
					</div>
				))}
				{/* <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_R_SITE_KEY as string} onChange={(val) => setCapVal(val)} /> */}
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
