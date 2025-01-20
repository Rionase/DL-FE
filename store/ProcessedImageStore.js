import { defineStore } from "pinia";
import fetchApi from "../lib/api/FetchApi";

export const useProcessedImageStore = defineStore("processedImageStore", {
    state: () => ({
        organic: [],
        unorganic: [],
    }),
    actions: {
        async getProcessedImage() {
            try {
                const response = await fetchApi("/ai/get-processed-data", {
                    method: "GET",
                });
                this.organic = response.organic;
                this.unorganic = response.unorganic;
            } catch (err) {
                throw err;
            }
        },
    },
});
