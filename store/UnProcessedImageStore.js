import { defineStore } from "pinia";
import fetchApi from "../lib/api/FetchApi";
import { useSnackbarStore } from "./SnackbarStore";

export const useUnProcessedImageStore = defineStore(
    "unProcessedImageStore.js",
    {
        state: () => ({
            organic: [],
            unorganic: []
        }),
        actions: {
            async getUnProcessedImage() {
                try {
                    const response = await fetchApi("/ai/get-unprocessed-dataset", {
                        method: "GET",
                    });
                    this.organic = response.organic
                    this.unorganic = response.unorganic
                } catch (err) {
                    throw err;
                }
            },
            async uploadImage(formdata) {
                try {
                    const response = await fetchApi("/ai/upload-dataset", {
                        method: "POST",
                        data: formdata
                    });
                    await this.getUnProcessedImage()
                    const snackbarStore = useSnackbarStore();
                    snackbarStore.showSnackbar({
                        message: `File berhasil diupload`,
                        type: "success",
                        timeout: 5000
                    })
                } catch (err) {
                    throw err;
                }
            },
            async deleteImage(url) {
                try {
                    const response = await fetchApi(`/ai/delete-image/${url}`, {
                        method: "DELETE",
                    });
                    await this.getUnProcessedImage()
                    const snackbarStore = useSnackbarStore();
                    snackbarStore.showSnackbar({
                        message: `berhasil menghapus file ${url}`,
                        type: "success",
                        timeout: 5000
                    })
                } catch (err) {
                    throw err;
                }
            }
        },
    }
);
