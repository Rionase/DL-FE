import { createApp } from "vue";
import App from "./App.vue";
import router from "../router/index"; // Import router
import vuetify from "../plugins/vuetify"; // Import Vuetify
import { createPinia } from "pinia"; // Import Pinia

const pinia = createPinia();

createApp(App)
  .use(router) // Gunakan router
  .use(vuetify) // Gunakan Vuetify
  .use(pinia) // Gunakan Pinia
  .mount("#app"); // Mount aplikasi ke elemen dengan id 'app'
