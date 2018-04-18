<template>
    <v-data-table
      :headers="headers"
      :items="items"
      class="elevation-1"
      :loading="loading"
    >
      <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <tr v-bind:class="{ 'red lighten-4': props.item.blacklist }">
          <td>
            <v-icon :color="props.item.blacklist ? 'red' : 'green'" >{{ props.item.blacklist ? 'thumb_down' : 'thumb_up' }}</v-icon>
          </td>
          <td>{{ props.item.value }}</td>
          <td>{{ props.item.type }}</td>
          <td>
            <v-btn icon class="mx-0" @click="editItem(props.item)">
              <v-icon color="black">edit</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click="deleteItem(props.item)">
              <v-icon color="red">delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
      <template slot="no-data">
        <v-alert :value="true" color="error" icon="warning">
          Sorry, nothing to display here :(
        </v-alert>
      </template>
    </v-data-table>
</template>

<script>
  import requestService from '../RequestService'

	export default {
		name: 'IdentifierList',
		props: {
			menuShowFn: Function
		},
		data () {
			return {
				loading: false,
				headers: [
					{ text: 'Status', value: 'blacklist', sortable: false },
					{
						text: 'Identifier',
						value: 'identifier'
					},
					{ text: 'Type', value: 'type' },
					{ text: 'Actions', value: 'name', sortable: false }
				],
				items: []
			}
		},
    created() {
			this.loading = true;
			requestService.retrieve('identifier')
        .then(response => {
					this.loading = false;
				  this.items = response.data;
        })
        .catch(error => {
					this.loading = false;
        	console.log(error);
        });
    }
	}
</script>

<style>
</style>