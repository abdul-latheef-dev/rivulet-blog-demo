import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "axios";

const app = createApp(App);

app.config.globalProperties.$axios = Axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  // timeout: 10000,
});

app.use(store).use(router).mount("#app");
