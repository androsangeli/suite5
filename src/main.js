import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
window.store = store;
import axios from 'axios';
window.axios = axios;
import _ from 'lodash';
window._ = _;
import i18n from '@/i18n'
window.i18n = i18n;

import './index.css'

import "~/font-awesome/css/font-awesome.min.css"


import '@/assets/tailwind.css'

createApp(App).use(store).use(router).use(i18n).mount('#app')
