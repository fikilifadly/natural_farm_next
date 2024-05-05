"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CustomForm = ({ fields, url, method, type, successpath, title }) => {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const submitHandler = async (e) => {
		e.preventDefault();
		console.log(e, "====");
		const [username, email, password] = e.target;

		setLoading(true);
		// Axios({
		// 	method,
		// 	url,
		// 	data: JSON.stringify(inputs),
		// })
		// 	.then((res) => {
		// 		toast.success(res.data.message);
		// 		router.push(successpath);
		// 	})
		// 	.catch((error) => toast.error(error.response.data.message))
		// 	.finally(() => setLoading(false));
	};

	return (
		<>
			<h1 className="text-center text-2xl  font-bold">{title}</h1>
			<form className="flex flex-col gap-3 p-5" onSubmit={submitHandler}>
				{fields.map((field, index) => (
					<div key={index} className="flex flex-col gap-2 w-full">
						<label htmlFor={field.type}>{field.placeholder}</label>
						<input
							type={field.type}
							name={field.placeholder}
							id={field.type}
							className="w-full p-2 rounded-md shadow-md border border-slate-200"
							defaultValue={field.value && field.value}
						/>
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
