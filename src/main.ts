import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import {createPinia, PiniaVuePlugin} from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import {createAuth0} from "@auth0/auth0-vue";

const app = createApp(App)

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);

app.use(createAuth0({
    domain: "creatormate.eu.auth0.com",
    clientId: "ISdCi02fSCQFjdH7h9xqdOolk7Rw3G8D",
    authorizationParams: {
        redirect_uri: 'http://localhost:3000',
        audience: 'http://localhost:5179'
    }
}));

app.mount('#app');
