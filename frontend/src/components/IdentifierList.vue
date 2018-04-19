<template>
  <v-container>
    <v-layout row wrap justify-center>
      <v-flex xs6>
        <v-form v-model="valid" ref="form" lazy-validation>
          <v-select
            :items="typesOptions"
            v-model="filter.type"
            label="CPF/CNPJ"
            single-line
            @change="typeChanged"
          ></v-select>
          <v-text-field
            label="Identificador"
            v-model="filter.value"
            :rules="valueRules"
            :disabled="!filter.type"
            :mask="mask"
          ></v-text-field>
          <v-checkbox
            label="Blacklist"
            v-model="filter.blacklist"
          ></v-checkbox>

          <v-btn
            @click="filter"
            :disabled="!valid"
          >
            submit
          </v-btn>
          <v-btn @click="clearFilter">clear</v-btn>
        </v-form>
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
                <v-icon :color="props.item.blacklist ? 'red' : 'green'">
                  {{ props.item.blacklist ? 'thumb_down' : 'thumb_up' }}
                </v-icon>
              </td>
              <td>{{ props.item.value }}</td>
              <td>{{ props.item.type }}</td>
              <td>
                <v-btn icon class="mx-0" @click="flagBlacklist(props.item)">
                  <v-icon color="black">block</v-icon>
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
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
	import requestService from '../RequestService'

	export default {
		name: 'IdentifierList',
		props: {
			menuShowFn: Function
		},
		data() {
			return {
				filter: {
					value: '',
          type: '',
          blacklist: null
        },
				loading: false,
				headers: [
					{text: 'Status', value: 'blacklist', sortable: false},
					{
						text: 'Identifier',
						value: 'identifier'
					},
					{text: 'Type', value: 'type'},
					{text: 'Actions', value: 'name', sortable: false}
				],
				items: [],
				typesOptions: [
					'CPF',
					'CNPJ',
				],
				masksType: {
					CPF: '###.###.###-##',
					CNPJ: '##.###.###/####-##',
				},
				mask: null,
			}
		},
		methods: {
			flagBlacklist(item) {
				let itemToSave = Object.assign({}, item);
				itemToSave.blacklist = true;
				this.loading = true;

				requestService.update('identifier', item.value, itemToSave)
					.then(response => {
						console.log(response);
						item.blacklist = true;
						this.loading = false;
					})
					.catch(error => {
						this.loading = false;
						console.log(error);
					});
			},
			deleteItem(item) {
				requestService.delete('identifier', item.value)
					.then(response => {
						console.log(response);
						this.$router.go()
					})
					.catch(error => {
						console.log(error);
					});
			},
			filter() {

			},
			clearFilter() {

			},
			typeChanged(newVal) {
				this.identifier.value = null;
				this.mask = this.masksType[newVal];
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