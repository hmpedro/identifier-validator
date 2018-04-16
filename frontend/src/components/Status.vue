<template>
  <div>
    {{status}}
  </div>
</template>

<script>
	import requestService from '../RequestService'

	export default {
		name: 'Status',
		props: {
		},
		data () {
			return {
				status: {},
			}
		},
		created() {
			requestService.retrieve('status')
				.then(response => {
					this.status = response.data;
				})
				.catch(error => {
					console.log(error);
				});
		}
	}
</script>

<style>
</style>