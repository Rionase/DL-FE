import { defineStore } from "pinia";
import fetchApi from "../lib/api/FetchApi";

export const useAuthStore = defineStore("auth", {
	state: () => ({
		role: localStorage.getItem("role") || null,
		email: null,
		username: null
	}),

	actions: {
		async login({ email, password }) {
			try {
				const response = await fetchApi("/auth/login", {
					method: "POST",
					data: {
						email: email,
						password: password,
					},
				});                
				localStorage.setItem("jwt_token", `Bearer ${response.token}`);
			} catch (error) {
				throw error;
			}
		},
		logout() {
			localStorage.removeItem("jwt_token");

			// WILL RESET ALL GLOBAL STATE 
			window.location.href = "/login"
		},
		async getMe() {
			try {
				const response = await fetchApi("/auth/get-me", {
					method: "GET",
				});
				this.username = response.username;
				this.email = response.email;
				this.role = response.role;
			} catch (error) {
				throw error;
			}
		}
	},
});