import CustomForm from "@/components/CustomForm";
import Link from "next/link";
import React from "react";

const page = () => {
	return <CustomForm fields={fields} title="Login" url="/users" successpath="/" successmessage="Login Success" method="post" type="logres" />;
};

const fields = [
	{
		type: "email",
		name: "Email",
	},
	{
		type: "password",
		name: "Password",
	},
];

export default page;
