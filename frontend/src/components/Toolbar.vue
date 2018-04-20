<template>
    <v-toolbar color="orange" dark fixed app>
        <v-toolbar-side-icon @click.stop="menuShowFn()"></v-toolbar-side-icon>
        <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>
</template>

<script>
	export default {
		name: 'Toolbar',
		props: {
			menuShowFn: Function
		}
	}
</script>

<style>
</style>