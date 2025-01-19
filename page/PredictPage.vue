<template>
    <MySidebar activeAt="predict">
        <v-tabs
            fixed-tabs
            v-model="tab"
            style="background-color: #212121; color: white"
            height="100"
        >
            <v-tab text="Image" value="image" style="font-size: 20px"></v-tab>
            <v-tab text="Zip File" value="zip" style="font-size: 20px"></v-tab>
        </v-tabs>

        <v-tabs-window v-model="tab">
            <v-tabs-window-item value="image">
                <v-container>
                    
                    <v-alert
                        border="start"
                        border-color="deep-blue accent-4"
                        text="Only accept png, jpeg and jpg file format. The maximum allowed size is 50MB per image or for the total size of all uploaded images combined."
                        title="Information"
                        type="info"
                        variant="tonal"
                        class="mb-6"
                    ></v-alert>

                    <div
                        style="
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            justify-content: center;
                            gap: 20px;
                        "
                    >
						<div style="display: flex; flex-direction: column; align-items: center;" class="mt-5">
							<label class="mb-1">SELECT PREDICTION MODEL</label>
							<v-select width="200" density="comfortable" :items="listModelStore.data" v-model="selectedModel">
							</v-select>
						</div>
                        <v-btn
                            color="primary"
                            class="mt-3 py-3"
                            elevation="2"
                            @click="handleClickImageStartPrediction"
                            height="50"
                            width="200"
                            rounded="xl"
                        >
                            Start Prediction
                        </v-btn>
                        <v-btn
                            color="secondary"
                            class="mt-3 py-3"
                            elevation="2"
                            @click="handleClickShowImagePredictionResult"
                            height="50"
                            width="200"
                            rounded="xl"
                            v-if="aiPredictionStore.imagePredictionResult.length > 0"
                        >
                            Show Result
                        </v-btn>
                    </div>

                    <v-file-upload
                        v-model="imageFile"
                        clearable
                        multiple
                        show-size
                        accept=".png, .jpeg, .jpg"
                    >
                        <template v-slot:item="{ props: itemProps }">
                            <v-file-upload-item
                                v-bind="itemProps"
                                lines="one"
                                nav
                            >
                                <template v-slot:prepend>
                                    <v-avatar size="32" rounded></v-avatar>
                                </template>

                                <template v-slot:clear="{ props: clearProps }">
                                    <v-btn
                                        color="primary"
                                        v-bind="clearProps"
                                    ></v-btn>
                                </template>
                            </v-file-upload-item>
                        </template>
                    </v-file-upload>
                    
                </v-container>
            </v-tabs-window-item>
            <v-tabs-window-item value="zip">
                <v-container>
                    <v-alert
                        border="start"
                        border-color="deep-blue accent-4"
                        text="Only accept zip file format. The maximum allowed size is 50MB for the zip file"
                        title="Information"
                        type="info"
                        variant="tonal"
                        class="mb-6"
                    ></v-alert>

                    <div
                        style="
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            justify-content: center;
                            gap: 20px;
                        "
                    >
						<div style="display: flex; flex-direction: column; align-items: center;" class="mt-5">
							<label class="mb-1">SELECT PREDICTION MODEL</label>
							<v-select width="200" density="comfortable" :items="listModelStore.data" v-model="selectedModel">
							</v-select>
						</div>
                        <v-btn
                            color="primary"
                            class="mt-3 py-3"
                            elevation="2"
                            @click="handleClickZipStartPrediction"
                            height="50"
                            width="200"
                            rounded="xl"
                        >
                            Start Prediction
                        </v-btn>
                        <v-btn
                            color="secondary"
                            class="mt-3 py-3"
                            elevation="2"
                            @click="handleClickShowZipPredictionResult"
                            height="50"
                            width="200"
                            rounded="xl"
                            v-if="aiPredictionStore.zipPredictionResult.length > 0"
                        >
                            Show Result
                        </v-btn>
                    </div>

                    <v-file-upload
                        v-model="zipFile"
                        clearable
                        show-size
                        accept=".zip"
                    >
                        <template v-slot:item="{ props: itemProps }">
                            <v-file-upload-item
                                v-bind="itemProps"
                                lines="one"
                                nav
                            >
                                <template v-slot:prepend>
                                    <v-avatar size="32" rounded></v-avatar>
                                </template>

                                <template v-slot:clear="{ props: clearProps }">
                                    <v-btn
                                        color="primary"
                                        v-bind="clearProps"
                                    ></v-btn>
                                </template>
                            </v-file-upload-item>
                        </template>
                    </v-file-upload>
                    
                </v-container>
            </v-tabs-window-item>
        </v-tabs-window>
    </MySidebar>

    <v-overlay v-model="predictImageOverlay" style="display: flex; align-items: center; justify-content: center;">
        <v-card width="800" max-height="800" class="pa-6 overflow-y-auto">
            <div >
                <h3 style="text-align: center;" class="mb-3">IMAGE PREDICTION RESULT</h3>
                <v-table>
                    <thead>
                        <tr>
                            <th class="text-left">FILENAME</th>
                            <th class="text-left">PREDICTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="item in aiPredictionStore.imagePredictionResult" :key="item.file_name"
                        >
                            <td>{{ item.file_name }}</td>
                            <td>{{ item.prediction }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </div>
        </v-card>
    </v-overlay>
    <v-overlay v-model="predictZipOverlay" style="display: flex; align-items: center; justify-content: center;">
        <v-card width="800" max-height="800" class="pa-6 overflow-y-auto">
            <div >
                <h3 style="text-align: center;" class="mb-3">ZIP PREDICTION RESULT</h3>
                <v-table>
                    <thead>
                        <tr>
                            <th class="text-left">FILENAME</th>
                            <th class="text-left">PREDICTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="item in aiPredictionStore.zipPredictionResult" :key="item.file_name"
                        >
                            <td>{{ item.file_name }}</td>
                            <td>{{ item.prediction }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </div>
        </v-card>
    </v-overlay>
</template>

<script setup>
import { onMounted, ref } from "vue";
import MySidebar from "../components/MySidebar.vue";
import { useListModelStore } from "../store/ListModelsStore";
import { useSnackbarStore } from "../store/SnackbarStore";
import { useAiPredictionStore } from "../store/AiPredictionStore";

const listModelStore = useListModelStore();
const snackbarStore = useSnackbarStore();
const aiPredictionStore = useAiPredictionStore();

const tab = ref("image");
const imageFile = ref([]);
const zipFile = ref([]);
const selectedModel = ref(null);
const predictImageOverlay = ref(false);
const predictZipOverlay = ref(false);

// 50mb
let maxUploadSize = 50000000;

const handleClickImageStartPrediction = async () => {
    let size = 0;
    imageFile.value.forEach((file) => {
        size += file.size;
    });

    if (imageFile.value.length == 0) {
        snackbarStore.showSnackbar({
            message: "No File Uploaded",
            timeout: 5000
        })
    } else if (size <= maxUploadSize) {
        let formData = new FormData();
        imageFile.value.forEach((file) => {
            formData.append("files", file)
        });
        formData.append("models", selectedModel.value)
        await aiPredictionStore.predictImage(formData)
        predictImageOverlay.value = true;
    } else {
        snackbarStore.showSnackbar({
            message: "The maximum allowed size is 50MB per image or for the total size of all uploaded images combined.",
            timeout: 5000
        })
    }
};

const handleClickZipStartPrediction = async () => {
    if (zipFile.value.length == 0) {
        snackbarStore.showSnackbar({
            message: "No File Uploaded",
            timeout: 5000
        })
    } else if (zipFile.value[0].size <= maxUploadSize) {
        let formData = new FormData();
        formData.append("file", zipFile.value[0])
        formData.append("models", selectedModel.value)
        await aiPredictionStore.predictZip(formData)
        predictZipOverlay.value = true
    } else {
        snackbarStore.showSnackbar({
            message: "The maximum allowed size is 50MB for the zip file",
            timeout: 5000
        })
    }
}

const handleClickShowImagePredictionResult = () => {
    predictImageOverlay.value = true
}

const handleClickShowZipPredictionResult = () => {
    predictZipOverlay.value = true
}

onMounted(async () => {
	await listModelStore.getListModel();
	if (listModelStore.data.length > 0) {
		selectedModel.value = listModelStore.data[0]
	}
})

</script>
