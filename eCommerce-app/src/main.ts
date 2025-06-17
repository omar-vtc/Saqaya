import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "vuetify/styles";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faShoppingCart,
  faRightToBracket,
  faMagnifyingGlass,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faShoppingCart, faRightToBracket, faMagnifyingGlass, faBars); // ✅ this line is required

import "@mdi/font/css/materialdesignicons.css";

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
