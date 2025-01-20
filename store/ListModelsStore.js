import { defineStore } from "pinia";
import fetchApi from "../lib/api/FetchApi";

export const useListModelStore = defineStore("listModel", {
    state: () => ({
        data: [],
    }),
    actions: {
        async getListModel() {
            try {
                const response = await fetchApi("/ai/list-trained-models", {
                    method: "GET",
                });
                this.data = response.files.reverse()         
            } catch (error) {
                throw error
            }
        },
        async getModelsData() {
            try {
                const response = await fetchApi("/ai/get-model-data", {
                    method: "GET",
                });
                this.data = response.reverse()         
            } catch (error) {
                throw error
            }
        }
    }
})