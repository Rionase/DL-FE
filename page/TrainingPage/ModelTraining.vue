<template>
    <v-container class="pa-10">
        <div
            style="
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
            "
        >
            <h3 class="mb-3">TRAINED MODELS</h3>
            <v-btn
                color="primary"
                class="py-3"
                elevation="2"
                @click="handleClickTrainNewModel"
                height="50"
            >
                TRAIN NEW MODEL
            </v-btn>
        </div>

        <v-table>
            <thead>
                <tr>
                    <th class="text-left">FILENAME</th>
                    <th class="text-left">ACCURACY</th>
                    <th class="text-left">LOSS</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="item in listModelStore.data"
                    :key="item.file_name"
                >
                    <td>{{ item.models_name }}</td>
                    <td>
                        <v-btn
                            v-if="item.accuracy"
                            @click="handleClickImageLink(item.accuracy)"
                            icon="mdi-eye"
                            variant="plain"
                            color="blue"
                        ></v-btn>
                        <p v-else style="font-size: 20px; font-weight: bold; margin-left: 20px;">-</p>
                    </td>
                    <td>
                        <v-btn
                            v-if="item.loss"
                            @click="handleClickImageLink(item.loss)"
                            icon="mdi-eye"
                            variant="plain"
                            color="blue"
                        ></v-btn>
                        <p v-else style="font-size: 20px; font-weight: bold; margin-left: 20px;">-</p>
                    </td>
                </tr>
            </tbody>
        </v-table>
    </v-container>

    <v-overlay
        v-model="overlay"
        style="display: flex; align-items: center; justify-content: center"
    >
        <img :src="imageUrl" alt="not-found" style="max-width: 80vw; max-height: 80vh;"  />
    </v-overlay>

    <v-overlay
        v-model="trainOverlay"
        style="display: flex; align-items: center; justify-content: center"
    >
        <v-card
            class="pa-6 overflow-y-auto"
            title="Training New Model Confirmation"
            text="Training new models will take quite a lot of time. Please don't close this pop up until success/ error show up. The training will use all data that that have been processed."
            width="500"
        >
            <v-card-actions style="display: flex; flex-direction: row; justify-content: right;">
                <v-btn
                    color="primary"
                    variant="flat"
                    @click="handleTraining"
                >TRAIN NEW MODEL</v-btn>
                <v-btn
                    color="primary"
                    variant="text"
                    @click="handleClickCancel"
                >Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-overlay>
</template>

<script setup>
import { onMounted, ref } from "vue";
import config from "../../plugins/config";
import { useListModelStore } from "../../store/ListModelsStore";
import { useAiPredictionStore } from "../../store/AiPredictionStore";
import { useSnackbarStore } from "../../store/SnackbarStore";

const listModelStore = useListModelStore();
const AiPredictionStore = useAiPredictionStore()
const snackbarStore = useSnackbarStore()

const overlay = ref(false);
const imageUrl = ref("")
const trainOverlay = ref(false)

const handleClickImageLink = (url) => {
    imageUrl.value = `${config.backend_url}/ai/${url}`;
    overlay.value = true;
};

const handleClickTrainNewModel = () => {
    trainOverlay.value = true
}

const handleClickCancel = () => {
    trainOverlay.value = false
}

const handleTraining = async () => {
    try {
        await AiPredictionStore.train()
        await listModelStore.getModelsData()
        trainOverlay.value = false
        snackbarStore.showSnackbar({
            message: "Successfully train new models",
            type: "success",
            timeout: 5000
        })
    } catch (err) {
        throw err
    }
}

onMounted(async () => {
    try {
        await listModelStore.getModelsData()
    } catch (err) {
        throw err
    }
})
</script>
