import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faShoppingCart,
  faRightToBracket,
  faMagnifyingGlass,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import {
  faSquareFacebook,
  faSquareInstagram,
  faLinkedin,
  faSquareXTwitter,
} from "@fortawesome/free-brands-svg-icons";

import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";

import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

library.add(
  faShoppingCart,
  faRightToBracket,
  faMagnifyingGlass,
  faBars,
  faSquareFacebook,
  faSquareInstagram,
  faLinkedin,
  faSquareXTwitter,
  faHeartRegular,
  faCartPlus,
  faSquarePlus
);

import "@mdi/font/css/materialdesignicons.css";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(pinia);

app.mount("#app");
