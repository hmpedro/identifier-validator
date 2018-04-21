<template>
  <v-container grid-list-xl>
    <h1>Status da Aplicação desde o último restart </h1>
    <v-layout row wrap justify-left>
      <v-flex xs12 lg6>
        <v-card>
          <ul class="status-list pl-3 pr-3 pt-1 pb-1">
            <li class="status-list__item">
              <h2> Uptime </h2>
              <div class="status-list__item-counter">
                {{ status.uptime | adjustMillisecondToHour }} hora(s) ou {{ status.uptime }} milisegundos
              </div>
            </li>
            <li class="status-list__item">
              <h2> Quantidade de queries de listagem </h2>
              <div class="status-list__item-counter">
                {{ status.queries.retrieveIdentifier }}
              </div>
            </li>
            <li class="status-list__item">
              <h2> Quantidade de queries de criação </h2>
              <div class="status-list__item-counter">
                {{ status.queries.createIdentifier }}
              </div>
            </li>
            <li class="status-list__item">
              <h2> Quantidade de queries de atualização </h2>
              <div class="status-list__item-counter">
                {{ status.queries.updateIdentifier }}
              </div>
            </li>
            <li class="status-list__item">
              <h2> Quantidade de queries de deleção </h2>
              <div class="status-list__item-counter">
                {{ status.queries.deleteIdentifier }}
              </div>
            </li>
          </ul>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
	import requestService from '../RequestService'

	export default {
		name: 'Status',
		props: {},
		data () {
			return {
				status: {
					uptime: 0,
					queries: {
						createIdentifier: 0,
						updateIdentifier: 0,
						deleteIdentifier: 0,
						retrieveIdentifier: 0,
					},
				}
			}
		},
    filters: {
			adjustMillisecondToHour(time) {
				return (time/1000/60/60).toFixed(2);
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
  .status-list {
    list-style: none;
  }

  .status-list__item:not(:first-child) {
    margin-top: 1rem;
  }

  .status-list__item-counter {
    font-size: 1.3rem;
  }

</style>