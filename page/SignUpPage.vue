<template>
    <v-app>
        <v-main>
            <div
                class="d-flex justify-center align-center"
                style="height: 100vh; background-color: #f4faff"
            >
                <v-card
                    style="width: 80vw; height: 80vh"
                    elevation="1"
                    class="px-6 py-8"
                    width="400"
                >
                    <div
                        style="
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            height: 100%;
                        "
                    >
                        <v-card-title
                            class="text-h3 text-center font-weight-bold mb-1"
                            style="color: #388e3c;"
                        >
                            Register
                        </v-card-title>
                        <v-card-subtitle
                            class="text-center mb-4"
                            style="color: #757575"
                        >
                            Fill in the data to register as new user
                        </v-card-subtitle>
                        <v-form ref="formRef">
                            <v-text-field
                                v-model="email"
                                :error-messages="email_error_message"
                                placeholder="Email"
                                type="email"
                                variant="outlined"
                                color="grey"
                                prepend-inner-icon="mdi-at"
                                class="mb-4"
                                required
                                width="400"
                                single-line
                            />
                            <v-text-field
                                v-model="username"
                                :error-messages="username_error_message"
                                placeholder="Username"
                                type="email"
                                variant="outlined"
                                color="grey"
                                prepend-inner-icon="mdi-account"
                                class="mb-4"
                                required
                                width="400"
                                single-line
                            />
                            <v-text-field
                                v-model="password"
                                :error-messages="password_error_message"
                                placeholder="Password"
                                type="password"
                                variant="outlined"
                                color="grey"
                                prepend-inner-icon="mdi-lock"
                                class="mb-4"
                                required
                                single-line
                            />
                            <v-text-field
                                v-model="confirmPassword"
                                :error-messages="confirm_password_error_message"
                                placeholder="Confirm Password"
                                type="password"
                                variant="outlined"
                                color="grey"
                                prepend-inner-icon="mdi-lock"
                                class="mb-4"
                                required
                                single-line
                            />
                            <v-btn
                                :disabled="!isFormValid"
                                block
                                color="primary"
                                class="mt-3 py-3"
                                elevation="2"
                                @click="handleClickRegister"
                                height="50"
                            >
                                REGISTER
                            </v-btn>
                        </v-form>
                        <v-divider class="my-4"></v-divider>
                        <div class="text-center">
                            <span style="color: #757575"
                                >Already have an account?</span
                            >
                            <v-btn
                                color="primary"
                                class="ml-1"
                                @click="handleClickLogin"
                                variant="text"
                            >
                                Login
                            </v-btn>
                        </div>
                    </div>
                </v-card>
            </div>
        </v-main>
    </v-app>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import ValidateEmail from "../lib/validate/ValidateEmail";
import { useSnackbarStore } from "../store/SnackbarStore";
import { useAuthStore } from "../store/AuthStore";
import router from "../router";

// State
const email = ref("");
const username = ref("");
const password = ref("");
const confirmPassword = ref("");

const email_error_message = ref("");
const username_error_message = ref("")
const password_error_message = ref("");
const confirm_password_error_message = ref("")

const authStore = useAuthStore();
const snackbarStore = useSnackbarStore();

// Watcher for email validation
watch(email, (newValue) => {
    if (!newValue) {
        email_error_message.value = "";
    } else if (!ValidateEmail(newValue)) {
        email_error_message.value = "Email format is invalid";
    } else {
        email_error_message.value = "";
    }
});

watch([password, confirmPassword], ([newpassword, newconfirmPassword], [prevpassword, prevconfirmPassword]) => {
    if (!newpassword) {
        password_error_message.value = "";
    } else if (newpassword.length < 6) {
        password_error_message.value = "Password must be at least 6 characters";
    } else {
        password_error_message.value = "";
    }

    if (!newconfirmPassword) {
        confirm_password_error_message.value = ""
    } else if (newconfirmPassword != newpassword) {
        confirm_password_error_message.value = "Confirm password and Password should be identical"
    } else {
        confirm_password_error_message.value = ""
    }
})

watch(username, (newValue) => {
    if (!newValue) {
        username_error_message.value = "";
    } else if (newValue.length < 6) {
        username_error_message.value = "Username must be at least 6 characters";
    } else {
        username_error_message.value = "";
    }
});

// Form validation status
const isFormValid = ref(false);
watch([email_error_message, password_error_message, confirm_password_error_message, username_error_message], () => {
    isFormValid.value =
        !email_error_message.value && !password_error_message.value && !confirm_password_error_message.value && !username_error_message.value && email.value && password.value && username.value && confirmPassword.value;
});

const handleClickRegister = async () => {
    try {
        await authStore.signup({
            email: email.value,
            password: password.value,
            username: username.value
        })
        router.push("/predict")
    } catch (err) {
        snackbarStore.showSnackbar({
            message: err.response.data,
            timeout: 5000,
        });
    }
}

const handleClickLogin = () => {
    router.push('/login')
}

</script>
