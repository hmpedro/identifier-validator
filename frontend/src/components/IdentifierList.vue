<template>
    <v-data-table
      :headers="headers"
      :items="items"
      class="elevation-1 mx-auto"
      :loading="loading"
    >
      <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right red">{{ props.item.calories }}</td>
        <td class="text-xs-right">{{ props.item.fat }}</td>
        <td class="text-xs-right">{{ props.item.carbs }}</td>
        <td class="text-xs-right">{{ props.item.protein }}</td>
        <td class="text-xs-right">{{ props.item.iron }}</td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.item)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
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
					{
						text: 'Identifier',
						align: 'left',
						value: 'value'
					},
					{ text: 'Type', value: 'type' },
					{ text: 'Blacklist', value: 'type' },
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