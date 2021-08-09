import { createRouter, createWebHashHistory } from 'vue-router';
// import Home from '../views/ProjectHome.vue';
import Editor from '../views/ProjectEditor.vue';

const routes = [
	{
		path: '/',
		name: 'ProjectHome',
		redirect: '/editor'
		// component: Home
	}, {
		path: '/editor',
		name: 'Editor',
		component: Editor
	}
];

const router = createRouter({
	history: createWebHashHistory(),
	routes
});

export default router;
