import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="flex flex-col md:flex-row bg-main w-full h-full">
				<Sidebar />
				<main className="h-screen md:h-[97.5vh] md:mt-[2.5vh] bg-white w-screen border md:rounded-tl-[2.5rem] px-8 py-10 overflow-auto">{children}</main>
			</body>
		</html>
	);
}
