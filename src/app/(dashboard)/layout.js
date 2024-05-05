import Sidebar from "@/components/Sidebar";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import React from "react";

const layout = ({ children }) => {
	let token = cookies().get("Authorization")?.value;

	// if (!token) return redirect("/login");

	return (
		<>
			<Sidebar />
			<main className="h-screen md:h-[97.5vh] md:mt-[2.5vh] bg-white w-screen border md:rounded-tl-[2.5rem] px-8 py-10 overflow-auto">{children}</main>
		</>
	);
};

export default layout;
