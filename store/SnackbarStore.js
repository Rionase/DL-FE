import { defineStore } from "pinia";

export const useSnackbarStore = defineStore("snackbar", {
	state: () => ({
		isOpen: false,
		type: "error", // error || success
		message: null, // CAN BE ARRAY/ MAP/ STRING
		timeout: null,
	}),

	getters: {
		formatedMessage() {
			// IF THE MESSAGE IS ARRAY
			if (Array.isArray(this.message)) {
				return this.message.join(" ");
			}

			// IF THE MESSAGE IS OBJECT / MAP
			else if (typeof this.message === 'object' && this.message !== null) {
				let combinedString = "";
				for (let key in this.message) {
					// MAIN - REQ.BODY BACKEND VALIDATION ERROR FORMAT 
					// IF THE MESSAGE IS IN { "key1": [ "value1" ], "key2": [ "value2" ] , ... } FORMAT 
					if (Array.isArray(this.message[key])) {
						combinedString += this.message[key].join(" ") + " ";
					}
					// IF THE MESSAGE IS IN { "key1": "value1" , "key2": "value2" , ... } FORMAT 
					else {
						combinedString += this.message[key] + " ";
					}
				}
				return combinedString.trim(" ");
			}

			else {
				return this.message;
			}
		},
	},

	actions: {
		showSnackbar({ message, type = "error", timeout = 5000 }) {
			this.message = message;
			this.type = type;
			this.timeout = timeout;
			this.isOpen = true;
		},
		closeSnackbar() {
			this.isOpen = false;
			this.message = "";
			this.timeout = null;
		},
	},
});