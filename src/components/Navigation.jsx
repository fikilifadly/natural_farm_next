"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navigation = ({ data }) => {
	const path = usePathname();

	const activeLink = (link) => {
		return `flex items-center gap-3  ${link === path ? "bg-white text-second p-3 rounded-lg font-bold" : "py-2 px-3"}`;
	};
	return (
		<>
			{data.map(({ href, name, icon }) => (
				<li key={href} className="px-3">
					<Link href={href} className={activeLink(href)}>
						{icon && <Image src={icon} alt={name} className="object-contain w-5 h-5 " />}
						<span className="text-md">{name}</span>
					</Link>
				</li>
			))}
		</>
	);
};

export default Navigation;
