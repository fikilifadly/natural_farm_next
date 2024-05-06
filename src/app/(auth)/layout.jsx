import Toast from "@/components/Toast";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { Toaster } from "react-hot-toast";

const layout = ({ children }) => {
	let token = cookies().get("Authorization")?.value;

	if (token) return redirect("/");
	return (
		<div className="w-full h-screen flex justify-center items-center p-5 md:p-0">
			<div className="w-[450px] min-h-[250px] p-6  mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">{children}</div>
			<Toast />
			<Toaster />
		</div>
	);
};

export default layout;
