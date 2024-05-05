import CustomForm from "@/components/CustomForm";
import Link from "next/link";
import React from "react";

const page = () => {
	return <CustomForm fields={fields} title="Login" url="/api/user/login" successpath="/home" method="post" type="logres" />;
};

const fields = [
	{
		type: "text",
		name: "Email",
		placeholder: "Email",
	},
	{
		type: "password",
		name: "Password",
		placeholder: "Password",
	},
];

export default page;
