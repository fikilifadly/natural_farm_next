import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { matchUser } from "../../utils";

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_apiKey,
	authDomain: process.env.NEXT_PUBLIC_authDomain,
	projectId: process.env.NEXT_PUBLIC_projectId,
	storageBucket: process.env.NEXT_PUBLIC_storageBucket,
	messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
	appId: process.env.NEXT_PUBLIC_appId,
	databaseURL: process.env.NEXT_PUBLIC_database_url,
};

export const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

export const writeDatabase = (url, data) => {
	console.log("writeDatabase");
	const uuid = uuidv4();

	const response = set(ref(db, `${url}/${uuid}`), {
		data,
	});

	console.log(response, "==== writeDatabase");

	return response;
};

export const readDatabase = async (url) => {
	const readRef = ref(db, url);

	return readRef;
};

export const isUserExist = (res, email, password) => {
	return new Promise((resolve, reject) => {
		onValue(res, (snapshot) => {
			const snapshots = snapshot.val();

			const user = matchUser(snapshots, email, password);
			console.log(user, "===== isUserExist");

			resolve(user);
		});
	});
};
