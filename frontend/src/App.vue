<template>
  <v-app id="inspire">
    <navigation :show-menu="showMenu"></navigation>

    <toolbar :menu-show-fn="reverseMenuVisible"></toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
        <!--<v-layout justify-center align-center>-->
          <!---->
        <!--</v-layout>-->
      </v-container>
    </v-content>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
	import Toolbar from './components/Toolbar.vue'
	import Navigation from "./components/Navigation";

	export default {
		name: 'app',
		components: {
			Navigation,
			Toolbar
		},
		data() {
			return {
				showMenu: false
			}
		},
		methods: {
			reverseMenuVisible() {
				this.showMenu = !this.showMenu;
			}
		},
		props: {
			source: String
		}
	}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
