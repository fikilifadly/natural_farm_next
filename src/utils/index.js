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

export const getCookie = (name) => {
	const cookieValue = document.cookie
		.split("; ")
		.find((row) => row.startsWith(name + "="))
		.split("=")[1];
	return cookieValue ? decodeURIComponent(cookieValue) : null;
};
