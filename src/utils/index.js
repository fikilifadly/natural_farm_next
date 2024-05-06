import customers from "@/data/customers.json";
import products from "@/data/products.json";
import payments from "@/data/payments.json";

export const matchUser = (snapshot, email, password) => {
	if (snapshot.length === 0) return null;

	const match = Object.entries(snapshot).find(([id, { data }]) => {
		return data.Email === email && data.Password === password;
	});

	if (!match) {
		return null;
	}

	return match;
};

export const showModalHandler = (id) => document.getElementById(id ? id : "mainmodal").showModal();

export const removeModalHandler = () => document.querySelector("dialog[open]").querySelector("form").submit();

export const getCookie = (name) => {
	const cookieValue = document.cookie
		.split("; ")
		.find((row) => row.startsWith(name + "="))
		.split("=")[1];
	return cookieValue ? decodeURIComponent(cookieValue) : null;
};

export const getIndexCategory = (type, data) => {
	let result;

	if (type == "Customer") result = customers.data.find((customer) => customer.id == +data.Customer);
	if (type == "Product") result = products.find((product) => product.id == +data.Product);
	if (type == "Payment") result = payments.find((payment) => payment.id == +data.Payment);

	return result;
};
export const getCurrentDataAttribute = (type, data, attr) => {
	let result = getIndexCategory(type, data);

	return result ? result?.[attr].split(" -")[0] : data;
};

export const getCurrentTotalPrice = (type, data, qty, discount, specialDiscount) => {
	discount = !discount ? (discount = 1) : discount;
	specialDiscount = !specialDiscount ? (specialDiscount = 1) : specialDiscount;
	let result = getIndexCategory(type, data).price * qty;
	console.log(result, "=====", discount, specialDiscount);

	let totalDiscount = discount + specialDiscount ? specialDiscount : 0;
	let resultDiscount = result * (totalDiscount <= 2 ? 1 : totalDiscount / 100);

	return resultDiscount;
};

export const rupiahFormat = (number) => {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
	}).format(number);
};
