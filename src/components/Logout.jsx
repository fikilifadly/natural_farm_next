import { cookies } from "next/headers";
import React from "react";

const Logout = () => {
	const logout = () => {
		cookies().delete("Authorization");
	};
	return (
		<div className="px-3">
			<button onClick={logout} className="text-main p-3 text-center w-full bg-white rounded-lg my-3">
				Logout
			</button>
		</div>
	);
};

export default Logout;
