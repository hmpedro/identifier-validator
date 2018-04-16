import VueRouter from 'vue-router';

import IdentifierList from './components/IdentifierList.vue';
import IdentifierCrud from './components/IdentifierCrud.vue';

const routes = [
	{
		path: '/',
		name: 'identifierList',
		component: IdentifierList,
	},
	{
		path: '/add-identifier',
		name: 'identifierCrud',
		component: IdentifierCrud,
	}
];

const router = new VueRouter({
	mode: 'history',
	routes,
	linkExactActiveClass: 'is-active',
});

export default router;