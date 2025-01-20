<template>
    <MySidebar activeAt="train">
        <v-tabs
            fixed-tabs
            v-model="tab"
            style="background-color: #212121; color: white"
            height="100"
        >
            <v-tab
                text="Processed Dataset"
                value="processed-dataset"
                style="font-size: 20px"
            ></v-tab>
            <v-tab
                text="Models"
                value="models"
                style="font-size: 20px"
            ></v-tab>
        </v-tabs>

        <v-tabs-window v-model="tab">
            <v-tabs-window-item value="processed-dataset">
                <ProcessedImage />
            </v-tabs-window-item>
            <v-tabs-window-item value="models">
                <ModelTraining />
            </v-tabs-window-item>
        </v-tabs-window>
    </MySidebar>
</template>

<script setup>
import { ref } from "vue";
import MySidebar from "../components/MySidebar.vue";
import ProcessedImage from "./TrainingPage/ProcessedImage.vue";
import ModelTraining from "./TrainingPage/ModelTraining.vue";

const tab = ref("processed-dataset");
</script>
