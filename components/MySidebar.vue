<template>
    <v-card>
        <v-layout>
            <v-navigation-drawer theme="dark" permanent width="350">
                <v-list nav>
                    <div
                        style="display: flex; flex-direction: row"
                        class="mt-6 ml-2"
                    >
                        <v-avatar>
                            <v-img
                                alt="profile"
                                src="../assets/icon/profile.png"
                            ></v-img>
                        </v-avatar>
                        <div
                            style="
                                font-size: 13px;
                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                            "
                            class="ml-5"
                        >
                            <div>{{ authStore.username }}</div>
                            <div>{{ authStore.email }}</div>
                        </div>
                    </div>

                    <v-divider class="mb-6 mt-6"></v-divider>
                    <template v-for="item in siderbarList" :key="item.value">
                        <v-list-item
                            :prepend-icon="item.icon"
                            :title="item.title"
                            :value="item.value"
                            :active="item.value == activeAt"
                            @click="handleClickChangeNav(item.url)"
                        ></v-list-item>
                    </template>
                </v-list>

                <template v-slot:append>
                    <div class="pa-2 mb-5">
                        <v-btn block color="primary" @click="handleClickLogout">
                            Logout
                        </v-btn>
                    </div>
                </template>
            </v-navigation-drawer>
            <v-main style="min-height: 100vh">
                <slot></slot>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script setup>
import router from "../router";
import { useAuthStore } from "../store/AuthStore";
import { onMounted } from "vue";

defineProps({
    activeAt: {
        type: String,
        required: false,
    },
});

const siderbarList = [
    {
        icon: "mdi-camera-iris",
        title: "AI IMAGE PREDICTION",
        value: "predict",
        url: "/predict",
    },
    {
        icon: "mdi-database-plus",
        title: "PREPOCESSING DATA",
        value: "prepocessing",
        url: "/prepocessing",
    },
    {
        icon: "mdi-chart-donut-variant",
        title: "TRAINING MODEL",
        value: "train",
        url: "/train",
    },
];

const authStore = useAuthStore();

onMounted(async () => {
    try {
        if (!authStore.email || !authStore.role || !authStore.username) {
            await authStore.getMe();
        }
    } catch (err) {
        throw err;
    }
});

const handleClickChangeNav = (url) => {
    router.push(url)
}

const handleClickLogout = () => {
    authStore.logout();
};
</script>
