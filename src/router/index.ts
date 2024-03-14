import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SavedQueryView from '../views/SavedQueryView.vue';
import QueryView from '../views/QueryView.vue';
import { VTooltip, VPopover, VClosePopover } from 'v-tooltip';
import VModal from 'vue-js-modal';

Vue.directive('tooltip', VTooltip);
Vue.directive('close-popover', VClosePopover);
Vue.component('v-popover', VPopover);

// ...

Vue.use(VueRouter);
Vue.use(VModal);

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
