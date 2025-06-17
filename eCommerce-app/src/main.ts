// src/main.ts
import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
// import "./style.css";

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.mount("#app");
