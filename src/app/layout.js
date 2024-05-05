import { Inter } from "next/font/google";
import "./globals.css";
import Toast from "@/components/Toast";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="flex flex-col md:flex-row bg-main w-full h-full">
				{children}
				<Toast />
			</body>
		</html>
	);
}
