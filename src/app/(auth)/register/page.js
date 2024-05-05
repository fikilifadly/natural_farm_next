import CustomForm from "@/components/CustomForm";
import React from "react";

const page = () => {
	return (
		<>
			<CustomForm title="Register" fields={fields} url="/users" successpath="/login" successmessage="Register Success" type="logres" />
		</>
	);
};

const fields = [
	{
		type: "text",
		name: "Username",
		placeholder: "Username",
	},
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
