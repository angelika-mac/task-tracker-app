import { createApp } from 'vue';
import './assets/css/style.css';
import './assets/css/transition.css';
import App from './App.vue';
import store from './assets/js/store';

createApp(App).use(store).mount('#app');
