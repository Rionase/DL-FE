import { defineStore } from "pinia";
import fetchApi from "../lib/api/FetchApi";

export const useAiPredictionStore = defineStore("aiPrediction", {
    state: () => ({
        imagePredictionResult: [],
        zipPredictionResult: []
    }),
    actions: {
        async predictImage(formData) {
            try {
                const response = await fetchApi("/ai/predict-image", {
                    method: "POST",
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    data: formData
                })
                this.imagePredictionResult = response.data
            } catch (err) {
                throw err
            }
        },
        async predictZip(formData) {
            try {
                const response = await fetchApi("/ai/predict-zip-image", {
                    method: "POST",
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    data: formData
                })
                this.zipPredictionResult = response.predictions
            } catch (err) {
                throw err
            }
        }
    }
})