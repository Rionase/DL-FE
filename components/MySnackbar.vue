<template>
	<v-snackbar
		:color="snackbarStore.type"
		v-model="snackbarStore.isOpen"
		:timeout="snackbarStore.timeout"
		multi-line
		style="justify-content: right; right: 20px; bottom: 20px"
	>
		<div class="d-flex align-center justify-space-between ga-2">
			<p style="font-size: 16px">{{ snackbarStore.formatedMessage }}</p>
			<v-btn variant="text" @click="snackbarStore.closeSnackbar()"
				>Close</v-btn
			>
		</div>
	</v-snackbar>
</template>

<script setup>
import { useSnackbarStore } from "../store/SnackbarStore";

const snackbarStore = useSnackbarStore();
</script>

<style scoped></style>