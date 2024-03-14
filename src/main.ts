import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { VTooltip } from 'v-tooltip';
import VModal from 'vue-js-modal';
import VueRouter from 'vue-router';

Vue.directive('tooltip', VTooltip);
Vue.use(VModal);
Vue.use(VueRouter);

Vue.config.productionTip = false;

new Vue({
    router,
    render: (h) => h(App),
}).$mount('#app');
