import Vue from "vue";
import VueRouter from "vue-router";

import HomePage from "@/views/Home/index.vue";
import SignUpPage from "@/views/SignUp/index.vue";
import SignInPage from "@/views/SignIn/index.vue";
import DashboardPage from "@/views/Dashboard/index.vue";
import ForgetPasswordPage from "@/views/ForgetPassword/index.vue";
import ProfilePage from "@/views/Profile/index.vue";
import TaskPage from "@/views/Task/index.vue";
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
    component: SignInPage,
    meta: {
      isAuthenticated: true
    }
  },
  {
    path: "/signup",
    name: "signUp",
    component: SignUpPage,
    meta: {
      isAuthenticated: true
    }
  },
  {
    path: "/reset-password/:token",
    name: "reset-password",
    component: ForgetPasswordPage,
    meta: {
      isAuthenticated: true
    }
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfilePage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/task",
    name: "task",
    component: TaskPage,
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
  } else if (to.matched.some(record => record.meta.isAuthenticated)) {
    if (store.getters["Auth/isAuthenticated"]) {
      next("/dashboard");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
