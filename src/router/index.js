import { createRouter, createWebHistory } from "vue-router";
import home from "../views/home.vue";
import login from "../views/login.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const isLoggedIn = store.state.user.id;

router.beforeEach(async (to, from, next) => {
  await store.restored;

  console.log("path", to, from);
  if (to.path === "/login") {
    if (isLoggedIn) {
      next("/");
      return;
    }
  }

  if (to.path === "/") {
    if (!isLoggedIn) {
      next("/login");
      return;
    }
  }

  next();
});

export default router;
