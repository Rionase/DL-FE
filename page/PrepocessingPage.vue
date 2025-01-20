<template>
    <MySidebar activeAt="prepocessing">
        <v-tabs
            fixed-tabs
            v-model="tab"
            style="background-color: #212121; color: white"
            height="100"
        >
            <v-tab
                text="Organic Photo"
                value="organic"
                style="font-size: 20px"
            ></v-tab>
            <v-tab
                text="Unorganic Photo"
                value="unorganic"
                style="font-size: 20px"
            ></v-tab>
        </v-tabs>

        <v-tabs-window v-model="tab">
            <v-tabs-window-item value="organic">
                <v-container>
                    <v-alert
                        border="start"
                        border-color="deep-blue accent-4"
                        text="Contains unprocessed photos of Organic Photo. To be used at model training, data need to be prepocessing first."
                        title="Information"
                        type="info"
                        variant="tonal"
                        class="mb-6"
                    ></v-alert>

                    <div
                        style="
                            display: flex;
                            flex-direction: row;
                            justify-content: space-between;
                            align-items: center;
                        "
                        class="ml-3 mr-12 mb-5"
                    >
                        <h3>UNPROCESSED ORGANIC PHOTO</h3>
                        <div style="display: flex; flex-direction: row; column-gap: 20px;">
                            <v-btn
                                    color="secondary"
                                    class="py-3"
                                    elevation="2"
                                    @click="handleOpenPrepocessingOverlay"
                                    height="50"
                                >
                                    Prepocessing Image
                                </v-btn>
                            <v-btn
                                color="primary"
                                class="py-3"
                                elevation="2"
                                @click="handleUploadOrganicImage"
                                height="50"
                            >
                                Upload Photo
                            </v-btn>
                        </div>
                    </div>
                    <v-table>
                        <thead>
                            <tr>
                                <th class="text-left">PREVIEW</th>
                                <th class="text-left">DELETE</th>
                                <th class="text-left">FILENAME</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="item in unProcessedImageStore.organic"
                                :key="item.file_name"
                            >
                                <td>
                                    <v-btn
                                        @click="handleClickImageLink(item)"
                                        icon="mdi-eye"
                                        variant="plain"
                                        color="blue"
                                    ></v-btn>
                                </td>
                                <td>
                                    <v-btn
                                        @click="
                                            unProcessedImageStore.deleteImage(
                                                item
                                            )
                                        "
                                        icon="mdi-delete"
                                        variant="plain"
                                        color="red"
                                    ></v-btn>
                                </td>
                                <td>{{ item }}</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-container>
            </v-tabs-window-item>
            <v-tabs-window-item value="unorganic">
                <v-container>
                    <v-alert
                        border="start"
                        border-color="deep-blue accent-4"
                        text="Contains unprocessed photos of Unorganic Photo. To be used at model training, data need to be prepocessing first."
                        title="Information"
                        type="info"
                        variant="tonal"
                        class="mb-6"
                    ></v-alert>

                    <div
                        style="
                            display: flex;
                            flex-direction: row;
                            justify-content: space-between;
                            align-items: center;
                        "
                        class="ml-3 mr-12 mb-5"
                    >
                        <h3>UNPROCESSED UNORGANIC PHOTO</h3>
                        <div style="display: flex; flex-direction: row; gap: 20px;">
                            <v-btn
                                color="secondary"
                                class="py-3"
                                elevation="2"
                                @click="handleOpenPrepocessingOverlay"
                                height="50"
                            >
                                Prepocessing Image
                            </v-btn>
                            <v-btn
                                color="primary"
                                class="py-3"
                                elevation="2"
                                @click="handleUploadUnorganicImage"
                                height="50"
                            >
                                Upload Photo
                            </v-btn>
                        </div>
                    </div>
                    <v-table>
                        <thead>
                            <tr>
                                <th class="text-left">PREVIEW</th>
                                <th class="text-left">DELETE</th>
                                <th class="text-left">FILENAME</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="item in unProcessedImageStore.unorganic"
                                :key="item.file_name"
                            >
                                <td>
                                    <v-btn
                                        @click="handleClickImageLink(item)"
                                        icon="mdi-eye"
                                        variant="plain"
                                        color="blue"
                                    ></v-btn>
                                </td>
                                <td>
                                    <v-btn
                                        @click="
                                            unProcessedImageStore.deleteImage(
                                                item
                                            )
                                        "
                                        icon="mdi-delete"
                                        variant="plain"
                                        color="red"
                                    ></v-btn>
                                </td>
                                <td>{{ item }}</td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-container>
            </v-tabs-window-item>
        </v-tabs-window>
    </MySidebar>
    <v-overlay
        v-model="overlay"
        style="display: flex; align-items: center; justify-content: center"
    >
        <img :src="imageUrl" alt="not-found" style="max-width: 80vw; max-height: 80vh;" />
    </v-overlay>

    <v-overlay
        v-model="uploadOrganicOverlay"
        style="display: flex; align-items: center; justify-content: center"
    >
        <v-card width="1000" max-height="800" class="pa-6 overflow-y-auto">
            <v-alert
                border="start"
                border-color="deep-blue accent-4"
                text="Only accept png, jpeg and jpg file format. The maximum allowed size is 50MB per image or for the total size of all uploaded images combined."
                title="Information"
                type="info"
                variant="tonal"
                class="mb-5"
            ></v-alert>

            <v-file-upload
                v-model="uploadOrganicFile"
                multiple
                clearable
                show-size
                accept=".png, .jpeg, .jpg"
            >
                <template v-slot:item="{ props: itemProps }">
                    <v-file-upload-item v-bind="itemProps" lines="one" nav>
                        <template v-slot:prepend>
                            <v-avatar size="32" rounded></v-avatar>
                        </template>

                        <template v-slot:clear="{ props: clearProps }">
                            <v-btn color="primary" v-bind="clearProps"></v-btn>
                        </template>
                    </v-file-upload-item>
                </template>
            </v-file-upload>

            <div
                style="
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                "
            >
                <v-btn
                    color="primary"
                    class="mt-5 py-3"
                    elevation="2"
                    @click="handleUploadFileOrganic"
                    height="50"
                    width="200"
                    rounded="xl"
                >
                    Upload
                </v-btn>
            </div>
        </v-card>
    </v-overlay>

    <v-overlay
        v-model="uploadUnorganicOverlay"
        style="display: flex; align-items: center; justify-content: center"
    >
        <v-card width="1000" max-height="800" class="pa-6 overflow-y-auto">
            <v-alert
                border="start"
                border-color="deep-blue accent-4"
                text="Only accept png, jpeg and jpg file format. The maximum allowed size is 50MB per image or for the total size of all uploaded images combined."
                title="Information"
                type="info"
                variant="tonal"
                class="mb-5"
            ></v-alert>

            <v-file-upload
                v-model="uploadUnorganicFile"
                multiple
                clearable
                show-size
                accept=".png, .jpeg, .jpg"
            >
                <template v-slot:item="{ props: itemProps }">
                    <v-file-upload-item v-bind="itemProps" lines="one" nav>
                        <template v-slot:prepend>
                            <v-avatar size="32" rounded></v-avatar>
                        </template>

                        <template v-slot:clear="{ props: clearProps }">
                            <v-btn color="primary" v-bind="clearProps"></v-btn>
                        </template>
                    </v-file-upload-item>
                </template>
            </v-file-upload>

            <div
                style="
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                "
            >
                <v-btn
                    color="primary"
                    class="mt-5 py-3"
                    elevation="2"
                    @click="handleUploadFileUnorganic"
                    height="50"
                    width="200"
                    rounded="xl"
                >
                    Upload
                </v-btn>
            </div>
        </v-card>
    </v-overlay>

    <v-overlay
        v-model="prepocessingOverlay"
        style="display: flex; align-items: center; justify-content: center"
    >
        <v-card
            class="pa-6 overflow-y-auto"
            title="Prepocessing Data Confirmation"
            text="Preprocessing data will validate and check all processed and unprocessed images from both Organic and Unorganic categories. It might take a while to finish prepocessing dataset."
            width="500"
        >
            <v-card-actions style="display: flex; flex-direction: row; justify-content: right;">
                <v-btn
                    color="primary"
                    variant="flat"
                    @click="handlePrepocessingImage"
                >Do Prepocessing</v-btn>
                <v-btn
                    color="primary"
                    variant="text"
                    @click="handleClickCancelPrepocessing"
                >Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-overlay>
