// plugins/vuetify.js
import "vuetify/styles"; // Import global styles
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi"; // Optional: MDI Icons
import { VFileUpload, VFileUploadItem } from 'vuetify/labs/VFileUpload'

export default createVuetify({
    icons: {
        defaultSet: "mdi",
        aliases,
        sets: {
            mdi,
        },
    },
    components: {
        VFileUpload,
        VFileUploadItem
      },
    theme: {
        defaultTheme: "light",
        themes: {
            light: {
                colors: {
                    // Primary Colors
                    primary: "#4caf50", // Hijau utama
                    primaryLight: "#81c784", // Hijau muda
                    primaryDark: "#388e3c", // Hijau gelap
                    primaryDarker: "#317634",

                    // Secondary Colors
                    secondary: "#03a9f4", // Biru utama
                    secondaryLight: "#4fc3f7", // Biru muda
                    secondaryDark: "#0288d1", // Biru gelap

                    darkLight: "#212121"
                },
            },
            dark: {
                colors: {
                    // Primary Colors
                    primary: "#4caf50", // Hijau utama
                    primaryLight: "#81c784", // Hijau muda
                    primaryDark: "#388e3c", // Hijau gelap
                    primaryDarker: "#317634",

                    // Secondary Colors
                    secondary: "#03a9f4", // Biru utama
                    secondaryLight: "#4fc3f7", // Biru muda
                    secondaryDark: "#0288d1", // Biru gelap

                    darkLight: "#212121"
                },
            }
        },
    },
});
