import axios from "axios";
import config from "../../plugins/config";
import router from "../../router/index";

import { useSnackbarStore } from "../../store/SnackbarStore";
import { useAuthStore } from "../../store/AuthStore";

export default async function FethcApi(
	url,
	{
		baseUrl = config.backend_url,
		method = "GET",
		headers = {},
		params = {},
		data = null,
	} = {}
) {
	const axiosOptions = {
		url: `${baseUrl}${url}`,
		method: method,
		headers: {
			Authorization: localStorage.getItem("jwt_token") || null,
			...headers,
		},
		params: params,
		data: data,
	};

	console.log(`${baseUrl}${url}`)

	try {
		const response = await axios(axiosOptions);
		return response.data;
	} catch (error) {
		// SERVER TIDAK MERESPON
		if (!error.response) {
			const snackbarStore = useSnackbarStore();
			snackbarStore.showSnackbar({
				message: error.message,
				timeout: 5000,
			});
		} 
		// BLM PUNYA JWT TOKEN DAN AKSES PAGE YG PERLU OTORISASI || APABILA LOGIN GAGAL TIDAK REDIRECT TAPI MUNCUL SNACKBAR DI LOGIN PAGE
		else if ( error.response.status === 401 &&  router.currentRoute.value.path != "/login") {
			const authStore = useAuthStore()
			authStore.logout()
		}
		// SUDAH LOGIN DAN MENGAKSES DATA API YANG TIDAK PUNYA AKSES || NOT FOUND
		else if ( error.response.status === 403 || error.response.status === 404 ) {
			router.push("/not-found");
		}
		// FIELD SALAH / PESAN ERROR CUSTOM DARI BACKEND
		else if (error.response.status === 422) {
			const snackbarStore = useSnackbarStore();
			snackbarStore.showSnackbar({
				message: error.response.data.errors,
				timeout: 5000,
			});
		} else {
			const snackbarStore = useSnackbarStore();
			snackbarStore.showSnackbar({
				message: error.response.data.errors || error.response.data.message || "ERROR",
				timeout: 5000,
			});
		}

		throw error;
	}
}