</template>

<script setup>
import { onMounted, ref } from "vue";
import MySidebar from "../components/MySidebar.vue";
import { useUnProcessedImageStore } from "../store/UnProcessedImageStore";
import config from "../plugins/config";
import { useAiPredictionStore } from "../store/AiPredictionStore";
import { useSnackbarStore } from "../store/SnackbarStore";

const unProcessedImageStore = useUnProcessedImageStore();
const aiPredictionStore = useAiPredictionStore()
const snackbarStore = useSnackbarStore()

const tab = ref("organic");
const overlay = ref(false);
const imageUrl = ref("");
const uploadOrganicOverlay = ref(false);
const uploadOrganicFile = ref([]);
const uploadUnorganicOverlay = ref(false);
const uploadUnorganicFile = ref([]);
const prepocessingOverlay = ref(false);

// 50mb
let maxUploadSize = 50000000;

const handleClickImageLink = (url) => {
    imageUrl.value = `${config.backend_url}/ai/${url}`;
    overlay.value = true;
};

const handleUploadOrganicImage = () => {
    uploadOrganicOverlay.value = true;
};

const handleUploadUnorganicImage = () => {
    uploadUnorganicOverlay.value = true;
};

const handleUploadFileOrganic = async () => {
    let size = 0;
    uploadOrganicFile.value.forEach((file) => {
        size += file.size;
    });

    if (uploadOrganicFile.value.length == 0) {
        snackbarStore.showSnackbar({
            message: "No File Uploaded",
            timeout: 5000,
        });
    } else if (size <= maxUploadSize) {
        let formData = new FormData();
        uploadOrganicFile.value.forEach((file) => {
            formData.append("files", file);
        });
        formData.append("tipe_sampah", "organik");
        await unProcessedImageStore.uploadImage(formData);
        uploadOrganicOverlay.value = false;
        uploadOrganicFile.value = []
    } else {
        snackbarStore.showSnackbar({
            message:
                "The maximum allowed size is 50MB per image or for the total size of all uploaded images combined.",
            timeout: 5000,
        });
    }
};

