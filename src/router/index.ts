import VueRouter, { RouteConfig } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SavedQueryView from '../views/SavedQueryView.vue';
import QueryView from '../views/QueryView.vue';

const routes: Array<RouteConfig> = [
    {
        path: '/query/:queryId',
        name: 'query',
        component: QueryView,
    },
    {
        path: '/saved-queries',
        name: 'saved-queries',
        component: SavedQueryView,
    },
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
];

const router = new VueRouter({
    routes,
});

export default router;
