<template>
    <v-tabs
        fixed-tabs
        v-model="tab"
        style="background-color: #81c784; color: black"
    >
        <v-tab text="Organic" value="organic"></v-tab>
        <v-tab text="Unorganic" value="unorganic"></v-tab>
    </v-tabs>

    <v-tabs-window v-model="tab">
        <v-tabs-window-item value="organic">
            <v-container>
                <v-alert
                    border="start"
                    border-color="deep-blue accent-4"
                    text="Contains processed photos of Organic Photo. All the photos that have been processed will be used to traning new models."
                    title="Information"
                    type="info"
                    variant="tonal"
                    class="mb-6"
                ></v-alert>

                <h3 class="mb-3">PROCESSED ORGANIC PHOTO</h3>

                <v-table>
                    <thead>
                        <tr>
                            <th class="text-left">PREVIEW</th>
                            <th class="text-left">FILENAME</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="item in processedImageStore.organic"
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
                    text="Contains processed photos of Unorganic Photo. All the photos that have been processed will be used to traning new models."
                    title="Information"
                    type="info"
                    variant="tonal"
                    class="mb-6"
                ></v-alert>

                <h3 class="mb-3">PROCESSED UNORGANIC PHOTO</h3>

                <v-table>
                    <thead>
                        <tr>
                            <th class="text-left">PREVIEW</th>
                            <th class="text-left">FILENAME</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="item in processedImageStore.unorganic"
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
                            <td>{{ item }}</td>
                        </tr>
                    </tbody>
                </v-table>
            </v-container>
        </v-tabs-window-item>
    </v-tabs-window>

    <v-overlay
        v-model="overlay"
        style="display: flex; align-items: center; justify-content: center"
    >
        <img :src="imageUrl" alt="not-found" style="max-width: 80vw; max-height: 80vh;"  />
    </v-overlay>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useProcessedImageStore } from "../../store/ProcessedImageStore";
import config from "../../plugins/config";

const tab = ref("organic");
const overlay = ref(false);
const imageUrl = ref("")

const processedImageStore = useProcessedImageStore();

const handleClickImageLink = (url) => {
    imageUrl.value = `${config.backend_url}/ai/${url}`;
    overlay.value = true;
};

onMounted(async () => {
    try {
        await processedImageStore.getProcessedImage();
    } catch (err) {
        throw err;
    }
});
</script>