const handleUploadFileUnorganic = async () => {
    let size = 0;
    uploadUnorganicFile.value.forEach((file) => {
        size += file.size;
    });

    if (uploadUnorganicFile.value.length == 0) {
        snackbarStore.showSnackbar({
            message: "No File Uploaded",
            timeout: 5000,
        });
    } else if (size <= maxUploadSize) {
        let formData = new FormData();
        uploadUnorganicFile.value.forEach((file) => {
            formData.append("files", file);
        });
        formData.append("tipe_sampah", "anorganik");
        await unProcessedImageStore.uploadImage(formData);
        uploadUnorganicOverlay.value = false;
        uploadUnorganicFile.value = []
    } else {
        snackbarStore.showSnackbar({
            message:
                "The maximum allowed size is 50MB per image or for the total size of all uploaded images combined.",
            timeout: 5000,
        });
    }
};

const handleClickCancelPrepocessing = () => {
    prepocessingOverlay.value = false
}

const handleOpenPrepocessingOverlay = () => {
    prepocessingOverlay.value = true
}

const handlePrepocessingImage = async () => {
    try {
        let response = await aiPredictionStore.prepocessing();
        if ( response.error_logs.length > 0 ) {
            snackbarStore.showSnackbar({
                message: "Successfully prepocessing. Corrupted file and file not in jpg, jpeg and png extention has been removed",
                timeout: 10000,
                type: "warn"
            })
            prepocessingOverlay.value = false
        } else {
            snackbarStore.showSnackbar({
                message: "Successfully prepocessing",
                timeout: 5000,
                type: "success"
            })
            prepocessingOverlay.value = false   
        }
    } catch (err) {
        throw err
    }
}

onMounted(async () => {
    try {
        await unProcessedImageStore.getUnProcessedImage();
    } catch (err) {
        throw err;
    }
});
</script>

<style scoped></style>
