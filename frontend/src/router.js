import VueRouter from 'vue-router';

import IdentifierList from './components/IdentifierList.vue';
import IdentifierCrud from './components/IdentifierCrud.vue';
import Status from './components/Status.vue';

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
	},
	{
		path: '/status',
		name: 'status',
		component: Status,
	}
];

const router = new VueRouter({
	mode: 'history',
	routes,
	linkExactActiveClass: 'is-active',
});

export default router;