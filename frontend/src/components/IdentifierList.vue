<template>
  <v-container grid-list-xl>
    <v-layout row wrap justify-center>
      <v-flex xs6>
        <v-form v-model="filterValid" ref="form" lazy-validation>
          <v-select
            :items="typesOptions"
            v-model="filter.type"
            label="Selecione um tipo"
            single-line
            @change="typeChanged"
          ></v-select>
          <v-text-field
            label="Número do identificador"
            v-model="filter.value"
            :disabled="!filter.type"
            :mask="mask"
          ></v-text-field>
          <v-checkbox
            label="Blacklist"
            v-model="filter.blacklist"
          ></v-checkbox>

          <v-btn
            @click="filterItems"
            :disabled="!filterValid"
          >
            Filtrar
          </v-btn>
          <v-btn @click="clearFilter">Limpar</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
    <v-layout row wrap justify-center>
      <v-flex xs6>
        <v-data-table
          :headers="headers"
          :items="itemsShown"
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
              <td> {{ props.item.value | maskIdentifier(props.item.type) }}</td>
              <td>{{ props.item.type }}</td>
              <td>
                <v-tooltip top>
                  <v-btn icon class="mx-0" @click="flagBlacklist(props.item)" slot="activator">
                    <v-icon color="black">block</v-icon>
                  </v-btn>
                  <span>Flag Blacklist</span>
                </v-tooltip>
                <v-tooltip top>
                  <v-btn icon class="mx-0" @click="deleteItem(props.item)" slot="activator">
                    <v-icon color="red">delete</v-icon>
                  </v-btn>
                  <span>Deletar</span>
                </v-tooltip>
              </td>
            </tr>
          </template>
          <template slot="no-data">
            <v-alert :value="items.length === 0 && loading === false" color="error" icon="warning">
              Desculpe, nenhum identificador encontrado.
            </v-alert>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
	import requestService from '../RequestService'
	import cpfMask from 'cpf';
	import cnpjMask from 'node-cnpj';

	export default {
		name: 'IdentifierList',
		props: {
			menuShowFn: Function
		},
		filters: {
			maskIdentifier: (txt, type) => {
				if (type === 'CPF') {
					return cpfMask.format(txt);
				}

				if (type === 'CNPJ') {
					return cnpjMask.mask(txt);
				}
			}
		},
		data() {
			return {
				filterValid: false,
				filter: {
					value: null,
					type: null,
					blacklist: null
				},
				loading: false,
				headers: [
					{text: 'Status', value: 'blacklist', sortable: false},
					{
						text: 'Identificador',
						value: 'value'
					},
					{text: 'Tipo', value: 'type'},
					{text: 'Ações', value: 'name', sortable: false}
				],
				items: [],
				itemsShown: [],
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
			retriveList() {
				this.loading = true;
				this.items = [];
				requestService.retrieve('identifier')
					.then(response => {
						this.loading = false;
						this.items = response.data;
						this.itemsShown = this.items;
					})
					.catch(error => {
						this.loading = false;
						console.log(error);
					});
			},
			flagBlacklist(itemShown) {

				const item = this.items.find(obj => {
					return Object.is(obj, itemShown);
				});

				let itemToSave = Object.assign({}, item);
				itemToSave.blacklist = true;
				this.loading = true;

				requestService.update('identifier', item.value, itemToSave)
					.then(response => {
						console.log(response);
						item.blacklist = true;
						itemShown.blacklist = true;
						this.loading = false;
					})
					.catch(error => {
						this.loading = false;
						console.log(error);
					});
			},
			deleteItem(item) {
				this.loading = true;

				requestService.delete('identifier', item.value)
					.then(response => {
						console.log(response);
						this.loading = false;
						this.retriveList();
					})
					.catch(error => {
						console.log(error);
						this.loading = false;
					});
			},
			filterItems() {
				const itemsArray = this.items;
				this.itemsShown = itemsArray.filter(item => {
					let shouldFilter = true;

					if (this.filter.type && item.type !== this.filter.type) {
						shouldFilter = false
					}

					if (this.filter.value && !item.value.includes(this.filter.value)) {
						shouldFilter = false;
					}

					if (this.filter.blacklist && item.blacklist !== this.filter.blacklist) {
						shouldFilter = false;
					}

					return shouldFilter;
				})
			},
			clearFilter() {
				this.$refs.form.reset();
				this.filterItems();
			},
			typeChanged(newVal) {
				this.filter.value = null;
				this.mask = this.masksType[newVal];
			}
		},
		created() {
			this.retriveList();
		}
	}
</script>

<style>
</style>