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

import { store } from "./shared/store";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(vuetify);
app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
