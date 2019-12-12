import Vue from "vue";
import VueRouter from "vue-router";

import HomePage from "@/views/Home/index.vue";
import SignUpPage from "@/views/SignUp/index.vue";
import SignInPage from "@/views/SignIn/index.vue";
import DashboardPage from "@/views/Dashboard/index.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage
  },
  {
    path: "/signin",
    name: "signin",
    component: SignInPage
  },
  {
    path: "/signup",
    name: "signUp",
    component: SignUpPage
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardPage,
    meta: {
      requiresAuth: true
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters["Auth/isAuthenticated"]) {
      next();
    } else {
      next("/signin");
    }
  } else {
    next();
  }
});

export default router;
