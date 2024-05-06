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
