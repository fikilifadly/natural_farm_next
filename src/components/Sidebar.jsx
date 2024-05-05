"use client";
import Navigation from "./Navigation";
import { useRouter } from "next/navigation";
const Sidebar = () => {
	const router = useRouter();
	const logout = () => {
		document.cookie = "Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
		router.push("/login");
	};

	return (
		<header className="sticky bg-main top-0 md:flex w-full md:w-[25%]  flex flex-col justify-between">
			<nav className="text-white flex flex-col gap-3">
				<div className="p-5 ">
					<h1 className="text-3xl text-white">NATURAL FARM</h1>
				</div>
				<ul className="space-y-3">
					<Navigation data={links} />
				</ul>
			</nav>
			<div className="px-3">
				<button onClick={logout} className="text-main p-3 text-center w-full bg-white rounded-lg my-3">
					Logout
				</button>
			</div>
		</header>
	);
};

const links = [
	{
		href: "/",
		name: "Dashboard",
	},
	{
		href: "/order",
		name: "Order",
	},
];

export default Sidebar;
